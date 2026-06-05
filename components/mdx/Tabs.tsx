'use client'

import { useState } from 'react'

interface TabsProps {
  children: React.ReactNode
}

interface TabProps {
  title: string
  children: React.ReactNode
}

export function Tabs({ children }: TabsProps) {
  const tabs = Array.isArray(children) ? children : [children]
  const [active, setActive] = useState(0)

  const titles = tabs
    .filter((t): t is React.ReactElement<TabProps> => !!t)
    .map((t) => (t.props as TabProps).title ?? `Tab ${tabs.indexOf(t) + 1}`)

  const activeContent = tabs[active]

  return (
    <div
      style={{
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        margin: '1.5rem 0',
      }}
    >
      {/* Tab headers */}
      <div
        style={{
          display: 'flex',
          background: 'var(--bg-elevated)',
          borderBottom: '1px solid var(--border-default)',
          overflowX: 'auto',
        }}
      >
        {titles.map((title, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              padding: '10px 18px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-sans)',
              color: active === i ? 'var(--accent-cyan)' : 'var(--text-muted)',
              borderBottom: active === i ? '2px solid var(--accent-cyan)' : '2px solid transparent',
              transition: 'color 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </button>
        ))}
      </div>

      {/* Active tab content */}
      <div style={{ background: 'var(--bg-surface)' }}>
        {activeContent}
      </div>
    </div>
  )
}

export function Tab({ title, children }: TabProps) {
  return <div>{children}</div>
}
