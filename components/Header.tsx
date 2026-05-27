'use client'

import { useState, useEffect } from 'react'

export default function Header() {
  const [time, setTime] = useState('')
  const [block, setBlock] = useState(21847392)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toUTCString().slice(17, 25) + ' UTC')
    }
    tick()
    const interval = setInterval(tick, 1000)
    // Simulate block counter
    const blockInterval = setInterval(() => {
      setBlock(b => b + 1)
    }, 12000)
    return () => { clearInterval(interval); clearInterval(blockInterval) }
  }, [])

  return (
    <header className="relative flex-shrink-0 border-b border-concrete-border bg-concrete-surface/80 backdrop-blur-md z-10">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-concrete-cyan to-transparent opacity-60" />
      
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Logo & Identity */}
        <div className="flex items-center gap-3">
          {/* Hex logo */}
          <div className="relative w-9 h-9 flex-shrink-0">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <polygon
                points="18,2 32,10 32,26 18,34 4,26 4,10"
                stroke="#00D4FF"
                strokeWidth="1.5"
                fill="rgba(0,212,255,0.06)"
              />
              <polygon
                points="18,8 27,13 27,23 18,28 9,23 9,13"
                stroke="#00D4FF"
                strokeWidth="0.5"
                fill="rgba(0,212,255,0.04)"
                opacity="0.6"
              />
              <text x="18" y="22" textAnchor="middle" fill="#00D4FF" fontSize="11" fontFamily="monospace" fontWeight="700">C</text>
            </svg>
            <div className="absolute inset-0 rounded-full bg-concrete-cyan opacity-10 blur-md animate-pulse-slow" />
          </div>

          {/* Title */}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-sm md:text-base font-700 tracking-widest text-concrete-cyan uppercase">
                CONCRETE
              </h1>
              <span className="hidden sm:inline text-concrete-muted text-xs font-mono">
                //
              </span>
              <span className="hidden sm:inline text-concrete-text-dim text-xs font-mono tracking-wider">
                COMMUNITY_AI
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-concrete-teal animate-pulse-slow" />
              <span className="text-xs font-mono text-concrete-teal tracking-wider">ONLINE</span>
              <span className="text-xs font-mono text-concrete-muted hidden md:inline">v2.4.1</span>
            </div>
          </div>
        </div>

        {/* Status indicators */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Block number */}
          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs font-mono text-concrete-muted tracking-wider">BLOCK</span>
            <span className="text-xs font-mono text-concrete-cyan">#{block.toLocaleString()}</span>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-6 bg-concrete-border" />

          {/* Time */}
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-mono text-concrete-muted tracking-wider">TIME</span>
            <span className="text-xs font-mono text-concrete-text">{time}</span>
          </div>

          {/* Status badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-concrete-border-bright bg-concrete-card">
            <div className="w-1.5 h-1.5 rounded-full bg-concrete-teal shadow-teal-glow animate-pulse-slow" />
            <span className="text-xs font-mono text-concrete-text-dim tracking-wider">BASE</span>
          </div>
        </div>
      </div>

      {/* Scan line animation */}
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-concrete-cyan to-transparent opacity-20 pointer-events-none"
        style={{ animation: 'scanLine 6s linear infinite', top: 0 }}
      />
    </header>
  )
}
