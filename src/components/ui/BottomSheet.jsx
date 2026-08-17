import { useEffect } from 'react'
import { cn } from '../../utils/cn'

export function BottomSheet({ open, onClose, title, children, className }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close sheet"
        className="absolute inset-0 bg-ink-950/40"
        style={{ animation: 'overlay-in 160ms ease-out' }}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'absolute inset-x-0 bottom-0 rounded-t-2xl border border-sand-200 bg-white px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_8px_24px_rgb(28_25_23/0.08)]',
          className,
        )}
        style={{ animation: 'sheet-in 200ms ease-out' }}
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-sand-200" />
        {title ? (
          <h2 className="mb-4 text-lg font-semibold text-ink-950">{title}</h2>
        ) : null}
        {children}
      </div>
    </div>
  )
}
