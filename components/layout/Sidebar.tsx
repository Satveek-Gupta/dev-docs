'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, FileText, FolderOpen } from 'lucide-react'
import { CATEGORIES } from '@/types'
import { getCategoryColor } from '@/lib/utils'

interface SidebarDoc {
  title: string
  slugAsParams: string
  category: string
}

interface SidebarProps {
  docs: SidebarDoc[]
  open?: boolean
}

interface CategoryGroup {
  category: string
  docs: SidebarDoc[]
}

export function Sidebar({ docs, open = true }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  // Group docs by category
  const groups: CategoryGroup[] = CATEGORIES.map((cat) => ({
    category: cat.slug,
    docs: docs.filter((d) => d.category.toLowerCase() === cat.slug),
  })).filter((g) => g.docs.length > 0)

  const toggleCategory = (cat: string) => {
    setCollapsed((prev) => ({ ...prev, [cat]: !prev[cat] }))
  }

  const getCatMeta = (slug: string) =>
    CATEGORIES.find((c) => c.slug === slug)

  return (
    <aside
      style={{
        width: 'var(--sidebar-width)',
        flexShrink: 0,
        height: `calc(100vh - var(--nav-height))`,
        position: 'sticky',
        top: 'var(--nav-height)',
        overflowY: 'auto',
        borderRight: '1px solid var(--border-subtle)',
        padding: '16px 0',
        transition: 'transform 0.25s ease',
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
      }}
      className={`sidebar ${open ? '' : 'hidden lg:block'}`}
    >
      {groups.map((group) => {
        const cat = getCatMeta(group.category)
        const color = getCategoryColor(group.category)
        const isOpen = !collapsed[group.category]
        const hasActive = group.docs.some(
          (d) => pathname === `/docs/${d.slugAsParams}`
        )

        return (
          <div key={group.category} style={{ marginBottom: '4px' }}>
            {/* Category header */}
            <button
              onClick={() => toggleCategory(group.category)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: hasActive ? color : 'var(--text-muted)',
                fontSize: '0.775rem',
                fontWeight: 600,
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                textAlign: 'left',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.color = color
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.color = hasActive
                  ? color
                  : 'var(--text-muted)'
              }}
            >
              <span style={{ fontSize: '0.9rem' }}>{cat?.icon}</span>
              <span style={{ flex: 1 }}>{cat?.name ?? group.category}</span>
              <ChevronRight
                size={12}
                style={{
                  transition: 'transform 0.2s',
                  transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  color: 'var(--text-muted)',
                }}
              />
            </button>

            {/* Doc list */}
            {isOpen && (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {group.docs.map((doc) => {
                  const isActive = pathname === `/docs/${doc.slugAsParams}`
                  return (
                    <li key={doc.slugAsParams}>
                      <Link
                        href={`/docs/${doc.slugAsParams}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 16px 6px 36px',
                          fontSize: '0.8375rem',
                          fontFamily: 'var(--font-sans)',
                          color: isActive ? color : 'var(--text-secondary)',
                          textDecoration: 'none',
                          borderRight: isActive
                            ? `2px solid ${color}`
                            : '2px solid transparent',
                          background: isActive
                            ? `${color}10`
                            : 'transparent',
                          transition: 'color 0.15s, background 0.15s',
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            ;(e.currentTarget as HTMLElement).style.color =
                              'var(--text-primary)'
                            ;(e.currentTarget as HTMLElement).style.background =
                              'var(--bg-elevated)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            ;(e.currentTarget as HTMLElement).style.color =
                              'var(--text-secondary)'
                            ;(e.currentTarget as HTMLElement).style.background =
                              'transparent'
                          }
                        }}
                      >
                        <FileText
                          size={12}
                          style={{ flexShrink: 0, opacity: 0.6 }}
                        />
                        <span
                          style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {doc.title}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}
    </aside>
  )
}
