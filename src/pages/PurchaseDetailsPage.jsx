import { Link, Navigate, useParams } from 'react-router-dom'
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
            <dt className="text-ink-400">Crop</dt>
            <dd className="mt-1 font-semibold text-ink-950">{purchase.cropName}</dd>
          </div>
          <div>
            <dt className="text-ink-400">Collected at</dt>
            <dd className="mt-1 font-semibold text-ink-950">{purchase.location}</dd>
          </div>
          <div>
            <dt className="text-ink-400">Bill no.</dt>
            <dd className="mt-1 font-semibold text-ink-950">{purchase.billNo}</dd>
          </div>
        </dl>
        <p className="mt-5 text-sm leading-6 text-ink-700">{purchase.notes}</p>
      </section>

      <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
        {purchase.inventoryId ? (
          <Link to={`/products/${purchase.inventoryId}`} className="text-hrc-800">
            View in My Products
          </Link>
        ) : null}
        <Link to={`/catalogue/${purchase.productName.toLowerCase()}`} className="text-hrc-800">
          View catalogue page
        </Link>
      </div>
    </div>
  )
}
