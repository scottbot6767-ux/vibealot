import React from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: React.ReactNode
  width?: number
  variant?: 'default' | 'danger'
}

export const Modal = ({ open, onClose, title, subtitle, children, width = 520, variant = 'default' }: ModalProps) => {
  if (!open) return null
  const accentColor = variant === 'danger' ? '#a02828' : '#8a6a18'

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(3px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="modal-base animate-scalepop relative rounded-sm overflow-y-auto"
        style={{ width, maxWidth: '100%', maxHeight: '92vh', border: `5px solid #3a2008` }}
      >
        {/* Header */}
        <div className="modal-header text-center relative" style={{ padding: '1.1rem 3rem 0.9rem' }}>
          {/* Decorative border line */}
          <div style={{ position: 'absolute', bottom: 0, left: 16, right: 16, height: 1, background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />
          <button
            onClick={onClose}
            className="absolute font-heading transition-colors"
            style={{ top: 12, right: 12, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(200,170,110,0.55)', fontSize: '1rem', lineHeight: 1, padding: '2px 5px' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#c8971a')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,170,110,0.55)')}
          >
            ✕
          </button>
          <h2 className="font-title" style={{ fontSize: '1.3rem', letterSpacing: '0.07em', color: variant === 'danger' ? '#e84040' : '#c8971a' }}>
            {title}
          </h2>
          {subtitle && (
            <p className="font-heading" style={{ marginTop: '0.3rem', fontSize: '0.66rem', letterSpacing: '0.14em', color: 'rgba(200,170,110,0.55)', textTransform: 'uppercase' }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Decorative corner marks */}
        {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map(pos => (
          <div key={pos} className={`absolute ${pos} w-3 h-3 pointer-events-none`} style={{ opacity: 0.4 }}>
            <svg viewBox="0 0 12 12" fill="none">
              <path d="M0 6 L0 0 L6 0" stroke="#8a6a18" strokeWidth="1.5"/>
            </svg>
          </div>
        ))}

        <div style={{ padding: '1.3rem' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

/* ─── FIELD GROUP ─────────────────────────────────────────── */
export const FG = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '0.85rem' }}>
    <label className="field-label">
      {label}
      {hint && <span style={{ marginLeft: 5, opacity: 0.5, fontSize: '0.85em', textTransform: 'none', fontFamily: 'Crimson Text, serif' }}>{hint}</span>}
    </label>
    {children}
  </div>
)

/* ─── PRIMITIVE INPUTS ────────────────────────────────────── */
export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`field-input ${props.className || ''}`} />
)

export const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...props} className={`field-select ${props.className || ''}`} />
)

export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6a5030', marginBottom: '0.4rem' }}>
    {children}
  </div>
)

export const HR = () => <div className="divider" />

/* ─── BUTTONS ─────────────────────────────────────────────── */
export const BtnPrimary = ({ children, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...p} className={`btn btn-gold w-full ${p.className || ''}`} style={{ padding: '0.78rem', fontSize: '0.88rem', ...p.style }}>{children}</button>
)

export const BtnDanger = ({ children, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...p} className={`btn btn-crim w-full ${p.className || ''}`} style={{ padding: '0.78rem', fontSize: '0.88rem', ...p.style }}>{children}</button>
)

export const BtnGhost = ({ children, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...p} className={`btn btn-ghost ${p.className || ''}`} style={{ padding: '0.65rem 1rem', fontSize: '0.78rem', ...p.style }}>{children}</button>
)

export const BtnGhostCrim = ({ children, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...p} className={`btn btn-ghost-crim ${p.className || ''}`} style={{ padding: '0.65rem 1rem', fontSize: '0.78rem', ...p.style }}>{children}</button>
)
