"""Stage 6: Analysis, tables, and summary markdown.

Goree et al. 2021 report CNN-color r=0.2, CNN-layout r=0.18, color-layout near 0
across 200k paired comparisons, which supports treating the three components
as measuring distinct kinds of convergence. We re-check that here.
"""
from __future__ import annotations

import shutil

import pandas as pd

import config


def _load_distance(name: str) -> pd.DataFrame | None:
    p = config.DISTANCES_DIR / f"{name}_distances.csv"
    return pd.read_csv(p) if p.exists() else None


def _chi_per_prompt(vis, col, lay) -> pd.DataFrame:
    def avg(df):
        return df.groupby(["tier", "task"])["distance"].mean()
    out = pd.DataFrame({
        "CHI_visual": avg(vis),
        "CHI_color": avg(col),
        "CHI_layout": avg(lay),
    }).reset_index()
    return out


def _chi_per_tier(per_prompt: pd.DataFrame) -> pd.DataFrame:
    agg = per_prompt.groupby("tier").agg(
        CHI_visual=("CHI_visual", "mean"),
        CHI_color=("CHI_color", "mean"),
        CHI_layout=("CHI_layout", "mean"),
        std_visual=("CHI_visual", "std"),
        std_color=("CHI_color", "std"),
        std_layout=("CHI_layout", "std"),
    ).reset_index()
    return agg


def _metric_correlations(vis, col, lay) -> pd.DataFrame:
    joined = vis[["pair_id", "distance"]].rename(columns={"distance": "visual"})
    joined = joined.merge(col[["pair_id", "distance"]].rename(columns={"distance": "color"}), on="pair_id")
    joined = joined.merge(lay[["pair_id", "distance"]].rename(columns={"distance": "layout"}), on="pair_id")
    return joined[["visual", "color", "layout"]].corr(method="pearson")


def _write_summary(per_tier, corr) -> None:
    lines = ["# Design Theater CHI Summary\n"]
    lines.append("## CHI by tier\n")
    lines.append(per_tier.to_markdown(index=False))
    lines.append("\n\n## Metric correlations (Pearson)\n")
    lines.append(corr.to_markdown())
    lines.append("\n")
    (config.ANALYSIS_DIR / "summary.md").write_text("\n".join(lines))


def main() -> None:
    config.ensure_dirs()
    vis = _load_distance("visual")
    col = _load_distance("color")
    lay = _load_distance("layout")

    if vis is None or col is None or lay is None:
        print("[stage6] Missing one or more distance CSVs; run stage 5 first.")
        return

    per_prompt = _chi_per_prompt(vis, col, lay)
    per_prompt.to_csv(config.ANALYSIS_DIR / "chi_per_prompt.csv", index=False)

    per_tier = _chi_per_tier(per_prompt)
    per_tier.to_csv(config.ANALYSIS_DIR / "chi_per_tier.csv", index=False)

    corr = _metric_correlations(vis, col, lay)
    corr.to_csv(config.ANALYSIS_DIR / "metric_correlations.csv")
    if (corr.abs() > 0.5).values.sum() > 3:  # 3 diagonal ones are expected
        print("[stage6] Warning: at least one off-diagonal |r| > 0.5 — metrics may be redundant.")

    _write_summary(per_tier, corr)

    methodology = config.BASE_DIR / "methodology.md"
    if methodology.exists():
        shutil.copy(methodology, config.ANALYSIS_DIR / "methodology.md")

    print(f"[stage6] analysis outputs written to {config.ANALYSIS_DIR}")


if __name__ == "__main__":
    main()
