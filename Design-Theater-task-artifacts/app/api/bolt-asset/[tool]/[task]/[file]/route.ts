import { NextResponse } from "next/server"
import fs from "node:fs/promises"
import path from "node:path"

// Must match middleware.ts. See that file for rationale.
const FILENAME_REMAP: Record<string, Record<string, string>> = {
  "task1.3": { "main.js": "script.js", "style.css": "styles.css" },
  "task1.6": { "main.js": "script.js", "style.css": "styles.css" },
  "task1.7": { "main.js": "script.js" },
  "task2.1": { "main.js": "script.js" },
}

const MIME: Record<string, string> = {
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
}

const SAFE_NAME = /^[\w.-]+$/

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ tool: string; task: string; file: string }> },
) {
  const { tool, task, file } = await params

  if (!SAFE_NAME.test(tool) || !SAFE_NAME.test(task) || !SAFE_NAME.test(file)) {
    return new NextResponse("Bad request", { status: 400 })
  }

  const resolvedFile = FILENAME_REMAP[task]?.[file] ?? file
  const filePath = path.join(
    process.cwd(),
    "public",
    tool,
    task,
    resolvedFile,
  )

  let content: Buffer
  try {
    content = await fs.readFile(filePath)
  } catch {
    return new NextResponse("Not found", { status: 404 })
  }

  const ext = path.extname(resolvedFile).toLowerCase()
  const mime = MIME[ext] ?? "application/octet-stream"

  if (ext === ".js" || ext === ".mjs") {
    const transformed = await transformJs(
      content.toString("utf8"),
      tool,
      task,
    )
    return new NextResponse(transformed, {
      headers: { "Content-Type": mime },
    })
  }

  return new NextResponse(new Uint8Array(content), {
    headers: { "Content-Type": mime },
  })
}

// Strips bundler-style `import './foo.css'` lines (browsers can't resolve
// those) and replaces them with a runtime <link> injection pointing at the
// correct task-scoped path. Also auto-injects any sibling CSS file in the
// task folder that isn't already covered, so tasks whose HTML has no <link>
// and whose JS doesn't import the CSS still get styled.
async function transformJs(
  src: string,
  tool: string,
  task: string,
): Promise<string> {
  const cssImportRe = /^[ \t]*import\s+['"](\.?\/?[\w./-]+\.css)['"]\s*;?[ \t]*\r?\n/gm
  const injectedHrefs = new Set<string>()
  const injections: string[] = []

  const addInjection = (href: string) => {
    if (injectedHrefs.has(href)) return
    injectedHrefs.add(href)
    injections.push(
      `(function(){var id='__bolt_css_'+${JSON.stringify(href)};` +
        `if(document.getElementById(id))return;` +
        `var l=document.createElement('link');l.id=id;l.rel='stylesheet';` +
        `l.href=${JSON.stringify(href)};document.head.appendChild(l);})();`,
    )
  }

  const stripped = src.replace(cssImportRe, (_, spec: string) => {
    const base = spec.replace(/^\.?\//, "").split("/").pop() ?? spec
    const resolved = FILENAME_REMAP[task]?.[base] ?? base
    addInjection(`/${tool}/${task}/${resolved}`)
    return ""
  })

  try {
    const taskDir = path.join(process.cwd(), "public", tool, task)
    const entries = await fs.readdir(taskDir)
    for (const entry of entries) {
      if (entry.toLowerCase().endsWith(".css")) {
        addInjection(`/${tool}/${task}/${entry}`)
      }
    }
  } catch {
    // task folder unreadable — nothing extra to inject
  }

  if (injections.length === 0) return src
  return injections.join("\n") + "\n" + stripped
}
