import { cn } from '../../utils/cn'

const variants = {
  primary:
    'bg-hrc-900 text-white hover:bg-hrc-800 active:bg-hrc-950',
  secondary:
    'bg-white text-ink-950 border border-sand-200 hover:bg-sand-50',
  ghost:
    'bg-transparent text-ink-700 hover:bg-sand-100',
  danger:
    'bg-danger-100 text-danger-700 hover:bg-danger-100/80',
}

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-[15px]',
}

export function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}) {
  return (
    <Component
      type={Component === 'button' ? type : undefined}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}
