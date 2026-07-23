"use client"

import Link from "next/link"
import type { Task } from "@/lib/projects-data"
import { getCategoryById } from "@/lib/projects-data"
import { Cpu } from "lucide-react"

interface TaskCardProps {
  task: Task
  onAboutClick: () => void
  onOutputClick: () => void
}

export default function TaskCard({ task, onAboutClick, onOutputClick }: TaskCardProps) {
  const category = getCategoryById(task.category)
  const hasOutput = task.thoughtProcess1 || task.thoughtProcess2 || task.output

  return (
    <div className="rounded-lg border border-border hover:border-primary hover:shadow-lg transition-all h-full p-4 bg-card">
      <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2">{task.title}</h3>

      {/* Model Name Badge */}
      {category?.modelName && (
        <div className="mb-3">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500/10 text-purple-500 text-xs rounded font-medium">
            <Cpu className="w-3 h-3" />
            {category.modelName}
          </span>
        </div>
      )}

      {/* Tech Stack */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {task.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded font-medium">
              {tech}
            </span>
          ))}
          {task.techStack.length && (
            <span className="text-xs text-muted-foreground"></span>
          )}
        </div>
      </div>

      {/* Tags */}
      {/* <div className="mb-4 flex flex-wrap gap-1">
        {task.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="text-xs text-muted-foreground bg-muted rounded px-2 py-1">
            #{tag}
          </span>
        ))}
      </div> */}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onAboutClick}
          className="flex-1 px-3 py-2 rounded text-sm font-medium bg-muted text-foreground hover:bg-border transition-colors"
        >
          About
        </button>
        <button
          onClick={onOutputClick}
          disabled={!hasOutput}
          className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
            hasOutput
              ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
              : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
          }`}
        >
          Output
        </button>
        <Link
          href={`/preview/${task.id}`}
          className="flex-1 px-3 py-2 rounded text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-center"
        >
          Preview
        </Link>
      </div>
    </div>
  )
}
