'use client'

import { QUICK_PROMPTS } from '@/lib/types'

interface QuickPromptsProps {
  onSelect: (prompt: string) => void
}

export default function QuickPrompts({ onSelect }: QuickPromptsProps) {
  return (
    <div className="px-3 md:px-4 py-3">
      {/* Welcome text */}
      <div className="text-center mb-5 mt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-concrete-border-bright bg-concrete-card mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-concrete-teal animate-pulse-slow" />
          <span className="text-xs font-mono text-concrete-teal tracking-widest uppercase">System Online</span>
        </div>
        <h2 className="font-display text-lg md:text-2xl font-600 text-concrete-text mb-2 tracking-wider">
          CONCRETE ASSISTANT
        </h2>
        <p className="text-sm text-concrete-text-dim max-w-md mx-auto leading-relaxed">
          Your on-chain community guide. Ask me about roles, XP, your bag, nominations, or anything about the Concrete ecosystem.
        </p>
      </div>

      {/* Quick prompt grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-2xl mx-auto">
        {QUICK_PROMPTS.map((qp) => (
          <button
            key={qp.label}
            onClick={() => onSelect(qp.prompt)}
            className="group relative flex items-center gap-2 px-3 py-2.5 rounded-xl border border-concrete-border bg-concrete-card hover:border-concrete-cyan/40 hover:bg-concrete-card/80 transition-all duration-200 text-left overflow-hidden"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-concrete-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

            <span className="text-concrete-cyan text-base flex-shrink-0" style={{ fontFamily: 'monospace' }}>
              {qp.icon}
            </span>
            <span className="text-xs font-mono text-concrete-text-dim group-hover:text-concrete-text transition-colors tracking-wide uppercase">
              {qp.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
