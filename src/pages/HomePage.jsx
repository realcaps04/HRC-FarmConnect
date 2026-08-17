import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Bell } from 'lucide-react'
import { HomePromoCard } from '../components/home/HomePromoCard'
import { HomeServiceTile } from '../components/home/HomeServiceTile'
import {
  adviceArticles,
  crops,
  currentFarmer,
  notifications,
} from '../data'
import { cropOptions } from '../data/cropTimes'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useToast } from '../hooks/useToast'
import { greeting } from '../utils/format'

export function HomePage() {
  useDocumentTitle('Home')
  const { showToast } = useToast()
  const [cropId, setCropId] = useState('crop-cardamom')
  const unread = notifications.some((item) => item.unread)

  const farmCrops = crops
  const promos = useMemo(
    () => adviceArticles.filter((article) => article.cropName === 'Cardamom').slice(0, 3),
    [],
  )

  const selectItem = (item) => {
    setCropId(item.id)
    showToast(`${item.label} selected`)
  }

  return (
    <div className="overflow-x-hidden pb-2">
      <header className="relative mb-4 flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1.5 shadow-[0_4px_12px_rgb(28_25_23/0.08)]"
          aria-label="Horti Research Centre LLP"
        >
          <img
            src="/hrc-logo.png"
            alt="Horti Research Centre LLP"
            className="h-full w-full object-contain"
          />
        </Link>
        <Link
          to="/notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-950"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unread ? (
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-hrc-700" />
          ) : null}
        </Link>
      </header>

      <section className="overflow-hidden rounded-[32px] bg-gradient-to-b from-[#d8f3e4] via-[#eefaf3] to-white p-5 shadow-[0_12px_30px_rgb(47_158_95/0.08)]">
        <div>
          <p className="text-[13px] text-ink-500">{greeting()}</p>
          <p className="mt-1 text-[34px] font-bold leading-none tracking-tight text-ink-950">
            {currentFarmer.fullName}
          </p>
          <p className="mt-2 text-sm font-medium text-hrc-800">{currentFarmer.address}</p>
        </div>

        <p className="mt-3 text-xs text-ink-500">{currentFarmer.customerSinceLabel}</p>

        <div className="mt-6 flex gap-10 px-2">
          <Link to="/purchases" className="flex flex-col items-center gap-2">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgb(28_25_23/0.08)]">
              <ArrowUpRight className="h-5 w-5 text-ink-950" />
            </span>
            <span className="text-[12px] font-medium text-ink-700">Purchases</span>
          </Link>
        </div>
      </section>

      <section className="mt-4 rounded-[32px] bg-white px-3 py-5 shadow-[0_8px_24px_rgb(28_25_23/0.04)]">
        <p className="mb-3 px-2 text-[12px] font-semibold uppercase tracking-wide text-ink-400">
          Crops
        </p>
        <div className="grid grid-cols-4 gap-y-5">
          {cropOptions
            .filter((item) => item.visible !== false)
            .map((item) => (
            <HomeServiceTile
              key={item.id}
              item={item}
              selected={item.id === cropId}
              onSelect={selectItem}
            />
          ))}
        </div>
      </section>

      <section className="mt-5">
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
          {promos.map((article) => (
            <HomePromoCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-[18px] font-bold text-ink-950">Your crops</h2>
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          {farmCrops
            .filter((item) => item.id === 'crop-cardamom')
            .map((item) => (
            <Link
              key={item.id}
              to={`/farm/crops/${item.id}`}
              className="flex w-20 shrink-0 flex-col items-center gap-2"
            >
              <span
                className="h-16 w-16 rounded-full bg-cover bg-center ring-4 ring-white shadow-[0_8px_18px_rgb(28_25_23/0.08)]"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <span className="text-[12px] font-medium text-ink-700">{item.name}</span>
            </Link>
          ))}
        </div>
        <p className="mt-3 text-xs text-ink-400">
          Hello {currentFarmer.firstName} — tap a crop above to set the home view.
        </p>
      </section>
    </div>
  )
}
