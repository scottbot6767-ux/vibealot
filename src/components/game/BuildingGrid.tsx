import { BUILDINGS } from '@/lib/gameTypes'

interface Props { selected: string | null; onSelect: (key: string) => void }

export const BuildingGrid = ({ selected, onSelect }: Props) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
    {Object.entries(BUILDINGS).map(([key, bld]) => (
      <button
        key={key}
        onClick={() => onSelect(key)}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '4px 2px', aspectRatio: '1', cursor: 'pointer',
          background: selected === key ? 'rgba(30,20,8,0.2)' : 'rgba(200,180,140,0.18)',
          border: selected === key ? '2px solid #8a6a18' : '1.5px solid rgba(168,136,80,0.5)',
          borderRadius: 2,
          boxShadow: selected === key ? 'inset 0 0 0 1px rgba(138,106,24,0.3)' : 'none',
          transition: 'all 0.14s ease',
        }}
        onMouseEnter={e => { if (key !== selected) e.currentTarget.style.borderColor = 'rgba(168,136,80,0.9)' }}
        onMouseLeave={e => { if (key !== selected) e.currentTarget.style.borderColor = 'rgba(168,136,80,0.5)' }}
      >
        <div style={{ width: 36, height: 28 }} dangerouslySetInnerHTML={{ __html: bld.svg }} />
        <span style={{ fontSize: 6.5, fontFamily: 'Cinzel, serif', letterSpacing: '0.02em', color: '#4a3010', marginTop: 2 }}>{bld.name}</span>
      </button>
    ))}
  </div>
)
