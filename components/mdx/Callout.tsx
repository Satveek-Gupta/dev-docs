'use client'

import { Info, AlertTriangle, Lightbulb, XCircle, CheckCircle } from 'lucide-react'

type CalloutType = 'note' | 'warning' | 'tip' | 'danger' | 'success'

const config: Record<
  CalloutType,
  { icon: React.ElementType; color: string; bg: string; label: string }
> = {
  note:    { icon: Info,          color: 'var(--accent-cyan)',   bg: 'var(--accent-cyan-dim)',   label: 'Note'    },
  warning: { icon: AlertTriangle, color: 'var(--accent-amber)',  bg: 'var(--accent-amber-dim)',  label: 'Warning' },
  tip:     { icon: Lightbulb,     color: 'var(--accent-green)',  bg: 'var(--accent-green-dim)',  label: 'Tip'     },
  danger:  { icon: XCircle,       color: 'var(--accent-red)',    bg: 'var(--accent-red-dim)',    label: 'Danger'  },
  success: { icon: CheckCircle,   color: 'var(--accent-green)',  bg: 'var(--accent-green-dim)',  label: 'Success' },
}

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: React.ReactNode
}

export function Callout({ type = 'note', title, children }: CalloutProps) {
  const { icon: Icon, color, bg, label } = config[type]

  return (
    <div
      style={{
        borderLeft: `3px solid ${color}`,
        borderRadius: '0 var(--radius-md) var(--radius-md) 0',
        background: bg,
        padding: '14px 16px',
        margin: '1.5rem 0',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
      }}
    >
      <Icon
        size={16}
        style={{ color, flexShrink: 0, marginTop: '2px' }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        {title ? (
          <p
            style={{
              fontWeight: 600,
              color,
              fontSize: '0.875rem',
              marginBottom: '4px',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {title}
          </p>
        ) : (
          <span
            style={{
              fontWeight: 600,
              color,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'block',
              marginBottom: '6px',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {label}
          </span>
        )}
        <div
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            lineHeight: '1.6',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
