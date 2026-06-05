'use client'

import { useState } from 'react'
import { TopNav } from './TopNav'
import { Sidebar } from './Sidebar'

interface SidebarDoc {
  title: string
  slugAsParams: string
  category: string
}

interface DocsLayoutProps {
  docs: SidebarDoc[]
  children: React.ReactNode
  toc?: React.ReactNode
}

export function DocsLayout({ docs, children, toc }: DocsLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-base)' }}>
      <TopNav
        onMenuToggle={() => setMenuOpen((v) => !v)}
        menuOpen={menuOpen}
      />

      <div
        style={{
          display: 'flex',
          paddingTop: 'var(--nav-height)',
          maxWidth: '1400px',
          margin: '0 auto',
          minHeight: `calc(100vh - var(--nav-height))`,
        }}
      >
        {/* Mobile overlay */}
        {menuOpen && (
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              zIndex: 30,
              backdropFilter: 'blur(4px)',
            }}
            className="lg:hidden"
          />
        )}

        {/* Sidebar */}
        <div
          style={{
            position: menuOpen ? 'fixed' : 'relative',
            top: menuOpen ? 'var(--nav-height)' : 'auto',
            left: menuOpen ? 0 : 'auto',
            zIndex: menuOpen ? 40 : 'auto',
            backgroundColor: menuOpen ? 'var(--bg-base)' : 'transparent',
            height: menuOpen ? `calc(100vh - var(--nav-height))` : 'auto',
          }}
        >
          <Sidebar docs={docs} open={menuOpen || true} />
        </div>

        {/* Main content */}
        <main
          style={{
            flex: 1,
            minWidth: 0,
            padding: '40px 40px',
          }}
        >
          {children}
        </main>

        {/* TOC */}
        {toc && (
          <aside
            style={{
              width: 'var(--toc-width)',
              flexShrink: 0,
              height: `calc(100vh - var(--nav-height))`,
              position: 'sticky',
              top: 'var(--nav-height)',
              overflowY: 'auto',
              borderLeft: '1px solid var(--border-subtle)',
              padding: '32px 16px',
            }}
            className="hidden xl:block"
          >
            {toc}
          </aside>
        )}
      </div>
    </div>
  )
}
