'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

interface MermaidProps {
  chart: string
  children?: React.ReactNode
}

export function Mermaid({ chart, children }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const raw = chart || (typeof children === 'string' ? children : '')

  useEffect(() => {
    if (!ref.current || !raw) return

    let cancelled = false

    const render = async () => {
      try {
        const mermaid = (await import('mermaid')).default
        const isLight = resolvedTheme === 'light'
        
        mermaid.initialize({
          startOnLoad: false,
          theme: isLight ? 'default' : 'dark',
          darkMode: !isLight,
          themeVariables: {
            primaryColor: isLight ? '#f8fafc' : '#0f1012',
            primaryBorderColor: isLight ? '#0891b2' : '#00d4ff',
            primaryTextColor: isLight ? '#0f172a' : '#f0f0f2',
            lineColor: isLight ? '#0891b2' : '#00d4ff',
            secondaryColor: isLight ? '#f1f5f9' : '#161719',
            tertiaryColor: isLight ? '#e2e8f0' : '#1e2023',
            background: isLight ? '#ffffff' : '#0f1012',
            mainBkg: isLight ? '#ffffff' : '#0f1012',
            nodeBorder: isLight ? '#0891b2' : '#00d4ff',
            clusterBkg: isLight ? '#f1f5f9' : '#161719',
            titleColor: isLight ? '#0f172a' : '#f0f0f2',
            edgeLabelBackground: isLight ? '#f8fafc' : '#161719',
            fontFamily: 'DM Mono, monospace',
          },
          flowchart: { curve: 'basis' },
        })

        // Generate clean unique ID for render
        const id = `mermaid-${Math.random().toString(36).slice(2)}`
        // Clear container and render new SVG
        if (ref.current) {
          ref.current.innerHTML = `<div style="color:var(--text-muted);font-size:0.8rem;font-family:var(--font-mono)">Rendering diagram…</div>`
        }
        
        const { svg } = await mermaid.render(id, raw)
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg
        }
      } catch (err) {
        if (!cancelled && ref.current) {
          ref.current.innerHTML = `<pre style="color:var(--accent-red);font-size:0.8rem;padding:12px">${String(err)}</pre>`
        }
      }
    }

    render()
    return () => { cancelled = true }
  }, [raw, resolvedTheme])

  return (
    <div
      style={{
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        margin: '1.5rem 0',
        background: 'var(--bg-surface)',
        display: 'flex',
        justifyContent: 'center',
        overflowX: 'auto',
      }}
    >
      <div ref={ref} style={{ maxWidth: '100%' }}>
        <div
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
          }}
        >
          Loading diagram…
        </div>
      </div>
    </div>
  )
}
