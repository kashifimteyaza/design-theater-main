"use client"

import { useEffect, useState } from "react"

export default function DesignLoader() {
  const [curtainOpen, setCurtainOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurtainOpen(prev => !prev)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Theatre Curtain Animation */}
      <div className="relative w-48 h-32">
        {/* Stage Frame */}
        <div className="absolute inset-0 border-4 border-amber-500/30 rounded-t-lg overflow-hidden bg-zinc-900">
          {/* Spotlight glow */}
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              background: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.15) 0%, transparent 70%)'
            }}
          />

          {/* Stage Content Preview - Design wireframe (behind curtains) */}
          <div className="absolute inset-4 flex flex-col gap-1.5">
            {/* Header wireframe */}
            <div className="h-2 bg-zinc-600 rounded animate-pulse" style={{ width: '60%' }} />
            {/* Content wireframes */}
            <div className="flex gap-1.5 flex-1">
              <div className="flex-1 bg-zinc-700/50 rounded animate-pulse" style={{ animationDelay: '0.1s' }} />
              <div className="flex-1 bg-zinc-700/50 rounded animate-pulse" style={{ animationDelay: '0.2s' }} />
            </div>
            <div className="h-1.5 bg-zinc-600/70 rounded animate-pulse w-3/4" style={{ animationDelay: '0.3s' }} />
          </div>

          {/* Left Curtain */}
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-800 to-red-700 origin-left transition-transform duration-1000 ease-in-out"
            style={{
              width: '50%',
              boxShadow: 'inset -10px 0 20px rgba(0,0,0,0.3)',
              transform: curtainOpen ? 'scaleX(0.2)' : 'scaleX(1)',
            }}
          >
            {/* Curtain folds */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-950 to-transparent"
                  style={{ left: `${(i + 1) * 18}%` }}
                />
              ))}
            </div>
          </div>

          {/* Right Curtain */}
          <div
            className="absolute top-0 right-0 h-full bg-gradient-to-l from-red-800 to-red-700 origin-right transition-transform duration-1000 ease-in-out"
            style={{
              width: '50%',
              boxShadow: 'inset 10px 0 20px rgba(0,0,0,0.3)',
              transform: curtainOpen ? 'scaleX(0.2)' : 'scaleX(1)',
            }}
          >
            {/* Curtain folds */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-950 to-transparent"
                  style={{ right: `${(i + 1) * 18}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Top Valance */}
        <div className="absolute -top-1 left-0 right-0 h-3 bg-gradient-to-b from-red-900 to-red-800 rounded-t-lg z-10">
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500/40" />
        </div>

        {/* Spotlight Beams */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="w-1.5 h-4 bg-amber-400/60 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Loading Text */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-medium text-zinc-400">Setting the stage</p>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
