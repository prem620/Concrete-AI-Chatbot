'use client'

export default function TypingIndicator() {
  return (
    <div className="flex justify-start px-3 md:px-4 message-enter">
      <div className="flex gap-3">
        {/* Bot avatar */}
        <div className="flex-shrink-0 mt-0.5">
          <div className="relative w-8 h-8">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <polygon
                points="16,1 29,8.5 29,23.5 16,31 3,23.5 3,8.5"
                stroke="#00D4FF"
                strokeWidth="1"
                fill="rgba(0,212,255,0.08)"
                style={{ animation: 'glowPulse 1.5s ease-in-out infinite' }}
              />
              <circle cx="12" cy="14" r="1.5" fill="#00D4FF" opacity="0.9" />
              <circle cx="20" cy="14" r="1.5" fill="#00D4FF" opacity="0.9" />
              <path d="M12 20 Q16 23 20 20" stroke="#00D4FF" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.7" />
            </svg>
            <div className="absolute inset-0 bg-concrete-cyan opacity-20 blur-sm rounded-full animate-pulse-slow" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-concrete-cyan tracking-widest uppercase">CORE</span>
            <span className="text-xs font-mono text-concrete-muted opacity-50">PROCESSING</span>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl rounded-tl-sm bg-concrete-card border border-concrete-border min-w-[80px]">
            {/* Animated dots */}
            <div className="flex items-center gap-1.5">
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-concrete-cyan block" />
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-concrete-cyan block" />
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-concrete-cyan block" />
            </div>
            {/* Data stream bars */}
            <div className="flex items-end gap-0.5 h-4">
              {[3, 5, 7, 4, 6, 3, 8].map((h, i) => (
                <div
                  key={i}
                  className="w-0.5 bg-concrete-cyan/40 rounded-full"
                  style={{
                    height: `${h}px`,
                    animation: `blink ${0.8 + i * 0.1}s ease-in-out infinite`,
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
