import { useState } from 'react'
import { Plot, OWNER_TITLES, ROLL_THRESHOLD, INVASION_KEY, DISCORD_WEBHOOK, BUILDINGS } from '@/lib/gameTypes'
import { supabase } from '@/lib/supabase'
import { Modal, FG, Input, Select, SectionLabel, HR } from './Modal'
import { BuildingGrid } from './BuildingGrid'
import { KnightCreator, kStateToConfig } from './KnightCreator'

interface Props { plot: Plot | null; open: boolean; onClose: () => void }

const DEFAULT_K = { armorId: 'iron', helmet: 'greathelm', shieldId: 'crimson', shieldDesign: 'diagonal', weapon: 'axe' }

export const InvasionModal = ({ plot, open, onClose }: Props) => {
  const [title, setTitle]     = useState('Sir')
  const [name, setName]       = useState('')
  const [discord, setDiscord] = useState('')
  const [sign, setSign]       = useState('')
  const [building, setBuilding] = useState<string | null>(null)
  const [kState, setKState]   = useState(DEFAULT_K)
  const [phase, setPhase]     = useState<'form' | 'rolling' | 'result'>('form')
  const [roll, setRoll]       = useState(0)
  const [busy, setBusy]       = useState(false)

  if (!plot || !plot.claimed) return null

  const kCfg   = kStateToConfig(kState)
  const success = roll >= ROLL_THRESHOLD
  const victim  = `${plot.ownerTitle || ''} ${plot.owner || ''}`.trim()
  const nameplate = `${title} ${name || 'Raider'}`

  const handleRoll = async () => {
    if (!name.trim()) return alert('Thy name is required!')
    if (!building) return alert('Choose a victorious building!')
    setPhase('rolling')
    await new Promise(r => setTimeout(r, 200))
    const r = Math.floor(Math.random() * 20) + 1
    setRoll(r)
    localStorage.setItem(INVASION_KEY, Date.now().toString())
    await new Promise(r2 => setTimeout(r2, 1800))
    setPhase('result')
  }

  const handleConquer = async () => {
    if (!success || !building) return
    setBusy(true)
    try {
      const bldName = BUILDINGS[building]?.name || building
      const kc = kStateToConfig(kState)
      const invDiscord = discord.trim() || null
      const needsNotify = !!(plot.discordUsername)
      const { error } = await supabase.from('plots').update({
        owner_name: name.trim(), owner_title: title,
        building_type: building, sign_text: sign.trim() || null,
        knight_config: kc, claimed_at: new Date().toISOString(),
        invasion_count: (plot.invasions || 0) + 1,
        discord_username: invDiscord,
        victim_discord: plot.discordUsername || null,
        invader_name: name.trim(),
        last_roll: roll,
        last_invaded_at: new Date().toISOString(),
        discord_notified: !needsNotify,
      }).eq('id', plot.id).eq('claimed', true)
      if (error) throw error

      if (plot.discordUsername) {
        const rollLabel = roll === 20 ? '**20** — CRITICAL STRIKE!' : roll === 1 ? '**1** (somehow...)' : `**${roll}**`
        const signNote = plot.sign ? `"${plot.sign}" is no more. ` : ''
        fetch(DISCORD_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `⚔️ **VIBEALOT INVASION ALERT** ⚔️\n\n@${plot.discordUsername} — **${victim}**'s estate on **Plot #${plot.plotNumber}** has fallen!\n**${name}** stormed the gates rolling ${rollLabel}.\n${signNote}The kingdom witnesses thy humiliation. RIP bozo.\n<https://scottbot6767-ux.github.io/vibealot/>`
          })
        }).catch(() => {})
      }

      onClose()
      setPhase('form'); setName(''); setSign(''); setDiscord(''); setBuilding(null); setKState(DEFAULT_K)
    } catch (e) { console.error(e); alert('Conquest failed — check console.') }
    finally { setBusy(false) }
  }

  const verdictData = () => {
    if (roll === 20) return { text: 'CRITICAL STRIKE — ABSOLUTE DOMINATION!', color: '#d4a827', flavor: 'A perfect roll. The gods bow to thy might.' }
    if (roll === 1)  return { text: 'CATASTROPHIC FUMBLE — THY SWORD BREAKS!', color: '#5a5a58', flavor: 'A roll of shame. Thy army trips. The defenders laugh.' }
    if (success)     return { text: 'VICTORY — THE ESTATE IS THINE!', color: '#3e7830', flavor: `A roll of ${roll} — enough to breach the walls. Plant thy banner.` }
    return { text: 'REPELLED — THY FORCES RETREAT!', color: '#b83232', flavor: `A roll of ${roll} — not enough. ${ROLL_THRESHOLD}+ required. Humiliating.` }
  }

  return (
    <Modal open={open} onClose={onClose} title={`Invade ${victim}'s Estate`} subtitle="Roll the d20 — 13 or higher to conquer" width={700} crimsonHeader>
      {phase === 'form' && (
        <>
          <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <FG label="Thy Title"><Select value={title} onChange={e => setTitle(e.target.value)}>{OWNER_TITLES.map(t => <option key={t}>{t}</option>)}</Select></FG>
              <FG label="Thy Name"><Input value={name} onChange={e => setName(e.target.value)} placeholder="Raider McRaidface" maxLength={20} /></FG>
              <FG label="Your Discord Username" hint="(private — so thy victim is notified)"><Input value={discord} onChange={e => setDiscord(e.target.value)} placeholder="your_username" maxLength={50} autoComplete="off" /></FG>
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
          <button
            onClick={handleRoll}
            className="w-full mt-4 font-title rounded transition-all"
            style={{ padding: '0.9rem', fontSize: '1rem', background: '#b83232', color: '#e8d4a0', border: '3px solid #7a1a1a', cursor: 'pointer', letterSpacing: '0.06em' }}
          >
            Sound the War Horn — Roll the d20!
          </button>
        </>
      )}

      {phase === 'rolling' && (
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <svg className="dice-rolling" viewBox="0 0 100 100" width="120" height="120">
            <polygon points="50,4 96,28 96,72 50,96 4,72 4,28" fill="#1a1208" stroke="#d4a827" strokeWidth="3"/>
            <polygon points="50,16 82,60 18,60" fill="none" stroke="#d4a827" strokeWidth="1.5" opacity="0.4"/>
            <text x="50" y="52" textAnchor="middle" dominantBaseline="middle" fill="#d4a827" fontSize="28" fontFamily="Cinzel Decorative, serif" fontWeight="700">?</text>
          </svg>
          <div className="font-heading text-gold text-lg tracking-widest">Rolling...</div>
        </div>
      )}

      {phase === 'result' && (() => {
        const v = verdictData()
        return (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <svg viewBox="0 0 100 100" width="110" height="110">
              <polygon points="50,4 96,28 96,72 50,96 4,72 4,28" fill="#1a1208" stroke="#d4a827" strokeWidth="3"/>
              <polygon points="50,16 82,60 18,60" fill="none" stroke="#d4a827" strokeWidth="1.5" opacity="0.4"/>
              <text x="50" y="52" textAnchor="middle" dominantBaseline="middle" fill="#d4a827" fontSize="28" fontFamily="Cinzel Decorative, serif" fontWeight="700">{roll}</text>
            </svg>
            <div className="font-title result-pop" style={{ fontSize: '2.5rem', color: v.color, lineHeight: 1 }}>You rolled a {roll}</div>
            <div className="font-heading result-pop" style={{ fontSize: '1rem', letterSpacing: '0.1em', color: v.color, animationDelay: '0.1s' }}>{v.text}</div>
            <div className="font-body text-stone" style={{ maxWidth: 380, fontSize: '0.9rem' }}>{v.flavor}</div>
            <div className="flex gap-3 mt-2">
              <button onClick={onClose} className="font-heading rounded transition-all" style={{ padding: '0.6rem 1.2rem', fontSize: '0.75rem', letterSpacing: '0.08em', background: 'transparent', color: '#1a1208', border: '2px solid #c4ae7a', cursor: 'pointer' }}>Retreat</button>
              {success && (
                <button onClick={handleConquer} disabled={busy} className="font-heading rounded transition-all" style={{ padding: '0.6rem 1.4rem', fontSize: '0.78rem', letterSpacing: '0.06em', background: '#2a5220', color: '#e8d4a0', border: '2px solid #3e7830', cursor: busy ? 'not-allowed' : 'pointer', opacity: busy ? 0.6 : 1 }}>
                  {busy ? 'Claiming...' : 'Plant Thy Banner!'}
                </button>
              )}
            </div>
          </div>
        )
      })()}
    </Modal>
  )
}
