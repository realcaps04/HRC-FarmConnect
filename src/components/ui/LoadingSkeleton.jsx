import { cn } from '../../utils/cn'

export function LoadingSkeleton({ className, lines = 3 }) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={cn('skeleton h-16 rounded-xl', index === 0 && 'h-28')}
        />
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return <div className="skeleton h-24 rounded-xl" />
}
