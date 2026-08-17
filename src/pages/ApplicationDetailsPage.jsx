import { Link, Navigate, useParams } from 'react-router-dom'
import { ProductStatusBadge } from '../components/ProductStatusBadge'
import { Disclaimer } from '../components/ui/Disclaimer'
import { PageHeader } from '../components/ui/PageHeader'
import { getApplication } from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatDateLong } from '../utils/format'

export function ApplicationDetailsPage() {
  const { id } = useParams()
  const application = getApplication(id)
  useDocumentTitle(application ? application.productName : 'Application')

  if (!application) return <Navigate to="/applications" replace />

  const statusLabel =
    application.status === 'Completed'
      ? 'Application completed'
      : application.status === 'Upcoming'
        ? 'Upcoming application'
        : 'Recommended by HRC'

  return (
    <div>
      <PageHeader backTo="/applications" title={application.productName} subtitle={statusLabel} />

      <section className="rounded-xl border border-sand-200 bg-white p-5 shadow-[0_1px_2px_rgb(28_25_23/0.04)]">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-ink-500">{formatDateLong(application.date)}</p>
          <ProductStatusBadge status={application.status} />
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-ink-400">Crop</dt>
            <dd className="mt-1 font-semibold text-ink-950">{application.cropName}</dd>
          </div>
          <div>
            <dt className="text-ink-400">Farm / plot</dt>
            <dd className="mt-1 font-semibold text-ink-950">{application.plotName}</dd>
          </div>
          <div>
            <dt className="text-ink-400">Quantity used</dt>
            <dd className="mt-1 font-semibold text-ink-950">{application.quantityUsed}</dd>
          </div>
          <div>
            <dt className="text-ink-400">Purpose</dt>
            <dd className="mt-1 font-semibold text-ink-950">{application.purpose}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-ink-400">Application method</dt>
            <dd className="mt-1 font-semibold text-ink-950">{application.method}</dd>
          </div>
        </dl>
      </section>

      {application.notes ? (
        <section className="mt-6">
          <h2 className="text-[15px] font-semibold text-ink-950">Notes</h2>
          <p className="mt-2 rounded-xl border border-sand-200 bg-white p-4 text-sm leading-7 text-ink-700">
            {application.notes}
          </p>
        </section>
      ) : null}

      {application.status !== 'Completed' ? (
        <Disclaimer className="mt-5" note="Quantities shown for upcoming work are example values." />
      ) : null}

      <div className="mt-6">
        <Link to={`/products/${application.inventoryId}`} className="text-sm font-medium text-hrc-800">
          Open product
        </Link>
      </div>
    </div>
  )
}
