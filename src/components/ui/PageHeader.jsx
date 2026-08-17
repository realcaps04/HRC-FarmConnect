import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { cn } from '../../utils/cn'

export function PageHeader({
  title,
  subtitle,
  backTo,
  actions,
  className,
}) {
  return (
    <header className={cn('mb-6', className)}>
      {backTo ? (
        <Link
          to={backTo}
          className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-ink-500 transition-colors hover:text-hrc-800"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Link>
      ) : null}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink-950">{title}</h1>
          {subtitle ? (
            <p className="mt-1 text-sm leading-6 text-ink-500">{subtitle}</p>
          ) : null}
        </div>
        {actions}
      </div>
    </header>
  )
}

export function SectionHeader({ title, action, className }) {
  return (
    <div className={cn('mb-3 flex items-end justify-between gap-3', className)}>
      <h2 className="text-[15px] font-semibold text-ink-950">{title}</h2>
      {action}
    </div>
  )
}
