import { Search } from 'lucide-react'
import { cn } from '../../utils/cn'

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search products, advice, crops',
  className,
  autoFocus = false,
}) {
  return (
    <label className={cn('relative block', className)}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="h-12 w-full rounded-xl border border-sand-200 bg-white pl-10 pr-4 text-[15px] text-ink-950 outline-none transition-shadow placeholder:text-ink-400 focus:border-hrc-700 focus:ring-4 focus:ring-hrc-100"
      />
    </label>
  )
}
