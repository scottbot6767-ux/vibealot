const embers = [
  { l: 12, b: 22, dur: 3.4, delay: 0,    dx: '-12px', size: 2.5, op: 0.7 },
  { l: 28, b: 18, dur: 4.1, delay: 0.8,  dx: '8px',  size: 2,   op: 0.55 },
  { l: 45, b: 30, dur: 3.8, delay: 1.5,  dx: '-6px', size: 3,   op: 0.65 },
  { l: 60, b: 15, dur: 4.6, delay: 0.3,  dx: '14px', size: 2,   op: 0.5 },
  { l: 74, b: 26, dur: 3.2, delay: 2.1,  dx: '-10px',size: 2.5, op: 0.72 },
  { l: 88, b: 20, dur: 4.3, delay: 0.6,  dx: '6px',  size: 1.8, op: 0.45 },
  { l: 35, b: 40, dur: 5.1, delay: 1.1,  dx: '-8px', size: 1.5, op: 0.4 },
  { l: 55, b: 45, dur: 3.7, delay: 2.8,  dx: '10px', size: 2.2, op: 0.6 },
  { l: 80, b: 38, dur: 4.8, delay: 0.4,  dx: '-14px',size: 1.8, op: 0.5 },
  { l: 20, b: 55, dur: 3.5, delay: 1.9,  dx: '7px',  size: 2,   op: 0.55 },
  { l: 68, b: 60, dur: 4.4, delay: 0.9,  dx: '-9px', size: 2.5, op: 0.45 },
  { l: 92, b: 50, dur: 3.9, delay: 2.4,  dx: '11px', size: 1.5, op: 0.6 },
]

export const EmberLayer = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 30 }}>
    {embers.map((e, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${e.l}%`,
          bottom: `${e.b}%`,
          width: e.size,
          height: e.size,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(255,180,50,${e.op}) 0%, rgba(230,90,10,${e.op * 0.6}) 100%)`,
          animation: `emberDrift ${e.dur}s ease-in ${e.delay}s infinite`,
          ['--dx' as string]: e.dx,
          boxShadow: `0 0 ${e.size * 2}px rgba(255,150,30,${e.op * 0.8})`,
        }}
      />
    ))}
  </div>
)
