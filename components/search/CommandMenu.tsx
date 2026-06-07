'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'
import { Search, X, ArrowRight, Clock, Hash } from 'lucide-react'
import { getCategoryColor } from '@/lib/utils'

interface SearchItem {
  title: string
  slug: string
  category: string
  description?: string
  tags: string[]
  excerpt?: string
}

interface CommandMenuProps {
  items: SearchItem[]
}

const RECENT_KEY = 'opsforge-recent-searches'
const MAX_RECENT = 5

export function CommandMenu({ items }: CommandMenuProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchItem[]>([])
  const [selected, setSelected] = useState(0)
  const [recent, setRecent] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const fuse = useRef(
    new Fuse(items, {
      keys: [
        { name: 'title', weight: 0.5 },
        { name: 'description', weight: 0.3 },
        { name: 'tags', weight: 0.15 },
        { name: 'excerpt', weight: 0.05 },
      ],
      threshold: 0.4,
      includeScore: true,
    })
  )

  // Load recent searches
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_KEY)
    if (stored) setRecent(JSON.parse(stored))
  }, [])

  const openMenu = useCallback(() => {
    setOpen(true)
    setQuery('')
    setResults([])
    setSelected(0)
  }, [])

  // Listen for open-search event from nav
  useEffect(() => {
    const handler = () => openMenu()
    window.addEventListener('open-search', handler)
    return () => window.removeEventListener('open-search', handler)
  }, [openMenu])

  // Keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    const r = fuse.current.search(query).slice(0, 8).map((r) => r.item)
    setResults(r)
    setSelected(0)
  }, [query])

  const navigate = (slug: string, title: string) => {
    // Save to recent
    const next = [title, ...recent.filter((r) => r !== title)].slice(0, MAX_RECENT)
    setRecent(next)
    localStorage.setItem(RECENT_KEY, JSON.stringify(next))

    setOpen(false)
    router.push(`/docs/${slug}`)
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const list = results.length > 0 ? results : []
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((s) => Math.min(s + 1, list.length - 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((s) => Math.max(s - 1, 0))
    }
    if (e.key === 'Enter' && list[selected]) {
      navigate(list[selected].slug, list[selected].title)
    }
  }

  if (!open) return null

  const showRecent = !query && recent.length > 0
  const showResults = query.trim() && results.length > 0
  const showEmpty = query.trim() && results.length === 0

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          zIndex: 90,
          backdropFilter: 'blur(6px)',
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '20vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(640px, calc(100vw - 32px))',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg), 0 0 40px rgba(0,212,255,0.08)',
          zIndex: 91,
          overflow: 'hidden',
          animation: 'fade-up 0.15s ease',
        }}
      >
        {/* Search input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <Search size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search documentation..."
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}
            >
              <X size={14} />
            </button>
          )}
          <kbd
            style={{
              fontSize: '0.7rem',
              background: 'var(--bg-overlay)',
              border: '1px solid var(--border-default)',
              borderRadius: '4px',
              padding: '2px 6px',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              flexShrink: 0,
            }}
          >
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {showRecent && (
            <div>
              <p
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                  padding: '12px 20px 6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                }}
              >
                Recent Searches
              </p>
              {recent.map((r, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(r)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '10px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                    fontSize: '0.875rem',
                    fontFamily: 'var(--font-sans)',
                    textAlign: 'left',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-overlay)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'none' }}
                >
                  <Clock size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  {r}
                </button>
              ))}
            </div>
          )}

          {showResults && (
            <div>
              <p
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                  padding: '12px 20px 6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                }}
              >
                Results
              </p>
              {results.map((item, i) => (
                <button
                  key={item.slug}
                  onClick={() => navigate(item.slug, item.title)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    width: '100%',
                    padding: '12px 20px',
                    background: i === selected ? 'var(--bg-overlay)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.1s',
                    borderLeft: i === selected ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                  }}
                  onMouseEnter={() => setSelected(i)}
                >
                  <Hash size={14} style={{ color: getCategoryColor(item.category), flexShrink: 0, marginTop: '3px' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-sans)',
                        marginBottom: '2px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{
                        fontSize: '0.775rem',
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-sans)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.description ?? item.excerpt}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      background: `${getCategoryColor(item.category)}18`,
                      color: getCategoryColor(item.category),
                      flexShrink: 0,
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {item.category}
                  </span>
                </button>
              ))}
            </div>
          )}

          {showEmpty && (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-sans)',
              }}
            >
              No results for &quot;{query}&quot;
            </div>
          )}

          {!query && !recent.length && (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: 'var(--text-muted)',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Start typing to search documentation…
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            padding: '10px 20px',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {[['↑↓', 'navigate'], ['↵', 'select'], ['Esc', 'close']].map(([key, label]) => (
            <span key={key} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <kbd style={{ background: 'var(--bg-overlay)', border: '1px solid var(--border-default)', borderRadius: '3px', padding: '1px 5px', fontFamily: 'var(--font-mono)' }}>
                {key}
              </kbd>
              {label}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
