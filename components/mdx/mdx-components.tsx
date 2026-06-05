import { Callout } from './Callout'
import { CodeBlock } from './CodeBlock'
import { Tabs, Tab } from './Tabs'
import { Steps, Step } from './Steps'
import { Mermaid } from './Mermaid'
import type { MDXComponents } from 'mdx/types'

export function getMDXComponents(overrides?: MDXComponents): MDXComponents {
  return {
    // Custom MDX components
    Callout,
    CodeBlock,
    Tabs,
    Tab,
    Steps,
    Step,
    Mermaid,

    // Override native HTML elements
    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
      // Extract code from pre > code
      const codeEl = (children as React.ReactElement)
      const codeProps = codeEl?.props as {
        children?: string
        className?: string
      }
      const raw = typeof codeProps?.children === 'string' ? codeProps.children.trim() : ''
      const lang = codeProps?.className?.replace('language-', '') ?? 'text'

      // Check for title in className meta
      const filename = undefined

      return (
        <CodeBlock code={raw} language={lang} filename={filename}>
          {children}
        </CodeBlock>
      )
    },

    // Headings with anchor IDs
    h1: ({ children, id, ...props }) => (
      <h1 id={id} style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', marginBottom: '1rem', color: 'var(--text-primary)', lineHeight: '1.2' }} {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, id, ...props }) => (
      <h2 id={id} style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }} {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, id, ...props }) => (
      <h3 id={id} style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginTop: '2rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }} {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, id, ...props }) => (
      <h4 id={id} style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }} {...props}>
        {children}
      </h4>
    ),

    p: ({ children }) => (
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.25rem', fontSize: '0.9375rem' }}>
        {children}
      </p>
    ),

    a: ({ children, href }) => (
      <a
        href={href}
        style={{ color: 'var(--accent-cyan)', borderBottom: '1px solid var(--accent-cyan-dim)', textDecoration: 'none', transition: 'border-color 0.2s' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--accent-cyan)' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--accent-cyan-dim)' }}
      >
        {children}
      </a>
    ),

    ul: ({ children }) => (
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: '1.7' }}>
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: '1.7' }}>
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li style={{ marginBottom: '0.4rem' }}>{children}</li>
    ),

    blockquote: ({ children }) => (
      <blockquote style={{ borderLeft: '3px solid var(--accent-cyan)', padding: '0.75rem 1.25rem', background: 'var(--bg-elevated)', borderRadius: '0 var(--radius-md) var(--radius-md) 0', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '1.5rem 0' }}>
        {children}
      </blockquote>
    ),

    table: ({ children }) => (
      <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th style={{ textAlign: 'left', padding: '0.6rem 0.9rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', fontWeight: 600 }}>
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td style={{ padding: '0.6rem 0.9rem', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
        {children}
      </td>
    ),

    hr: () => (
      <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: '2.5rem 0' }} />
    ),

    code: ({ children, className }) => {
      // Inline code (not inside pre)
      return (
        <code
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85em',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.15em 0.4em',
            color: 'var(--accent-cyan)',
          }}
        >
          {children}
        </code>
      )
    },

    ...overrides,
  }
}
