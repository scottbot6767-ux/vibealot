import { Plot } from '@/lib/gameTypes'

interface Props { plots: Plot[] }

export const StatsBar = ({ plots }: Props) => {
  const claimed  = plots.filter(p => p.claimed).length
  const citizens = new Set(plots.filter(p => p.claimed && p.owner).map(p => p.owner)).size
  const invasions = plots.reduce((s, p) => s + (p.invasions || 0), 0)

  const stats = [
    { label: 'Plots Available', value: plots.length - claimed },
    { label: 'Plots Claimed',   value: claimed },
    { label: 'Citizens',        value: citizens },
    { label: 'Invasions',       value: invasions },
  ]

  return (
    <div className="bg-card border-b border-wood-dark py-2 px-6 flex justify-center gap-8 flex-wrap">
      {stats.map((s, i) => (
        <div key={s.label} className="flex items-center gap-2">
          {i > 0 && <div className="w-px h-4 bg-wood" />}
          <span className="font-heading text-parchment-dim text-xs tracking-wider">{s.label}</span>
          <span className="font-heading text-gold font-bold text-sm">{s.value}</span>
        </div>
      ))}
    </div>
  )
}
