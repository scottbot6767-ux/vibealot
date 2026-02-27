import { useState } from 'react'
import { Plot, OWNER_TITLES } from '@/lib/gameTypes'
import { supabase, hashPasscode } from '@/lib/supabase'
import { Modal, FG, Input, Select, SectionLabel, HR, BtnPrimary } from './Modal'
import { BuildingGrid } from './BuildingGrid'
import { KnightCreator, kStateToConfig } from './KnightCreator'

interface Props { plot: Plot | null; open: boolean; onClose: () => void }
const DEFAULT_K = { armorId: 'silver', helmet: 'barbuta', shieldId: 'crimson', shieldDesign: 'cross', weapon: 'sword' }

export const ClaimModal = ({ plot, open, onClose }: Props) => {
  const [title, setTitle]     = useState('Sir')
  const [name, setName]       = useState('')
  const [sign, setSign]       = useState('')
  const [discord, setDiscord] = useState('')
  const [passcode, setPasscode] = useState('')
  const [building, setBuilding] = useState<string | null>(null)
  const [kState, setKState]   = useState(DEFAULT_K)
  const [busy, setBusy]       = useState(false)

  if (!plot) return null

  const kCfg = kStateToConfig(kState)
  const nameplate = `${title} ${name || 'Vibesalot'}`

  const handleClaim = async () => {
    if (!name.trim()) return alert('Thy name is required!')
    if (!building) return alert('Choose a building for thy plot!')
    setBusy(true)
    try {
      const hashed = await hashPasscode(passcode.trim())
      const { error } = await supabase.from('plots').update({
        claimed: true, owner_name: name.trim(), owner_title: title,
        building_type: building, sign_text: sign.trim() || null,
        knight_config: kCfg, claimed_at: new Date().toISOString(),
        discord_username: discord.trim() || null,
        plot_passcode: hashed,
        discord_notified: true, victim_discord: null, invader_name: null, last_roll: null,
      }).eq('id', plot.id).eq('claimed', false)
      if (error) throw error
      onClose()
      setName(''); setSign(''); setDiscord(''); setPasscode(''); setBuilding(null); setKState(DEFAULT_K)
    } catch { alert('Claim failed — this plot may already be taken!') }
    finally { setBusy(false) }
  }

  return (
    <Modal open={open} onClose={onClose} title={`Claim Plot #${plot.plotNumber}`} subtitle="Stake thy claim in the kingdom" width={700}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
        <div>
          <FG label="Thy Title">
            <Select value={title} onChange={e => setTitle(e.target.value)}>
              {OWNER_TITLES.map(t => <option key={t}>{t}</option>)}
            </Select>
          </FG>
          <FG label="Thy Name">
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Vibesalot" maxLength={20} />
          </FG>
          <FG label="Establishment Sign">
            <Input value={sign} onChange={e => setSign(e.target.value)} placeholder="The Cozy Corner" maxLength={25} />
          </FG>
          <FG label="Discord Username" hint="(private — battle alerts)">
            <Input value={discord} onChange={e => setDiscord(e.target.value)} placeholder="your_username" maxLength={50} autoComplete="off" />
          </FG>
          <FG label="Estate Passcode" hint="(to manage later)">
            <Input type="password" value={passcode} onChange={e => setPasscode(e.target.value)} placeholder="••••••••" maxLength={50} autoComplete="new-password" />
          </FG>
          <HR />
          <SectionLabel>Choose Thy Building</SectionLabel>
          <BuildingGrid selected={building} onSelect={setBuilding} />
        </div>
        <div>
          <SectionLabel>Forge Thy Knight</SectionLabel>
          <KnightCreator kState={kState} onChange={setKState} nameplate={nameplate} fullCfg={kCfg} />
        </div>
      </div>
      <div style={{ marginTop: '1.1rem' }}>
        <BtnPrimary onClick={handleClaim} disabled={busy}>
          {busy ? 'Claiming...' : 'Plant Thy Standard'}
        </BtnPrimary>
      </div>
    </Modal>
  )
}
