import { Plot, BUILDINGS, INVASION_COOLDOWN_MS, INVASION_KEY } from '@/lib/gameTypes'
import { KnightSVG } from '@/lib/knight'
import { Modal, BtnDanger, BtnGhost, BtnGhostCrim } from './Modal'

interface Props {
  plot: Plot | null; open: boolean; onClose: () => void
  onInvade: () => void; onManage: () => void; onViewRoom: () => void
}

function getCooldown() {
  const last = parseInt(localStorage.getItem(INVASION_KEY) || '0')
  const rem = INVASION_COOLDOWN_MS - (Date.now() - last)
  if (rem <= 0) return null
  const h = Math.floor(rem / 3600000), m = Math.floor((rem % 3600000) / 60000)
  return `${h}h ${m}m`
}

export const ViewEstateModal = ({ plot, open, onClose, onInvade, onManage, onViewRoom }: Props) => {
  if (!plot?.claimed) return null
  const bld = BUILDINGS[plot.building || ''] || BUILDINGS.cottage
  const fullName = `${plot.ownerTitle || ''} ${plot.owner || ''}`.trim()
  const cd = getCooldown()
  const claimedDate = plot.claimedAt
    ? new Date(plot.claimedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—'

  return (
    <Modal open={open} onClose={onClose} title={plot.sign || bld.name} subtitle={`Plot #${plot.plotNumber} — ${bld.name}`}>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.2rem', alignItems: 'start' }}>

        {/* Knight portrait */}
        <div style={{ background: '#0c0a07', border: '2px solid #3a2a10', borderRadius: 2, padding: '0.9rem 0.7rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 105 }}>
          <KnightSVG cfg={plot.knightConfig} height={122} />
          <div className="font-heading" style={{ fontSize: '0.58rem', letterSpacing: '0.06em', color: '#8a6a18', textAlign: 'center' }}>{fullName}</div>
        </div>

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          {[
            { label: 'Lord of this Land', val: fullName, size: '1.18rem', font: 'font-title', color: '#c8971a' },
            { label: 'Establishment', val: plot.sign || '—', size: '1rem', font: 'font-body', semibold: true },
            { label: 'Building', val: bld.name, size: '0.88rem', font: 'font-body' },
            { label: 'Claimed', val: claimedDate, size: '0.85rem', font: 'font-body' },
          ].map(s => (
            <div key={s.label}>
              <div className="font-heading" style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6a5030', marginBottom: 2 }}>{s.label}</div>
              <div className={s.font} style={{ fontSize: s.size, color: s.color || '#1a1208', fontWeight: s.semibold ? 600 : undefined }}>{s.val}</div>
            </div>
          ))}
          {(plot.invasions || 0) > 0 && (
            <div>
              <div className="font-heading" style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6a5030', marginBottom: 2 }}>Times Invaded</div>
              <div className="font-body font-semibold" style={{ color: '#a02828', fontSize: '0.95rem' }}>{plot.invasions}</div>
            </div>
          )}
        </div>
      </div>

      {/* Building preview */}
      <div style={{ margin: '1rem 0 0', display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: 'rgba(200,180,140,0.18)', border: '1px solid rgba(168,136,80,0.5)', padding: '0.5rem 1rem', borderRadius: 2, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 58, height: 46 }} dangerouslySetInnerHTML={{ __html: bld.svg.replace('<svg', '<svg width="58" height="46"') }} />
          <span className="font-heading" style={{ fontSize: '0.72rem', letterSpacing: '0.08em', color: '#6a5030' }}>{bld.name}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: '1rem' }}>
        <BtnGhost onClick={onViewRoom} style={{ width: '100%', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
          Enter Estate
        </BtnGhost>
        {cd ? (
          <button disabled className="btn btn-ghost-crim" style={{ width: '100%', padding: '0.65rem', fontSize: '0.75rem', letterSpacing: '0.08em', opacity: 0.45 }}>
            Cooldown: {cd} remaining
          </button>
        ) : (
          <BtnGhostCrim onClick={onInvade} style={{ width: '100%', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
            Invade This Estate
          </BtnGhostCrim>
        )}
        <BtnGhost onClick={onManage} style={{ width: '100%', fontSize: '0.72rem', letterSpacing: '0.1em', borderColor: 'rgba(74,48,16,0.5)', color: '#8a6a18' }}>
          Manage My Estate
        </BtnGhost>
      </div>
    </Modal>
  )
}
