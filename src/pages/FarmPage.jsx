import { Link } from 'react-router-dom'
import { CropCard } from '../components/CropCard'
import { PageHeader, SectionHeader } from '../components/ui/PageHeader'
import { crops, farm, plots } from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatAcres } from '../utils/format'

export function FarmPage() {
  useDocumentTitle('My Farm')

  return (
    <div>
      <PageHeader title="My Farm" subtitle="The land HRC has on file for you." />

      <section className="overflow-hidden rounded-xl border border-sand-200 bg-white shadow-[0_1px_2px_rgb(28_25_23/0.04)]">
        <div
          className="h-44 bg-cover bg-center"
          style={{ backgroundImage: `url(${farm.image})` }}
        />
        <div className="p-5">
          <h2 className="text-xl font-semibold text-ink-950">{farm.name}</h2>
          <p className="mt-1 text-sm text-ink-500">
            {farm.location} · {farm.landmark}
          </p>
          <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-lg bg-sand-50 px-3 py-3">
              <dt className="text-ink-400">Area</dt>
              <dd className="mt-1 font-semibold text-ink-950">{formatAcres(farm.totalAcres)}</dd>
            </div>
            <div className="rounded-lg bg-sand-50 px-3 py-3">
              <dt className="text-ink-400">Plots</dt>
              <dd className="mt-1 font-semibold text-ink-950">{farm.plotCount}</dd>
            </div>
            <div className="rounded-lg bg-sand-50 px-3 py-3">
              <dt className="text-ink-400">Elevation</dt>
              <dd className="mt-1 font-semibold text-ink-950">{farm.elevation}</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm leading-6 text-ink-700">{farm.notes}</p>
        </div>
      </section>

      <section className="mt-8">
        <SectionHeader title="Crops" />
        <div className="grid gap-3 sm:grid-cols-2">
          {crops.map((crop) => (
            <CropCard key={crop.id} crop={crop} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <SectionHeader title="Plots" />
        <div className="space-y-3">
          {plots.map((plot) => {
            const crop = crops.find((item) => item.id === plot.cropId)
            return (
              <Link
                key={plot.id}
                to={`/farm/crops/${plot.cropId}`}
                className="flex items-center justify-between rounded-xl border border-sand-200 bg-white px-4 py-3.5 shadow-[0_1px_2px_rgb(28_25_23/0.04)] transition-colors hover:bg-sand-50"
              >
                <div>
                  <p className="font-semibold text-ink-950">{plot.name}</p>
                  <p className="mt-0.5 text-sm text-ink-500">
                    {crop?.name} · {plot.slope}
                  </p>
                </div>
                <p className="text-sm font-medium text-ink-700">{formatAcres(plot.acres)}</p>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
