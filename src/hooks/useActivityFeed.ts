import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export interface ActivityEvent {
  id: string
  type: 'claim' | 'invasion'
  plotNumber: number
  actor: string
  victim?: string
  buildingType?: string
  sign?: string
  roll?: number
  ts: string
}

function buildEvents(rows: Record<string, unknown>[]): ActivityEvent[] {
  const events: ActivityEvent[] = []
  for (const r of rows) {
    const pn = r.plot_number as number
    const o = r.owner_name as string | null
    const ot = r.owner_title as string | null
    const bi = r.building_type as string | null
    const sg = r.sign_text as string | null

    if (r.last_invaded_at && r.invader_name) {
      events.push({
        id: `inv-${r.id}`,
        type: 'invasion',
        plotNumber: pn,
        actor: `${ot || ''} ${r.invader_name as string}`.trim(),
        victim: o ? `${ot || ''} ${o}`.trim() : undefined,
        buildingType: bi || undefined,
        sign: sg || undefined,
        roll: r.last_roll as number | undefined,
        ts: r.last_invaded_at as string,
      })
    } else if (r.claimed && r.claimed_at) {
      events.push({
        id: `claim-${r.id}`,
        type: 'claim',
        plotNumber: pn,
        actor: `${ot || ''} ${o || ''}`.trim(),
        buildingType: bi || undefined,
        sign: sg || undefined,
        ts: r.claimed_at as string,
      })
    }
  }
  return events.sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime())
}

function relTime(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins < 2)  return 'just now'
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

export { relTime }

export function useActivityFeed() {
  const [events, setEvents] = useState<ActivityEvent[]>([])

  const refetch = async () => {
    const { data } = await supabase
      .from('plots')
      .select('id,plot_number,claimed,owner_name,owner_title,building_type,sign_text,claimed_at,last_invaded_at,invader_name,last_roll,invasion_count')
      .eq('claimed', true)
      .order('claimed_at', { ascending: false })
      .limit(30)
    if (data) setEvents(buildEvents(data as Record<string, unknown>[]))
  }

  useEffect(() => {
    refetch()
    const channel = supabase.channel('activity-feed')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'plots' }, () => refetch())
      .subscribe()
    return () => { channel.unsubscribe() }
  }, [])

  return events
}
