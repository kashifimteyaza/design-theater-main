"""Stage 1: Render each generated UI to a 1200x1200 PNG via headless Chromium.

Each data/raw/{tool}/{tier}_{task}/ folder is served on an ephemeral localhost
port so relative asset paths and fetch() calls resolve normally (file:// URLs
break CORS/fetch in many frameworks).
"""
from __future__ import annotations

import asyncio
import http.server
import socketserver
import threading
import traceback
from contextlib import contextmanager
from pathlib import Path

from tqdm import tqdm

import config


def _count_inputs() -> int:
    return sum(
        1 for tool, tier, task in config.iter_outputs()
        if (config.RAW_DIR / tool / f"{tier}_{task}").is_dir()
    )


@contextmanager
def _serve_dir(directory: Path):
    """Serve `directory` on an ephemeral port; yield (port, shutdown_fn)."""

    class Handler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *a, **kw):
            super().__init__(*a, directory=str(directory), **kw)

        def log_message(self, *a, **kw):  # silence per-request noise
            return

    server = socketserver.ThreadingTCPServer(("127.0.0.1", 0), Handler)
    port = server.server_address[1]
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        yield port
    finally:
        server.shutdown()
        server.server_close()


async def _render_one(browser, src_dir: Path, out_path: Path) -> None:
    with _serve_dir(src_dir) as port:
        context = await browser.new_context(
            viewport={"width": config.VIEWPORT_WIDTH, "height": config.VIEWPORT_HEIGHT}
        )
        page = await context.new_page()
        try:
            await page.goto(
                f"http://127.0.0.1:{port}/index.html",
                wait_until="networkidle",
                timeout=config.RENDER_TIMEOUT_MS,
            )
            await asyncio.sleep(config.RENDER_WAIT_MS / 1000)
            await page.screenshot(
                path=str(out_path),
                clip={
                    "x": 0, "y": 0,
                    "width": config.VIEWPORT_WIDTH,
                    "height": config.VIEWPORT_HEIGHT,
                },
                full_page=False,
            )
        finally:
            await context.close()


async def _run() -> None:
    from playwright.async_api import async_playwright  # local import keeps module-load cheap

    config.ensure_dirs()
    error_log = config.RENDERED_DIR / "errors.log"
    # Truncate prior errors so a rerun's log reflects only this pass.
    error_log.write_text("")

    total = _count_inputs()
    if total == 0:
        print(f"[stage1] No input folders found under {config.RAW_DIR}. Nothing to render.")
        return

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        try:
            bar = tqdm(total=total, desc="render", unit="ui")
            for tool, tier, task in config.iter_outputs():
                src_dir = config.RAW_DIR / tool / f"{tier}_{task}"
                if not src_dir.is_dir():
                    continue
                out_path = config.RENDERED_DIR / f"{config.output_stem(tool, tier, task)}.png"
                if out_path.exists() and out_path.stat().st_size > 0:
                    bar.update(1)
                    continue
                try:
                    await _render_one(browser, src_dir, out_path)
                except Exception as exc:  # log and keep going
                    with error_log.open("a") as f:
                        f.write(f"{out_path.name}\t{exc}\n{traceback.format_exc()}\n")
                bar.update(1)
            bar.close()
        finally:
            await browser.close()


def main() -> None:
    asyncio.run(_run())


if __name__ == "__main__":
    main()
