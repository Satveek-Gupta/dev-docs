'use client'

import Link from 'next/link'
import { Clock, Calendar, User, GitBranch, Tag } from 'lucide-react'
import { getCategoryColor, formatDate } from '@/lib/utils'

interface DocHeaderProps {
  doc: {
    title: string
    description?: string
    category: string
    author: string
    publishedAt: string
    updatedAt?: string
    readingTime?: number
    featured?: boolean
    template?: boolean
    tags: string[]
    slugAsParams: string
  }
  catMeta?: {
    name: string
    icon: string
    color: string
  }
}

export function DocHeader({ doc, catMeta }: DocHeaderProps) {
  const color = getCategoryColor(doc.category)
  const githubBase = process.env.NEXT_PUBLIC_GITHUB_REPO

  return (
    <header style={{ marginBottom: '40px' }}>
      {/* Category + badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.72rem', padding: '3px 10px', borderRadius: '999px', background: `${color}18`, color, fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
          {catMeta?.icon} {catMeta?.name ?? doc.category}
        </span>
        {doc.template && (
          <span style={{ fontSize: '0.72rem', padding: '3px 10px', borderRadius: '999px', background: 'var(--accent-purple-dim)', color: 'var(--accent-purple)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
            Template
          </span>
        )}
        {doc.featured && (
          <span style={{ fontSize: '0.72rem', padding: '3px 10px', borderRadius: '999px', background: 'var(--accent-amber-dim)', color: 'var(--accent-amber)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
            ⭐ Featured
          </span>
        )}
      </div>

      {/* Title */}
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 400, color: 'var(--text-primary)', lineHeight: '1.15', letterSpacing: '-0.02em', marginBottom: '16px' }}>
        {doc.title}
      </h1>

      {/* Description */}
      {doc.description && (
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.65', fontFamily: 'var(--font-sans)', marginBottom: '20px', maxWidth: '65ch' }}>
          {doc.description}
        </p>
      )}

      {/* Meta */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
        <MetaItem icon={<User size={12} />} label={doc.author} />
        <MetaItem icon={<Calendar size={12} />} label={formatDate(doc.publishedAt)} />
        {doc.readingTime && <MetaItem icon={<Clock size={12} />} label={`${doc.readingTime} min read`} />}
        {doc.updatedAt && <MetaItem icon={<GitBranch size={12} />} label={`Updated ${formatDate(doc.updatedAt)}`} />}
      </div>

      {/* Tags */}
      {doc.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '16px' }}>
          {doc.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${tag}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', padding: '3px 10px', borderRadius: '999px', border: '1px solid var(--border-default)', color: 'var(--text-muted)', textDecoration: 'none', fontFamily: 'var(--font-sans)', transition: 'color 0.15s, border-color 0.15s, background 0.15s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-cyan)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-cyan)'; (e.currentTarget as HTMLElement).style.background = 'var(--accent-cyan-dim)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              <Tag size={9} /> {tag}
            </Link>
          ))}
        </div>
      )}

      {/* Edit on GitHub */}
      {githubBase && (
        <a
          href={`${githubBase}/edit/main/content/${doc.slugAsParams}.mdx`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '12px', textDecoration: 'none', fontFamily: 'var(--font-sans)', transition: 'color 0.15s' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)' }}
        >
          <GitBranch size={12} /> Edit this page on GitHub
        </a>
      )}

      <div style={{ height: '1px', background: 'var(--border-subtle)', marginTop: '28px' }} />
    </header>
  )
}

function MetaItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
      {icon} {label}
    </span>
  )
}
