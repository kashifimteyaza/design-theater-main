"""Stage 5: Pairwise distances across three dimensions.

For each (tier, task) with >=2 tool outputs, enumerate all C(n, 2) pairs and
compute:
  5a visual   = 1 - cos(uiclip_a, uiclip_b)
  5b color    = Earth Mover's Distance on CIELCh histograms
  5c layout   = Zhang-Shasha tree edit distance (area-weighted costs)

5b tries full 3D EMD first; if the first pair's wall-time extrapolates past
EMD_TIME_BUDGET_SECONDS for the full set, we fall back to averaged 1D marginal
EMDs on (L, C, h). The mode chosen is logged to data/distances/emd_mode.txt.

References:
    Rubner, Tomasi, Guibas 2000. "The Earth Mover's Distance as a Metric for Image Retrieval." IJCV 40(2).
    Zhang & Shasha 1989. "Simple Fast Algorithms for the Editing Distance Between Trees and Related Problems." SIAM J. Comp.
"""
from __future__ import annotations

import itertools
import json
import time

import numpy as np
import pandas as pd
from tqdm import tqdm

import config


DIST_COLUMNS = ["pair_id", "tier", "task", "tool_a", "tool_b", "distance"]


def _parse_stem(stem: str) -> tuple[str, str, str]:
    tool, tier, task = stem.rsplit("_", 2)
    return tool, tier, task


def _pair_id(tier: str, task: str, tool_a: str, tool_b: str) -> str:
    a, b = sorted([tool_a, tool_b])
    return f"{tier}_{task}_{a}_{b}"


def _enumerate_pairs(stems: list[str]) -> list[tuple[str, str, str, str]]:
    """Return [(tier, task, tool_a, tool_b), ...] in deterministic order.
    Only pairs within the same (tier, task) are produced.
    """
    buckets: dict[tuple[str, str], list[str]] = {}
    for s in stems:
        tool, tier, task = _parse_stem(s)
        buckets.setdefault((tier, task), []).append(tool)
    pairs = []
    for (tier, task), tools in buckets.items():
        tools = sorted(tools)
        for a, b in itertools.combinations(tools, 2):
            pairs.append((tier, task, a, b))
    return sorted(pairs)


# ---------------------------------------------------------------------------
# 5a: Visual
# ---------------------------------------------------------------------------

def _visual_distances() -> pd.DataFrame:
    npz = np.load(config.EMBEDDINGS_DIR / "uiclip_embeddings.npz", allow_pickle=True)
    embeddings = npz["embeddings"]
    filenames = list(npz["filenames"])
    index = {fn: i for i, fn in enumerate(filenames)}

    rows = []
    for tier, task, a, b in _enumerate_pairs(filenames):
        sa = config.output_stem(a, tier, task)
        sb = config.output_stem(b, tier, task)
        d = 1.0 - float(np.dot(embeddings[index[sa]], embeddings[index[sb]]))
        rows.append([_pair_id(tier, task, a, b), tier, task, a, b, d])
    return pd.DataFrame(rows, columns=DIST_COLUMNS)


# ---------------------------------------------------------------------------
# 5b: Color (EMD)
# ---------------------------------------------------------------------------

def _build_ground_matrix(bc_L: np.ndarray, bc_C: np.ndarray, bc_h: np.ndarray) -> np.ndarray:
    """3600x3600 CIE76 delta-E matrix. cos/sin of h naturally wraps at 0/360."""
    LL, CC, HH = np.meshgrid(bc_L, bc_C, bc_h, indexing="ij")
    L = LL.ravel()
    a = (CC * np.cos(np.deg2rad(HH))).ravel()
    b = (CC * np.sin(np.deg2rad(HH))).ravel()
    dL = L[:, None] - L[None, :]
    da = a[:, None] - a[None, :]
    db = b[:, None] - b[None, :]
    M = np.sqrt(dL * dL + da * da + db * db).astype(np.float64)
    return M


def _1d_ground(centers: np.ndarray, wrap: float | None = None) -> np.ndarray:
    d = np.abs(centers[:, None] - centers[None, :])
    if wrap is not None:
        d = np.minimum(d, wrap - d)
    return d.astype(np.float64)


def _marginals(hist: np.ndarray) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    """Split a 3600-vector into (L, C, h) marginals."""
    grid = hist.reshape(config.COLOR_BINS_L, config.COLOR_BINS_C, config.COLOR_BINS_H)
    return grid.sum(axis=(1, 2)), grid.sum(axis=(0, 2)), grid.sum(axis=(0, 1))


def _color_distances() -> pd.DataFrame:
    import ot

    npz = np.load(config.HISTOGRAMS_DIR / "color_histograms.npz", allow_pickle=True)
    hists = npz["histograms"].astype(np.float64)
    filenames = list(npz["filenames"])
    bc_L = npz["bin_centers_L"]
    bc_C = npz["bin_centers_C"]
    bc_h = npz["bin_centers_h"]
    index = {fn: i for i, fn in enumerate(filenames)}

    pairs = _enumerate_pairs(filenames)
    if not pairs:
        return pd.DataFrame(columns=DIST_COLUMNS)

    M_full = _build_ground_matrix(bc_L, bc_C, bc_h)
    tier, task, a, b = pairs[0]
    ha = hists[index[config.output_stem(a, tier, task)]]
    hb = hists[index[config.output_stem(b, tier, task)]]
    t0 = time.perf_counter()
    try:
        first = float(ot.emd2(ha, hb, M_full))
    except Exception as exc:
        print(f"[stage5b] 3D EMD failed on first pair ({exc}); falling back to 1D marginals.")
        first_secs = float("inf")
    else:
        first_secs = time.perf_counter() - t0

    use_3d = first_secs * len(pairs) <= config.EMD_TIME_BUDGET_SECONDS
    mode_path = config.DISTANCES_DIR / "emd_mode.txt"

    rows = []
    if use_3d:
        mode_path.write_text(
            f"3d\nfirst_pair_seconds={first_secs:.3f}\npairs={len(pairs)}\n"
        )
        rows.append([_pair_id(tier, task, a, b), tier, task, a, b, first])
        for tier, task, a, b in tqdm(pairs[1:], desc="emd3d", unit="pair"):
            ha = hists[index[config.output_stem(a, tier, task)]]
            hb = hists[index[config.output_stem(b, tier, task)]]
            d = float(ot.emd2(ha, hb, M_full))
            rows.append([_pair_id(tier, task, a, b), tier, task, a, b, d])
    else:
        mode_path.write_text(
            f"marginal\nfirst_pair_seconds={first_secs:.3f}\npairs={len(pairs)}\n"
        )
        M_L = _1d_ground(bc_L)
        M_C = _1d_ground(bc_C)
        M_h = _1d_ground(bc_h, wrap=360.0)
        for tier, task, a, b in tqdm(pairs, desc="emd1d", unit="pair"):
            ha = hists[index[config.output_stem(a, tier, task)]]
            hb = hists[index[config.output_stem(b, tier, task)]]
            mla, mca, mha_ = _marginals(ha)
            mlb, mcb, mhb_ = _marginals(hb)
            d = (
                float(ot.emd2(mla, mlb, M_L))
                + float(ot.emd2(mca, mcb, M_C))
                + float(ot.emd2(mha_, mhb_, M_h))
            ) / 3.0
            rows.append([_pair_id(tier, task, a, b), tier, task, a, b, d])

    return pd.DataFrame(rows, columns=DIST_COLUMNS)


# ---------------------------------------------------------------------------
# 5c: Layout (Zhang-Shasha tree edit distance)
# ---------------------------------------------------------------------------

class _Node:
    __slots__ = ("bbox", "children")

    def __init__(self, bbox, children):
        # (x, y, w, h) in original-image pixel coordinates.
        self.bbox = (int(bbox[0]), int(bbox[1]), int(bbox[2]), int(bbox[3]))
        self.children = children


def _json_to_node(obj: dict) -> _Node:
    return _Node(obj["bbox"], [_json_to_node(c) for c in obj["children"]])


def _area(node: _Node) -> float:
    _, _, w, h = node.bbox
    return float(w * h)


def _total_area(node: _Node) -> float:
    return _area(node) + sum(_total_area(c) for c in node.children)


def _symmetric_diff(a: _Node, b: _Node) -> float:
    """|A ∪ B| − |A ∩ B| on the bbox pixel sets. Captures both size and
    position mismatch, which is Goree's definition of the relabel cost."""
    xa, ya, wa, ha = a.bbox
    xb, yb, wb, hb = b.bbox
    ox = max(0, min(xa + wa, xb + wb) - max(xa, xb))
    oy = max(0, min(ya + ha, yb + hb) - max(ya, yb))
    inter = ox * oy
    return float(wa * ha + wb * hb - 2 * inter)


def _layout_distances() -> pd.DataFrame:
    from zss import distance as zss_distance

    tree_files = sorted(config.TREES_DIR.glob("*.json"))
    filenames = [p.stem for p in tree_files]
    trees = {p.stem: _json_to_node(json.loads(p.read_text())) for p in tree_files}

    pairs = _enumerate_pairs(filenames)
    rows = []
    for tier, task, a, b in tqdm(pairs, desc="layout", unit="pair"):
        ta = trees[config.output_stem(a, tier, task)]
        tb = trees[config.output_stem(b, tier, task)]
        d = zss_distance(
            ta, tb,
            get_children=lambda n: n.children,
            insert_cost=_area,
            remove_cost=_area,
            update_cost=_symmetric_diff,
        )
        denom = _total_area(ta) + _total_area(tb)
        d_norm = float(d) / denom if denom > 0 else 0.0
        rows.append([_pair_id(tier, task, a, b), tier, task, a, b, d_norm])
    return pd.DataFrame(rows, columns=DIST_COLUMNS)


# ---------------------------------------------------------------------------

def main() -> None:
    config.ensure_dirs()

    if (config.EMBEDDINGS_DIR / "uiclip_embeddings.npz").exists():
        _visual_distances().to_csv(config.DISTANCES_DIR / "visual_distances.csv", index=False)
        print("[stage5a] visual_distances.csv written")

    if (config.HISTOGRAMS_DIR / "color_histograms.npz").exists():
        _color_distances().to_csv(config.DISTANCES_DIR / "color_distances.csv", index=False)
        print("[stage5b] color_distances.csv written")

    if any(config.TREES_DIR.glob("*.json")):
        _layout_distances().to_csv(config.DISTANCES_DIR / "layout_distances.csv", index=False)
        print("[stage5c] layout_distances.csv written")


if __name__ == "__main__":
    main()
