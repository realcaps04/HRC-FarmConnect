import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'
import { Button } from './Button'

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionTo,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center rounded-xl border border-dashed border-sand-200 bg-white px-6 py-12 text-center',
        className,
      )}
    >
      {Icon ? (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-hrc-50 text-hrc-800">
          <Icon className="h-5 w-5" />
        </div>
      ) : null}
      <h2 className="text-base font-semibold text-ink-950">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-ink-500">{description}</p>
      {actionLabel && actionTo ? (
        <Button as={Link} to={actionTo} className="mt-5" size="sm">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}
