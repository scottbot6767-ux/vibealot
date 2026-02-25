import { useState } from 'react'
import { Plot } from '@/lib/gameTypes'
import { useGameData } from '@/hooks/useGameData'

import { LoadingOverlay }   from '@/components/game/LoadingOverlay'
import { StatsBar }         from '@/components/game/StatsBar'
import { Castle }           from '@/components/game/Castle'
import { MapTerrain }       from '@/components/game/MapTerrain'
import { PlotMarker }       from '@/components/game/PlotMarker'
import { ClaimModal }       from '@/components/game/ClaimModal'
import { ViewEstateModal }  from '@/components/game/ViewEstateModal'
import { InvasionModal }    from '@/components/game/InvasionModal'
import { ManageEstateModal }from '@/components/game/ManageEstateModal'
import { RoomView }         from '@/components/game/RoomView'

type ModalState = 'none' | 'claim' | 'view' | 'invasion' | 'manage' | 'room'

export default function App() {
  const { plots, loading } = useGameData()
  const [activePlot, setActivePlot] = useState<Plot | null>(null)
  const [modal, setModal] = useState<ModalState>('none')

  const close = () => { setModal('none') }

  const openPlot = (plot: Plot) => {
    setActivePlot(plot)
    setModal(plot.claimed ? 'view' : 'claim')
  }

  if (loading) return <LoadingOverlay />

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0d0b08' }}>
      {/* Header */}
      <header className="header-stripe relative text-center" style={{ background: '#1a1208', borderBottom: '3px solid #b83232', padding: '1.5rem 2rem 1.2rem', overflow: 'hidden' }}>
        {/* Corner ornaments */}
        <svg style={{ position: 'absolute', top: 8, left: 12, opacity: 0.4 }} width="38" height="38" viewBox="0 0 38 38">
          <path d="M2,2 L18,2 L2,18 Z" fill="#9a7818"/>
          <path d="M2,2 L36,2 L2,36" fill="none" stroke="#9a7818" strokeWidth="1.5" opacity="0.5"/>
        </svg>
        <svg style={{ position: 'absolute', top: 8, right: 12, opacity: 0.4 }} width="38" height="38" viewBox="0 0 38 38">
          <path d="M36,2 L20,2 L36,18 Z" fill="#9a7818"/>
          <path d="M36,2 L2,2 L36,36" fill="none" stroke="#9a7818" strokeWidth="1.5" opacity="0.5"/>
        </svg>
        <h1 className="font-title title-glow" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.8rem)', letterSpacing: '0.12em', color: '#d4a827', lineHeight: 1 }}>
          VIBEALOT
        </h1>
        <p className="font-heading" style={{ color: '#c4ae7a', fontSize: '0.72rem', letterSpacing: '0.25em', marginTop: '0.35rem', textTransform: 'uppercase' }}>
          Claim Thy Land &bull; Build Thy Legacy &bull; Defend Thy Vibes
        </p>
      </header>

      {/* Stats */}
      <StatsBar plots={plots} />

      {/* Map area */}
      <main className="flex-1 flex items-center justify-center" style={{ padding: '2rem 1rem' }}>
        <div
          className="map-frame relative"
          style={{
            width: '100%', maxWidth: 900, aspectRatio: '4/3',
            background: '#3a6820',
            backgroundImage: `
              repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 55px),
              repeating-linear-gradient(90deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 55px)
            `,
            border: '10px solid #3a2a14',
            borderRadius: 6,
            overflow: 'visible',
          }}
        >
          {/* Inner vignette */}
          <div className="map-vignette absolute inset-0 pointer-events-none" style={{ zIndex: 50 }} />

          {/* Terrain elements */}
          <MapTerrain />

          {/* Castle */}
          <Castle />

          {/* Plots */}
          {plots.map(plot => (
            <PlotMarker key={plot.id} plot={plot} onClick={openPlot} />
          ))}

          {/* Compass */}
          <div className="absolute font-heading" style={{ bottom: 12, right: 16, fontSize: 9, letterSpacing: '0.08em', color: '#c4ae7a', zIndex: 60, lineHeight: 1.6, textAlign: 'center', background: 'rgba(13,11,8,0.7)', padding: '4px 8px', border: '1px solid #6b4a2a' }}>
            <div>N</div>
            <div>&#43;&#43;</div>
            <div>S</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center font-heading" style={{ padding: '0.7rem', borderTop: '1px solid #3a2a14', color: '#5a5a58', fontSize: '0.62rem', letterSpacing: '0.12em', background: '#0d0b08' }}>
        VIBEALOT KINGDOM &bull; CLAIM &bull; BUILD &bull; CONQUER
      </footer>

      {/* Modals */}
      <ClaimModal
        plot={activePlot}
        open={modal === 'claim'}
        onClose={close}
      />
      <ViewEstateModal
        plot={activePlot}
        open={modal === 'view'}
        onClose={close}
        onInvade={() => setModal('invasion')}
        onManage={() => setModal('manage')}
        onViewRoom={() => setModal('room')}
      />
      <InvasionModal
        plot={activePlot}
        open={modal === 'invasion'}
        onClose={close}
      />
      <ManageEstateModal
        plot={activePlot}
        open={modal === 'manage'}
        onClose={close}
      />
      <RoomView
        plot={activePlot}
        open={modal === 'room'}
        onClose={close}
        onInvade={() => setModal('invasion')}
        onManage={() => setModal('manage')}
      />
    </div>
  )
}
