import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
  dismissible = true,
}) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape' && dismissible && onClose) onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose, dismissible])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {dismissible && onClose ? (
        <button
          type="button"
          aria-label="Close dialog"
          className="absolute inset-0 bg-ink-950/40"
          style={{ animation: 'overlay-in 160ms ease-out' }}
          onClick={onClose}
        />
      ) : (
        <div
          className="absolute inset-0 bg-ink-950/40"
          style={{ animation: 'overlay-in 160ms ease-out' }}
        />
      )}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'relative w-full max-w-lg rounded-[28px] border border-sand-200 bg-white p-5 shadow-[0_8px_24px_rgb(28_25_23/0.08)]',
          className,
        )}
        style={{ animation: 'page-enter 180ms ease-out' }}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold text-ink-950">{title}</h2>
          {dismissible && onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-ink-400 hover:bg-sand-100 hover:text-ink-700"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  )
}
