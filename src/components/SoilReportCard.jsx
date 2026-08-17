import { Link } from 'react-router-dom'
import { formatDate } from '../utils/format'

export function SoilReportCard({ report }) {
  const ph = report.parameters.find((item) => item.label === 'pH')

  return (
    <Link
      to={`/soil-reports/${report.id}`}
      className="block overflow-hidden rounded-xl border border-sand-200 bg-white shadow-[0_1px_2px_rgb(28_25_23/0.04)] transition-colors hover:bg-sand-50"
    >
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
          {formatDate(report.date)}
        </p>
        <h3 className="mt-2 text-[15px] font-semibold text-ink-950">{report.title}</h3>
        <p className="mt-1 text-sm text-ink-500">
          {report.farmName} · {report.plotName}
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-sand-50 px-2 py-2">
            <p className="text-[11px] text-ink-400">pH</p>
            <p className="mt-0.5 text-sm font-semibold text-ink-950">{ph?.value}</p>
          </div>
          <div className="rounded-lg bg-sand-50 px-2 py-2">
            <p className="text-[11px] text-ink-400">Crop</p>
            <p className="mt-0.5 text-sm font-semibold text-ink-950">{report.cropName}</p>
          </div>
          <div className="rounded-lg bg-sand-50 px-2 py-2">
            <p className="text-[11px] text-ink-400">Plot</p>
            <p className="mt-0.5 text-sm font-semibold text-ink-950">{report.plotName}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
