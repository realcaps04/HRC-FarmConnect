import { Link } from 'react-router-dom'
import { formatAcres } from '../utils/format'

export function CropCard({ crop }) {
  return (
    <Link
      to={`/farm/crops/${crop.id}`}
      className="group overflow-hidden rounded-xl border border-sand-200 bg-white shadow-[0_1px_2px_rgb(28_25_23/0.04)] transition-colors hover:border-sand-200 hover:bg-sand-50"
    >
      <div
        className="h-28 bg-cover bg-center"
        style={{ backgroundImage: `url(${crop.image})` }}
      />
      <div className="px-4 py-3">
        <p className="text-[15px] font-semibold text-ink-950">{crop.name}</p>
        <p className="mt-0.5 text-sm text-ink-500">{formatAcres(crop.acres)}</p>
      </div>
    </Link>
  )
}
