import { useActivityFeed, relTime } from '@/hooks/useActivityFeed'
import { BUILDINGS } from '@/lib/gameTypes'

const SwordIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 10 L8 4 L10 2 L10 2 L8 4 L10 2" stroke="#c83232" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 10 L8.5 3.5" stroke="#c83232" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 2 L10 3" stroke="#c83232" strokeWidth="1" strokeLinecap="round"/>
    <path d="M6 6 L5 7" stroke="#a02828" strokeWidth="1" strokeLinecap="round"/>
  </svg>
)

const FlagIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <line x1="2" y1="1" x2="2" y2="11" stroke="#c8971a" strokeWidth="1.5" strokeLinecap="round"/>
    <polygon points="2,1 10,4 2,7" fill="#c8971a"/>
  </svg>
)

export const ActivityFeed = () => {
  const events = useActivityFeed()

  return (
    <div className="chronicle-panel flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 flex-shrink-0" style={{ borderBottom: '1px solid rgba(74,48,16,0.6)', background: 'rgba(200,151,26,0.04)' }}>
        <div className="font-heading text-gold" style={{ fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
          Kingdom Chronicle
        </div>
        <div className="font-body" style={{ fontSize: '0.72rem', color: 'rgba(200,170,110,0.5)', marginTop: 2 }}>
          {events.length} records
        </div>
      </div>

      {/* Events */}
      <div className="flex-1 overflow-y-auto">
        {events.length === 0 && (
          <div className="px-4 py-6 text-center font-body" style={{ color: 'rgba(180,150,90,0.4)', fontSize: '0.82rem', fontStyle: 'italic' }}>
            The kingdom awaits its first lord...
          </div>
        )}
        {events.map((ev, i) => {
          const bld = ev.buildingType ? BUILDINGS[ev.buildingType] : null
          const isInvasion = ev.type === 'invasion'
          return (
            <div key={ev.id} className="chronicle-item px-4 py-2.5 animate-chronicle" style={{ animationDelay: `${i * 0.04}s` }}>
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 mt-0.5">
                  {isInvasion ? <SwordIcon /> : <FlagIcon />}
                </div>
                <div className="flex-1 min-w-0">
                  {isInvasion ? (
                    <>
                      <div className="font-heading" style={{ fontSize: '0.68rem', letterSpacing: '0.02em', color: '#f0dfb4', lineHeight: 1.4 }}>
                        <span style={{ color: '#c83232' }}>{ev.actor}</span>
                        {' '}conquered{' '}
                        <span style={{ color: 'rgba(220,200,140,0.7)' }}>Plot #{ev.plotNumber}</span>
                      </div>
                      {ev.victim && (
                        <div className="font-body" style={{ fontSize: '0.72rem', color: 'rgba(180,140,100,0.65)', marginTop: 1 }}>
                          dethroned {ev.victim}
                        </div>
                      )}
                      {ev.roll && (
                        <div className="font-mono" style={{ fontSize: '0.64rem', color: 'rgba(200,151,26,0.6)', marginTop: 1 }}>
                          d20: {ev.roll} {ev.roll === 20 ? '— CRITICAL' : ''}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="font-heading" style={{ fontSize: '0.68rem', letterSpacing: '0.02em', color: '#f0dfb4', lineHeight: 1.4 }}>
                        <span style={{ color: '#c8971a' }}>{ev.actor}</span>
                        {' '}claimed{' '}
                        <span style={{ color: 'rgba(220,200,140,0.7)' }}>Plot #{ev.plotNumber}</span>
                      </div>
                      {ev.sign && (
                        <div className="font-body italic" style={{ fontSize: '0.72rem', color: 'rgba(180,140,100,0.65)', marginTop: 1 }}>
                          "{ev.sign}"
                        </div>
                      )}
                      {bld && (
                        <div className="font-body" style={{ fontSize: '0.64rem', color: 'rgba(180,140,100,0.5)', marginTop: 1 }}>
                          {bld.name}
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="flex-shrink-0 font-mono" style={{ fontSize: '0.6rem', color: 'rgba(140,110,60,0.55)', marginTop: 1, whiteSpace: 'nowrap' }}>
                  {relTime(ev.ts)}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 flex-shrink-0" style={{ borderTop: '1px solid rgba(74,48,16,0.4)', background: 'rgba(0,0,0,0.2)' }}>
        <div className="font-body text-center" style={{ fontSize: '0.62rem', color: 'rgba(140,110,60,0.4)', fontStyle: 'italic' }}>
          Live — powered by Supabase
        </div>
      </div>
    </div>
  )
}
