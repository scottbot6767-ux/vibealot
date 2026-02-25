const Tree = ({ style, lg }: { style: React.CSSProperties; lg?: boolean }) => (
  <div className="absolute pointer-events-none" style={{ width: lg ? 26 : 20, height: lg ? 38 : 30, ...style }}>
    <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 5, height: 10, background: '#3a2a14' }} />
    <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: `${lg ? 13 : 10}px solid transparent`, borderRight: `${lg ? 13 : 10}px solid transparent`, borderBottom: `${lg ? 28 : 22}px solid #2a5220` }} />
  </div>
)

export const MapTerrain = () => (
  <>
    {/* Roads */}
    <div className="absolute" style={{ height: 13, left: 0, right: 0, top: 'calc(50% - 6px)', background: '#7a5a30', borderTop: '1px solid #5a3a18', borderBottom: '1px solid #5a3a18' }} />
    <div className="absolute" style={{ width: 13, top: 0, height: 'calc(76%)', left: 'calc(50% - 6px)', background: '#7a5a30', borderLeft: '1px solid #5a3a18', borderRight: '1px solid #5a3a18' }} />

    {/* River */}
    <div className="absolute" style={{ height: 30, left: 0, right: 0, top: '76%', background: '#2a5a8c', borderTop: '2px solid #4a7aac', borderBottom: '2px solid #1a4a6c', zIndex: 5 }} />

    {/* Bridge */}
    <div className="absolute" style={{ width: 65, height: 48, top: 'calc(76% - 9px)', left: '50%', transform: 'translateX(-50%)', background: '#6b4a2a', border: '2px solid #3a2a14', zIndex: 15 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 6px, rgba(0,0,0,0.2) 6px, rgba(0,0,0,0.2) 7px)' }} />
    </div>

    {/* Trees */}
    <Tree style={{ top: '4%', left: '3%' }} />
    <Tree style={{ top: '7%', left: '9%' }} lg />
    <Tree style={{ top: '3%', left: '16%' }} />
    <Tree style={{ top: '8%', right: '4%' }} lg />
    <Tree style={{ top: '4%', right: '11%' }} />
    <Tree style={{ top: '10%', right: '18%' }} />
    <Tree style={{ bottom: '6%', left: '3%' }} lg />
    <Tree style={{ bottom: '9%', left: '12%' }} />
    <Tree style={{ bottom: '4%', right: '6%' }} />
    <Tree style={{ bottom: '8%', right: '16%' }} lg />
    <Tree style={{ top: '42%', left: '3%' }} />
    <Tree style={{ top: '42%', right: '3%' }} />

    {/* Pond */}
    <div className="absolute" style={{ width: 52, height: 36, top: '14%', right: '4%', background: '#2a5a8c', border: '2px solid #4a7aac', borderRadius: '50%' }} />
  </>
)
