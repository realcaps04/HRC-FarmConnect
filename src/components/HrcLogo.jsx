import { Link } from 'react-router-dom'
import { cn } from '../utils/cn'

export function HrcLogo({ compact = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span
        className={cn(
          'flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_2px_8px_rgb(28_25_23/0.08)]',
          compact ? 'h-9 w-9 p-0.5' : 'h-10 w-10 p-0.5',
        )}
      >
        <img
          src="/hrc-logo.png"
          alt="Horti Research Centre LLP"
          className="h-full w-full object-contain"
        />
      </span>
      {compact ? null : (
        <span className="leading-tight">
          <span className="block text-sm font-semibold tracking-tight text-ink-950">HRC</span>
          <span className="block text-[11px] text-ink-500">FarmConnect</span>
        </span>
      )}
    </Link>
  )
}
