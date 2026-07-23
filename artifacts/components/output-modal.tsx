"use client"

import { useState, useEffect } from "react"
import type { Task } from "@/lib/projects-data"
import { getCategoryById } from "@/lib/projects-data"
import { extractThoughtContents } from "@/lib/thoughts-content-parser"
import { X, Brain, Lightbulb, FileOutput, Cpu, Loader2, Copy, Check } from "lucide-react"

interface OutputModalProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
}

export default function OutputModal({ task, isOpen, onClose }: OutputModalProps) {
  const [thoughtContents, setThoughtContents] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyContent = async (html: string, key: string) => {
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    await navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  // Fetch thought contents from HTML file based on task category
  useEffect(() => {
    if (!isOpen || !task) return

    // Reset state when modal opens with new task
    setThoughtContents({})
    setIsLoading(true)

    const toolMap: Record<string, string> = {
      'chatgpt': 'chatgpt',
      'claude': 'claude',
      'firebase': 'firebase',
      'bolt': 'bolt',
      'v0': 'v0'
    }

    const toolName = toolMap[task.category] || task.category

    fetch(`/thoughts/${toolName}.html`)
      .then(r => {
        if (!r.ok) throw new Error(`Failed to fetch: ${r.status}`)
        return r.text()
      })
      .then(html => {
        setThoughtContents(extractThoughtContents(html))
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [isOpen, task])

  if (!isOpen || !task) return null

  const category = getCategoryById(task.category)

  // Get content from HTML or show empty if not found
  const thought1Content = task.thoughtProcess1 ? (thoughtContents[task.thoughtProcess1] || '') : ''
  const thought2Content = task.thoughtProcess2 ? (thoughtContents[task.thoughtProcess2] || '') : ''
  const thought3Content = task.thoughtProcess3 ? (thoughtContents[task.thoughtProcess3] || '') : ''
  const outputContent = task.output ? (thoughtContents[task.output] || '') : ''

  const hasThoughtProcess1 = !!thought1Content.trim()
  const hasThoughtProcess2 = !!thought2Content.trim()
  const hasThoughtProcess3 = !!thought3Content.trim()
  const hasOutput = !!outputContent.trim()
  const hasAnyThoughtProcess = hasThoughtProcess1 || hasThoughtProcess2 || hasThoughtProcess3

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-background border border-border rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border sticky top-0 bg-background">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground">{task.title}</h2>
            {category?.modelName && (
              <div className="mt-2">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500/10 text-purple-500 text-sm rounded font-medium">
                  <Cpu className="w-4 h-4" />
                  {category.modelName}
                </span>
              </div>
            )}
          </div>
          <button onClick={onClose} className="ml-4 p-1 hover:bg-muted rounded transition-colors">
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
              <p className="text-muted-foreground text-sm">Loading thought process...</p>
            </div>
          )}

          {/* Content when loaded */}
          {!isLoading && (
            <>
              {/* Thought Process Section */}
              {hasAnyThoughtProcess && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-500" />
                    <h3 className="text-lg font-semibold text-foreground">Thought Process</h3>
                  </div>

                  {/* Thought Process 1 */}
                  {hasThoughtProcess1 && (
                    <div className="border border-border rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-blue-500/10 border-b border-border">
                        <span className="text-xs font-medium text-blue-500">Part 1</span>
                        <button onClick={() => copyContent(thought1Content, 'part1')} className="flex items-center gap-1 px-2 py-0.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors">
                          {copiedKey === 'part1' ? <><Check className="w-3.5 h-3.5 text-green-500" /><span className="text-green-500">Copied!</span></> : <><Copy className="w-3.5 h-3.5" />Copy</>}
                        </button>
                      </div>
                      <div className="p-4">
                        <div
                          className="text-foreground text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: thought1Content }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Thought Process 2 */}
                  {hasThoughtProcess2 && (
                    <div className="border border-border rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-green-500/10 border-b border-border">
                        <span className="text-xs font-medium text-green-500">Part 2</span>
                        <button onClick={() => copyContent(thought2Content, 'part2')} className="flex items-center gap-1 px-2 py-0.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors">
                          {copiedKey === 'part2' ? <><Check className="w-3.5 h-3.5 text-green-500" /><span className="text-green-500">Copied!</span></> : <><Copy className="w-3.5 h-3.5" />Copy</>}
                        </button>
                      </div>
                      <div className="p-4">
                        <div
                          className="text-foreground text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: thought2Content }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Thought Process 3 */}
                  {hasThoughtProcess3 && (
                    <div className="border border-border rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-cyan-500/10 border-b border-border">
                        <span className="text-xs font-medium text-cyan-500">Part 3</span>
                        <button onClick={() => copyContent(thought3Content, 'part3')} className="flex items-center gap-1 px-2 py-0.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors">
                          {copiedKey === 'part3' ? <><Check className="w-3.5 h-3.5 text-green-500" /><span className="text-green-500">Copied!</span></> : <><Copy className="w-3.5 h-3.5" />Copy</>}
                        </button>
                      </div>
                      <div className="p-4">
                        <div
                          className="text-foreground text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: thought3Content }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Output */}
              {hasOutput && (
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 bg-amber-500/10 border-b border-border">
                    <FileOutput className="w-5 h-5 text-amber-500" />
                    <h3 className="text-sm font-semibold text-amber-500">Output/Explanation (in chat)</h3>
                  </div>
                  <div className="p-4">
                    <div
                      className="text-foreground text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: outputContent }}
                    />
                  </div>
                </div>
              )}

              {/* No content message */}
              {!hasAnyThoughtProcess && !hasOutput && (
                <div className="text-center py-8">
                  <FileOutput className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">No output data available for this task.</p>
                </div>
              )}
            </>
          )}

          {/* Footer Action */}
          <div className="pt-6 border-t border-border">
            <a
              href={`/preview/${task.id}`}
              className="w-full inline-block px-4 py-3 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/90 transition-colors text-center"
            >
              Open Preview
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
