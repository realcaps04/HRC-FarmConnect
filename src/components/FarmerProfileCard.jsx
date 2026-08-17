import { Link } from 'react-router-dom'
import { currentFarmer, farm } from '../data'
import { formatAcres } from '../utils/format'

export function FarmerProfileCard({ compact = false }) {
  if (compact) {
    return (
      <Link
        to="/profile"
        className="flex items-center gap-3 rounded-xl border border-sand-200 bg-white p-3 shadow-[0_1px_2px_rgb(28_25_23/0.04)] transition-colors hover:bg-sand-50"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-hrc-900 text-sm font-semibold text-white">
          {currentFarmer.initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink-950">{currentFarmer.fullName}</p>
          <p className="truncate text-xs text-ink-500">{currentFarmer.location}</p>
        </div>
      </Link>
    )
  }

  return (
    <section className="overflow-hidden rounded-xl border border-sand-200 bg-white shadow-[0_1px_2px_rgb(28_25_23/0.04)]">
      <div
        className="h-28 bg-cover bg-center"
        style={{ backgroundImage: `url(${farm.image})` }}
      />
      <div className="px-5 pb-5">
        <div className="-mt-6 mb-4 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-hrc-900 text-lg font-semibold text-white">
          {currentFarmer.initials}
        </div>
        <h2 className="text-xl font-semibold text-ink-950">{currentFarmer.fullName}</h2>
        <p className="mt-1 text-sm text-ink-500">{currentFarmer.location}</p>
        <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-ink-400">Main Crop</dt>
            <dd className="mt-1 font-medium text-ink-950">{currentFarmer.mainCrop}</dd>
          </div>
          <div>
            <dt className="text-ink-400">Farm Area</dt>
            <dd className="mt-1 font-medium text-ink-950">
              {formatAcres(currentFarmer.farmAreaAcres)}
            </dd>
          </div>
          <div>
            <dt className="text-ink-400">Plots</dt>
            <dd className="mt-1 font-medium text-ink-950">{currentFarmer.plotCount}</dd>
          </div>
          <div>
            <dt className="text-ink-400">HRC Customer</dt>
            <dd className="mt-1 font-medium text-ink-950">Since {currentFarmer.customerSince}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
