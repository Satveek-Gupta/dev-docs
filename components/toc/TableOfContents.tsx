'use client'

import { useEffect, useState } from 'react'
import type { TocEntry } from '@/types'

interface TableOfContentsProps {
  toc: TocEntry[]
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const headings = document.querySelectorAll('h2[id], h3[id], h4[id]')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0.1,
      }
    )

    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (!toc.length) return null

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const renderItems = (items: TocEntry[], depth = 0) => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {items.map((item) => {
        const id = item.url.replace('#', '')
        const isActive = activeId === id
        return (
          <li key={item.url}>
            <button
              onClick={() => scrollTo(id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: `4px ${depth * 12 + 8}px`,
                fontSize: depth === 0 ? '0.825rem' : '0.785rem',
                fontFamily: 'var(--font-sans)',
                color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)',
                borderLeft: isActive ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                marginLeft: '-1px',
                transition: 'color 0.15s, border-color 0.15s',
                lineHeight: '1.5',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'
                }
              }}
            >
              {item.title}
            </button>
            {item.items && item.items.length > 0 && renderItems(item.items, depth + 1)}
          </li>
        )
      })}
    </ul>
  )

  return (
    <nav aria-label="Table of contents">
      <p
        style={{
          fontSize: '0.7rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--text-muted)',
          marginBottom: '12px',
          fontFamily: 'var(--font-sans)',
        }}
      >
        On this page
      </p>
      <div
        style={{
          borderLeft: '1px solid var(--border-subtle)',
          paddingLeft: '1px',
        }}
      >
        {renderItems(toc)}
      </div>
    </nav>
  )
}
