import { Link } from 'react-router-dom'
import { formatCurrency, formatDate } from '../utils/format'

export function PurchaseCard({ purchase }) {
  return (
    <Link
      to={`/purchases/${purchase.id}`}
      className="block rounded-xl border border-sand-200 bg-white p-4 shadow-[0_1px_2px_rgb(28_25_23/0.04)] transition-colors hover:bg-sand-50"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
        {formatDate(purchase.purchasedOn)}
      </p>
      <div className="mt-2 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-semibold text-ink-950">{purchase.productName}</h3>
          <p className="mt-1 text-sm text-ink-500">
            {purchase.quantityLabel} · {purchase.cropName}
          </p>
        </div>
        <p className="text-sm font-semibold text-ink-950">{formatCurrency(purchase.amount)}</p>
      </div>
    </Link>
  )
}
