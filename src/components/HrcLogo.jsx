import { Link } from 'react-router-dom'
import { cn } from '../utils/cn'

export function HrcLogo({ compact = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <img
        src="/hrc-logo.png"
        alt="Horti Research Centre LLP"
        className={cn('shrink-0 object-contain', compact ? 'h-9 w-9' : 'h-10 w-10')}
      />
      {compact ? null : (
        <span className="leading-tight">
          <span className="block text-sm font-semibold tracking-tight text-ink-950">HRC</span>
          <span className="block text-[11px] text-ink-500">Farmer Companion</span>
        </span>
      )}
    </Link>
  )
}
