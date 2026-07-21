# Design Theater Pipeline

This repository contains the source code for the Design Theater evaluation pipeline.


## Setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
playwright install chromium
```

OmniParser (Stage 4):

```bash
git clone https://github.com/microsoft/OmniParser experiments/omniparser_repo
cd experiments/omniparser_repo
huggingface-cli download microsoft/OmniParser-v2.0 icon_detect/model.pt icon_detect/model.yaml icon_detect/train_args.yaml --local-dir weights
cd -
```

## Run

```bash
python run_pipeline.py              # all 6 stages
python run_pipeline.py --from 2     # stages 2..6
python run_pipeline.py --stage 4    # single stage
```

## Notes

- The `data/` directory is ignored because it contains generated artifacts.
- If you need to reproduce results, run the pipeline after fetching the required
	input screenshots and installing the OmniParser assets for Stage 4.
