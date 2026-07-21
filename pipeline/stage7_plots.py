
from __future__ import annotations

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from PIL import Image
from scipy.cluster.hierarchy import linkage, dendrogram
from scipy.spatial.distance import squareform

import config


METRICS = [
    ("visual", "Visual (cosine dist.)"),
    ("color", "Color (ΔE)"),
    ("layout", "Layout (frac. region-mass)"),
]


def _load_distances() -> dict[str, pd.DataFrame]:
    return {n: pd.read_csv(config.DISTANCES_DIR / f"{n}_distances.csv") for n, _ in METRICS}


def _tools_in_data(dfs: dict[str, pd.DataFrame]) -> list[str]:
    seen = set()
    for df in dfs.values():
        seen.update(df["tool_a"].unique())
        seen.update(df["tool_b"].unique())
    return sorted(seen)


def _tool_pair_matrix(df: pd.DataFrame, tools: list[str]) -> np.ndarray:
    n = len(tools)
    M = np.zeros((n, n))
    idx = {t: i for i, t in enumerate(tools)}
    for (a, b), v in df.groupby(["tool_a", "tool_b"])["distance"].mean().items():
        i, j = idx[a], idx[b]
        M[i, j] = v
        M[j, i] = v
    return M


def _annot_fmt(name: str, v: float) -> str:
    return f"{v:.0f}" if name == "color" else f"{v:.2f}"


def plot_tool_pair_heatmaps(dfs, tools, out):
    fig, axes = plt.subplots(1, 3, figsize=(15, 4.8))
    for ax, (name, label) in zip(axes, METRICS):
        M = _tool_pair_matrix(dfs[name], tools)
        im = ax.imshow(M, cmap="viridis")
        ax.set_xticks(range(len(tools)))
        ax.set_yticks(range(len(tools)))
        ax.set_xticklabels(tools, rotation=45, ha="right")
        ax.set_yticklabels(tools)
        ax.set_title(label)
        thresh = M.max() * 0.55
        for i in range(len(tools)):
            for j in range(len(tools)):
                ax.text(j, i, _annot_fmt(name, M[i, j]), ha="center", va="center",
                        color="white" if M[i, j] < thresh else "black", fontsize=8)
        fig.colorbar(im, ax=ax, fraction=0.046, pad=0.04)
    fig.suptitle("Mean pairwise distance by tool pair (averaged over 24 prompts)")
    fig.tight_layout()
    fig.savefig(out, dpi=150)
    plt.close(fig)


def plot_inter_metric_scatter(dfs, out):
    joined = dfs["visual"][["pair_id", "distance"]].rename(columns={"distance": "visual"})
    joined = joined.merge(dfs["color"][["pair_id", "distance"]].rename(columns={"distance": "color"}), on="pair_id")
    joined = joined.merge(dfs["layout"][["pair_id", "distance"]].rename(columns={"distance": "layout"}), on="pair_id")

    pairs = [("visual", "color"), ("visual", "layout"), ("color", "layout")]
    fig, axes = plt.subplots(1, 3, figsize=(15, 4.8))
    for ax, (x, y) in zip(axes, pairs):
        ax.scatter(joined[x], joined[y], alpha=0.45, s=22, edgecolor="none")
        r = joined[[x, y]].corr().iloc[0, 1]
        m, c = np.polyfit(joined[x], joined[y], 1)
        xs = np.linspace(joined[x].min(), joined[x].max(), 50)
        ax.plot(xs, m * xs + c, color="crimson", lw=1.5, alpha=0.8)
        ax.set_xlabel(x)
        ax.set_ylabel(y)
        ax.set_title(f"{x} vs {y}   (Pearson r = {r:.3f})")
    fig.suptitle("Inter-metric scatter (n = 240 pairwise comparisons)")
    fig.tight_layout()
    fig.savefig(out, dpi=150)
    plt.close(fig)


def plot_per_prompt_heatmap(dfs, out):
    rows = []
    for name, _ in METRICS:
        per = dfs[name].groupby(["tier", "task"])["distance"].mean().reset_index()
        per["metric"] = name
        rows.append(per)
    df = pd.concat(rows)
    pivot = df.pivot(index=["tier", "task"], columns="metric", values="distance")
    pivot = pivot[[m for m, _ in METRICS]]
    z = (pivot - pivot.mean()) / pivot.std()

    fig, ax = plt.subplots(figsize=(6.5, 8.5))
    im = ax.imshow(z.values, cmap="RdBu_r", aspect="auto", vmin=-2.5, vmax=2.5)
    ax.set_xticks(range(3))
    ax.set_xticklabels([label for _, label in METRICS], rotation=15, ha="right")
    ax.set_yticks(range(len(pivot)))
    ax.set_yticklabels([f"{t}/{k}" for t, k in pivot.index])
    for i in range(len(pivot)):
        for j, (name, _) in enumerate(METRICS):
            v = pivot.iloc[i, j]
            ax.text(j, i, _annot_fmt(name, v), ha="center", va="center", color="black", fontsize=8)
    fig.colorbar(im, ax=ax, label="z-score within column", fraction=0.046)
    ax.set_title("Per-prompt mean pairwise distance\n(cells annotated with raw values)")
    fig.tight_layout()
    fig.savefig(out, dpi=150)
    plt.close(fig)


def plot_tier_violins(dfs, out):
    tiers = ["tier1", "tier2", "tier3"]
    fig, axes = plt.subplots(1, 3, figsize=(15, 4.8))
    for ax, (name, label) in zip(axes, METRICS):
        df = dfs[name]
        data = [df[df["tier"] == t]["distance"].values for t in tiers]
        parts = ax.violinplot(data, showmeans=True, showmedians=False)
        for pc in parts["bodies"]:
            pc.set_alpha(0.5)
        ax.set_xticks([1, 2, 3])
        ax.set_xticklabels(["tier 1", "tier 2", "tier 3"])
        ax.set_ylabel(label)
        ax.set_title(label)
    fig.suptitle("Per-pair distance distributions by tier (n = 80 pairs per tier)")
    fig.tight_layout()
    fig.savefig(out, dpi=150)
    plt.close(fig)


def plot_dendrograms(dfs, tools, out):
    fig, axes = plt.subplots(1, 3, figsize=(15, 4.8))
    for ax, (name, label) in zip(axes, METRICS):
        M = _tool_pair_matrix(dfs[name], tools)
        condensed = squareform(M, checks=False)
        Z = linkage(condensed, method="average")
        dendrogram(Z, labels=tools, ax=ax, color_threshold=0)
        ax.set_title(label)
        ax.set_ylabel("avg pairwise distance")
    fig.suptitle("Hierarchical clustering of tools (average linkage on tool-pair matrix)")
    fig.tight_layout()
    fig.savefig(out, dpi=150)
    plt.close(fig)


def plot_qualitative_grid(dfs, tools, out):
    per_prompt = {n: dfs[n].groupby(["tier", "task"])["distance"].mean() for n, _ in METRICS}
    showcase = [
        ("tier1", "task5", "Most visually convergent"),
        ("tier3", "task5", "Most divergent (color + layout)"),
    ]

    n = len(tools)
    fig, axes = plt.subplots(2, n, figsize=(3 * n, 7))
    for row, (tier, task, label) in enumerate(showcase):
        v = per_prompt["visual"].get((tier, task), float("nan"))
        c = per_prompt["color"].get((tier, task), float("nan"))
        ly = per_prompt["layout"].get((tier, task), float("nan"))
        for col, tool in enumerate(tools):
            ax = axes[row, col]
            png = config.RENDERED_DIR / f"{config.output_stem(tool, tier, task)}.png"
            if png.exists():
                ax.imshow(Image.open(png))
            ax.set_xticks([])
            ax.set_yticks([])
            for spine in ax.spines.values():
                spine.set_visible(False)
            if row == 0:
                ax.set_title(tool, fontsize=11)
        bbox = axes[row, 0].get_position()
        fig.text(
            0.005, (bbox.y0 + bbox.y1) / 2,
            f"{label}\n{tier}/{task}\nvis = {v:.3f}\ncolor = {c:.1f}\nlayout = {ly:.3f}",
            ha="left", va="center", fontsize=9,
        )
    fig.subplots_adjust(left=0.13, right=0.99, top=0.93, bottom=0.02, wspace=0.05, hspace=0.1)
    fig.savefig(out, dpi=150)
    plt.close(fig)


def main() -> None:
    config.ensure_dirs()
    dfs = _load_distances()
    tools = _tools_in_data(dfs)
    plots_dir = config.ANALYSIS_DIR / "plots"
    plots_dir.mkdir(parents=True, exist_ok=True)

    plot_tool_pair_heatmaps(dfs, tools, plots_dir / "tool_pair_heatmaps.png")
    plot_inter_metric_scatter(dfs, plots_dir / "inter_metric_scatter.png")
    plot_per_prompt_heatmap(dfs, plots_dir / "per_prompt_heatmap.png")
    plot_tier_violins(dfs, plots_dir / "tier_violins.png")
    plot_dendrograms(dfs, tools, plots_dir / "tool_dendrograms.png")
    plot_qualitative_grid(dfs, tools, plots_dir / "qualitative_grid.png")
    print(f"[stage7] wrote 6 plots to {plots_dir}")


if __name__ == "__main__":
    main()
