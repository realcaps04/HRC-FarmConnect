import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDownLeft, ArrowUpRight, Bell } from 'lucide-react'
import { HomePromoCard } from '../components/home/HomePromoCard'
import { HomeServiceTile } from '../components/home/HomeServiceTile'
import { BottomSheet } from '../components/ui/BottomSheet'
import { Modal } from '../components/ui/Modal'
import {
  adviceArticles,
  crops,
  currentFarmer,
  notifications,
  recommendations,
} from '../data'
import { cropTimes, getCropOption, getCropTime, homeGridItems } from '../data/cropTimes'
import { useIsDesktop } from '../hooks/useMediaQuery'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useToast } from '../hooks/useToast'
import { cn } from '../utils/cn'
import { formatDate } from '../utils/format'

export function HomePage() {
  useDocumentTitle('Home')
  const { showToast } = useToast()
  const isDesktop = useIsDesktop()
  const [cropId, setCropId] = useState('crop-cardamom')
  const [timeId, setTimeId] = useState('time-monsoon')
  const [pickerOpen, setPickerOpen] = useState(false)
  const unread = notifications.some((item) => item.unread)

  const crop = getCropOption(cropId)
  const time = getCropTime(timeId)
  const nextDue = recommendations[0]
  const farmCrops = crops
  const promos = useMemo(() => adviceArticles.slice(0, 3), [])

  const selectItem = (item) => {
    if (item.kind === 'crop') {
      setCropId(item.id)
      showToast(`${item.label} selected`)
      return
    }
    setTimeId(item.id)
    showToast(`${crop?.label || 'Crop'} · ${item.label}`)
  }

  const setTimeFromPicker = (item) => {
    setTimeId(item.id)
    setPickerOpen(false)
    showToast(`${crop?.label || 'Crop'} · ${item.label}`)
  }

  const picker = (
    <div className="grid grid-cols-2 gap-2">
      {cropTimes.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => setTimeFromPicker(item)}
          className={cn(
            'rounded-2xl border px-4 py-3 text-left transition-colors',
            item.id === timeId
              ? 'border-ink-950 bg-ink-950 text-white'
              : 'border-sand-200 bg-white hover:bg-sand-50',
          )}
        >
          <span className="block text-sm font-semibold">{item.label}</span>
          <span
            className={cn(
              'mt-1 block text-xs leading-4',
              item.id === timeId ? 'text-white/70' : 'text-ink-500',
            )}
          >
            {item.note}
          </span>
        </button>
      ))}
    </div>
  )

  return (
    <div className="pb-2">
      <header className="relative mb-4 flex h-12 items-center justify-center">
        <img src="/hrc-logo.png" alt="HRC FarmConnect" className="h-11 w-11 object-contain" />
        <Link
          to="/notifications"
          className="absolute right-0 flex h-10 w-10 items-center justify-center rounded-full text-ink-950"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unread ? (
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-hrc-700" />
          ) : null}
        </Link>
      </header>

      <section className="overflow-hidden rounded-[32px] bg-gradient-to-b from-[#d8f3e4] via-[#eefaf3] to-white p-5 shadow-[0_12px_30px_rgb(47_158_95/0.08)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[13px] text-ink-500">Current crop time</p>
            <p className="mt-1 text-[34px] font-bold leading-none tracking-tight text-ink-950">
              {crop?.label || 'Cardamom'}
            </p>
            <p className="mt-2 text-sm font-medium text-hrc-800">{time?.label || 'Monsoon'}</p>
          </div>
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="mt-1 inline-flex h-10 shrink-0 items-center rounded-full bg-ink-950 px-4 text-[13px] font-semibold text-white"
          >
            + Choose time
          </button>
        </div>

        {nextDue ? (
          <p className="mt-3 text-xs text-ink-500">
            Next HRC note · {nextDue.productName} · {formatDate(nextDue.dueOn)}
          </p>
        ) : null}

        <div className="mt-6 flex gap-10 px-2">
          <Link to="/applications" className="flex flex-col items-center gap-2">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgb(28_25_23/0.08)]">
              <ArrowUpRight className="h-5 w-5 text-ink-950" />
            </span>
            <span className="text-[12px] font-medium text-ink-700">Log use</span>
          </Link>
          <Link to="/farm" className="flex flex-col items-center gap-2">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgb(28_25_23/0.08)]">
              <ArrowDownLeft className="h-5 w-5 text-ink-950" />
            </span>
            <span className="text-[12px] font-medium text-ink-700">My farm</span>
          </Link>
        </div>
      </section>

      <section className="mt-4 rounded-[32px] bg-white px-3 py-5 shadow-[0_8px_24px_rgb(28_25_23/0.04)]">
        <div className="grid grid-cols-4 gap-y-5">
          {homeGridItems.map((item) => (
            <HomeServiceTile
              key={item.id}
              item={item}
              selected={item.id === cropId || item.id === timeId}
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
          {farmCrops.map((item) => (
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
          Hello {currentFarmer.firstName} — tap a crop or a season above to set the home view.
        </p>
      </section>

      {isDesktop ? (
        <Modal open={pickerOpen} onClose={() => setPickerOpen(false)} title="Choose crop time">
          {picker}
        </Modal>
      ) : (
        <BottomSheet open={pickerOpen} onClose={() => setPickerOpen(false)} title="Choose crop time">
          {picker}
        </BottomSheet>
      )}
    </div>
  )
}
