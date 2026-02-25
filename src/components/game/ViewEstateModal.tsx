import { Plot, BUILDINGS, INVASION_COOLDOWN_MS, INVASION_KEY } from '@/lib/gameTypes'
import { KnightSVG } from '@/lib/knight'
import { Modal } from './Modal'

interface Props {
  plot: Plot | null; open: boolean; onClose: () => void
  onInvade: () => void; onManage: () => void; onViewRoom: () => void
}

function getCooldown() {
  const last = parseInt(localStorage.getItem(INVASION_KEY) || '0')
  const rem = INVASION_COOLDOWN_MS - (Date.now() - last)
  if (rem <= 0) return null
  const h = Math.floor(rem / 3600000)
  const m = Math.floor((rem % 3600000) / 60000)
  return `${h}h ${m}m`
}

export const ViewEstateModal = ({ plot, open, onClose, onInvade, onManage, onViewRoom }: Props) => {
  if (!plot || !plot.claimed) return null
  const bld = BUILDINGS[plot.building || ''] || BUILDINGS.cottage
  const fullName = `${plot.ownerTitle || ''} ${plot.owner || ''}`.trim()
  const cd = getCooldown()
  const claimedDate = plot.claimedAt
    ? new Date(plot.claimedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—'

  return (
    <Modal open={open} onClose={onClose} title={plot.sign || bld.name} subtitle={`Plot #${plot.plotNumber} — ${bld.name}`}>
      <div className="grid gap-5" style={{ gridTemplateColumns: 'auto 1fr', alignItems: 'start' }}>
        {/* Knight col */}
        <div className="flex flex-col items-center gap-2 rounded" style={{ background: '#1a1208', border: '2px solid #6b4a2a', padding: '1rem 0.7rem', minWidth: 110 }}>
          <KnightSVG cfg={plot.knightConfig} height={128} />
          <div className="font-heading text-gold text-center" style={{ fontSize: '0.6rem', letterSpacing: '0.04em' }}>{fullName}</div>
        </div>

        {/* Info col */}
        <div>
          <div className="mb-3">
            <div className="font-heading text-stone mb-1" style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Lord of this Land</div>
            <div className="font-title text-ink" style={{ fontSize: '1.25rem' }}>{fullName}</div>
          </div>
          <div className="mb-3">
            <div className="font-heading text-stone mb-1" style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Establishment</div>
            <div className="font-body text-ink font-semibold text-lg">{plot.sign || '—'}</div>
          </div>
          <div className="mb-3">
            <div className="font-heading text-stone mb-1" style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Building</div>
            <div className="flex items-center justify-center rounded" style={{ background: 'rgba(200,180,140,0.18)', border: '1px solid #c4ae7a', padding: '0.4rem', width: 86 }}>
              <div style={{ width: 68, height: 54 }} dangerouslySetInnerHTML={{ __html: bld.svg.replace('<svg', '<svg width="68" height="54"') }} />
            </div>
          </div>
          <div className="mb-2">
            <div className="font-heading text-stone mb-1" style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Claimed On</div>
            <div className="font-body text-ink" style={{ fontSize: '0.92rem' }}>{claimedDate}</div>
          </div>
          {(plot.invasions || 0) > 0 && (
            <div className="mb-2">
              <div className="font-heading text-stone mb-1" style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Times Invaded</div>
              <div className="font-body font-semibold" style={{ color: '#b83232' }}>{plot.invasions}</div>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-2 mt-4">
        <button
          onClick={onViewRoom}
          className="w-full font-heading rounded transition-all"
          style={{ padding: '0.7rem', fontSize: '0.78rem', letterSpacing: '0.1em', background: '#6b4a2a', color: '#e8d4a0', border: '2px solid #3a2a14', cursor: 'pointer', textTransform: 'uppercase' }}
        >
          Enter Estate
        </button>
        <button
          onClick={cd ? undefined : onInvade}
          className="w-full font-heading rounded transition-all"
          style={{ padding: '0.7rem', fontSize: '0.78rem', letterSpacing: '0.1em', background: 'transparent', color: cd ? '#5a5a58' : '#b83232', border: `2px solid ${cd ? '#5a5a58' : '#b83232'}`, cursor: cd ? 'not-allowed' : 'pointer', textTransform: 'uppercase', opacity: cd ? 0.6 : 1 }}
        >
          {cd ? `Cooldown: ${cd} remaining` : '⚔ Invade This Estate'}
        </button>
        <button
          onClick={onManage}
          className="w-full font-heading rounded transition-all"
          style={{ padding: '0.65rem', fontSize: '0.75rem', letterSpacing: '0.1em', background: 'transparent', color: '#6b4a2a', border: '2px solid #6b4a2a', cursor: 'pointer', textTransform: 'uppercase' }}
        >
          Manage My Estate
        </button>
      </div>
    </Modal>
  )
}
