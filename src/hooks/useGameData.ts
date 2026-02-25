import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Plot } from '@/lib/gameTypes'

function mapRow(p: Record<string, unknown>): Plot {
  return {
    id: p.id as number,
    plotNumber: p.plot_number as number,
    x: parseFloat(p.x_position as string),
    y: parseFloat(p.y_position as string),
    claimed: p.claimed as boolean,
    owner: (p.owner_name as string) || undefined,
    ownerTitle: (p.owner_title as string) || undefined,
    building: (p.building_type as string) || undefined,
    sign: (p.sign_text as string) || undefined,
    knightConfig: (p.knight_config as Plot['knightConfig']) || undefined,
    invasions: (p.invasion_count as number) || 0,
    discordUsername: (p.discord_username as string) || undefined,
    plotPasscode: (p.plot_passcode as string) || undefined,
    claimedAt: (p.claimed_at as string) || undefined,
  }
}

export function useGameData() {
  const [plots, setPlots] = useState<Plot[]>([])
  const [loading, setLoading] = useState(true)
  const [realtimeStatus, setRealtimeStatus] = useState<'connected' | 'connecting'>('connecting')

  useEffect(() => {
    supabase.from('plots').select('*').order('plot_number').then(({ data, error }) => {
      if (error) { console.error(error); setLoading(false); return }
      setPlots((data || []).map(mapRow))
      setLoading(false)
    })

    const channel = supabase.channel('vibe-plots')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'plots' }, payload => {
        const updated = mapRow(payload.new as Record<string, unknown>)
        setPlots(prev => prev.map(p => p.id === updated.id ? updated : p))
      })
      .subscribe(status => {
        setRealtimeStatus(status === 'SUBSCRIBED' ? 'connected' : 'connecting')
      })

    return () => { channel.unsubscribe() }
  }, [])

  return { plots, setPlots, loading, realtimeStatus }
}
