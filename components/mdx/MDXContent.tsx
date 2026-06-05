'use client'

import * as runtime from 'react/jsx-runtime'
import { Callout } from './Callout'
import { CodeBlock } from './CodeBlock'
import { Tabs, Tab } from './Tabs'
import { Steps, Step } from './Steps'
import { Mermaid } from './Mermaid'

const sharedComponents = {
  Callout,
  CodeBlock,
  Tabs,
  Tab,
  Steps,
  Step,
  Mermaid,
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    const codeEl = children as React.ReactElement
    const codeProps = codeEl?.props as {
      children?: string
      className?: string
      title?: string
      metastring?: string
    }
    // Preserve exact whitespace — DO NOT trim, especially for tree/ascii art
    const raw = typeof codeProps?.children === 'string' ? codeProps.children : ''
    const lang = codeProps?.className?.replace('language-', '') ?? 'text'
    const title = codeProps?.title
    if (lang === 'mermaid') {
      return <Mermaid chart={raw} />
    }
    return <CodeBlock code={raw} language={lang} filename={title} />
  },
  table: ({ children }: { children?: React.ReactNode }) => (
    <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>{children}</table>
    </div>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th style={{ textAlign: 'left', padding: '0.6rem 0.9rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', fontWeight: 600, fontFamily: 'var(--font-sans)' }}>{children}</th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td style={{ padding: '0.6rem 0.9rem', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>{children}</td>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote style={{ borderLeft: '3px solid var(--accent-cyan)', padding: '0.75rem 1.25rem', background: 'var(--bg-elevated)', borderRadius: '0 8px 8px 0', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '1.5rem 0' }}>{children}</blockquote>
  ),
  // Styled anchor links
  a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} style={{ color: 'var(--accent-cyan)', textDecoration: 'underline', textDecorationColor: 'var(--accent-cyan-dim)' }} {...props}>{children}</a>
  ),
  // Inline code — only for non-pre contexts; MDX renders inline `` `code` `` as bare <code>
  code: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    // If it has a language class, it's inside a <pre> — let the pre handler deal with it
    if (className) return <code className={className}>{children}</code>
    return (
      <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85em', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: '4px', padding: '0.15em 0.4em', color: 'var(--accent-cyan)' }}>{children}</code>
    )
  },
}

interface MDXContentProps {
  code: string
  components?: Record<string, React.ComponentType>
}

export function MDXContent({ code, components = {} }: MDXContentProps) {
  const Component = useMDXComponent(code)
  return <Component components={{ ...sharedComponents, ...components }} />
}

// Evaluate the compiled MDX function string
function useMDXComponent(code: string) {
  const fn = new Function(code)
  return fn({ ...runtime }).default as React.ComponentType<{ components?: Record<string, unknown> }>
}
