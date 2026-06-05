'use client'

import Link from 'next/link'
import { Clock } from 'lucide-react'
import { getCategoryColor } from '@/lib/utils'

interface RelatedDoc {
  title: string
  slugAsParams: string
  category: string
  readingTime?: number
}

export function RelatedArticles({ related }: { related: RelatedDoc[] }) {
  if (!related.length) return null

  return (
    <section style={{ marginTop: '56px', paddingTop: '40px', borderTop: '1px solid var(--border-subtle)' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '16px' }}>
        Related Articles
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
        {related.map((rel) => (
          <Link
            key={rel.slugAsParams}
            href={`/docs/${rel.slugAsParams}`}
            style={{ padding: '16px', border: '1px solid var(--border-subtle)', borderRadius: '12px', textDecoration: 'none', background: 'var(--bg-surface)', display: 'flex', flexDirection: 'column', gap: '8px', transition: 'border-color 0.15s, background 0.15s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)'; (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)'; (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)' }}
          >
            <span style={{ fontSize: '0.7rem', color: getCategoryColor(rel.category), fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
              {rel.category.toUpperCase()}
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', lineHeight: '1.3' }}>
              {rel.title}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={10} /> {rel.readingTime ?? 5} min
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
