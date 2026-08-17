import { Navigate, useParams } from 'react-router-dom'
import { PageHeader, SectionHeader } from '../components/ui/PageHeader'
import { getSoilReport } from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatDateLong } from '../utils/format'

export function SoilReportDetailsPage() {
  const { id } = useParams()
  const report = getSoilReport(id)
  useDocumentTitle(report ? 'Soil Report' : 'Soil Report')

  if (!report) return <Navigate to="/soil-reports" replace />

  return (
    <div>
      <PageHeader
        backTo="/soil-reports"
        title="Soil Report"
        subtitle={formatDateLong(report.date)}
      />

      <div
        className="mb-5 h-40 overflow-hidden rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(${report.image})` }}
      />

      <section className="rounded-xl border border-sand-200 bg-white p-4 text-sm shadow-[0_1px_2px_rgb(28_25_23/0.04)]">
        <p className="text-ink-500">Farm</p>
        <p className="mt-1 font-semibold text-ink-950">{report.farmName}</p>
        <p className="mt-3 text-ink-500">
          {report.cropName} · {report.plotName}
        </p>
      </section>

      <section className="mt-8">
        <SectionHeader title="Soil Parameters" />
        <div className="grid grid-cols-2 gap-3">
          {report.parameters.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-sand-200 bg-white px-4 py-3"
            >
              <p className="text-xs text-ink-400">{item.label}</p>
              <p className="mt-1 text-sm font-semibold text-ink-950">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <SectionHeader title="HRC Observation" />
        <p className="rounded-xl border border-sand-200 bg-white p-4 text-sm leading-7 text-ink-700">
          {report.observation}
        </p>
      </section>

      <section className="mt-8">
        <SectionHeader title="Recommendations" />
        <ul className="space-y-3">
          {report.recommendations.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-sand-200 bg-white px-4 py-3 text-sm leading-6 text-ink-700"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-5 text-ink-400">
          These notes are mock HRC recommendations for the prototype. They are not generated
          automatically from the numbers above.
        </p>
      </section>
    </div>
  )
}
