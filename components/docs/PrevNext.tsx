'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Doc } from '@/types'

interface PrevNextProps {
  prev: Doc | null
  next: Doc | null
}

export function PrevNext({ prev, next }: PrevNextProps) {
  if (!prev && !next) return null

  return (
    <div className="prev-next-container">
      {prev ? (
        <Link
          href={`/docs/${prev.slugAsParams}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            padding: '16px',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            textDecoration: 'none',
            background: 'var(--bg-surface)',
            transition: 'border-color 0.15s, background 0.15s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)'
            ;(e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)'
            ;(e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)'
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <ArrowLeft size={12} />
            Previous
          </span>
          <span
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
              lineHeight: '1.3',
            }}
          >
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/docs/${next.slugAsParams}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            padding: '16px',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            textDecoration: 'none',
            background: 'var(--bg-surface)',
            transition: 'border-color 0.15s, background 0.15s',
            textAlign: 'right',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)'
            ;(e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)'
            ;(e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)'
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '6px',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Next
            <ArrowRight size={12} />
          </span>
          <span
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
              lineHeight: '1.3',
            }}
          >
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
