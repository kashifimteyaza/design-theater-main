"""Stage 3: CIELCh color histograms per screenshot.

The CIELCh space (polar form of CIELab) separates lightness, chroma, and hue,
which matches how designers talk about color far better than RGB. We quantize
each pixel into a 10x10x36 grid and normalize to a probability distribution
so Stage 6b can compare two screenshots with Earth Mover's Distance.

Bin-center arrays are saved alongside the histograms because Stage 6b needs
them to build the EMD ground distance matrix.
"""
from __future__ import annotations

import numpy as np
from PIL import Image
from skimage.color import rgb2lab
from tqdm import tqdm

import config


def _bin_centers(edges_low: float, edges_high: float, nbins: int) -> np.ndarray:
    edges = np.linspace(edges_low, edges_high, nbins + 1)
    return (edges[:-1] + edges[1:]) / 2.0


def _histogram(img_path) -> np.ndarray:
    rgb = np.asarray(Image.open(img_path).convert("RGB"), dtype=np.float32) / 255.0
    lab = rgb2lab(rgb)  # D65 by default
    L = lab[..., 0]
    a = lab[..., 1]
    b = lab[..., 2]

    C = np.hypot(a, b)
    h = np.degrees(np.arctan2(b, a)) % 360.0

    samples = np.stack([L.ravel(), C.ravel(), h.ravel()], axis=1)
    hist, _ = np.histogramdd(
        samples,
        bins=(config.COLOR_BINS_L, config.COLOR_BINS_C, config.COLOR_BINS_H),
        range=(config.L_RANGE, config.C_RANGE, config.H_RANGE),
    )
    total = hist.sum()
    if total > 0:
        hist = hist / total
    return hist.astype(np.float32).ravel()


def main() -> None:
    config.ensure_dirs()
    pngs = sorted(config.RENDERED_DIR.glob("*.png"))
    if not pngs:
        print(f"[stage3] No PNGs in {config.RENDERED_DIR}. Run stage 1 first.")
        return

    histograms = np.zeros((len(pngs), config.TOTAL_COLOR_BINS), dtype=np.float32)
    filenames = np.empty(len(pngs), dtype=object)
    for i, path in enumerate(tqdm(pngs, desc="color", unit="img")):
        h = _histogram(path)
        # Sanity: a normalized histogram should sum to ~1 (or 0 on an empty/error image).
        s = float(h.sum())
        assert s == 0.0 or abs(s - 1.0) < 1e-4, f"{path.name} histogram sum={s:.6f}"
        histograms[i] = h
        filenames[i] = path.stem

    bc_L = _bin_centers(*config.L_RANGE, config.COLOR_BINS_L)
    bc_C = _bin_centers(*config.C_RANGE, config.COLOR_BINS_C)
    bc_h = _bin_centers(*config.H_RANGE, config.COLOR_BINS_H)

    out = config.HISTOGRAMS_DIR / "color_histograms.npz"
    np.savez(
        out,
        histograms=histograms,
        filenames=filenames,
        bin_centers_L=bc_L,
        bin_centers_C=bc_C,
        bin_centers_h=bc_h,
    )
    print(f"[stage3] wrote {out} with shape {histograms.shape}")


if __name__ == "__main__":
    main()
