"""Central configuration for the Design Theater CHI pipeline.

All parameters live here. .
"""
import pathlib

# --- Rendering ---------------------------------------------------------------
VIEWPORT_WIDTH = 1200
VIEWPORT_HEIGHT = 1200
RENDER_WAIT_MS = 2000
RENDER_TIMEOUT_MS = 30000

# --- Tools and tiers ---------------------------------------------------------
TOOLS = ["claude", "chatgpt", "v0", "firebase", "bolt"]
TIERS = {
    "tier1": ["task1", "task2", "task3", "task4", "task5", "task6", "task7", "task8"],
    "tier2": ["task1", "task2", "task3", "task4", "task5", "task6", "task7", "task8"],
    "tier3": ["task1", "task2", "task3", "task4", "task5", "task6", "task7", "task8"],
}

# --- UIClip ------------------------------------------------------------------
UICLIP_MODEL = "biglab/uiclip_jitteredwebsites-2-224-paraphrased_webpairs_humanpairs"
UICLIP_PROCESSOR = "openai/clip-vit-base-patch32"
UICLIP_IMAGE_SIZE = 224
DEVICE = "cpu"  # macOS users: change to "mps" or "cpu"

# --- Color histograms (CIELCh) ----------------------------------------------
COLOR_BINS_L = 10
COLOR_BINS_C = 10
COLOR_BINS_H = 36  # 10 degrees per bin
TOTAL_COLOR_BINS = COLOR_BINS_L * COLOR_BINS_C * COLOR_BINS_H

# Ranges used for histogram edges. CIELab chroma can exceed 150 in theory
# but 0-150 covers virtually all display-gamut pixels.
L_RANGE = (0.0, 100.0)
C_RANGE = (0.0, 150.0)
H_RANGE = (0.0, 360.0)

# --- Layout XY-tree (Reinecke-style: splits on whitespace OR solid-color bands)
MIN_GUTTER_WIDTH = 10           # minimum band thickness (pixels) to count as a gutter
MIN_REGION_SIZE = 40            # pixels (both width and height minimum)
UNIFORM_COLOR_TOLERANCE = 10.0  # max per-line p95-p05 range (uint8) to call it "flat"
BAND_MEAN_TOLERANCE = 10.0      # max median-color delta between lines of one band

# --- EMD budget --------------------------------------------------------------
# If extrapolated 240-pair wall time exceeds this, stage 6b falls back to
# averaged 1-D marginal EMDs on (L, C, h) and logs the switch.
EMD_TIME_BUDGET_SECONDS = 30 * 60

# --- Paths -------------------------------------------------------------------
BASE_DIR = pathlib.Path(__file__).parent
DATA_DIR = BASE_DIR / "data"
RAW_DIR = DATA_DIR / "raw"
RENDERED_DIR = DATA_DIR / "rendered"
EMBEDDINGS_DIR = DATA_DIR / "embeddings"
HISTOGRAMS_DIR = DATA_DIR / "histograms"
TREES_DIR = DATA_DIR / "trees"
DISTANCES_DIR = DATA_DIR / "distances"
ANALYSIS_DIR = DATA_DIR / "analysis"


def ensure_dirs() -> None:
    """Create every output directory if missing. Cheap, idempotent, safe to call per-stage."""
    for d in (
        RAW_DIR, RENDERED_DIR, EMBEDDINGS_DIR, HISTOGRAMS_DIR, TREES_DIR,
        DISTANCES_DIR, ANALYSIS_DIR,
    ):
        d.mkdir(parents=True, exist_ok=True)


def iter_outputs():
    """Yield (tool, tier, task) for all 120 combinations in deterministic order."""
    for tool in TOOLS:
        for tier, tasks in TIERS.items():
            for task in tasks:
                yield tool, tier, task


def output_stem(tool: str, tier: str, task: str) -> str:
    """Canonical filename stem used across all stages."""
    return f"{tool}_{tier}_{task}"
