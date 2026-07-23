import { NextResponse, type NextRequest } from "next/server"

// Bolt task HTML files reference assets with absolute paths (e.g. /style.css,
// /main.js) that would normally resolve to the site root. When loaded from
// /bolt/<task>/index.html, we use the Referer to rewrite those requests back
// to the correct task folder. A few tasks also reference filenames that don't
// match what's actually on disk — the remap below fixes those.
const FILENAME_REMAP: Record<string, Record<string, string>> = {
  "task1.3": { "main.js": "script.js", "style.css": "styles.css" },
  "task1.6": { "main.js": "script.js", "style.css": "styles.css" },
  "task1.7": { "main.js": "script.js" },
  "task2.1": { "main.js": "script.js" },
}

const ASSET_EXT_RE = /\.(css|js|mjs|svg|png|jpe?g|webp|gif|ico|woff2?|ttf)$/i
const TASK_REFERER_RE = /^\/([a-z0-9_-]+)\/(task[\d.]+)(?:\/|$)/i

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only handle root-level single-segment asset paths like "/style.css".
  // Anything with a nested slash is either a normal route or already scoped.
  if (pathname.indexOf("/", 1) !== -1) return
  if (!ASSET_EXT_RE.test(pathname)) return

  const referer = req.headers.get("referer")
  if (!referer) return

  let tool: string
  let task: string
  try {
    const refPath = new URL(referer).pathname
    const m = TASK_REFERER_RE.exec(refPath)
    if (!m) return
    tool = m[1]
    task = m[2]
  } catch {
    return
  }

  const filename = pathname.slice(1)
  const remapped = FILENAME_REMAP[task]?.[filename] ?? filename

  // JS goes through the route handler so we can transform bundler-style CSS
  // imports (`import './style.css'`) that browsers can't resolve natively.
  if (/\.m?js$/i.test(remapped)) {
    return NextResponse.rewrite(
      new URL(`/api/bolt-asset/${tool}/${task}/${remapped}`, req.url),
    )
  }

  return NextResponse.rewrite(
    new URL(`/${tool}/${task}/${remapped}`, req.url),
  )
}

export const config = {
  // Skip Next internals and API routes. Everything else passes through the
  // function above, which filters by pathname + referer.
  matcher: "/((?!_next/|api/).*)",
}
