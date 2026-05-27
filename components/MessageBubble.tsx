'use client'

import { Message } from '@/lib/types'
import { formatMessage } from '@/lib/formatMessage'

interface MessageBubbleProps {
  message: Message
  isLatest?: boolean
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function MessageBubble({ message, isLatest }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const formattedContent = isUser ? message.content : formatMessage(message.content)

  if (isUser) {
    return (
      <div className="message-enter flex justify-end px-3 md:px-4">
        <div className="flex flex-col items-end gap-1 max-w-[85%] md:max-w-[70%]">
          <div className="relative px-4 py-3 rounded-2xl rounded-tr-sm bg-gradient-to-br from-concrete-cyan/20 to-concrete-cyan/10 border border-concrete-cyan/30 text-concrete-text text-sm leading-relaxed">
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-concrete-cyan/60 rounded-tr-sm" />
            {message.content}
          </div>
          <span className="text-xs font-mono text-concrete-muted opacity-60 pr-1">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="message-enter flex justify-start px-3 md:px-4">
      <div className="flex gap-3 max-w-[92%] md:max-w-[80%]">
        {/* Bot avatar */}
        <div className="flex-shrink-0 mt-0.5">
          <div className="relative w-8 h-8">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <polygon
                points="16,1 29,8.5 29,23.5 16,31 3,23.5 3,8.5"
                stroke="#00D4FF"
                strokeWidth="1"
                fill="rgba(0,212,255,0.08)"
              />
              <circle cx="12" cy="14" r="1.5" fill="#00D4FF" opacity="0.9" />
              <circle cx="20" cy="14" r="1.5" fill="#00D4FF" opacity="0.9" />
              <path d="M12 20 Q16 23 20 20" stroke="#00D4FF" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.7" />
            </svg>
            <div className="absolute inset-0 bg-concrete-cyan opacity-10 blur-sm rounded-full" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {/* Label */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-concrete-cyan tracking-widest uppercase">CORE</span>
            <span className="text-xs font-mono text-concrete-muted opacity-50">AI</span>
          </div>

          {/* Bubble */}
          <div className="relative px-4 py-3 rounded-2xl rounded-tl-sm bg-concrete-card border border-concrete-border text-concrete-text text-sm leading-relaxed">
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-concrete-cyan/30 rounded-tl-sm" />

            <div
              className={`ai-message-content ${isLatest ? '' : ''}`}
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          </div>

          <span className="text-xs font-mono text-concrete-muted opacity-60 pl-1">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  )
}
