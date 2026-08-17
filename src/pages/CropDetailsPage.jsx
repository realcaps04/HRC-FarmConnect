import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AdviceCard } from '../components/AdviceCard'
import { ApplicationCard } from '../components/ApplicationCard'
import { ProductCard } from '../components/ProductCard'
import { SoilReportCard } from '../components/SoilReportCard'
import { EmptyState } from '../components/ui/EmptyState'
import { PageHeader } from '../components/ui/PageHeader'
import {
  adviceArticles,
  applications,
  getCrop,
  getHydratedInventory,
  soilReports,
} from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { cn } from '../utils/cn'
import { formatAcres } from '../utils/format'

const tabs = ['Overview', 'Products', 'Applications', 'Advice', 'Soil']

export function CropDetailsPage() {
  const { id } = useParams()
  const crop = getCrop(id)
  const [tab, setTab] = useState('Overview')
  useDocumentTitle(crop?.name || 'Crop')

  const products = useMemo(
    () => getHydratedInventory().filter((item) => item.cropId === crop?.id),
    [crop],
  )
  const cropApplications = useMemo(
    () => applications.filter((item) => item.cropId === crop?.id),
    [crop],
  )
  const cropAdvice = useMemo(
    () => adviceArticles.filter((item) => item.cropName === crop?.name),
    [crop],
  )
  const cropSoil = useMemo(
    () => soilReports.filter((item) => item.cropName === crop?.name),
    [crop],
  )

  if (!crop) return <Navigate to="/farm" replace />

  return (
    <div>
      <PageHeader backTo="/farm" title={crop.name} subtitle={formatAcres(crop.acres)} />

      <div
        className="mb-6 h-44 overflow-hidden rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(${crop.image})` }}
      />

      <div className="mb-6 flex gap-1 overflow-x-auto scrollbar-none rounded-xl bg-sand-100 p-1">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={cn(
              'h-9 shrink-0 rounded-lg px-3 text-sm font-medium transition-colors',
              tab === item ? 'bg-white text-ink-950 shadow-sm' : 'text-ink-500',
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === 'Overview' ? (
        <div className="space-y-5">
          <p className="text-sm leading-7 text-ink-700">{crop.summary}</p>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-sand-200 bg-white p-4">
              <dt className="text-ink-400">Variety</dt>
              <dd className="mt-1 font-semibold text-ink-950">{crop.variety}</dd>
            </div>
            <div className="rounded-xl border border-sand-200 bg-white p-4">
              <dt className="text-ink-400">Plots</dt>
              <dd className="mt-1 font-semibold text-ink-950">{crop.plots.join(', ')}</dd>
            </div>
          </dl>
          <Link to="/products" className="text-sm font-medium text-hrc-800">
            {products.length} products linked to this crop
          </Link>
        </div>
      ) : null}

      {tab === 'Products' ? (
        products.length ? (
          <div className="space-y-3">
            {products.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No products for this crop yet"
            description="Purchases HRC links to this crop will appear here."
          />
        )
      ) : null}

      {tab === 'Applications' ? (
        cropApplications.length ? (
          <div className="space-y-3">
            {cropApplications.map((item) => (
              <ApplicationCard key={item.id} application={item} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No applications recorded"
            description="Once you record an application on this crop, it will appear here."
          />
        )
      ) : null}

      {tab === 'Advice' ? (
        cropAdvice.length ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {cropAdvice.map((article) => (
              <AdviceCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No HRC advice yet"
            description="Advice HRC writes for this crop will appear here."
          />
        )
      ) : null}

      {tab === 'Soil' ? (
        cropSoil.length ? (
          <div className="space-y-3">
            {cropSoil.map((report) => (
              <SoilReportCard key={report.id} report={report} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No soil reports yet"
            description="Your HRC soil assessment reports for this crop will appear here."
          />
        )
      ) : null}
    </div>
  )
}
