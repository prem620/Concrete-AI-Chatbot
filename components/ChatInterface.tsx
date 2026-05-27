'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Message } from '@/lib/types'
import Header from './Header'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import ChatInput from './ChatInput'
import QuickPrompts from './QuickPrompts'

function generateId(): string {
  return Math.random().toString(36).slice(2, 11)
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, scrollToBottom])

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return

    setError(null)

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const allMessages = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content,
      }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: allMessages }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response')
      }

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: data.content,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }, [messages, isLoading])

  const clearHistory = () => {
    setMessages([])
    setError(null)
  }

  const isEmpty = messages.length === 0

  return (
    <div className="flex flex-col h-screen grid-bg hex-overlay">
      {/* Ambient glow effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-concrete-cyan opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-64 h-64 bg-concrete-teal opacity-[0.03] blur-[80px] rounded-full pointer-events-none" />

      {/* Header */}
      <Header />

      {/* Messages area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto"
        style={{ scrollbarGutter: 'stable' }}
      >
        {isEmpty ? (
          <QuickPrompts onSelect={sendMessage} />
        ) : (
          <div className="py-4 space-y-4">
            {messages.map((message, idx) => (
              <MessageBubble
                key={message.id}
                message={message}
                isLatest={idx === messages.length - 1 && message.role === 'assistant'}
              />
            ))}

            {isLoading && <TypingIndicator />}

            {/* Error state */}
            {error && (
              <div className="mx-3 md:mx-4 flex items-start gap-3 p-3 rounded-xl border border-concrete-red/30 bg-concrete-red/5 message-enter">
                <span className="text-concrete-red text-lg flex-shrink-0">⚠</span>
                <div>
                  <p className="text-xs font-mono text-concrete-red uppercase tracking-wider mb-1">Error</p>
                  <p className="text-sm text-concrete-text-dim">{error}</p>
                  {error.includes('API_KEY') && (
                    <p className="text-xs text-concrete-muted mt-1 font-mono">
                      Add GEMINI_API_KEY to .env.local
                    </p>
                  )}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Clear history button — shown when there are messages */}
      {!isEmpty && (
        <div className="flex justify-center py-1 flex-shrink-0">
          <button
            onClick={clearHistory}
            className="text-xs font-mono text-concrete-muted hover:text-concrete-text-dim transition-colors tracking-wider uppercase px-3 py-1 rounded border border-transparent hover:border-concrete-border"
          >
            ✕ Clear History
          </button>
        </div>
      )}

      {/* Input */}
      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  )
}
