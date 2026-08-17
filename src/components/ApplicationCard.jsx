import { Link } from 'react-router-dom'
import { formatDate } from '../utils/format'
import { ProductStatusBadge } from './ProductStatusBadge'

export function ApplicationCard({ application }) {
  return (
    <Link
      to={`/applications/${application.id}`}
      className="block rounded-xl border border-sand-200 bg-white p-4 shadow-[0_1px_2px_rgb(28_25_23/0.04)] transition-colors hover:bg-sand-50"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
          {formatDate(application.date)}
        </p>
        <ProductStatusBadge status={application.status} />
      </div>
      <h3 className="mt-2 text-[15px] font-semibold text-ink-950">{application.productName}</h3>
      <p className="mt-1 text-sm text-ink-500">{application.cropName}</p>
      <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-ink-400">Quantity used</dt>
          <dd className="mt-0.5 font-medium text-ink-950">{application.quantityUsed}</dd>
        </div>
        <div>
          <dt className="text-ink-400">Plot</dt>
          <dd className="mt-0.5 font-medium text-ink-950">{application.plotName}</dd>
        </div>
      </dl>
    </Link>
  )
}
