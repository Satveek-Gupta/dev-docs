'use client'

import Link from 'next/link'
import { ArrowRight, Tag } from 'lucide-react'
import { getCategoryColor } from '@/lib/utils'

interface TagDoc {
  title: string
  description?: string
  slugAsParams: string
  category: string
}

export function TagPageContent({ tag, docs }: { tag: string; docs: TagDoc[] }) {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', border: '1px solid var(--accent-cyan)', background: 'var(--accent-cyan-dim)', marginBottom: '16px' }}>
          <Tag size={14} style={{ color: 'var(--accent-cyan)' }} />
          <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>{tag}</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--text-primary)' }}>#{tag}</h1>
        <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', marginTop: '8px' }}>
          {docs.length} {docs.length === 1 ? 'article' : 'articles'}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', border: '1px solid var(--border-subtle)', borderRadius: '12px', overflow: 'hidden' }}>
        {docs.map((doc) => (
          <Link
            key={doc.slugAsParams}
            href={`/docs/${doc.slugAsParams}`}
            className="responsive-list-item"
          >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: getCategoryColor(doc.category), flexShrink: 0, marginTop: '6px' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', marginBottom: '4px' }}>{doc.title}</p>
                {doc.description && <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>{doc.description}</p>}
              </div>
            </div>
            <div className="responsive-list-item-meta">
              <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '999px', background: `${getCategoryColor(doc.category)}18`, color: getCategoryColor(doc.category), fontFamily: 'var(--font-sans)' }}>
                {doc.category}
              </span>
              <ArrowRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
