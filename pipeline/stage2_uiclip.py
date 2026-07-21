"""Stage 2: UIClip embeddings for each rendered screenshot.

UIClip (Wu et al., UIST 2024) is a CLIP variant fine-tuned on website screenshots.
We load the weights `biglab/uiclip_jitteredwebsites-2-224-paraphrased_webpairs_humanpairs`
with the standard `openai/clip-vit-base-patch32` processor, then apply the paper's
sliding-window inference: resize the shorter side to 224, slide 224x224 windows
across the longer side, average the per-window features, and L2-normalize once.
The L2 normalization is critical because Stage 5a treats cosine distance as 1 - dot.

References:
    Wu et al. 2024. "UIClip: A Data-driven Model for Assessing User Interface Design." UIST 2024.
    Radford et al. 2021. "Learning Transferable Visual Models From Natural Language Supervision." ICML 2021.
"""
from __future__ import annotations

import numpy as np
from PIL import Image
from tqdm import tqdm

import config


def _sliding_windows(img: Image.Image, size: int) -> list[Image.Image]:
    """Resize so the shorter side equals `size`, then slide `size`x`size` windows
    across the longer side with evenly spaced starts.
    """
    w, h = img.size
    if w < h:
        new_w = size
        new_h = round(h * size / w)
    else:
        new_h = size
        new_w = round(w * size / h)
    img = img.resize((new_w, new_h), Image.BICUBIC)

    longer = max(new_w, new_h)
    n = longer // size + 1
    if n == 1 or longer == size:
        return [img.crop((0, 0, size, size))]
    # Even spacing across [0, longer - size].
    starts = np.linspace(0, longer - size, n).round().astype(int)
    windows = []
    for s in starts:
        box = (s, 0, s + size, size) if new_w >= new_h else (0, s, size, s + size)
        windows.append(img.crop(box))
    return windows


def _embed_image(model, processor, device, img_path) -> np.ndarray:
    import torch

    img = Image.open(img_path).convert("RGB")
    windows = _sliding_windows(img, config.UICLIP_IMAGE_SIZE)
    inputs = processor(images=windows, return_tensors="pt").to(device)
    with torch.no_grad():
        feats = model.get_image_features(**inputs)  # (N, 512)
    feats = feats.detach().cpu().numpy().astype(np.float32)
    mean = feats.mean(axis=0)
    norm = np.linalg.norm(mean)
    if norm > 0:
        mean = mean / norm
    return mean


def main() -> None:
    import torch
    from transformers import CLIPModel, CLIPProcessor

    config.ensure_dirs()

    pngs = sorted(config.RENDERED_DIR.glob("*.png"))
    if not pngs:
        print(f"[stage2] No PNGs in {config.RENDERED_DIR}. Run stage 1 first.")
        return

    device = config.DEVICE if torch.cuda.is_available() or config.DEVICE != "cuda" else "cpu"
    if config.DEVICE == "cuda" and not torch.cuda.is_available():
        print("[stage2] CUDA unavailable; falling back to CPU. Edit config.DEVICE to silence this.")

    model = CLIPModel.from_pretrained(config.UICLIP_MODEL).to(device).eval()
    processor = CLIPProcessor.from_pretrained(config.UICLIP_PROCESSOR)

    embeddings = np.zeros((len(pngs), 512), dtype=np.float32)
    filenames = np.empty(len(pngs), dtype=object)

    for i, path in enumerate(tqdm(pngs, desc="uiclip", unit="img")):
        embeddings[i] = _embed_image(model, processor, device, path)
        filenames[i] = path.stem

    out = config.EMBEDDINGS_DIR / "uiclip_embeddings.npz"
    np.savez(out, embeddings=embeddings, filenames=filenames)
    print(f"[stage2] wrote {out} with shape {embeddings.shape}")


if __name__ == "__main__":
    main()
