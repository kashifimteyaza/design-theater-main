# DesignTheater Eval Pipeline

This branch contains the evaluation pipeline for the Design Theater project.
It is separate from the `main` branch, which holds the uploaded
`Design-Theater-task-artifacts/` folder.

The pipeline computes three pairwise similarity metrics for rendered UI outputs:

- **DHI-Visual**: UIClip embeddings with cosine distance
- **DHI-Color**: CIELCh histograms with Earth Mover's Distance
- **DHI-Layout**: OmniParser layout trees with Zhang-Shasha tree edit distance

Lower values mean two generated interfaces are more similar. The three metrics
are reported separately and are not averaged together.

## Requirements

- Python 3.10+
- Playwright Chromium
- OmniParser model weights for Stage 4

CPU-only runs are supported, but Stage 4 is slower without a GPU.

## Setup

```bash
git clone https://github.com/kashifimteyaz/design-theater-main.git
cd design-theater-main
git checkout eval-pipeline

python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
playwright install chromium
```

**OmniParser (required for Stage 4):**

```bash
git clone https://github.com/microsoft/OmniParser experiments/omniparser_repo
cd experiments/omniparser_repo
huggingface-cli download microsoft/OmniParser-v2.0 \
	icon_detect/model.pt icon_detect/model.yaml icon_detect/train_args.yaml \
	--local-dir weights
cd -
```

## Input format

Stage 1 expects raw UI folders at:

```text
data/raw/{tool}/{tier}_{task}/
```

Where:

- `tool` is one of `claude`, `chatgpt`, `v0`, `firebase`, or `bolt`
- `tier` is one of `tier1`, `tier2`, or `tier3`
- `task` is one of `task1` through `task8`

Stage 1 renders those folders to PNGs and later stages read the generated
artifacts automatically.

## Run

```bash
python run_pipeline.py              # all 6 stages
python run_pipeline.py --from 2     # stages 2..6
python run_pipeline.py --stage 4    # single stage
```

## Pipeline stages

| Stage | Does | Reads | Writes |
|---|---|---|---|
| 1 | Render interfaces to 1200×1200 PNG via headless Chromium | `data/raw/` | `data/rendered/` |
| 2 | UIClip embeddings for visual similarity | rendered PNGs | `data/embeddings/uiclip_embeddings.npz` |
| 3 | CIELCh histograms for color similarity | rendered PNGs | `data/histograms/color_histograms.npz` |
| 4 | OmniParser layout trees for structural similarity | rendered PNGs | `data/trees/*.json` |
| 5 | Pairwise distances for the three metrics | stage 2–4 outputs | `data/distances/*.csv` |
| 6 | Aggregates, correlations, and summary tables | stage 5 outputs | `data/analysis/*` |

## Reuse locally

```bash
git clone https://github.com/kashifimteyaz/design-theater-main.git
cd design-theater-main
git checkout eval-pipeline
```

Then install dependencies and run the pipeline as above. If you want the
benchmark tasks and artifacts instead, switch to `main` after cloning.

## Notes

- The `data/` directory is ignored because it contains generated artifacts.
- `config.py` controls the main thresholds, timeouts, and paths.
- The color-distance stage uses a fallback from 3D EMD to averaged 1D marginal
	EMDs if the full computation would exceed the configured budget.
