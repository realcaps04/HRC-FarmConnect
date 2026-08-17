import { X } from 'lucide-react'

export function ToastViewport({ toasts, onDismiss }) {
  if (!toasts.length) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-[60] flex flex-col items-center gap-2 px-4 lg:bottom-6">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-xl border border-sand-200 bg-ink-950 px-4 py-3 text-sm text-white shadow-[0_8px_24px_rgb(28_25_23/0.18)]"
          style={{ animation: 'toast-in 180ms ease-out' }}
        >
          <p className="flex-1 leading-5">{toast.message}</p>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="rounded-md p-1 text-white/70 hover:text-white"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
