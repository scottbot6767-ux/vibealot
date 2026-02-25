export const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-bg flex flex-col items-center justify-center z-50">
    <div className="w-16 h-16 border-4 border-wood-dark border-t-gold rounded-full spin" />
    <div className="font-title text-gold text-xl mt-5 tracking-widest">Entering the Kingdom...</div>
  </div>
)
