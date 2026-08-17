import { Navigate, useParams } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'
import { getPurchase } from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatCurrency, formatDateLong } from '../utils/format'

export function PurchaseDetailsPage() {
  const { id } = useParams()
  const purchase = getPurchase(id)
  useDocumentTitle(purchase ? purchase.productName : 'Purchase')

  if (!purchase) return <Navigate to="/purchases" replace />

  return (
    <div>
      <PageHeader
        backTo="/purchases"
        title={purchase.productName}
        subtitle={formatDateLong(purchase.purchasedOn)}
      />

      <section className="rounded-xl border border-sand-200 bg-white p-5 shadow-[0_1px_2px_rgb(28_25_23/0.04)]">
        <p className="text-2xl font-semibold tracking-tight text-ink-950">
          {formatCurrency(purchase.amount)}
        </p>
        <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-ink-400">Quantity</dt>
            <dd className="mt-1 font-semibold text-ink-950">{purchase.quantityLabel}</dd>
          </div>
          <div>
            <dt className="text-ink-400">Rate</dt>
            <dd className="mt-1 font-semibold text-ink-950">{formatCurrency(purchase.rate)}</dd>
          </div>
          <div>
            <dt className="text-ink-400">GST</dt>
            <dd className="mt-1 font-semibold text-ink-950">{purchase.gstPercent}%</dd>
          </div>
          <div>
            <dt className="text-ink-400">Category</dt>
            <dd className="mt-1 font-semibold text-ink-950">{purchase.category}</dd>
          </div>
          <div>
            <dt className="text-ink-400">Collected at</dt>
            <dd className="mt-1 font-semibold text-ink-950">{purchase.location}</dd>
          </div>
          <div>
            <dt className="text-ink-400">Bill no.</dt>
            <dd className="mt-1 font-semibold text-ink-950">{purchase.billNo}</dd>
          </div>
          <div>
            <dt className="text-ink-400">Payment</dt>
            <dd className="mt-1 font-semibold text-ink-950">{purchase.payment}</dd>
          </div>
          <div>
            <dt className="text-ink-400">Prepared by</dt>
            <dd className="mt-1 font-semibold text-ink-950">{purchase.preparedBy}</dd>
          </div>
        </dl>
        <p className="mt-5 text-sm leading-6 text-ink-700">{purchase.notes}</p>
      </section>
    </div>
  )
}
