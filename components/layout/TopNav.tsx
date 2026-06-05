'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Search, Sun, Moon, Monitor, Github, Menu, X, BookOpen
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { CATEGORIES } from '@/types'

interface TopNavProps {
  onMenuToggle?: () => void
  menuOpen?: boolean
}

export function TopNav({ onMenuToggle, menuOpen }: TopNavProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  const openSearch = useCallback(() => {
    // Dispatch custom event to open command menu
    window.dispatchEvent(new CustomEvent('open-search'))
  }, [])

  // Keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey))) {
        e.preventDefault()
        openSearch()
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [openSearch])

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('light')
    else if (theme === 'light') setTheme('system')
    else setTheme('dark')
  }

  const ThemeIcon = !mounted ? Monitor : theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--nav-height)',
        zIndex: 50,
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: 'rgba(8, 9, 10, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '0 20px',
        }}
      >
        {/* Mobile menu toggle */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden"
          style={{
            background: 'none',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-sm)',
            padding: '6px',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, var(--accent-cyan), #0066cc)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px var(--accent-cyan-glow)',
            }}
          >
            <BookOpen size={14} color="#fff" />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: '1rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            DevDocs
          </span>
        </Link>

        {/* Nav links — desktop */}
        <nav
          className="hidden lg:flex"
          style={{ display: 'flex', gap: '4px', alignItems: 'center' }}
        >
          {CATEGORIES.slice(0, 6).map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              style={{
                fontSize: '0.8125rem',
                color: pathname.startsWith(`/category/${cat.slug}`)
                  ? cat.color
                  : 'var(--text-muted)',
                textDecoration: 'none',
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                transition: 'color 0.15s, background 0.15s',
                background: pathname.startsWith(`/category/${cat.slug}`)
                  ? `${cat.color}18`
                  : 'transparent',
                fontFamily: 'var(--font-sans)',
              }}
              onMouseEnter={(e) => {
                if (!pathname.startsWith(`/category/${cat.slug}`)) {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
                }
              }}
              onMouseLeave={(e) => {
                if (!pathname.startsWith(`/category/${cat.slug}`)) {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'
                }
              }}
            >
              {cat.name}
            </Link>
          ))}
        </nav>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Search trigger */}
        <button
          onClick={openSearch}
          id="search-trigger"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            padding: '6px 12px',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '0.8125rem',
            fontFamily: 'var(--font-sans)',
            transition: 'border-color 0.15s, color 0.15s',
            minWidth: '160px',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)'
            ;(e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)'
            ;(e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'
          }}
        >
          <Search size={14} />
          <span>Search...</span>
          <kbd
            style={{
              marginLeft: 'auto',
              fontSize: '0.7rem',
              background: 'var(--bg-overlay)',
              border: '1px solid var(--border-default)',
              borderRadius: '3px',
              padding: '1px 5px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            ⌘K
          </kbd>
        </button>

        {/* Theme toggle */}
        <button
          onClick={cycleTheme}
          style={{
            background: 'none',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-sm)',
            padding: '6px',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            transition: 'color 0.15s, border-color 0.15s',
          }}
          aria-label="Toggle theme"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)'
          }}
        >
          <ThemeIcon size={15} />
        </button>

        {/* GitHub */}
        <a
          href={process.env.NEXT_PUBLIC_GITHUB_REPO ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'none',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-sm)',
            padding: '6px',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            transition: 'color 0.15s, border-color 0.15s',
          }}
          aria-label="GitHub"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)'
          }}
        >
          <Github size={15} />
        </a>
      </div>
    </header>
  )
}
