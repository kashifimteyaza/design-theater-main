export function extractThoughtContents(html: string): Record<string, string> {
  const contents: Record<string, string> = {}

  // Parse the known thought/output block format directly from text so embedded tags
  // inside content (e.g. <title>) do not break extraction.
  const blockRegex = /<div\s+id="([^"]+)"\s+class="(?:thought-content|output-content)"\s*>([\s\S]*?)<\/div>/g

  for (const match of html.matchAll(blockRegex)) {
    const id = match[1]
    const content = match[2]
    contents[id] = content
  }

  return contents
}
