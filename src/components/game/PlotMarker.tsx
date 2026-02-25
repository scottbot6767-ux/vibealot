import { useState } from 'react'
import { Plot, BUILDINGS } from '@/lib/gameTypes'
import { renderKnightSVG } from '@/lib/knight'

interface Props { plot: Plot; onClick: (plot: Plot) => void }

export const PlotMarker = ({ plot, onClick }: Props) => {
  const [hovered, setHovered] = useState(false)
  const bld = plot.building ? BUILDINGS[plot.building] : null

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${plot.x}%`,
    top: `${plot.y}%`,
    width: 88,
    height: 76,
    cursor: 'pointer',
    transition: 'transform 0.18s, box-shadow 0.18s',
    transform: hovered ? 'scale(1.07)' : 'scale(1)',
    zIndex: 10,
  }

  if (!plot.claimed) {
    return (
      <div
        style={{
          ...baseStyle,
          border: hovered ? '2px solid #d4a827' : '2px dashed rgba(212,168,39,0.32)',
          borderRadius: 3,
          background: hovered ? 'rgba(212,168,39,0.1)' : 'rgba(42,74,30,0.25)',
          boxShadow: hovered ? '0 0 18px rgba(212,168,39,0.3)' : 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onClick(plot)}
      >
        <span className="font-heading absolute" style={{ fontSize: 9.5, color: hovered ? 'transparent' : 'rgba(212,168,39,0.45)', letterSpacing: '0.05em' }}>
          Plot {plot.plotNumber}
        </span>
        <span className="font-heading absolute" style={{ fontSize: 8.5, letterSpacing: '0.1em', color: '#d4a827', opacity: hovered ? 1 : 0, transition: 'opacity 0.18s', textAlign: 'center' }}>
          CLAIM LAND
        </span>
      </div>
    )
  }

  return (
    <div
      style={{
        ...baseStyle,
        border: hovered ? '2px solid #d4a827' : '2px solid #9a7818',
        borderRadius: 3,
        background: 'rgba(13,11,8,0.45)',
        boxShadow: hovered ? '0 0 22px rgba(212,168,39,0.4)' : 'none',
        overflow: 'visible',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(plot)}
    >
      {bld && (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 2, position: 'relative' }}>
          {/* Building sprite */}
          <div style={{ width: 52, height: 44 }} dangerouslySetInnerHTML={{ __html: bld.svg }} />
          {/* Mini knight */}
          <div
            style={{ position: 'absolute', bottom: 34, right: -9, zIndex: 25 }}
            dangerouslySetInnerHTML={{ __html: renderKnightSVG(plot.knightConfig || {}, 36) }}
          />
          {/* Sign */}
          <div className="font-heading" style={{
            position: 'absolute', bottom: -17, left: '50%', transform: 'translateX(-50%)',
            whiteSpace: 'nowrap', fontSize: 7, letterSpacing: '0.03em', color: '#e8d4a0',
            background: 'rgba(13,11,8,0.88)', border: '1px solid #6b4a2a',
            padding: '1px 5px', maxWidth: 96, overflow: 'hidden', textOverflow: 'ellipsis', zIndex: 20,
          }}>
            {plot.sign || bld.name}
          </div>
          {/* View hint */}
          <div className="font-heading" style={{
            position: 'absolute', bottom: -21, left: '50%', transform: 'translateX(-50%)',
            whiteSpace: 'nowrap', fontSize: 7.5, letterSpacing: '0.08em', color: '#d4a827',
            opacity: hovered ? 1 : 0, transition: 'opacity 0.18s', pointerEvents: 'none', zIndex: 30,
          }}>
            VIEW ESTATE
          </div>
        </div>
      )}
    </div>
  )
}
