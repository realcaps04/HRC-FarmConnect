import { cn } from '../utils/cn'

const styles = {
  Available: 'bg-hrc-50 text-hrc-800',
  'Partially Used': 'bg-warn-100 text-warn-700',
  'Used Up': 'bg-sand-100 text-ink-500',
  Completed: 'bg-hrc-50 text-hrc-800',
  Upcoming: 'bg-gold-100 text-gold-600',
  Recommended: 'bg-hrc-100 text-hrc-800',
}

export function ProductStatusBadge({ status, className }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center rounded-full px-2 text-[11px] font-semibold tracking-wide',
        styles[status] || 'bg-sand-100 text-ink-500',
        className,
      )}
    >
      {status}
    </span>
  )
}
