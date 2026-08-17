import { useMemo, useState } from 'react'
import { ChevronDown, Droplets, SprayCan } from 'lucide-react'
import { purchases } from '../../data'
import { cn } from '../../utils/cn'
import { ProductPackThumb } from './ProductPackThumb'

const METHOD_ICONS = {
  spraying: SprayCan,
  pouring: Droplets,
}

export function DayHowToUse({ guide }) {
  const [open, setOpen] = useState(false)
  const [methodId, setMethodId] = useState(guide.methods[0]?.id)

  const images = useMemo(() => {
    const map = new Map()
    for (const item of purchases) {
      if (item.catalogueId && item.image) map.set(item.catalogueId, item.image)
    }
    return map
  }, [])

  const method = guide.methods.find((item) => item.id === methodId) || guide.methods[0]
  const MethodIcon = METHOD_ICONS[method?.id] || Droplets

  return (
    <section className="mt-3">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-3 rounded-[22px] bg-white px-4 py-3.5 text-left shadow-[0_8px_24px_rgb(28_25_23/0.04)]"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hrc-50 text-hrc-800">
          <SprayCan className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold text-ink-950">How to use</span>
          <span className="mt-0.5 block text-sm text-ink-500">Spraying and pouring for this day</span>
        </span>
        <ChevronDown className={cn('h-4 w-4 shrink-0 text-ink-400 transition-transform', open && 'rotate-180')} />
      </button>

      {open ? (
        <div className="mt-3 rounded-[24px] bg-white p-4 shadow-[0_8px_24px_rgb(28_25_23/0.04)]">
          <div className="grid grid-cols-2 gap-2">
            {guide.methods.map((item) => {
              const Icon = METHOD_ICONS[item.id] || Droplets
              const selected = item.id === method.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMethodId(item.id)}
                  className={cn(
                    'flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold',
                    selected ? 'bg-[#1b4036] text-white' : 'bg-[#ececec] text-ink-700',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              )
            })}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-[13px] font-semibold text-ink-950">{method.label}</p>
            <p className="text-[12px] font-medium text-ink-500">In {method.mixIn}</p>
          </div>

          <ul className="mt-3 space-y-2">
            {method.items.map((item) => (
              <li
                key={`${method.id}-${item.catalogueId}`}
                className="flex items-center gap-3 rounded-[18px] bg-[#f6f6f4] px-3 py-2.5"
              >
                <ProductPackThumb
                  src={images.get(item.catalogueId) || ''}
                  alt={item.productName}
                  className="h-11 w-11 shrink-0 rounded-xl"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-semibold text-ink-950">
                    {item.productName}
                  </span>
                  <span className="mt-0.5 block text-[12px] text-ink-500">{method.label}</span>
                </span>
                <span className="shrink-0 text-sm font-semibold text-ink-950">{item.dose}</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 flex items-center gap-2 rounded-[16px] bg-hrc-50 px-3 py-2.5 text-[13px] font-medium text-hrc-800">
            <MethodIcon className="h-4 w-4 shrink-0" />
            Mix the {method.label.toLowerCase()} items in {method.mixIn} of water.
          </p>
        </div>
      ) : null}
    </section>
  )
}
