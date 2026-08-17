import { Link } from 'react-router-dom'
import { ArrowUpRight, Heart } from 'lucide-react'
import { formatCurrency, formatDateLong } from '../../utils/format'

export function PurchaseDateCard({ day }) {
  const cropLabel = day.crops.join(', ') || 'Farm'
  const categoryLabel = day.categories[0] || 'Purchase'

  return (
    <Link
      to={`/purchases?date=${day.purchasedOn}&from=dates`}
      className="block rounded-[28px] bg-white p-5 shadow-[0_10px_28px_rgb(28_25_23/0.06)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[17px] font-bold tracking-tight text-ink-950">
            {formatDateLong(day.purchasedOn)}
          </h3>
          <p className="mt-1 text-[13px] text-ink-400">
            {day.itemCount} {day.itemCount === 1 ? 'item' : 'items'} · {categoryLabel}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sand-200 text-ink-500">
            <Heart className="h-4 w-4" />
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sand-200 text-ink-700">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <div>
          <p className="text-[12px] text-ink-400">Items</p>
          <p className="mt-1 text-[15px] font-bold text-ink-950">{day.itemCount}</p>
        </div>
        <div>
          <p className="text-[12px] text-ink-400">Spend</p>
          <p className="mt-1 text-[15px] font-bold text-ink-950">{formatCurrency(day.amount)}</p>
        </div>
        <div>
          <p className="text-[12px] text-ink-400">Crops</p>
          <p className="mt-1 truncate text-[15px] font-bold text-ink-950">{cropLabel}</p>
        </div>
      </div>

      <div className="mt-5 flex h-3.5 items-stretch gap-1">
        <span className="w-[34%] rounded-full bg-gradient-to-r from-[#d6f06a] to-[#c5e85a]" />
        <span className="w-[30%] rounded-md bg-gradient-to-r from-[#6fc445] to-[#8ed85a]" />
        <span
          className="flex-1 rounded-md"
          style={{
            background:
              'repeating-linear-gradient(-45deg, #ececec 0 5px, #f6f6f6 5px 9px)',
          }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 text-[12px] text-ink-400">
        <span>{day.payment}</span>
        <span className="inline-flex items-center gap-1.5">
          GST
          <span className="rounded-full bg-[#2b2b2b] px-2 py-0.5 text-[11px] font-semibold text-white">
            {formatCurrency(day.gst)}
          </span>
        </span>
        <span className="truncate">{day.location}</span>
      </div>
    </Link>
  )
}
