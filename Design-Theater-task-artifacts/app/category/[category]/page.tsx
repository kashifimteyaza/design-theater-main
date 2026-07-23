"use client"

import Link from "next/link"
import { useState, useEffect, use } from "react"
import { categories, tasks } from "@/lib/projects-data"
import TaskCard from "@/components/task-card"
import TaskDetailsModal from "@/components/task-details-modal"
import OutputModal from "@/components/output-modal"
import { ThemeToggle } from "@/components/theme-toggle"
// import Home from "@/app/page"
import { ArrowLeftIcon, Home} from "lucide-react"

const TIER_ORDER = { tier1: 1, tier2: 2, tier3: 3 }
const TIER_LABELS = { tier1: "Tier 1: Structural Claims Verification", tier2: "Tier 2: Styling Claims Verification", tier3: "Tier 3: Functional/Interactive Claims Verification" }

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  // Unwrap the params promise using React.use()
  const { category } = use(params)

  const [selectedTask, setSelectedTask] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [outputTask, setOutputTask] = useState(null)
  const [isOutputModalOpen, setIsOutputModalOpen] = useState(false)
  const [showFirebasePopup, setShowFirebasePopup] = useState(false)

  // Show popup for firebase category
  useEffect(() => {
    if (category === "firebase") {
      setShowFirebasePopup(true)
      const timer = setTimeout(() => {
        setShowFirebasePopup(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [category])

  const categoryData = categories.find((c) => c.id === category)
  const categoryTasks = tasks.filter((t) => t.category === category)

  const groupedByTier = categoryTasks.reduce((acc, task) => {
    if (!acc[task.tier as keyof typeof acc]) acc[task.tier as keyof typeof acc] = []
    acc[task.tier as keyof typeof acc].push(task)
    return acc
  }, {} as Record<string, typeof categoryTasks>)

  const sortedTiers = Object.keys(groupedByTier).sort((a, b) => TIER_ORDER[a] - TIER_ORDER[b])

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Category not found</h1>
          <Link href="/" className="text-primary hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      {/* Firebase Popup */}
      {showFirebasePopup && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg font-medium">
            Blueprint is thought process
          </div>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/"
              title="Home"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
            >
              <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5"/> Back
            </Link>
            <ThemeToggle />
          </div>
          <div className={`inline-block w-4 h-4 rounded-full ${categoryData.color} mb-4`} />
          <h1 className="text-4xl font-bold text-foreground mb-2">{categoryData.name} Projects</h1>
          <p className="text-muted-foreground">
            {categoryTasks.length} tasks across {sortedTiers.length} tiers
          </p>
        </div>
      </div>

      {/* Tiers Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {sortedTiers.map((tier) => (
          <div key={tier} className="mb-16">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <span
                  className={`w-3 h-3 rounded-full ${tier === "tier1" ? "bg-green-500" : tier === "tier2" ? "bg-blue-500" : "bg-purple-500"}`}
                />
                {TIER_LABELS[tier]}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">{groupedByTier[tier].length} tasks</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {groupedByTier[tier].map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onAboutClick={() => {
                    setSelectedTask(task)
                    setIsModalOpen(true)
                  }}
                  onOutputClick={() => {
                    setOutputTask(task)
                    setIsOutputModalOpen(true)
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <TaskDetailsModal task={selectedTask} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <OutputModal task={outputTask} isOpen={isOutputModalOpen} onClose={() => setIsOutputModalOpen(false)} />
    </main>
  )
}