import { useState, useRef } from 'react'
import { Plot, OWNER_TITLES, ROLL_THRESHOLD, INVASION_KEY, DISCORD_WEBHOOK, BUILDINGS } from '@/lib/gameTypes'
import { supabase } from '@/lib/supabase'
import { Modal, FG, Input, Select, SectionLabel, HR, BtnGhost } from './Modal'
import { BuildingGrid } from './BuildingGrid'
import { KnightCreator, kStateToConfig } from './KnightCreator'

interface Props { plot: Plot | null; open: boolean; onClose: () => void }
const DEFAULT_K = { armorId: 'iron', helmet: 'greathelm', shieldId: 'crimson', shieldDesign: 'diagonal', weapon: 'axe' }

type Phase = 'form' | 'rolling' | 'result'

export const InvasionModal = ({ plot, open, onClose }: Props) => {
  const [title, setTitle]       = useState('Sir')
  const [name, setName]         = useState('')
  const [discord, setDiscord]   = useState('')
  const [sign, setSign]         = useState('')
  const [building, setBuilding] = useState<string | null>(null)
  const [kState, setKState]     = useState(DEFAULT_K)
  const [phase, setPhase]       = useState<Phase>('form')
  const [roll, setRoll]         = useState(0)
  const [busy, setBusy]         = useState(false)
  const [shaking, setShaking]   = useState(false)
  const diceRef = useRef<HTMLDivElement>(null)

  if (!plot?.claimed) return null

  const kCfg    = kStateToConfig(kState)
  const success  = roll >= ROLL_THRESHOLD
  const nat20    = roll === 20
  const nat1     = roll === 1
  const victim   = `${plot.ownerTitle || ''} ${plot.owner || ''}`.trim()
  const nameplate = `${title} ${name || 'Raider'}`

  const handleRoll = async () => {
    if (!name.trim()) return alert('Thy name is required!')
    if (!building) return alert('Choose thy victorious building!')
    setPhase('rolling')
    await new Promise(r => setTimeout(r, 200))
    const r = Math.floor(Math.random() * 20) + 1
    setRoll(r)
    localStorage.setItem(INVASION_KEY, Date.now().toString())
    await new Promise(r2 => setTimeout(r2, 1800))
    setPhase('result')
    if (r < ROLL_THRESHOLD) {
      setShaking(true)
      setTimeout(() => setShaking(false), 450)
    }
  }

  const handleConquer = async () => {
    if (!success || !building) return
    setBusy(true)
    try {
      const { error } = await supabase.from('plots').update({
        owner_name: name.trim(), owner_title: title,
        building_type: building, sign_text: sign.trim() || null,
        knight_config: kStateToConfig(kState),
        claimed_at: new Date().toISOString(),
        invasion_count: (plot.invasions || 0) + 1,
        discord_username: discord.trim() || null,
        victim_discord: plot.discordUsername || null,
        invader_name: name.trim(),
        last_roll: roll,
        last_invaded_at: new Date().toISOString(),
        discord_notified: !plot.discordUsername,
      }).eq('id', plot.id).eq('claimed', true)
      if (error) throw error

      if (plot.discordUsername) {
        const rollLabel = nat20 ? '**20** — CRITICAL STRIKE!' : `**${roll}**`
        fetch(DISCORD_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `⚔️ **VIBEALOT INVASION ALERT** ⚔️\n\n@${plot.discordUsername} — **${victim}**'s estate on **Plot #${plot.plotNumber}** has fallen!\n**${name}** rolled ${rollLabel} and breached the gates.\n${plot.sign ? `"${plot.sign}" is no more. ` : ''}The kingdom witnesses thy downfall.\n<https://scottbot6767-ux.github.io/vibealot/>`
          })
        }).catch(() => {})
      }

      onClose()
      setPhase('form'); setName(''); setSign(''); setDiscord(''); setBuilding(null); setKState(DEFAULT_K)
    } catch { alert('Conquest failed — check console.') }
    finally { setBusy(false) }
  }

  const verdict = () => {
    if (nat20)   return { text: 'CRITICAL STRIKE', sub: 'Absolute domination. The gods bow to thy might.', color: '#e8b832' }
    if (nat1)    return { text: 'CATASTROPHIC FUMBLE', sub: 'Thy sword breaks. The defenders laugh. Legendary failure.', color: '#9a9088' }
    if (success) return { text: 'VICTORY', sub: `A roll of ${roll}. The walls have fallen. Plant thy banner.`, color: '#5a9a40' }
    return { text: 'REPELLED', sub: `A roll of ${roll}. Need ${ROLL_THRESHOLD}+. Thy forces scatter in shame.`, color: '#a02828' }
  }

  const DiceIcon = ({ rolling }: { rolling: boolean }) => (
    <svg viewBox="0 0 100 100" width={rolling ? 130 : 105} height={rolling ? 130 : 105} className={rolling ? 'animate-diceroll' : ''}>
      <polygon points="50,5 95,28 95,72 50,95 5,72 5,28" fill="#0c0a07" stroke="#c8971a" strokeWidth="2.5"/>
      <polygon points="50,18 80,62 20,62" fill="none" stroke="rgba(200,151,26,0.3)" strokeWidth="1.5"/>
      <text x="50" y="55" textAnchor="middle" dominantBaseline="middle" fill={rolling ? '#c8971a' : verdict().color} fontSize="26" fontFamily="Cinzel Decorative, serif" fontWeight="700">
        {rolling ? '?' : roll}
      </text>
    </svg>
  )

  return (
    <Modal open={open} onClose={onClose} title={`Invade ${victim}'s Estate`} subtitle={`Plot #${plot.plotNumber} — roll ${ROLL_THRESHOLD}+ to conquer`} width={700} variant="danger">
      {phase === 'form' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
            <div>
              <FG label="Thy Title"><Select value={title} onChange={e => setTitle(e.target.value)}>{OWNER_TITLES.map(t => <option key={t}>{t}</option>)}</Select></FG>
              <FG label="Thy Name"><Input value={name} onChange={e => setName(e.target.value)} placeholder="Raider McRaidface" maxLength={20} /></FG>
              <FG label="Discord Username" hint="(so thy victim is notified)"><Input value={discord} onChange={e => setDiscord(e.target.value)} placeholder="your_username" maxLength={50} autoComplete="off" /></FG>
              <FG label="If Victorious, Thy Sign"><Input value={sign} onChange={e => setSign(e.target.value)} placeholder="The Conquest Inn" maxLength={25} /></FG>
              <HR />
              <SectionLabel>Thy Victorious Building</SectionLabel>
              <BuildingGrid selected={building} onSelect={setBuilding} />
            </div>
            <div>
              <SectionLabel>Thy Knight</SectionLabel>
              <KnightCreator kState={kState} onChange={setKState} nameplate={nameplate} fullCfg={kCfg} />
            </div>
          </div>
          <div style={{ marginTop: '1.1rem' }}>
            <button
              onClick={handleRoll}
              className="btn btn-crim w-full"
              style={{ padding: '0.88rem', fontSize: '0.92rem' }}
            >
              Sound the War Horn — Roll the d20
            </button>
          </div>
        </>
      )}

      {phase === 'rolling' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '3rem 0' }}>
          <DiceIcon rolling />
          <div className="font-heading" style={{ fontSize: '1rem', letterSpacing: '0.2em', color: '#c8971a' }}>
            Rolling...
          </div>
        </div>
      )}

      {phase === 'result' && (() => {
        const v = verdict()
        return (
          <div ref={diceRef} className={shaking ? 'animate-shake' : ''} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '2rem 0', textAlign: 'center' }}>
            <div className="animate-resultpop">
              <DiceIcon rolling={false} />
            </div>
            <div className="font-title animate-resultpop" style={{ fontSize: '2.2rem', color: v.color, animationDelay: '0.08s', lineHeight: 1 }}>
              {v.text}
            </div>
            <div className="font-body animate-resultpop" style={{ fontSize: '0.95rem', color: '#6a5030', maxWidth: 360, animationDelay: '0.16s', fontStyle: 'italic' }}>
              {v.sub}
            </div>
            <div className="flex gap-3 mt-2">
              <BtnGhost onClick={onClose} style={{ minWidth: 100 }}>Retreat</BtnGhost>
              {success && (
                <button
                  onClick={handleConquer}
                  disabled={busy}
                  className="btn"
                  style={{ minWidth: 150, padding: '0.65rem 1.2rem', fontSize: '0.8rem', background: '#2a5220', color: '#f0dfb4', border: '2px solid #1e3614', opacity: busy ? 0.5 : 1 }}
                >
                  {busy ? 'Claiming...' : 'Plant Thy Banner'}
                </button>
              )}
            </div>
          </div>
        )
      })()}
    </Modal>
  )
}
