import { Link } from 'react-router-dom'
import { formatDate } from '../utils/format'
import { ProductStatusBadge } from './ProductStatusBadge'

export function ProductCard({ item }) {
  const product = item.product

  return (
    <Link
      to={`/products/${item.id}`}
      className="block rounded-xl border border-sand-200 bg-white p-4 shadow-[0_1px_2px_rgb(28_25_23/0.04)] transition-colors hover:bg-sand-50"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-semibold text-ink-950">{product?.name}</h3>
          <p className="mt-1 text-sm text-ink-500">{product?.category}</p>
        </div>
        <ProductStatusBadge status={item.status} />
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <div>
          <dt className="text-ink-400">Crop</dt>
          <dd className="mt-0.5 font-medium text-ink-950">{item.cropName}</dd>
        </div>
        <div>
          <dt className="text-ink-400">Quantity</dt>
          <dd className="mt-0.5 font-medium text-ink-950">{item.quantityLabel}</dd>
        </div>
        <div>
          <dt className="text-ink-400">Purchased</dt>
          <dd className="mt-0.5 font-medium text-ink-950">{formatDate(item.purchasedOn)}</dd>
        </div>
        <div>
          <dt className="text-ink-400">Purpose</dt>
          <dd className="mt-0.5 font-medium text-ink-950">{product?.purpose}</dd>
        </div>
      </dl>
    </Link>
  )
}
