'use client'

import Link from 'next/link'
import { Home, ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const all = [{ label: 'Home', href: '/' }, ...items]

  return (
    <nav aria-label="Breadcrumb">
      <ol
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          listStyle: 'none',
          padding: 0,
          margin: '0 0 24px',
          flexWrap: 'wrap',
        }}
      >
        {all.map((item, i) => {
          const isLast = i === all.length - 1
          return (
            <li
              key={i}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {i > 0 && (
                <ChevronRight size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-sans)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)' }}
                >
                  {i === 0 && <Home size={11} />}
                  {item.label}
                </Link>
              ) : (
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: isLast ? 'var(--text-secondary)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-sans)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {i === 0 && <Home size={11} />}
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
