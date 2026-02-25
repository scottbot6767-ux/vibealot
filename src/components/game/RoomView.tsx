import { Plot, BUILDINGS } from '@/lib/gameTypes'
import { KnightSVG } from '@/lib/knight'
import { Modal } from './Modal'

interface Props { plot: Plot | null; open: boolean; onClose: () => void; onInvade: () => void; onManage: () => void }

const ROOM_THEMES: Record<string, { floor: string; wall: string; trim: string; accent: string }> = {
  cottage:    { floor: '#8B6914', wall: '#c09a7a', trim: '#5a3a18', accent: '#d4a827' },
  manor:      { floor: '#5a4020', wall: '#b0a07a', trim: '#3a2a10', accent: '#3a5a8c' },
  blacksmith: { floor: '#3a3a38', wall: '#5a5a58', trim: '#2a2a28', accent: '#880000' },
  tavern:     { floor: '#6b4a2a', wall: '#c09020', trim: '#3a2a10', accent: '#c09020' },
  market:     { floor: '#7a5a30', wall: '#c09a7a', trim: '#4a3010', accent: '#3a6820' },
  chapel:     { floor: '#8a8a88', wall: '#d0d0cc', trim: '#4a4a48', accent: '#d4a827' },
  windmill:   { floor: '#7a6345', wall: '#c09a7a', trim: '#4a3a20', accent: '#7a4a1a' },
  library:    { floor: '#5a4020', wall: '#b0a07a', trim: '#3a2810', accent: '#3a5a8c' },
  tower:      { floor: '#4a4a48', wall: '#7a7a78', trim: '#2a2a28', accent: '#3a5a8c' },
  theatre:    { floor: '#6b4a2a', wall: '#c09020', trim: '#3a2010', accent: '#880000' },
  bakery:     { floor: '#7a5a30', wall: '#d4bc60', trim: '#4a3010', accent: '#c09020' },
  stable:     { floor: '#5a3a18', wall: '#7a4a1a', trim: '#3a2010', accent: '#3a6820' },
}

const ROOM_FURNITURE: Record<string, React.ReactNode> = {
  cottage: (
    <>
      {/* Fireplace */}
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 90, height: 70 }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: '#3a2010', border: '4px solid #5a3a18', borderBottom: 'none' }} />
        <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', width: 44, height: 36, background: '#1a0a04', borderRadius: '4px 4px 0 0' }} />
        <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', width: 26, height: 24, background: '#e85a00', borderRadius: '50% 50% 10% 10%', opacity: 0.85 }} />
        <div style={{ position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)', width: 14, height: 18, background: '#ffb830', borderRadius: '50% 50% 10% 10%', opacity: 0.9 }} />
      </div>
      {/* Table */}
      <div style={{ position: 'absolute', bottom: 55, left: 55, width: 100, height: 8, background: '#5a3a18', borderRadius: 3 }} />
      <div style={{ position: 'absolute', bottom: 32, left: 60, width: 8, height: 24, background: '#5a3a18' }} />
      <div style={{ position: 'absolute', bottom: 32, left: 138, width: 8, height: 24, background: '#5a3a18' }} />
      {/* Chair */}
      <div style={{ position: 'absolute', bottom: 32, right: 55, width: 38, height: 6, background: '#7a4a2a', borderRadius: 2 }} />
      <div style={{ position: 'absolute', bottom: 32, right: 56, width: 6, height: 30, background: '#7a4a2a', borderRadius: 2 }} />
      <div style={{ position: 'absolute', bottom: 32, right: 87, width: 6, height: 16, background: '#7a4a2a', borderRadius: 2 }} />
    </>
  ),
  tavern: (
    <>
      {/* Bar counter */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 55, background: '#3a2010', borderTop: '6px solid #7a4a2a' }} />
      <div style={{ position: 'absolute', bottom: 55, left: 20, right: 20, height: 10, background: '#7a4a2a', borderRadius: '2px 2px 0 0' }} />
      {/* Mugs */}
      {[60, 100, 140, 180].map(x => (
        <div key={x} style={{ position: 'absolute', bottom: 65, left: x, width: 16, height: 20, background: '#c09020', borderRadius: '2px 2px 4px 4px', border: '2px solid #8a6a10' }} />
      ))}
    </>
  ),
  library: (
    <>
      {/* Bookshelf left */}
      <div style={{ position: 'absolute', top: 30, left: 20, width: 55, height: 120, background: '#3a2810', border: '3px solid #2a1808' }}>
        {[0,1,2,3].map(row => (
          <div key={row} style={{ position: 'absolute', top: 8 + row * 28, left: 4, right: 4, height: 22, display: 'flex', gap: 2 }}>
            {['#b83232','#3a5a8c','#2d6b2a','#c9a227','#6b2d8b','#888'].map((c, i) => (
              <div key={i} style={{ flex: 1, background: c, borderRadius: 1 }} />
            ))}
          </div>
        ))}
      </div>
      {/* Bookshelf right */}
      <div style={{ position: 'absolute', top: 30, right: 20, width: 55, height: 120, background: '#3a2810', border: '3px solid #2a1808' }}>
        {[0,1,2,3].map(row => (
          <div key={row} style={{ position: 'absolute', top: 8 + row * 28, left: 4, right: 4, height: 22, display: 'flex', gap: 2 }}>
            {['#3a5a8c','#c9a227','#b83232','#6b2d8b','#2d6b2a','#888'].map((c, i) => (
              <div key={i} style={{ flex: 1, background: c, borderRadius: 1 }} />
            ))}
          </div>
        ))}
      </div>
      {/* Desk */}
      <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', width: 110, height: 10, background: '#5a3a18', borderRadius: 2 }} />
      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-54px)', width: 8, height: 22, background: '#5a3a18' }} />
      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(46px)', width: 8, height: 22, background: '#5a3a18' }} />
    </>
  ),
  blacksmith: (
    <>
      {/* Anvil */}
      <div style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)', width: 60, height: 30 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 14, background: '#555', borderRadius: '3px 3px 0 0' }} />
        <div style={{ position: 'absolute', top: 14, left: 8, right: 8, height: 16, background: '#444', borderRadius: '0 0 2px 2px' }} />
      </div>
      {/* Forge */}
      <div style={{ position: 'absolute', bottom: 0, right: 30, width: 70, height: 80, background: '#2a1a0a', border: '4px solid #3a2a18' }}>
        <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 36, height: 36, background: '#880000', borderRadius: '50%', boxShadow: '0 0 20px rgba(255,100,0,0.6)' }} />
        <div style={{ position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)', width: 20, height: 20, background: '#ffb830', borderRadius: '50%', opacity: 0.85 }} />
      </div>
      {/* Hammer */}
      <div style={{ position: 'absolute', bottom: 48, left: 45, width: 8, height: 50, background: '#6b4a2a', transform: 'rotate(-35deg)' }} />
      <div style={{ position: 'absolute', bottom: 82, left: 36, width: 26, height: 16, background: '#888', borderRadius: 3, transform: 'rotate(-35deg)' }} />
    </>
  ),
}

function getDefaultFurniture(building: string) {
  const defs: Record<string, React.ReactNode> = ROOM_FURNITURE
  if (defs[building]) return defs[building]
  // Generic: table + chairs
  return (
    <>
      <div style={{ position: 'absolute', bottom: 50, left: '50%', transform: 'translateX(-50%)', width: 110, height: 10, background: '#5a3a18', borderRadius: 3 }} />
      <div style={{ position: 'absolute', bottom: 28, left: 'calc(50% - 50px)', width: 8, height: 24, background: '#5a3a18' }} />
      <div style={{ position: 'absolute', bottom: 28, left: 'calc(50% + 42px)', width: 8, height: 24, background: '#5a3a18' }} />
    </>
  )
}

export const RoomView = ({ plot, open, onClose, onInvade, onManage }: Props) => {
  if (!plot || !plot.claimed) return null
  const bld = plot.building || 'cottage'
  const bldData = BUILDINGS[bld] || BUILDINGS.cottage
  const theme = ROOM_THEMES[bld] || ROOM_THEMES.cottage
  const fullName = `${plot.ownerTitle || ''} ${plot.owner || ''}`.trim()
  const furniture = getDefaultFurniture(bld)

  return (
    <Modal open={open} onClose={onClose} title={plot.sign || bldData.name} subtitle={`${fullName}'s Estate — Plot #${plot.plotNumber}`} width={560}>
      {/* Room scene */}
      <div className="relative rounded overflow-hidden mb-4" style={{ height: 260, background: theme.wall, border: `3px solid ${theme.trim}` }}>
        {/* Floor */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 110,
          background: theme.floor,
          backgroundImage: `repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 30px)`,
        }} />
        {/* Wall trim / wainscoting */}
        <div style={{ position: 'absolute', bottom: 108, left: 0, right: 0, height: 6, background: theme.trim }} />
        {/* Window */}
        <div style={{ position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)', width: 72, height: 72, background: '#7ab8d4', border: `4px solid ${theme.trim}`, borderRadius: 4 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 3, background: theme.trim }} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)', height: 3, background: theme.trim }} />
        </div>
        {/* Banner / tapestry */}
        <div style={{ position: 'absolute', top: 14, left: 22, width: 28, height: 52, background: theme.accent, border: `2px solid ${theme.trim}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 12, height: 12, background: theme.trim, borderRadius: '50%' }} />
        </div>
        <div style={{ position: 'absolute', top: 14, right: 22, width: 28, height: 52, background: theme.accent, border: `2px solid ${theme.trim}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 12, height: 12, background: theme.trim, borderRadius: '50%' }} />
        </div>
        {/* Furniture */}
        {furniture}
        {/* Knight standing in room */}
        <div style={{ position: 'absolute', bottom: 72, right: 30, zIndex: 10 }}>
          <KnightSVG cfg={plot.knightConfig} height={116} />
        </div>
        {/* Nameplate */}
        <div className="font-heading absolute" style={{ bottom: 4, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontSize: 9, letterSpacing: '0.1em', color: '#e8d4a0', background: 'rgba(13,11,8,0.85)', border: `1px solid ${theme.accent}`, padding: '2px 10px' }}>
          {fullName}
        </div>
      </div>

      {/* Info strip */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 rounded text-center" style={{ background: 'rgba(200,180,140,0.2)', border: '1px solid #c4ae7a', padding: '0.5rem' }}>
          <div className="font-heading text-stone" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>Building</div>
          <div className="font-body text-ink font-semibold" style={{ fontSize: '0.9rem' }}>{bldData.name}</div>
        </div>
        <div className="flex-1 rounded text-center" style={{ background: 'rgba(200,180,140,0.2)', border: '1px solid #c4ae7a', padding: '0.5rem' }}>
          <div className="font-heading text-stone" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>Sign</div>
          <div className="font-body text-ink font-semibold" style={{ fontSize: '0.9rem' }}>{plot.sign || '—'}</div>
        </div>
        <div className="flex-1 rounded text-center" style={{ background: 'rgba(200,180,140,0.2)', border: '1px solid #c4ae7a', padding: '0.5rem' }}>
          <div className="font-heading text-stone" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>Invasions</div>
          <div className="font-body font-semibold" style={{ fontSize: '0.9rem', color: (plot.invasions || 0) > 0 ? '#b83232' : '#1a1208' }}>{plot.invasions || 0}</div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button onClick={onManage} className="font-heading rounded flex-1 transition-all" style={{ padding: '0.65rem', fontSize: '0.72rem', letterSpacing: '0.08em', background: 'transparent', color: '#6b4a2a', border: '2px solid #6b4a2a', cursor: 'pointer', textTransform: 'uppercase' }}>
          Manage Estate
        </button>
        <button onClick={onInvade} className="font-heading rounded flex-1 transition-all" style={{ padding: '0.65rem', fontSize: '0.72rem', letterSpacing: '0.08em', background: 'transparent', color: '#b83232', border: '2px solid #b83232', cursor: 'pointer', textTransform: 'uppercase' }}>
          Invade
        </button>
      </div>
    </Modal>
  )
}
