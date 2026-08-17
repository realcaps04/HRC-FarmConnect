import { cn } from '../../utils/cn'

export function FilterChips({ options, value, onChange, className }) {
  return (
    <div className={cn('flex gap-2 overflow-x-auto scrollbar-none pb-1', className)}>
      {options.map((option) => {
        const selected = option === value
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              'h-9 shrink-0 rounded-full border px-3.5 text-sm font-medium transition-colors duration-150',
              selected
                ? 'border-hrc-900 bg-hrc-900 text-white'
                : 'border-sand-200 bg-white text-ink-700 hover:bg-sand-100',
            )}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
