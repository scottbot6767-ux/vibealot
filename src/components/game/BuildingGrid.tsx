import { BUILDINGS } from '@/lib/gameTypes'

interface Props {
  selected: string | null
  onSelect: (key: string) => void
}

export const BuildingGrid = ({ selected, onSelect }: Props) => (
  <div className="grid grid-cols-4 gap-1">
    {Object.entries(BUILDINGS).map(([key, bld]) => (
      <button
        key={key}
        onClick={() => onSelect(key)}
        className="flex flex-col items-center justify-center p-1 rounded transition-all"
        style={{
          aspectRatio: '1',
          background: selected === key ? 'rgba(26,18,8,0.12)' : 'rgba(200,180,140,0.18)',
          border: selected === key ? '2px solid #6b4a2a' : '2px solid #c4ae7a',
          boxShadow: selected === key ? 'inset 0 0 0 1px #6b4a2a' : 'none',
        }}
      >
        <div style={{ width: 38, height: 30 }} dangerouslySetInnerHTML={{ __html: bld.svg }} />
        <span className="font-heading text-ink" style={{ fontSize: 6.5, marginTop: 2 }}>{bld.name}</span>
      </button>
    ))}
  </div>
)
