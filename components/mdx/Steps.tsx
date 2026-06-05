interface StepsProps {
  children: React.ReactNode
}

interface StepProps {
  title?: string
  children: React.ReactNode
}

export function Steps({ children }: StepsProps) {
  const steps = Array.isArray(children) ? children : [children]
  return (
    <div
      style={{
        position: 'relative',
        margin: '1.5rem 0',
        paddingLeft: '40px',
      }}
    >
      {/* Vertical line */}
      <div
        style={{
          position: 'absolute',
          left: '16px',
          top: '20px',
          bottom: '20px',
          width: '1px',
          background: 'var(--border-default)',
        }}
      />
      {steps.map((step, i) => (
        <div
          key={i}
          style={{
            position: 'relative',
            marginBottom: i < steps.length - 1 ? '24px' : 0,
          }}
        >
          {/* Step number circle */}
          <div
            style={{
              position: 'absolute',
              left: '-32px',
              top: '2px',
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              background: 'var(--accent-cyan)',
              color: 'var(--bg-base)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              boxShadow: '0 0 12px var(--accent-cyan-glow)',
            }}
          >
            {i + 1}
          </div>
          {step}
        </div>
      ))}
    </div>
  )
}

export function Step({ title, children }: StepProps) {
  return (
    <div>
      {title && (
        <p
          style={{
            fontWeight: 600,
            fontSize: '0.9375rem',
            color: 'var(--text-primary)',
            marginBottom: '8px',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {title}
        </p>
      )}
      <div style={{ color: 'var(--text-secondary)' }}>{children}</div>
    </div>
  )
}
