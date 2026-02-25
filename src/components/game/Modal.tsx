import React from 'react'

interface Props {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: React.ReactNode
  width?: number
  crimsonHeader?: boolean
}

export const Modal = ({ open, onClose, title, subtitle, children, width = 520, crimsonHeader = false }: Props) => {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: 'rgba(0,0,0,0.84)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="rounded bg-parchment text-ink relative modal-shadow overflow-y-auto"
        style={{ width, maxWidth: '100%', maxHeight: '92vh', border: '5px solid #6b4a2a' }}
      >
        <div className="text-center relative" style={{ background: '#1a1208', padding: '1.1rem 3rem 0.9rem', borderBottom: `3px solid ${crimsonHeader ? '#b83232' : '#b83232'}` }}>
          <button className="absolute font-heading text-parchment-dim hover:text-gold transition-colors" style={{ top: 11, right: 13, background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }} onClick={onClose}>&#x2715;</button>
          <h2 className="font-title text-gold" style={{ fontSize: '1.35rem', letterSpacing: '0.07em' }}>{title}</h2>
          {subtitle && <p className="font-heading text-parchment-dim mt-1" style={{ fontSize: '0.72rem', letterSpacing: '0.1em' }}>{subtitle}</p>}
        </div>
        <div style={{ padding: '1.4rem' }}>{children}</div>
      </div>
    </div>
  )
}

export const FG = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
  <div className="mb-4">
    <label className="font-heading text-ink block mb-1" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
      {label}{hint && <span className="ml-1" style={{ opacity: 0.5, fontSize: '0.85em', textTransform: 'none' }}>{hint}</span>}
    </label>
    {children}
  </div>
)

export const Input = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full rounded font-body text-ink transition-colors"
    style={{ padding: '0.55rem 0.75rem', fontSize: '1rem', border: '2px solid #c4ae7a', background: 'rgba(255,255,255,0.38)', outline: 'none', ...props.style }}
    onFocus={e => e.target.style.borderColor = '#6b4a2a'}
    onBlur={e => e.target.style.borderColor = '#c4ae7a'}
  />
)

export const Select = ({ ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    className="w-full rounded font-body text-ink transition-colors"
    style={{ padding: '0.55rem 0.75rem', fontSize: '1rem', border: '2px solid #c4ae7a', background: 'rgba(255,255,255,0.38)', outline: 'none' }}
  />
)

export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="font-heading text-stone mb-2" style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{children}</div>
)

export const HR = () => <div style={{ borderTop: '1px solid #c4ae7a', margin: '0.9rem 0' }} />
