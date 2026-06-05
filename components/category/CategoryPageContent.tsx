'use client'

import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface CategoryDoc {
  title: string
  description?: string
  slugAsParams: string
  readingTime?: number
  publishedAt: string
}

interface CategoryMeta {
  slug: string
  name: string
  icon: string
  color: string
  description: string
}

interface CategoryPageContentProps {
  cat: CategoryMeta
  docs: CategoryDoc[]
}

export function CategoryPageContent({ cat, docs }: CategoryPageContentProps) {
  const color = cat.color

  return (
    <main style={{ flex: 1, padding: '40px', minWidth: 0 }}>
      {/* Category header */}
      <div
        style={{
          padding: '32px',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          background: 'var(--bg-surface)',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${color}, transparent)` }} />
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>{cat.icon}</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
          {cat.name}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', marginBottom: '16px' }}>
          {cat.description}
        </p>
        <span style={{ fontSize: '0.8rem', color, fontFamily: 'var(--font-sans)' }}>
          {docs.length} {docs.length === 1 ? 'article' : 'articles'}
        </span>
      </div>

      {/* Docs list */}
      {docs.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', border: '1px solid var(--border-subtle)', borderRadius: '12px', overflow: 'hidden' }}>
          {docs.map((doc) => (
            <Link
              key={doc.slugAsParams}
              href={`/docs/${doc.slugAsParams}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '18px 24px',
                textDecoration: 'none',
                background: 'var(--bg-surface)',
                borderBottom: '1px solid var(--border-subtle)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)' }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {doc.title}
                </p>
                {doc.description && (
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {doc.description}
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                {doc.readingTime && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={11} /> {doc.readingTime} min
                  </span>
                )}
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
                  {formatDate(doc.publishedAt)}
                </span>
                <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
          No articles in this category yet.
        </div>
      )}
    </main>
  )
}
