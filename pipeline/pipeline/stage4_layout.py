"""Stage 4: UI layout via Microsoft OmniParser v2.0.

The original Reinecke-style XY-cut (Reinecke et al. CHI 2013 / Ha et al. ICDAR
1995, as used by Goree et al. CHI 2021) fails on modern AI-generated UIs that
rely on full-bleed hero images and textured backgrounds: either the tree
collapses to a single leaf (no flat bands found anywhere) or it over-segments
a single photo into hundreds of false "sections" from internal color
transitions. See `experiments/method_comparison.py` for a side-by-side
evaluation of the alternatives we considered.

We replace Stage 4 with Microsoft OmniParser v2.0 (Lu et al., 2024), a
screenshot-native UI element detector: YOLOv8 fine-tuned on GUI icons +
EasyOCR for text, merged via IoU. This still operates on the rendered pixels
(not the DOM), so the "measure properties of the rendered output" philosophy
is preserved. The JSON tree schema (`bbox`, `split`, `children`) is also
preserved so Stage 5c runs unchanged.

The tree produced here is flat by construction — root covers the full 1200 ×
1200 canvas, children are detected UI elements as leaves. Hierarchical region
decomposition is gone; the tradeoff is detection that actually works on modern
UIs. Florence2 captions are available in OmniParser but skipped here: they are
incompatible with transformers 4.57 and not needed for layout structure.

Reference:
    Lu, Yang, Yao et al. 2024. "OmniParser for Pure Vision Based GUI Agent."
    https://github.com/microsoft/OmniParser
"""
from __future__ import annotations

import argparse
import base64
import json
import os
import sys
from contextlib import contextmanager
from io import BytesIO
from pathlib import Path

from PIL import Image
from tqdm import tqdm

import config

# --- OmniParser import wiring ---------------------------------------------

_OMNI_ROOT = config.BASE_DIR / "experiments" / "omniparser_repo"
_YOLO_WEIGHTS = _OMNI_ROOT / "weights" / "icon_detect" / "model.pt"

if not _YOLO_WEIGHTS.exists():
    raise FileNotFoundError(
        f"OmniParser YOLO weights not found at {_YOLO_WEIGHTS}.\n"
        f"Clone and set up OmniParser into {_OMNI_ROOT} first. "
        "See experiments/omniparser_run.py for the exact setup."
    )

sys.path.insert(0, str(_OMNI_ROOT))


@contextmanager
def _in_omni_cwd():
    """OmniParser's util.utils has relative-path fallbacks for some ops.
    We chdir into the repo for inference calls and restore cwd on exit."""
    old = os.getcwd()
    os.chdir(_OMNI_ROOT)
    try:
        yield
    finally:
        os.chdir(old)


with _in_omni_cwd():
    from util.utils import (  # noqa: E402
        check_ocr_box,
        get_som_labeled_img,
        get_yolo_model,
    )


# --- Inference -----------------------------------------------------------

BOX_THRESHOLD = 0.05   # YOLO confidence floor for an icon detection
IOU_THRESHOLD = 0.7    # IoU for deduplicating OCR-text vs. YOLO-icon overlaps

_som_model = None


def _load_model():
    global _som_model
    if _som_model is None:
        with _in_omni_cwd():
            _som_model = get_yolo_model(str(_YOLO_WEIGHTS))
            _som_model.to(config.DEVICE)


def _run_omniparser(img_path: Path) -> tuple[list[dict], Image.Image | None]:
    """Return (parsed_elements, viz_overlay_image)."""
    _load_model()
    abs_path = str(Path(img_path).resolve())
    with _in_omni_cwd():
        ocr_rslt, _ = check_ocr_box(
            abs_path,
            display_img=False,
            output_bb_format="xyxy",
            goal_filtering=None,
            easyocr_args={"paragraph": False, "text_threshold": 0.9},
            use_paddleocr=False,
        )
        text, ocr_bbox = ocr_rslt
        som_img, _coords, parsed = get_som_labeled_img(
            abs_path,
            _som_model,
            BOX_TRESHOLD=BOX_THRESHOLD,
            output_coord_in_ratio=True,
            ocr_bbox=ocr_bbox,
            draw_bbox_config={
                "text_scale": 0.4,
                "text_thickness": 1,
                "text_padding": 2,
                "thickness": 2,
            },
            caption_model_processor=None,   # skip Florence2 captions
            ocr_text=text,
            use_local_semantics=False,
            iou_threshold=IOU_THRESHOLD,
            scale_img=False,
            batch_size=128,
        )

    viz = None
    if isinstance(som_img, str):
        try:
            viz = Image.open(BytesIO(base64.b64decode(som_img))).convert("RGB")
        except Exception:
            viz = None
    elif isinstance(som_img, bytes):
        try:
            viz = Image.open(BytesIO(som_img)).convert("RGB")
        except Exception:
            viz = None
    return parsed, viz


def _build_tree(img_path: Path) -> tuple[dict, Image.Image | None]:
    """Run OmniParser and wrap its flat element list into the pipeline's
    tree schema: root = whole image, children = detected elements as leaves."""
    img = Image.open(img_path).convert("RGB")
    W, H = img.size
    parsed, viz = _run_omniparser(img_path)

    children = []
    for el in parsed:
        xmin, ymin, xmax, ymax = el["bbox"]
        x = int(round(xmin * W))
        y = int(round(ymin * H))
        w = int(round((xmax - xmin) * W))
        h = int(round((ymax - ymin) * H))
        if w < 1 or h < 1:
            continue
        children.append({
            "bbox": [x, y, w, h],
            "split": "leaf",
            "children": [],
            # Retained for inspection; Stage 5c doesn't use these fields.
            "type": el.get("type", "unknown"),
            "content": el.get("content", ""),
        })

    tree = {
        "bbox": [0, 0, W, H],
        "split": "root",
        "children": children,
    }
    return tree, viz


def main(viz: bool = False) -> None:
    config.ensure_dirs()
    pngs = sorted(config.RENDERED_DIR.glob("*.png"))
    if not pngs:
        print(f"[stage4] No PNGs in {config.RENDERED_DIR}. Run stage 1 first.")
        return

    viz_dir = config.TREES_DIR / "_viz"
    for path in tqdm(pngs, desc="layout", unit="img"):
        tree, overlay = _build_tree(path)
        (config.TREES_DIR / f"{path.stem}.json").write_text(json.dumps(tree))
        if viz and overlay is not None:
            viz_dir.mkdir(parents=True, exist_ok=True)
            overlay.save(viz_dir / f"{path.stem}.png")
    print(f"[stage4] wrote {len(pngs)} OmniParser trees to {config.TREES_DIR}")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--viz", action="store_true",
                    help="also write OmniParser overlay PNGs to data/trees/_viz/")
    args = ap.parse_args()
    main(viz=args.viz)
