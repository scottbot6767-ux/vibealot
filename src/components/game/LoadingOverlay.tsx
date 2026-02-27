export const LoadingOverlay = () => (
  <div style={{ position: 'fixed', inset: 0, background: '#060504', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 9999, gap: 20 }}>
    {/* Spinner */}
    <div style={{ width: 52, height: 52, borderRadius: '50%', border: '3px solid rgba(74,48,16,0.4)', borderTopColor: '#c8971a', animation: 'spin 1.1s linear infinite' }} />
    <div className="font-title" style={{ fontSize: '1.1rem', letterSpacing: '0.2em', color: '#c8971a', opacity: 0.8 }}>
      Entering the Kingdom...
    </div>
    <div className="font-heading" style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: 'rgba(200,151,26,0.35)', textTransform: 'uppercase' }}>
      Loading thy realm
    </div>
  </div>
)
