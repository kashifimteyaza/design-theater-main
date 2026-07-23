"use client"

import { useState, useEffect, useCallback } from "react"
import { Cloud, CloudOff, Save, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

// Google Sheets Script URL from environment variable
const SHEETS_SCRIPT_URL = process.env.NEXT_PUBLIC_SHEETS_SCRIPT_URL || ""

interface EvaluationData {
  timestamp: string
  taskId: string
  toolModel: string
  sessionId: string
  evaluatorName: string
  q1Score: number
  q1Note: string
  q2Score: number
  q2Note: string
  q3Score: number
  q3Note: string
  q4Score: number
  q4Note: string
  q5Score: number
  overallObservation: string
}

interface EvaluationPanelProps {
  taskId: string
  toolModel?: string
  isOpen: boolean
  onClose: () => void
}

const QUESTIONS = [
  {
    id: "q1",
    section: "A. Structural Similarity (Code)",
    title: "1. HTML Structure Similarity",
    question: "Are the underlying DOM / AST shapes similar across tools for this task?",
    hint: "Focus on nesting, depth, and hierarchy. Ignore text and styling.",
    options: [
      { value: 0, label: "0 – Clearly different structures" },
      { value: 1, label: "1 – Some structural overlap" },
      { value: 2, label: "2 – Very similar structure" }
    ],
    hasNote: true,
    noteLabel: "Optional note"
  },
  {
    id: "q2",
    section: "A. Structural Similarity (Code)",
    title: "2. Structural Design Patterns",
    question: "Do tools follow the same high-level section ordering and reuse the same component patterns?",
    hint: "Check macro layouts (e.g., hero → features → CTA) and micro patterns (e.g., card grids, pricing tables, testimonial blocks).",
    options: [
      { value: 0, label: "0 – Different ordering and components" },
      { value: 1, label: "1 – Partial overlap in either ordering or components" },
      { value: 2, label: "2 – Same ordering and same components reused" }
    ],
    hasNote: true,
    noteLabel: "Observed sequence / examples (optional)"
  },
  {
    id: "q3",
    section: "B. Styling Convergence (CSS)",
    title: "3. CSS Properties",
    question: "Do tools default to similar styling values?",
    hint: "Look at fonts, colors, spacing units, border-radius.",
    options: [
      { value: 0, label: "0 – High variation" },
      { value: 1, label: "1 – Some shared defaults" },
      { value: 2, label: "2 – Strong convergence" }
    ],
    hasNote: true,
    noteLabel: "Common defaults observed (optional)"
  },
  {
    id: "q4",
    section: "C. Code Conventions",
    title: "4. Class and Code Idioms",
    question: "Do tools rely on the same class names, layout patterns, or styling conventions?",
    hint: "Examples: container, card, flex + gap patterns, shared naming styles.",
    options: [
      { value: 0, label: "0 – Different idioms" },
      { value: 1, label: "1 – Partial overlap" },
      { value: 2, label: "2 – Strong overlap" }
    ],
    hasNote: true,
    noteLabel: "Notes"
  },
  {
    id: "q5",
    section: "D. Visual Confirmation",
    title: "5. Rendered Output Similarity",
    question: "Does code-level similarity result in visually similar UIs?",
    hint: "Consider layout, balance, and overall feel. Ignore content.",
    options: [
      { value: 0, label: "0 – Visually distinct" },
      { value: 1, label: "1 – Some similarity" },
      { value: 2, label: "2 – Visually very similar" }
    ],
    hasNote: false
  }
]

function generateSessionId(): string {
  return `eval_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export default function EvaluationPanel({ taskId, toolModel = "", isOpen, onClose }: EvaluationPanelProps) {
  const [sessionId] = useState(() => generateSessionId())
  const [evaluatorName, setEvaluatorName] = useState(() => {
    // Try to get saved evaluator name from localStorage
    if (typeof window !== 'undefined') {
      return localStorage.getItem('evaluator_name') || ""
    }
    return ""
  })
  const [scores, setScores] = useState<Record<string, number>>({
    q1: 0, q2: 0, q3: 0, q4: 0, q5: 0
  })
  const [notes, setNotes] = useState<Record<string, string>>({
    q1: "", q2: "", q3: "", q4: ""
  })
  const [overallObservation, setOverallObservation] = useState("")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showExitWarning, setShowExitWarning] = useState(false)
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle")
  const [syncError, setSyncError] = useState<string | null>(null)

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`homogenization_eval_${taskId}`)
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setScores({
          q1: data.q1Score || 0,
          q2: data.q2Score || 0,
          q3: data.q3Score || 0,
          q4: data.q4Score || 0,
          q5: data.q5Score || 0
        })
        setNotes({
          q1: data.q1Note || "",
          q2: data.q2Note || "",
          q3: data.q3Note || "",
          q4: data.q4Note || ""
        })
        setOverallObservation(data.overallObservation || "")
      } catch (e) {
        console.error("Failed to load saved evaluation", e)
      }
    }
  }, [taskId])

  // Save evaluator name globally
  const handleEvaluatorNameChange = (name: string) => {
    setEvaluatorName(name)
    localStorage.setItem('evaluator_name', name)
    setHasUnsavedChanges(true)
  }

  // Auto-save to localStorage
  const saveToLocalStorage = useCallback(() => {
    const data: EvaluationData = {
      timestamp: new Date().toISOString(),
      taskId,
      toolModel,
      sessionId,
      evaluatorName,
      q1Score: scores.q1,
      q1Note: notes.q1,
      q2Score: scores.q2,
      q2Note: notes.q2,
      q3Score: scores.q3,
      q3Note: notes.q3,
      q4Score: scores.q4,
      q4Note: notes.q4,
      q5Score: scores.q5,
      overallObservation
    }
    localStorage.setItem(`homogenization_eval_${taskId}`, JSON.stringify(data))
    setHasUnsavedChanges(false)
  }, [taskId, toolModel, sessionId, evaluatorName, scores, notes, overallObservation])

  useEffect(() => {
    if (hasUnsavedChanges) {
      const timeout = setTimeout(saveToLocalStorage, 1000)
      return () => clearTimeout(timeout)
    }
  }, [hasUnsavedChanges, saveToLocalStorage])

  // Warn on exit if unsaved
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ""
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [hasUnsavedChanges])

  const handleScoreChange = (key: string, value: number) => {
    setScores(prev => ({ ...prev, [key]: value }))
    setHasUnsavedChanges(true)
  }

  const handleNoteChange = (key: string, value: string) => {
    setNotes(prev => ({ ...prev, [key]: value }))
    setHasUnsavedChanges(true)
  }

  const handleObservationChange = (value: string) => {
    setOverallObservation(value)
    setHasUnsavedChanges(true)
  }

  // Sync to Google Sheets
  const syncToSheets = async () => {
    if (!SHEETS_SCRIPT_URL) {
      setSyncError("NEXT_PUBLIC_SHEETS_SCRIPT_URL not configured in .env.local")
      setSyncStatus("error")
      return
    }

    setSyncStatus("syncing")
    setSyncError(null)
    saveToLocalStorage()

    const data: EvaluationData = {
      timestamp: new Date().toISOString(),
      taskId,
      toolModel,
      sessionId,
      evaluatorName,
      q1Score: scores.q1,
      q1Note: notes.q1,
      q2Score: scores.q2,
      q2Note: notes.q2,
      q3Score: scores.q3,
      q3Note: notes.q3,
      q4Score: scores.q4,
      q4Note: notes.q4,
      q5Score: scores.q5,
      overallObservation
    }

    try {
      const response = await fetch(SHEETS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Google Apps Script requires this
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      // With no-cors, we can't read the response, so assume success if no error thrown
      setSyncStatus("success")
      setTimeout(() => setSyncStatus("idle"), 3000)
    } catch (error) {
      console.error("Sync failed:", error)
      setSyncError(error instanceof Error ? error.message : "Sync failed")
      setSyncStatus("error")
    }
  }

  const handleClose = () => {
    if (hasUnsavedChanges) {
      setShowExitWarning(true)
    } else {
      onClose()
    }
  }

  if (!isOpen) return null

  // Group questions by section
  const sections = QUESTIONS.reduce((acc, q) => {
    if (!acc[q.section]) acc[q.section] = []
    acc[q.section].push(q)
    return acc
  }, {} as Record<string, typeof QUESTIONS>)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={handleClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-900 border border-zinc-700 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-700 p-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-bold text-white">Code-Level Homogenization Review</h2>
            <div className="flex gap-4 text-sm text-zinc-400 mt-1">
              <span>Task: {taskId}</span>
              {toolModel && <span>Tool: {toolModel}</span>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right mr-2">
              <div className="text-3xl font-bold text-primary">{totalScore}</div>
              <div className="text-xs text-zinc-400">/ 10</div>
            </div>
            <button
              onClick={syncToSheets}
              disabled={syncStatus === "syncing"}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors ${
                syncStatus === "success"
                  ? "bg-green-600 text-white"
                  : syncStatus === "error"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {syncStatus === "syncing" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Syncing...
                </>
              ) : syncStatus === "success" ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Synced!
                </>
              ) : syncStatus === "error" ? (
                <>
                  <CloudOff className="w-4 h-4" />
                  Retry Sync
                </>
              ) : (
                <>
                  <Cloud className="w-4 h-4" />
                  Sync to Sheets
                </>
              )}
            </button>
            <button
              onClick={handleClose}
              className="px-3 py-2 bg-zinc-700 hover:bg-red-900 text-white rounded text-sm font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        {/* Sync error message */}
        {syncError && (
          <div className="mx-4 mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm">
            {syncError}
          </div>
        )}

        {/* Context Fields */}
        <div className="p-4 border-b border-zinc-800">
          {/* Evaluator Name - Editable */}
          <div className="mb-3">
            <label className="text-zinc-500 text-xs mb-1 block">Evaluator Name</label>
            <input
              type="text"
              value={evaluatorName}
              onChange={(e) => handleEvaluatorNameChange(e.target.value)}
              placeholder="Enter your name..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="bg-zinc-800 rounded p-2">
              <div className="text-zinc-500 text-xs mb-1">Task / Prompt ID</div>
              <div className="text-white font-mono text-xs truncate">{taskId}</div>
            </div>
            <div className="bg-zinc-800 rounded p-2">
              <div className="text-zinc-500 text-xs mb-1">Tool / Model</div>
              <div className="text-white font-mono text-xs">{toolModel || "—"}</div>
            </div>
            <div className="bg-zinc-800 rounded p-2">
              <div className="text-zinc-500 text-xs mb-1">Session ID</div>
              <div className="text-white font-mono text-xs truncate">{sessionId.slice(0, 16)}...</div>
            </div>
            <div className="bg-zinc-800 rounded p-2">
              <div className="text-zinc-500 text-xs mb-1">Timestamp</div>
              <div className="text-white font-mono text-xs">{new Date().toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {Object.entries(sections).map(([section, questions]) => (
            <div key={section} className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide border-b border-zinc-700 pb-2">
                {section}
              </h3>

              {questions.map((q) => (
                <div key={q.id} className="bg-zinc-800 rounded-lg p-4">
                  <div className="mb-3">
                    <h4 className="font-medium text-white">{q.title}</h4>
                    <p className="text-sm text-zinc-300 mt-1">{q.question}</p>
                    <p className="text-xs text-zinc-500 mt-1 italic">{q.hint}</p>
                  </div>

                  {/* Score buttons */}
                  <div className="space-y-2 mb-3">
                    {q.options.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${
                          scores[q.id] === option.value
                            ? "bg-primary/20 border border-primary"
                            : "bg-zinc-700/50 hover:bg-zinc-700"
                        }`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          checked={scores[q.id] === option.value}
                          onChange={() => handleScoreChange(q.id, option.value)}
                          className="w-4 h-4 text-primary focus:ring-primary"
                        />
                        <span className={`text-sm ${scores[q.id] === option.value ? "text-white" : "text-zinc-300"}`}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Optional note */}
                  {q.hasNote && (
                    <div>
                      <label className="text-xs text-zinc-500">{q.noteLabel}</label>
                      <input
                        type="text"
                        value={notes[q.id] || ""}
                        onChange={(e) => handleNoteChange(q.id, e.target.value)}
                        placeholder="Add a note..."
                        className="w-full mt-1 bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Summary Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide border-b border-zinc-700 pb-2">
              Summary
            </h3>

            <div className="bg-zinc-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-zinc-300">Total Homogenization Score</span>
                <div className="text-2xl font-bold text-green-400">{totalScore}/10</div>
              </div>

              <div>
                <label className="text-sm font-medium text-white">Overall Observation (required)</label>
                <textarea
                  value={overallObservation}
                  onChange={(e) => handleObservationChange(e.target.value)}
                  placeholder="Summarize key patterns, convergence points, or notable differences..."
                  className="w-full mt-2 bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-white text-sm placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-primary resize-none h-24"
                />
              </div>
            </div>
          </div>

          {/* Auto-save indicator */}
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Save className="w-3 h-3" />
            {hasUnsavedChanges ? "Saving locally..." : "Auto-saved locally"}
          </div>
        </div>

        {/* Exit Warning Modal */}
        {showExitWarning && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
            <div className="bg-zinc-800 border border-zinc-600 rounded-lg p-6 max-w-sm mx-4">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-amber-500" />
                <h3 className="font-semibold text-white">Unsaved Changes</h3>
              </div>
              <p className="text-sm text-zinc-300 mb-4">
                You have unsaved changes. Sync to Google Sheets before leaving?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={async () => {
                    await syncToSheets()
                    setShowExitWarning(false)
                    onClose()
                  }}
                  className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium"
                >
                  Sync & Close
                </button>
                <button
                  onClick={() => {
                    setShowExitWarning(false)
                    onClose()
                  }}
                  className="flex-1 px-3 py-2 bg-zinc-600 hover:bg-zinc-500 text-white rounded text-sm font-medium"
                >
                  Discard
                </button>
                <button
                  onClick={() => setShowExitWarning(false)}
                  className="px-3 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
