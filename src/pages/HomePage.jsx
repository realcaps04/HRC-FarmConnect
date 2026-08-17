import { Link } from 'react-router-dom'
import { ChevronRight, Droplets, Package } from 'lucide-react'
import { CropCard } from '../components/CropCard'
import { PurchaseCard } from '../components/PurchaseCard'
import { RecommendationCard } from '../components/RecommendationCard'
import { SectionHeader } from '../components/ui/PageHeader'
import {
  applications,
  crops,
  currentFarmer,
  farm,
  getHydratedInventory,
  purchases,
  recommendations,
} from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatAcres, greeting } from '../utils/format'

export function HomePage() {
  useDocumentTitle('Home')
  const inventory = getHydratedInventory()
  const recentPurchases = purchases.slice(0, 3)
  const completedApps = applications.filter((item) => item.status === 'Completed')

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm text-ink-500">{greeting()},</p>
        <h1 className="mt-1 text-[28px] font-semibold tracking-tight text-ink-950">
          {currentFarmer.firstName}
        </h1>
      </section>

      <Link
        to="/farm"
        className="block overflow-hidden rounded-xl border border-sand-200 bg-white shadow-[0_1px_2px_rgb(28_25_23/0.04)]"
      >
        <div
          className="relative h-36 bg-cover bg-center"
          style={{ backgroundImage: `url(${farm.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-ink-950/10" />
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <p className="text-xs font-medium uppercase tracking-wide text-white/70">Your Farm</p>
            <p className="mt-1 text-lg font-semibold">{farm.name}</p>
            <p className="text-sm text-white/80">
              {currentFarmer.mainCrop} · {formatAcres(farm.totalAcres)}
            </p>
          </div>
        </div>
      </Link>

      <div className="grid grid-cols-2 gap-3">
        <Link
          to="/products"
          className="rounded-xl border border-sand-200 bg-white p-4 shadow-[0_1px_2px_rgb(28_25_23/0.04)] transition-colors hover:bg-sand-50"
        >
          <Package className="h-4 w-4 text-hrc-800" />
          <p className="mt-3 text-2xl font-semibold tracking-tight">{inventory.length}</p>
          <p className="mt-1 text-sm text-ink-500">Products</p>
        </Link>
        <Link
          to="/applications"
          className="rounded-xl border border-sand-200 bg-white p-4 shadow-[0_1px_2px_rgb(28_25_23/0.04)] transition-colors hover:bg-sand-50"
        >
          <Droplets className="h-4 w-4 text-hrc-800" />
          <p className="mt-3 text-2xl font-semibold tracking-tight">{completedApps.length}</p>
          <p className="mt-1 text-sm text-ink-500">Applications</p>
        </Link>
      </div>

      <section>
        <SectionHeader
          title="Upcoming"
          action={
            <Link to="/applications" className="text-sm font-medium text-hrc-800">
              View all
            </Link>
          }
        />
        <div className="space-y-3">
          {recommendations.map((item) => (
            <RecommendationCard key={item.id} recommendation={item} featured />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="My Crops" />
        <div className="grid grid-cols-2 gap-3">
          {crops.map((crop) => (
            <CropCard key={crop.id} crop={crop} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title="Recent Purchases"
          action={
            <Link
              to="/purchases"
              className="inline-flex items-center text-sm font-medium text-hrc-800"
            >
              All
              <ChevronRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="space-y-3">
          {recentPurchases.map((purchase) => (
            <PurchaseCard key={purchase.id} purchase={purchase} />
          ))}
        </div>
      </section>
    </div>
  )
}
