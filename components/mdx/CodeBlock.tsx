'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  highlightLines?: number[]
  children?: React.ReactNode
}

export function CodeBlock({ code, language = 'bash', filename, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const rawCode = code || (typeof children === 'string' ? children : '')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  const isCli = ['bash', 'sh', 'zsh', 'shell', 'cmd', 'powershell'].includes(language.toLowerCase()) && !filename

  if (isCli) {
    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          margin: '1.25rem 0',
          background: 'var(--bg-surface)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Copy button */}
        <button
          onClick={handleCopy}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-sm)',
            padding: '4px 10px',
            cursor: 'pointer',
            color: copied ? 'var(--accent-green)' : 'var(--text-muted)',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-sans)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.2s, color 0.15s, border-color 0.15s, background 0.15s',
            zIndex: 10,
          }}
          aria-label="Copy code"
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>

        {/* Code content */}
        <div style={{ overflowX: 'auto' }}>
          {children ? (
            <div className="shiki-wrapper" style={{ padding: '14px 18px' }}>{children}</div>
          ) : (
            <pre
              style={{
                margin: 0,
                padding: '14px 18px',
                fontSize: '0.875rem',
                lineHeight: '1.6',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-secondary)',
                overflow: 'auto',
              }}
            >
              <code>{rawCode}</code>
            </pre>
          )}
        </div>
      </div>
    )
  }

  // Regular Code block with title bar
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-default)',
        overflow: 'hidden',
        margin: '1.5rem 0',
        background: 'var(--bg-surface)',
        position: 'relative',
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-elevated)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Traffic light dots */}
          <div style={{ display: 'flex', gap: '5px' }}>
            {['#ff5f57', '#ffbd2e', '#28c840'].map((c, i) => (
              <div
                key={i}
                style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.7 }}
              />
            ))}
          </div>
          {filename && (
            <span
              style={{
                fontSize: '0.775rem',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {filename}
            </span>
          )}
          {!filename && language && (
            <span
              style={{
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {language}
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: 'none',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-sm)',
            padding: '3px 8px',
            cursor: 'pointer',
            color: copied ? 'var(--accent-green)' : 'var(--text-muted)',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-sans)',
            transition: 'color 0.2s, border-color 0.2s',
          }}
          aria-label="Copy code"
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code content */}
      <div style={{ overflowX: 'auto' }}>
        {children ? (
          <div className="shiki-wrapper">{children}</div>
        ) : (
          <pre
            style={{
              margin: 0,
              padding: '16px 20px',
              fontSize: '0.875rem',
              lineHeight: '1.65',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-secondary)',
              overflow: 'auto',
            }}
          >
            <code>{rawCode}</code>
          </pre>
        )}
      </div>
    </div>
  )
}
