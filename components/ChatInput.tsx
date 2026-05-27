'use client'

import { useState, useRef, KeyboardEvent } from 'react'

interface ChatInputProps {
  onSend: (message: string) => void
  isLoading: boolean
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed || isLoading) return
    onSend(trimmed)
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInput = () => {
    const ta = textareaRef.current
    if (ta) {
      ta.style.height = 'auto'
      ta.style.height = Math.min(ta.scrollHeight, 120) + 'px'
    }
  }

  const canSend = value.trim().length > 0 && !isLoading

  return (
    <div className="flex-shrink-0 border-t border-concrete-border bg-concrete-surface/90 backdrop-blur-md px-3 md:px-4 py-3">
      {/* Input area */}
      <div className="relative max-w-4xl mx-auto">
        <div className={`relative flex items-end gap-2 p-1 rounded-2xl border transition-all duration-200 ${
          canSend
            ? 'border-concrete-cyan/50 bg-concrete-card shadow-cyan-glow'
            : 'border-concrete-border bg-concrete-card'
        }`}>
          
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-concrete-cyan/40 rounded-tl-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-concrete-cyan/40 rounded-br-2xl pointer-events-none" />

          {/* Prefix indicator */}
          <div className="flex-shrink-0 flex items-center pl-3 pb-2.5">
            <span className="font-mono text-concrete-cyan text-sm opacity-50">›</span>
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask about roles, XP, bags, nominations..."
            rows={1}
            disabled={isLoading}
            className="flex-1 bg-transparent resize-none outline-none text-concrete-text placeholder-concrete-muted text-sm leading-relaxed py-2.5 pr-1 font-body max-h-[120px] disabled:opacity-50"
            style={{ minHeight: '40px' }}
          />

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!canSend}
            className={`flex-shrink-0 flex items-center justify-center w-9 h-9 mb-1 mr-1 rounded-xl transition-all duration-200 ${
              canSend
                ? 'bg-concrete-cyan text-concrete-bg hover:bg-concrete-cyan/80 shadow-cyan-glow'
                : 'bg-concrete-border text-concrete-muted cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
              </svg>
            )}
          </button>
        </div>

        {/* Bottom hint */}
        <div className="flex items-center justify-between mt-2 px-1">
          <span className="text-xs font-mono text-concrete-muted opacity-50">
            ↵ send  ⇧↵ newline
          </span>
          <span className="text-xs font-mono text-concrete-muted opacity-40">
            CONCRETE_AI // BASE_CHAIN
          </span>
        </div>
      </div>
    </div>
  )
}
