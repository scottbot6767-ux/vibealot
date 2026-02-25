import { useState } from 'react'
import { Plot, BUILDINGS } from '@/lib/gameTypes'
import { supabase, hashPasscode } from '@/lib/supabase'
import { Modal, FG, Input, SectionLabel, HR } from './Modal'
import { BuildingGrid } from './BuildingGrid'

interface Props { plot: Plot | null; open: boolean; onClose: () => void }

export const ManageEstateModal = ({ plot, open, onClose }: Props) => {
  const [phase, setPhase] = useState<'lock' | 'edit'>('lock')
  const [pcInput, setPcInput] = useState('')
  const [pcError, setPcError] = useState(false)
  const [discord, setDiscord] = useState('')
  const [sign, setSign] = useState('')
  const [building, setBuilding] = useState<string | null>(null)
  const [newPc, setNewPc] = useState('')
  const [busy, setBusy] = useState(false)

  if (!plot) return null

  const openEdit = () => {
    setDiscord(plot.discordUsername || '')
    setSign(plot.sign || '')
    setBuilding(plot.building || null)
    setPhase('edit')
  }

  const handleOpen = async () => {
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
      onClose()
      setPhase('lock'); setPcInput(''); setNewPc('')
    } catch (e) { console.error(e); alert('Save failed.') }
    finally { setBusy(false) }
  }

  return (
    <Modal open={open} onClose={() => { onClose(); setPhase('lock'); setPcInput(''); setPcError(false) }} title="Manage Thy Estate" subtitle={`Plot #${plot.plotNumber} — ${plot.owner}`}>
      {phase === 'lock' && (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          {!plot.plotPasscode ? (
            <>
              <div className="font-body text-stone italic" style={{ maxWidth: 360, fontSize: '0.9rem' }}>
                No passcode was set when this land was claimed. Editing is open on the honor system — please only edit thine own estate.
              </div>
              <button onClick={openEdit} className="font-title rounded" style={{ padding: '0.7rem 2rem', background: '#b83232', color: '#e8d4a0', border: '3px solid #7a1a1a', cursor: 'pointer', letterSpacing: '0.07em' }}>
                Enter Estate
              </button>
            </>
          ) : (
            <>
              <div style={{ fontSize: '2.5rem', color: '#5a5a58' }}>&#128274;</div>
              <div className="font-heading text-ink" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Enter thy estate passcode</div>
              <input
                type="password"
                value={pcInput}
                onChange={e => { setPcInput(e.target.value); setPcError(false) }}
                onKeyDown={e => e.key === 'Enter' && handleOpen()}
                placeholder="••••••••"
                className="rounded font-body text-ink text-center"
                style={{ width: '100%', padding: '0.6rem 0.8rem', fontSize: '1.1rem', letterSpacing: '0.2em', border: `2px solid ${pcError ? '#b83232' : '#c4ae7a'}`, background: 'rgba(255,255,255,0.4)', outline: 'none' }}
                maxLength={50}
              />
              {pcError && <div className="font-heading" style={{ fontSize: '0.7rem', color: '#b83232', letterSpacing: '0.05em' }}>Wrong passcode. The gates hold firm.</div>}
              <button onClick={handleOpen} className="font-title rounded" style={{ padding: '0.7rem 2rem', background: '#b83232', color: '#e8d4a0', border: '3px solid #7a1a1a', cursor: 'pointer', letterSpacing: '0.07em', width: '100%' }}>
                Unlock Estate
              </button>
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
          <FG label="Change Passcode" hint="(leave blank to keep current)">
            <Input type="password" value={newPc} onChange={e => setNewPc(e.target.value)} placeholder="••••••••" maxLength={50} autoComplete="new-password" />
          </FG>
          <HR />
          <SectionLabel>Building Type</SectionLabel>
          <BuildingGrid selected={building} onSelect={setBuilding} />
          <button
            onClick={handleSave}
            disabled={busy}
            className="w-full mt-4 font-title rounded"
            style={{ padding: '0.8rem', fontSize: '0.9rem', background: busy ? undefined : '#9a7818', color: '#e8d4a0', border: '3px solid #3a2a14', cursor: busy ? 'not-allowed' : 'pointer', letterSpacing: '0.06em', opacity: busy ? 0.5 : 1 }}
          >
            {busy ? 'Saving...' : 'Save Changes'}
          </button>
        </>
      )}
    </Modal>
  )
}
