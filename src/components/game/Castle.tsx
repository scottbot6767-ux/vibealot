export const Castle = () => (
  <div className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -56%)', width: 195, height: 180, zIndex: 20 }}>
    {/* Left tower */}
    <div className="absolute" style={{ bottom: 0, left: 5, width: 38, height: 118, background: '#7a7a78', border: '2px solid #4a4a48' }}>
      <div style={{ position: 'absolute', top: -15, left: -2, right: -2, height: 17, background: 'repeating-linear-gradient(90deg,#7a7a78 0px,#7a7a78 9px,transparent 9px,transparent 14px)' }} />
      <div style={{ position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)', width: 11, height: 20, background: '#1a1210', borderRadius: '6px 6px 0 0' }} />
    </div>
    {/* Right tower */}
    <div className="absolute" style={{ bottom: 0, right: 5, width: 38, height: 118, background: '#7a7a78', border: '2px solid #4a4a48' }}>
      <div style={{ position: 'absolute', top: -15, left: -2, right: -2, height: 17, background: 'repeating-linear-gradient(90deg,#7a7a78 0px,#7a7a78 9px,transparent 9px,transparent 14px)' }} />
      <div style={{ position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)', width: 11, height: 20, background: '#1a1210', borderRadius: '6px 6px 0 0' }} />
    </div>
    {/* Base wall */}
    <div className="absolute" style={{ bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 148, height: 82, background: '#5a5a58', border: '3px solid #3a3a38' }}>
      <div style={{ position: 'absolute', top: -14, left: 0, right: 0, height: 15, background: 'repeating-linear-gradient(90deg,#5a5a58 0px,#5a5a58 11px,transparent 11px,transparent 16px)' }} />
    </div>
    {/* Keep */}
    <div className="absolute" style={{ bottom: 66, left: '50%', transform: 'translateX(-50%)', width: 66, height: 98, background: '#5a5a58', border: '3px solid #3a3a38' }}>
      {/* Red roof */}
      <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '38px solid transparent', borderRight: '38px solid transparent', borderBottom: '48px solid #7a1a1a' }} />
      {/* Door */}
      <div style={{ position: 'absolute', bottom: 5, left: '50%', transform: 'translateX(-50%)', width: 21, height: 38, background: '#1a1210', borderRadius: '10px 10px 0 0' }} />
      {/* Flag pole */}
      <div style={{ position: 'absolute', top: -106, left: '50%', transform: 'translateX(-50%)', width: 3, height: 46, background: '#4a4a48' }}>
        <div style={{ position: 'absolute', top: 0, left: 4, width: 26, height: 16, background: '#b83232', clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
      </div>
    </div>
    {/* Label */}
    <div className="absolute font-heading text-parchment tracking-wider" style={{ bottom: -28, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontSize: 10, background: 'rgba(13,11,8,0.9)', padding: '2px 9px', border: '1px solid #9a7818' }}>
      VIBEALOT CASTLE
    </div>
  </div>
)
