import { useEffect } from 'react'
import { Bell, X } from 'lucide-react'
import { Button } from './ui/Button'

export function DevelopmentNotice({ open, onClose }) {
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
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-5">
      <button
        type="button"
        aria-label="Close notice"
        className="absolute inset-0 bg-[#16352d]/35 backdrop-blur-[2px]"
        style={{ animation: 'overlay-in 280ms ease-out' }}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dev-notice-title"
        className="relative w-full max-w-[340px] overflow-hidden rounded-[32px] bg-white px-6 pb-6 pt-7 text-center shadow-[0_24px_48px_rgb(22_53_45/0.18)]"
        style={{ animation: 'popup-in 420ms cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-ink-400 hover:bg-sand-100 hover:text-ink-700"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-hrc-50 text-hrc-800">
          <Bell className="h-6 w-6" />
        </span>
        <h2 id="dev-notice-title" className="mt-4 text-[20px] font-bold tracking-tight text-ink-950">
          App is under development
        </h2>
        <p className="mt-2 text-sm leading-6 text-ink-500">
          Issues can be reported. A complete, polished HRC FarmConnect is releasing soon.
        </p>

        <Button className="mt-5 w-full" onClick={onClose}>
          Got it
        </Button>
      </div>
    </div>
  )
}
