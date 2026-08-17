import { Link } from 'react-router-dom'
import { formatDate } from '../utils/format'

export function RecommendationCard({ recommendation, featured = false }) {
  return (
    <Link
      to={`/applications/${recommendation.applicationId}`}
      className={
        featured
          ? 'block rounded-xl border border-hrc-100 bg-hrc-50 p-4 transition-colors hover:bg-hrc-100/70'
          : 'block rounded-xl border border-sand-200 bg-white p-4 shadow-[0_1px_2px_rgb(28_25_23/0.04)] transition-colors hover:bg-sand-50'
      }
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-hrc-700">
        {recommendation.urgency}
      </p>
      <h3 className="mt-2 text-[15px] font-semibold text-ink-950">{recommendation.title}</h3>
      <p className="mt-1 text-sm text-ink-700">{recommendation.productName}</p>
      <p className="mt-3 text-sm text-ink-500">
        {recommendation.cropName} · Due {formatDate(recommendation.dueOn)}
      </p>
    </Link>
  )
}
