import { KnightSVG } from '@/lib/knight'
import { KnightConfig, ARMOR_OPTIONS, HELMET_OPTIONS, SHIELD_COLOR_OPTIONS, SHIELD_DESIGN_OPTIONS, WEAPON_OPTIONS } from '@/lib/gameTypes'

interface KState { armorId: string; helmet: string; shieldId: string; shieldDesign: string; weapon: string }
interface Props { kState: KState; onChange: (k: KState) => void; nameplate?: string; fullCfg: Partial<KnightConfig> }

const Swatch = ({ c, selected, onClick, title }: { c: string; selected: boolean; onClick: () => void; title: string }) => (
  <button
    onClick={onClick}
    title={title}
    style={{
      width: 22, height: 22, borderRadius: 2, background: c, cursor: 'pointer',
      border: selected ? '2px solid rgba(10,8,4,0.9)' : '1.5px solid rgba(0,0,0,0.25)',
      transform: selected ? 'scale(1.22)' : 'scale(1)',
      transition: 'transform 0.12s ease',
      outline: selected ? '1.5px solid rgba(200,151,26,0.7)' : 'none',
      outlineOffset: 1,
    }}
  />
)

const Pill = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    style={{
      padding: '2px 7px', cursor: 'pointer', borderRadius: 2, fontSize: 9.5,
      fontFamily: 'Cinzel, serif', letterSpacing: '0.04em',
      background: selected ? '#1a1208' : 'rgba(200,180,140,0.25)',
      color: selected ? '#c8971a' : '#4a3010',
      border: selected ? '1px solid #4a3010' : '1px solid rgba(168,136,80,0.45)',
      transition: 'all 0.12s ease',
    }}
  >
    {label}
  </button>
)

const OptionRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 8 }}>
    <div style={{ fontFamily: 'Cinzel, serif', fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6a5030', marginBottom: 4 }}>{label}</div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>{children}</div>
  </div>
)

export const KnightCreator = ({ kState, onChange, nameplate, fullCfg }: Props) => {
  const set = (patch: Partial<KState>) => onChange({ ...kState, ...patch })
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      {/* Preview */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <div style={{ background: '#0c0a07', border: '2px solid #3a2a10', borderRadius: 2, padding: '0.6rem 0.4rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 120 }}>
          <KnightSVG cfg={fullCfg} height={100} />
        </div>
        {nameplate && (
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 9.5, letterSpacing: '0.04em', color: '#4a3010', textAlign: 'center' }}>{nameplate}</div>
        )}
      </div>

      {/* Options */}
      <div>
        <OptionRow label="Armor">
          {ARMOR_OPTIONS.map(a => <Swatch key={a.id} c={a.c} selected={kState.armorId === a.id} onClick={() => set({ armorId: a.id })} title={a.label} />)}
        </OptionRow>
        <OptionRow label="Helmet">
          {HELMET_OPTIONS.map(h => <Pill key={h.id} label={h.label.split(' ')[0]} selected={kState.helmet === h.id} onClick={() => set({ helmet: h.id })} />)}
        </OptionRow>
        <OptionRow label="Shield">
          {SHIELD_COLOR_OPTIONS.map(s => <Swatch key={s.id} c={s.c} selected={kState.shieldId === s.id} onClick={() => set({ shieldId: s.id })} title={s.label} />)}
        </OptionRow>
        <OptionRow label="Design">
          {SHIELD_DESIGN_OPTIONS.map(d => <Pill key={d.id} label={d.label} selected={kState.shieldDesign === d.id} onClick={() => set({ shieldDesign: d.id })} />)}
        </OptionRow>
        <OptionRow label="Weapon">
          {WEAPON_OPTIONS.map(w => <Pill key={w.id} label={w.label} selected={kState.weapon === w.id} onClick={() => set({ weapon: w.id })} />)}
        </OptionRow>
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
