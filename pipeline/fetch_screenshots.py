"""Fetch 1200x1200 screenshots of every generated UI from design-theater.vercel.app.

The deployed site serves each generated UI directly at
    https://design-theater.vercel.app/{tool}/task{T}.{N}/index.html
so we can skip the local-render Stage 1 entirely and screenshot those URLs.

This is a replacement for pipeline.stage1_render for anyone who doesn't have
the raw HTML locally. Output goes straight into data/rendered/ with the stem
format downstream stages expect: {tool}_{tier}_{task}.png.

Idempotent: already-written PNGs are skipped.
"""
from __future__ import annotations

import argparse
import asyncio
import traceback
from pathlib import Path

import httpx
from tqdm.asyncio import tqdm as atqdm

import config

BASE_URL = "https://design-theater.vercel.app"
POST_LOAD_WAIT_MS = 3000  # extra settling time after networkidle
HEAD_TIMEOUT_S = 10


def _site_url(tool: str, tier: str, task: str) -> str:
    t = int(tier.removeprefix("tier"))
    n = int(task.removeprefix("task"))
    return f"{BASE_URL}/{tool}/task{t}.{n}/index.html"


async def _has_content(client: httpx.AsyncClient, url: str) -> int:
    """Return content-length (int). 0 means empty or unreachable."""
    try:
        r = await client.get(url, timeout=HEAD_TIMEOUT_S)
        if r.status_code != 200:
            return 0
        return len(r.content)
    except Exception:
        return 0


async def _screenshot(browser, url: str, out_path: Path) -> None:
    context = await browser.new_context(
        viewport={"width": config.VIEWPORT_WIDTH, "height": config.VIEWPORT_HEIGHT}
    )
    page = await context.new_page()
    try:
        await page.goto(url, wait_until="networkidle", timeout=config.RENDER_TIMEOUT_MS)
        await asyncio.sleep(POST_LOAD_WAIT_MS / 1000)
        await page.screenshot(
            path=str(out_path),
            clip={"x": 0, "y": 0,
                  "width": config.VIEWPORT_WIDTH, "height": config.VIEWPORT_HEIGHT},
            full_page=False,
        )
    finally:
        await context.close()


async def _run(concurrency: int) -> None:
    from playwright.async_api import async_playwright

    config.ensure_dirs()
    error_log = config.RENDERED_DIR / "errors.log"
    error_log.write_text("")
    skipped_log = config.RENDERED_DIR / "skipped_empty.log"
    skipped_log.write_text("")

    # Probe content length for all 120 URLs up front so we can skip empties.
    async with httpx.AsyncClient(follow_redirects=True) as client:
        probe_tasks = []
        all_outputs = list(config.iter_outputs())
        for tool, tier, task in all_outputs:
            probe_tasks.append(_has_content(client, _site_url(tool, tier, task)))
        sizes = await atqdm.gather(*probe_tasks, desc="probe", unit="url")

    work = []
    for (tool, tier, task), size in zip(all_outputs, sizes):
        if size == 0:
            with skipped_log.open("a") as f:
                f.write(f"{tool}/{tier}/{task}\n")
            continue
        out = config.RENDERED_DIR / f"{config.output_stem(tool, tier, task)}.png"
        if out.exists() and out.stat().st_size > 0:
            continue
        work.append((_site_url(tool, tier, task), out))

    if not work:
        print("[fetch] nothing to do — all screenshots present or sources empty.")
        return

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        sem = asyncio.Semaphore(concurrency)

        async def _one(url: str, out_path: Path):
            async with sem:
                try:
                    await _screenshot(browser, url, out_path)
                except Exception as exc:
                    with error_log.open("a") as f:
                        f.write(f"{out_path.name}\t{url}\t{exc}\n{traceback.format_exc()}\n")

        try:
            await atqdm.gather(
                *[_one(u, o) for u, o in work],
                desc="render", unit="ui",
            )
        finally:
            await browser.close()

    print(f"[fetch] rendered {len(work)} screenshots; "
          f"{len(sizes) - sum(1 for s in sizes if s > 0)} sources were empty "
          f"(see {skipped_log}).")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--concurrency", type=int, default=4,
                    help="parallel browser contexts (default: 4)")
    args = ap.parse_args()
    asyncio.run(_run(args.concurrency))


if __name__ == "__main__":
    main()
