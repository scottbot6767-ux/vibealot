import { useState } from 'react'
import { Plot } from '@/lib/gameTypes'
import { supabase, hashPasscode } from '@/lib/supabase'
import { Modal, FG, Input, SectionLabel, HR, BtnGhost, BtnPrimary } from './Modal'
import { BuildingGrid } from './BuildingGrid'

interface Props { plot: Plot | null; open: boolean; onClose: () => void }

export const ManageEstateModal = ({ plot, open, onClose }: Props) => {
  const [phase, setPhase]   = useState<'lock' | 'edit'>('lock')
  const [pcInput, setPcInput] = useState('')
  const [pcError, setPcError] = useState(false)
  const [discord, setDiscord] = useState('')
  const [sign, setSign]     = useState('')
  const [building, setBuilding] = useState<string | null>(null)
  const [newPc, setNewPc]   = useState('')
  const [busy, setBusy]     = useState(false)

  if (!plot) return null

  const openEdit = () => {
    setDiscord(plot.discordUsername || '')
    setSign(plot.sign || '')
    setBuilding(plot.building || null)
    setPhase('edit')
  }

  const handleUnlock = async () => {
    if (!plot.plotPasscode) { openEdit(); return }
    const hash = await hashPasscode(pcInput)
    if (hash !== plot.plotPasscode) { setPcError(true); setPcInput(''); return }
    setPcError(false); openEdit()
  }

  const handleSave = async () => {
    setBusy(true)
    try {
      const newHash = newPc.trim() ? await hashPasscode(newPc) : (plot.plotPasscode || null)
      const { error } = await supabase.from('plots').update({
        discord_username: discord.trim() || null,
        sign_text: sign.trim() || null,
        building_type: building || plot.building,
        plot_passcode: newHash,
      }).eq('id', plot.id).eq('claimed', true)
      if (error) throw error
      onClose(); setPhase('lock'); setPcInput(''); setNewPc('')
    } catch { alert('Save failed.') }
    finally { setBusy(false) }
  }

  const doClose = () => { onClose(); setPhase('lock'); setPcInput(''); setPcError(false) }

  return (
    <Modal open={open} onClose={doClose} title="Manage Thy Estate" subtitle={`Plot #${plot.plotNumber} — ${plot.owner}`}>
      {phase === 'lock' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '1.5rem 0', textAlign: 'center' }}>
          {!plot.plotPasscode ? (
            <>
              <div style={{ fontSize: '2.5rem', opacity: 0.3 }}>&#x1F510;</div>
              <div className="font-body" style={{ maxWidth: 340, fontSize: '0.9rem', fontStyle: 'italic', color: '#6a5030' }}>
                No passcode was set at claim time. Edit freely — honor system.
              </div>
              <BtnPrimary onClick={openEdit} style={{ maxWidth: 200 }}>Enter Estate</BtnPrimary>
            </>
          ) : (
            <>
              <div style={{ fontSize: '2.8rem', opacity: 0.35 }}>&#128274;</div>
              <div className="font-heading" style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6a5030' }}>
                Enter Passcode
              </div>
              <input
                type="password"
                value={pcInput}
                onChange={e => { setPcInput(e.target.value); setPcError(false) }}
                onKeyDown={e => e.key === 'Enter' && handleUnlock()}
                placeholder="••••••••"
                className="field-input text-center"
                style={{ maxWidth: 240, letterSpacing: '0.2em', fontSize: '1.1rem', borderColor: pcError ? '#a02828' : undefined }}
                maxLength={50}
              />
              {pcError && (
                <div className="font-heading" style={{ fontSize: '0.68rem', letterSpacing: '0.06em', color: '#c83232' }}>
                  Wrong passcode. The gates hold firm.
                </div>
              )}
              <BtnPrimary onClick={handleUnlock} style={{ maxWidth: 240 }}>Unlock Estate</BtnPrimary>
            </>
          )}
        </div>
      )}

      {phase === 'edit' && (
        <>
          <FG label="Discord Username" hint="(private)">
            <Input value={discord} onChange={e => setDiscord(e.target.value)} placeholder="your_username" maxLength={50} autoComplete="off" />
          </FG>
          <FG label="Establishment Sign">
            <Input value={sign} onChange={e => setSign(e.target.value)} placeholder="The Cozy Corner" maxLength={25} />
          </FG>
          <FG label="Change Passcode" hint="(blank = keep current)">
            <Input type="password" value={newPc} onChange={e => setNewPc(e.target.value)} placeholder="••••••••" maxLength={50} autoComplete="new-password" />
          </FG>
          <HR />
          <SectionLabel>Building Type</SectionLabel>
          <BuildingGrid selected={building} onSelect={setBuilding} />
          <div style={{ display: 'flex', gap: 8, marginTop: '1rem' }}>
            <BtnGhost onClick={doClose}>Cancel</BtnGhost>
            <button onClick={handleSave} disabled={busy} className="btn btn-gold flex-1" style={{ padding: '0.75rem', fontSize: '0.85rem', opacity: busy ? 0.5 : 1 }}>
              {busy ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </>
      )}
    </Modal>
  )
}
