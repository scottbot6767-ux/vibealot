import { useState } from 'react'
import { Plot, BUILDINGS } from '@/lib/gameTypes'
import { renderKnightSVG } from '@/lib/knight'

interface Props { plot: Plot; onClick: (plot: Plot) => void }

export const PlotMarker = ({ plot, onClick }: Props) => {
  const [hov, setHov] = useState(false)
  const bld = plot.building ? BUILDINGS[plot.building] : null
  const wasInvaded = (plot.invasions || 0) > 0

  /* ── UNCLAIMED ─────────────────────────────── */
  if (!plot.claimed) {
    return (
      <div
        onClick={() => onClick(plot)}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position: 'absolute',
          left: `${plot.x}%`, top: `${plot.y}%`,
          width: 82, height: 70,
          cursor: 'pointer',
          border: hov ? '2px solid rgba(200,151,26,0.7)' : '1.5px dashed rgba(100,70,20,0.5)',
          borderRadius: 2,
          background: hov ? 'rgba(200,151,26,0.1)' : 'rgba(60,40,10,0.12)',
          transition: 'all 0.18s ease',
          zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          boxShadow: hov ? '0 0 18px rgba(200,151,26,0.22), inset 0 0 18px rgba(200,151,26,0.05)' : 'none',
        }}
      >
        <div style={{ fontSize: 9, fontFamily: 'Cinzel, serif', letterSpacing: '0.05em', color: hov ? 'rgba(200,151,26,0.9)' : 'rgba(120,80,20,0.6)', textAlign: 'center', lineHeight: 1.5 }}>
          {hov ? 'CLAIM LAND' : `Plot ${plot.plotNumber}`}
        </div>
        {hov && (
          <div style={{ marginTop: 3 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 2 L6 10 M2 6 L10 6" stroke="rgba(200,151,26,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        )}
      </div>
    )
  }

  /* ── CLAIMED ───────────────────────────────── */
  const glowColor = wasInvaded ? 'rgba(168,40,40,0.5)' : 'rgba(200,151,26,0.4)'
  const borderColor = wasInvaded ? '#6a1818' : '#8a6a18'
  const borderHov = wasInvaded ? '#c83232' : '#c8971a'

  return (
    <div
      onClick={() => onClick(plot)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="plot-pulse"
      style={{
        position: 'absolute',
        left: `${plot.x}%`, top: `${plot.y}%`,
        width: 82, height: 70,
        cursor: 'pointer',
        border: `2px solid ${hov ? borderHov : borderColor}`,
        borderRadius: 2,
        background: wasInvaded ? 'rgba(50,10,10,0.55)' : 'rgba(10,8,4,0.5)',
        transition: 'all 0.18s ease',
        zIndex: 10,
        boxShadow: hov
          ? `0 0 28px ${glowColor}, inset 0 0 12px rgba(0,0,0,0.3)`
          : `0 0 10px ${glowColor.replace('0.5','0.2').replace('0.4','0.15')}`,
        overflow: 'visible',
      }}
    >
      {bld && (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 3, position: 'relative' }}>
          {/* Building sprite */}
          <div style={{ width: 50, height: 42 }} dangerouslySetInnerHTML={{ __html: bld.svg }} />

          {/* Mini knight — offset right */}
          <div
            style={{ position: 'absolute', bottom: 30, right: -11, zIndex: 25 }}
            dangerouslySetInnerHTML={{ __html: renderKnightSVG(plot.knightConfig || {}, 34) }}
          />

          {/* Invasion badge */}
          {wasInvaded && (
            <div style={{
              position: 'absolute', top: -8, right: -8, width: 16, height: 16,
              background: '#a02828', border: '1.5px solid #6a1818',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 8, fontFamily: 'Cinzel, serif', color: '#f0dfb4', fontWeight: 700, zIndex: 26,
            }}>
              {plot.invasions}
            </div>
          )}

          {/* Plot label / sign */}
          <div style={{
            position: 'absolute', bottom: -17, left: '50%', transform: 'translateX(-50%)',
            whiteSpace: 'nowrap', fontFamily: 'Cinzel, serif', fontSize: 7.5, letterSpacing: '0.04em',
            color: hov ? '#e8b832' : '#c8a860',
            background: 'rgba(10,8,4,0.9)',
            border: `1px solid ${hov ? '#8a6a18' : 'rgba(74,48,16,0.8)'}`,
            padding: '1px 5px', maxWidth: 95, overflow: 'hidden', textOverflow: 'ellipsis', zIndex: 20,
            transition: 'all 0.18s ease',
          }}>
            {plot.sign || bld.name}
          </div>

          {/* Hover action hint */}
          {hov && (
            <div style={{
              position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)',
              whiteSpace: 'nowrap', fontFamily: 'Cinzel, serif', fontSize: 7, letterSpacing: '0.1em',
              color: '#c8971a', background: 'rgba(10,8,4,0.92)', border: '1px solid #4a3010',
              padding: '1px 6px', zIndex: 30,
            }}>
              VIEW ESTATE
            </div>
          )}
        </div>
      )}
    </div>
  )
}
