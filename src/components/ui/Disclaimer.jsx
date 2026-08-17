import { AlertTriangle } from 'lucide-react'
import { USAGE_DISCLAIMER } from '../../data'
import { cn } from '../../utils/cn'

export function Disclaimer({ className, note }) {
  return (
    <aside
      className={cn(
        'flex gap-3 rounded-xl border border-gold-100 bg-gold-100/50 px-4 py-3 text-sm leading-6 text-ink-700',
        className,
      )}
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
      <div>
        {note ? <p className="mb-1 font-medium text-ink-950">{note}</p> : null}
        <p>{USAGE_DISCLAIMER}</p>
      </div>
    </aside>
  )
}
