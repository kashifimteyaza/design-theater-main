"""Orchestrator: run pipeline stages in order.

Usage:
    python run_pipeline.py              # run all stages 1..6
    python run_pipeline.py --stage 2    # run just stage 2
    python run_pipeline.py --from 3     # run stages 3..6
"""
from __future__ import annotations

import argparse
import time

from pipeline import (
    stage1_render,
    stage2_uiclip,
    stage3_color,
    stage4_layout,
    stage5_distances,
    stage6_analysis,
)

STAGES = [
    ("Render screenshots", stage1_render.main),
    ("UIClip embeddings", stage2_uiclip.main),
    ("Color histograms", stage3_color.main),
    ("XY-tree layouts", stage4_layout.main),
    ("Pairwise distances", stage5_distances.main),
    ("Analysis & reporting", stage6_analysis.main),
]


def _run(indices: list[int]) -> None:
    for i in indices:
        name, fn = STAGES[i - 1]
        print(f"\n=== Stage {i}: {name} ===")
        t0 = time.perf_counter()
        fn()
        print(f"=== Stage {i} done in {time.perf_counter() - t0:.1f}s ===")


def main() -> None:
    ap = argparse.ArgumentParser()
    group = ap.add_mutually_exclusive_group()
    group.add_argument("--stage", type=int, choices=range(1, 7), help="run a single stage")
    group.add_argument("--from", dest="from_stage", type=int, choices=range(1, 7),
                       help="run from stage N through stage 6")
    args = ap.parse_args()

    if args.stage is not None:
        _run([args.stage])
    elif args.from_stage is not None:
        _run(list(range(args.from_stage, 7)))
    else:
        _run(list(range(1, 7)))


if __name__ == "__main__":
    main()
