import { useState } from 'react'
import { Plot } from '@/lib/gameTypes'
import { useGameData } from '@/hooks/useGameData'

import { LoadingOverlay }    from '@/components/game/LoadingOverlay'
import { Castle }            from '@/components/game/Castle'
import { MapTerrain }        from '@/components/game/MapTerrain'
import { PlotMarker }        from '@/components/game/PlotMarker'
import { ActivityFeed }      from '@/components/game/ActivityFeed'
import { EmberLayer }        from '@/components/game/EmberLayer'
import { ClaimModal }        from '@/components/game/ClaimModal'
import { ViewEstateModal }   from '@/components/game/ViewEstateModal'
import { InvasionModal }     from '@/components/game/InvasionModal'
import { ManageEstateModal } from '@/components/game/ManageEstateModal'
import { RoomView }          from '@/components/game/RoomView'

type ModalState = 'none' | 'claim' | 'view' | 'invasion' | 'manage' | 'room'

export default function App() {
  const { plots, loading } = useGameData()
  const [activePlot, setActivePlot] = useState<Plot | null>(null)
  const [modal, setModal] = useState<ModalState>('none')
  const [chronicleOpen, setChronicleOpen] = useState(true)

  if (loading) return <LoadingOverlay />

  const openPlot = (plot: Plot) => {
    setActivePlot(plot)
    setModal(plot.claimed ? 'view' : 'claim')
  }

  const claimed = plots.filter(p => p.claimed).length
  const citizens = new Set(plots.filter(p => p.claimed && p.owner).map(p => p.owner)).size
  const invasions = plots.reduce((s, p) => s + (p.invasions || 0), 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#060504' }}>

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header style={{
        position: 'relative', background: '#0c0a07', zIndex: 40,
        borderBottom: '1px solid #2e2410',
        boxShadow: '0 2px 20px rgba(0,0,0,0.8)',
      }}>
        {/* Decorative top stripe */}
        <div style={{ height: 2, background: 'linear-gradient(90deg, transparent 0%, #8a6a18 25%, #c8971a 50%, #8a6a18 75%, transparent 100%)' }} />

        <div style={{ display: 'flex', alignItems: 'center', padding: '0.7rem 1.2rem', gap: '1rem' }}>
          {/* Left — title */}
          <div style={{ flex: 1 }}>
            <h1 className="font-title title-glow" style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.8rem)', letterSpacing: '0.12em', color: '#c8971a', lineHeight: 1 }}>
              VIBEALOT
            </h1>
            <div className="font-heading" style={{ fontSize: '0.58rem', letterSpacing: '0.2em', color: 'rgba(200,151,26,0.4)', marginTop: 2, textTransform: 'uppercase' }}>
              Claim &bull; Build &bull; Conquer
            </div>
          </div>

          {/* Center — stat pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { label: 'Available', value: plots.length - claimed },
              { label: 'Claimed',   value: claimed },
              { label: 'Citizens',  value: citizens },
              { label: 'Invasions', value: invasions, danger: invasions > 0 },
            ].map(s => (
              <div key={s.label} className="stat-pill" style={{ padding: '0.3rem 0.8rem', borderRadius: 2, textAlign: 'center' }}>
                <div className="font-mono" style={{ fontSize: '1rem', fontWeight: 700, color: s.danger ? '#c83232' : '#c8971a', lineHeight: 1 }}>{s.value}</div>
                <div className="font-heading" style={{ fontSize: '0.54rem', letterSpacing: '0.1em', color: 'rgba(200,151,26,0.45)', textTransform: 'uppercase', marginTop: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Right — chronicle toggle */}
          <button
            onClick={() => setChronicleOpen(o => !o)}
            className="btn btn-ghost"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.66rem', letterSpacing: '0.12em', flexShrink: 0 }}
          >
            {chronicleOpen ? 'Hide' : 'Show'} Chronicle
          </button>
        </div>
      </header>

      {/* ── BODY ───────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

        {/* ── MAP ──────────────────────────────────────────────── */}
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', overflow: 'hidden', minWidth: 0 }}>
          <div
            className="map-frame map-surface"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: chronicleOpen ? 820 : 1040,
              aspectRatio: '4/3',
              borderRadius: 4,
              overflow: 'visible',
              transition: 'max-width 0.3s ease',
            }}
          >
            {/* Inner vignette */}
            <div className="map-vignette absolute inset-0" style={{ zIndex: 40, borderRadius: 4 }} />

            {/* Ember particles */}
            <EmberLayer />

            {/* Terrain */}
            <MapTerrain />

            {/* Castle */}
            <Castle />

            {/* Plots */}
            {plots.map(plot => (
              <PlotMarker key={plot.id} plot={plot} onClick={openPlot} />
            ))}

            {/* Compass rose */}
            <div style={{
              position: 'absolute', bottom: 10, right: 12, zIndex: 45,
              background: 'rgba(10,8,4,0.82)', border: '1px solid #4a3010',
              padding: '6px', borderRadius: 2,
            }}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="16" stroke="#4a3010" strokeWidth="1"/>
                <circle cx="18" cy="18" r="12" stroke="rgba(74,48,16,0.4)" strokeWidth="0.5"/>
                <polygon points="18,4 20,18 18,22 16,18" fill="#c8971a"/>
                <polygon points="18,32 20,18 18,14 16,18" fill="rgba(74,48,16,0.6)"/>
                <polygon points="4,18 18,16 22,18 18,20" fill="rgba(74,48,16,0.5)"/>
                <polygon points="32,18 18,16 14,18 18,20" fill="rgba(74,48,16,0.5)"/>
                <circle cx="18" cy="18" r="2" fill="#c8971a"/>
                <text x="18" y="3" textAnchor="middle" dominantBaseline="middle" fill="#c8971a" fontSize="4.5" fontFamily="Cinzel, serif">N</text>
              </svg>
            </div>

            {/* Scale legend */}
            <div style={{
              position: 'absolute', bottom: 10, left: 12, zIndex: 45,
              background: 'rgba(10,8,4,0.82)', border: '1px solid #4a3010',
              padding: '4px 10px', borderRadius: 2,
              fontFamily: 'Cinzel, serif', fontSize: 7.5, letterSpacing: '0.08em', color: 'rgba(200,151,26,0.55)',
            }}>
              KINGDOM OF VIBES
            </div>
          </div>
        </main>

        {/* ── CHRONICLE SIDEBAR ────────────────────────────────── */}
        {chronicleOpen && (
          <aside style={{ width: 240, flexShrink: 0, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <ActivityFeed />
          </aside>
        )}
      </div>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer style={{ background: '#0c0a07', borderTop: '1px solid #1e1810', padding: '0.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.56rem', letterSpacing: '0.16em', color: 'rgba(200,151,26,0.25)', textTransform: 'uppercase' }}>
          Vibealot &bull; Built with Rankings.io Vibes
        </div>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.56rem', letterSpacing: '0.1em', color: 'rgba(200,151,26,0.2)' }}>
          Realtime — Supabase
        </div>
      </footer>

      {/* ── MODALS ─────────────────────────────────────────────── */}
      <ClaimModal        plot={activePlot} open={modal === 'claim'}    onClose={() => setModal('none')} />
      <ViewEstateModal   plot={activePlot} open={modal === 'view'}     onClose={() => setModal('none')} onInvade={() => setModal('invasion')} onManage={() => setModal('manage')} onViewRoom={() => setModal('room')} />
      <InvasionModal     plot={activePlot} open={modal === 'invasion'} onClose={() => setModal('none')} />
      <ManageEstateModal plot={activePlot} open={modal === 'manage'}   onClose={() => setModal('none')} />
      <RoomView          plot={activePlot} open={modal === 'room'}     onClose={() => setModal('none')} onInvade={() => setModal('invasion')} onManage={() => setModal('manage')} />
    </div>
  )
}
