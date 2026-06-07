'use client'

import Link from 'next/link'
import { ArrowRight, Clock, Star, Tag } from 'lucide-react'
import { getCategoryColor, formatDate } from '@/lib/utils'
import { CATEGORIES } from '@/types'

interface Doc {
  title: string
  description?: string
  slug: string
  slugAsParams: string
  category: string
  publishedAt: string
  readingTime?: number
  featured?: boolean
  excerpt?: string
  tags: string[]
}

interface CategoryWithCount {
  slug: string
  name: string
  icon: string
  color: string
  description: string
  count: number
}

export function HomepageContent({
  featured,
  recent,
  tags,
  categories,
}: {
  featured: Doc[]
  recent: Doc[]
  tags: { tag: string; count: number }[]
  categories: CategoryWithCount[]
}) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
      {/* Featured Articles */}
      {featured.length > 0 && (
        <section style={{ marginBottom: '72px' }}>
          <SectionHeader title="Featured Articles" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {featured.map((doc) => <ArticleCard key={doc.slug} doc={doc} />)}
          </div>
        </section>
      )}

      {/* Categories */}
      <section style={{ marginBottom: '72px' }}>
        <SectionHeader title="Categories" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '18px',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                textDecoration: 'none',
                background: 'var(--bg-surface)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = cat.color + '60'
                el.style.background = 'var(--bg-elevated)'
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--border-subtle)'
                el.style.background = 'var(--bg-surface)'
                el.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: cat.color, opacity: 0.6 }} />
              <span style={{ fontSize: '1.5rem' }}>{cat.icon}</span>
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', marginBottom: '4px' }}>{cat.name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>{cat.count} {cat.count === 1 ? 'article' : 'articles'}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Articles */}
      {recent.length > 0 && (
        <section style={{ marginBottom: '72px' }}>
          <SectionHeader title="Recent Articles" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {recent.map((doc) => (
              <Link
                key={doc.slug}
                href={`/docs/${doc.slugAsParams}`}
                className="responsive-list-item"
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: getCategoryColor(doc.category), flexShrink: 0, marginTop: '6px' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '3px' }}>{doc.title}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.description ?? doc.excerpt}</p>
                  </div>
                </div>
                <div className="responsive-list-item-meta">
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={11} /> {doc.readingTime ?? 5} min
                  </span>
                  <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '999px', background: `${getCategoryColor(doc.category)}18`, color: getCategoryColor(doc.category), fontFamily: 'var(--font-sans)' }}>
                    {doc.category}
                  </span>
                  <ArrowRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <section>
          <SectionHeader title="Tags" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {tags.map(({ tag, count }) => (
              <Link
                key={tag}
                href={`/tag/${tag}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '5px 12px',
                  border: '1px solid var(--border-default)',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  background: 'var(--bg-surface)',
                  transition: 'border-color 0.15s, color 0.15s, background 0.15s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-cyan)'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--accent-cyan)'
                  ;(e.currentTarget as HTMLElement).style.background = 'var(--accent-cyan-dim)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
                  ;(e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)'
                }}
              >
                <Tag size={10} />{tag}<span style={{ opacity: 0.5, fontSize: '0.7rem' }}>{count}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{title}</h2>
      {href && (
        <Link href={href} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--accent-cyan)', textDecoration: 'none', fontFamily: 'var(--font-sans)' }}>
          View all <ArrowRight size={12} />
        </Link>
      )}
    </div>
  )
}

function ArticleCard({ doc }: { doc: Doc }) {
  const color = getCategoryColor(doc.category)
  return (
    <Link
      href={`/docs/${doc.slugAsParams}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '20px',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        textDecoration: 'none',
        background: 'var(--bg-surface)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = color + '50'
        el.style.background = 'var(--bg-elevated)'
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--border-subtle)'
        el.style.background = 'var(--bg-surface)'
        el.style.transform = 'translateY(0)'
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, ${color}, transparent)` }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '999px', background: `${color}18`, color: color, fontFamily: 'var(--font-sans)', fontWeight: 600 }}>{doc.category.toUpperCase()}</span>
        {doc.featured && <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.7rem', color: 'var(--accent-amber)', fontFamily: 'var(--font-sans)' }}><Star size={10} fill="currentColor" /> Featured</span>}
      </div>
      <div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: '1.3' }}>{doc.title}</h3>
        {doc.description && <p style={{ fontSize: '0.8375rem', color: 'var(--text-muted)', lineHeight: '1.55', fontFamily: 'var(--font-sans)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{doc.description}</p>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
          <Clock size={11} /> {doc.readingTime ?? 5} min read
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>{formatDate(doc.publishedAt)}</span>
      </div>
    </Link>
  )
}

export function HeroSection({ docCount, categoryCount }: { docCount: number; categoryCount: number }) {
  return (
    <section style={{ paddingTop: 'calc(var(--nav-height) + 80px)', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
      <div className="dot-grid-fade" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(0,212,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative' }}>
        <div className="animate-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', border: '1px solid var(--accent-cyan-dim)', borderRadius: '999px', background: 'var(--accent-cyan-dim)', marginBottom: '28px', fontSize: '0.775rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cyan)', display: 'inline-block', boxShadow: '0 0 8px var(--accent-cyan)' }} />
          {docCount} articles across {categoryCount} categories
        </div>
        <h1 className="animate-fade-up gradient-text" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 7vw, 4.5rem)', fontWeight: 400, lineHeight: '1.1', marginBottom: '24px', animationDelay: '80ms' }}>
          OpsForge
        </h1>
        <p className="animate-fade-up" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '40px', maxWidth: '640px', margin: '0 auto 40px', fontFamily: 'var(--font-sans)', animationDelay: '160ms' }}>
          Production-ready Cloud & DevOps Knowledge Base — guides, templates, and infrastructure documentation for AWS, Docker, Kubernetes, Terraform, and beyond.
        </p>
        <div className="animate-fade-up stagger" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', animationDelay: '240ms' }}>
          <Link
            href="/docs/aws/ec2-setup-guide"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 24px', background: 'var(--accent-cyan)', borderRadius: 'var(--radius-md)', color: 'var(--bg-base)', fontWeight: 700, fontSize: '0.9rem', fontFamily: 'var(--font-sans)', textDecoration: 'none', boxShadow: '0 0 20px var(--accent-cyan-glow)', transition: 'opacity 0.15s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
          >
            Browse Documentation
          </Link>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-search'))}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 24px', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem', fontFamily: 'var(--font-sans)', cursor: 'pointer', transition: 'border-color 0.15s, background 0.15s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)'; (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
          >
            Search OpsForge
            <kbd style={{ fontSize: '0.65rem', padding: '1px 5px', border: '1px solid var(--border-default)', borderRadius: '3px', fontFamily: 'var(--font-mono)', opacity: 0.7 }}>⌘K</kbd>
          </button>
        </div>
      </div>
    </section>
  )
}
