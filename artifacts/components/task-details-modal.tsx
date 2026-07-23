"use client"

import type { Task } from "@/lib/projects-data"
import { X } from "lucide-react"

interface TaskDetailsModalProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
}

export default function TaskDetailsModal({ task, isOpen, onClose }: TaskDetailsModalProps) {
  if (!isOpen || !task) return null


   const uxAllowed = [
    "task1.6","task1.7","task1.8",
    "task2.6","task2.7","task2.8",
    "task3.6","task3.7","task3.8"
  ]
  const baseId = String(task.id).split("-").pop() ?? String(task.id)
  const showUX = uxAllowed.includes(baseId)
  

  return (
   <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose} // close when clicking outside the modal
    >
      <div
        onClick={(e) => e.stopPropagation()} // prevent outside click from closing when interacting with modal
        className="bg-background border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border sticky top-0 bg-background">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground">{task.title}</h2>
          </div>
          <button onClick={onClose} className="ml-4 p-1 hover:bg-muted rounded transition-colors">
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Tech Stack */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {task.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-muted text-foreground text-sm rounded">
                  #{tag}
                </span>
              ))} 
            </div>
            {showUX && task.uxprinciple && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-foreground mb-1">UX Principle</h3>
                <p className="text-muted-foreground mt-1">{task.uxprinciple}</p>
              </div>
            )}
          </div>

          {/* Prompt */}
          {task.prompt && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Task Prompt</h3>
              <p className="text-foreground text-sm leading-relaxed bg-muted p-4 rounded">{task.prompt}</p>
            </div>
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
