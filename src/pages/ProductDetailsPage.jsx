import { Link, Navigate, useParams } from 'react-router-dom'
import { ProductStatusBadge } from '../components/ProductStatusBadge'
import { Disclaimer } from '../components/ui/Disclaimer'
import { PageHeader } from '../components/ui/PageHeader'
import { getInventoryItem, hydrateInventoryItem } from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatDateLong } from '../utils/format'

export function ProductDetailsPage() {
  const { id } = useParams()
  const raw = getInventoryItem(id)
  const item = raw ? hydrateInventoryItem(raw) : null
  const product = item?.product
  useDocumentTitle(product?.name || 'Product')

  if (!item || !product) return <Navigate to="/products" replace />

  return (
    <div>
      <PageHeader backTo="/products" title={product.name} subtitle={product.purpose} />

      <div
        className="mb-5 h-44 overflow-hidden rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(${product.image})` }}
      />

      <section className="rounded-xl border border-sand-200 bg-white p-4 shadow-[0_1px_2px_rgb(28_25_23/0.04)]">
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-ink-400">For</dt>
            <dd className="mt-1 font-semibold text-ink-950">{item.cropName}</dd>
          </div>
          <div>
            <dt className="text-ink-400">Purchased</dt>
            <dd className="mt-1 font-semibold text-ink-950">{formatDateLong(item.purchasedOn)}</dd>
          </div>
          <div>
            <dt className="text-ink-400">Quantity</dt>
            <dd className="mt-1 font-semibold text-ink-950">{item.quantityLabel}</dd>
          </div>
          <div>
            <dt className="text-ink-400">Status</dt>
            <dd className="mt-1">
              <ProductStatusBadge status={item.status} />
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-ink-500">{item.remainingLabel}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-[15px] font-semibold text-ink-950">What is it for?</h2>
        <p className="mt-2 text-sm leading-7 text-ink-700">{product.about}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-[15px] font-semibold text-ink-950">How should I use it?</h2>
        <p className="mt-1 text-sm text-ink-400">Example steps for this prototype — not a field prescription.</p>
        <ol className="mt-4 space-y-3">
          {product.howToUse.map((step, index) => (
            <li
              key={step}
              className="flex gap-3 rounded-xl border border-sand-200 bg-white p-4"
            >
              <span className="text-sm font-semibold text-hrc-800">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-sm leading-6 text-ink-700">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8 rounded-xl border border-sand-200 bg-white p-4">
        <h2 className="text-[15px] font-semibold text-ink-950">Example guidance</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-ink-400">Recommended dose</dt>
            <dd className="text-right font-medium text-ink-950">{product.guidance.dose}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-400">Application</dt>
            <dd className="text-right font-medium text-ink-950">{product.guidance.method}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-400">Timing</dt>
            <dd className="text-right font-medium text-ink-950">{product.guidance.timing}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-400">Suitable crops</dt>
            <dd className="text-right font-medium text-ink-950">{product.guidance.crops}</dd>
          </div>
          <div>
            <dt className="text-ink-400">Precautions</dt>
            <dd className="mt-1 font-medium text-ink-950">{product.guidance.precautions}</dd>
          </div>
        </dl>
      </section>

      <Disclaimer className="mt-5" note="These are placeholder values for frontend development." />

      <Link
        to={`/catalogue/${product.slug}`}
        className="mt-6 inline-flex text-sm font-medium text-hrc-800"
      >
        View in HRC catalogue
      </Link>
    </div>
  )
}
