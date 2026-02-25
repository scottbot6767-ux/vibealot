import { KnightSVG } from '@/lib/knight'
import { KnightConfig, ARMOR_OPTIONS, HELMET_OPTIONS, SHIELD_COLOR_OPTIONS, SHIELD_DESIGN_OPTIONS, WEAPON_OPTIONS } from '@/lib/gameTypes'

interface KState {
  armorId: string; helmet: string; shieldId: string; shieldDesign: string; weapon: string
}

interface Props {
  kState: KState
  onChange: (k: KState) => void
  nameplate?: string
  fullCfg: Partial<KnightConfig>
}

const Swatch = ({ c, selected, onClick }: { c: string; selected: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    style={{ width: 24, height: 24, borderRadius: 3, background: c, border: selected ? '2px solid #1a1208' : '2px solid transparent', transform: selected ? 'scale(1.18)' : 'scale(1)', transition: 'transform 0.13s' }}
  />
)

const Pill = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="font-heading rounded transition-all"
    style={{
      padding: '2px 8px', fontSize: 9.5, letterSpacing: '0.04em',
      background: selected ? '#1a1208' : 'rgba(200,180,140,0.28)',
      color: selected ? '#d4a827' : '#1a1208',
      border: selected ? '1px solid #1a1208' : '1px solid #c4ae7a',
    }}
  >
    {label}
  </button>
)

export const KnightCreator = ({ kState, onChange, nameplate, fullCfg }: Props) => {
  const set = (patch: Partial<KState>) => onChange({ ...kState, ...patch })

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Preview */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center justify-center rounded" style={{ background: '#1a1208', border: '2px solid #6b4a2a', padding: '0.7rem 0.5rem', width: '100%', minHeight: 130 }}>
          <KnightSVG cfg={fullCfg} height={108} />
        </div>
        {nameplate && <div className="font-heading text-ink text-center" style={{ fontSize: 10.5, letterSpacing: '0.04em' }}>{nameplate}</div>}
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2">
        <div>
          <div className="font-heading text-stone mb-1" style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Armor</div>
          <div className="flex flex-wrap gap-1">
            {ARMOR_OPTIONS.map(a => <Swatch key={a.id} c={a.c} selected={kState.armorId === a.id} onClick={() => set({ armorId: a.id })} />)}
          </div>
        </div>
        <div>
          <div className="font-heading text-stone mb-1" style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Helmet</div>
          <div className="flex flex-wrap gap-1">
            {HELMET_OPTIONS.map(h => <Pill key={h.id} label={h.label} selected={kState.helmet === h.id} onClick={() => set({ helmet: h.id })} />)}
          </div>
        </div>
        <div>
          <div className="font-heading text-stone mb-1" style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Shield</div>
          <div className="flex flex-wrap gap-1">
            {SHIELD_COLOR_OPTIONS.map(s => <Swatch key={s.id} c={s.c} selected={kState.shieldId === s.id} onClick={() => set({ shieldId: s.id })} />)}
          </div>
        </div>
        <div>
          <div className="font-heading text-stone mb-1" style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Design</div>
          <div className="flex flex-wrap gap-1">
            {SHIELD_DESIGN_OPTIONS.map(d => <Pill key={d.id} label={d.label} selected={kState.shieldDesign === d.id} onClick={() => set({ shieldDesign: d.id })} />)}
          </div>
        </div>
        <div>
          <div className="font-heading text-stone mb-1" style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Weapon</div>
          <div className="flex flex-wrap gap-1">
            {WEAPON_OPTIONS.map(w => <Pill key={w.id} label={w.label} selected={kState.weapon === w.id} onClick={() => set({ weapon: w.id })} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export function kStateToConfig(k: KState): KnightConfig {
  const a = ARMOR_OPTIONS.find(x => x.id === k.armorId) || ARMOR_OPTIONS[0]
  const s = SHIELD_COLOR_OPTIONS.find(x => x.id === k.shieldId) || SHIELD_COLOR_OPTIONS[0]
  return {
    armorColor: a.c, armorDark: a.dk,
    helmetType: k.helmet as KnightConfig['helmetType'],
    shieldColor: s.c, shieldDark: s.dk,
    shieldDesign: k.shieldDesign as KnightConfig['shieldDesign'],
    weapon: k.weapon as KnightConfig['weapon'],
  }
}
