import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Clock, Droplets, Leaf, Sprout } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { currentFarmer, farm } from '../data'
import { getScheduleForDate } from '../data/schedule'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { cn } from '../utils/cn'
import {
  addDays,
  formatAcres,
  monthYear,
  toDateKey,
  weekdayShort,
} from '../utils/format'

function parseMinutes(label) {
  const match = String(label).match(/(\d+)/)
  return match ? Number(match[1]) : 0
}

export function HomePage() {
  useDocumentTitle('Farm Schedule')
  const { showToast } = useToast()
  const [selected, setSelected] = useState(() => new Date(2026, 7, 17))

  const selectedKey = toDateKey(selected)
  const tasks = getScheduleForDate(selectedKey)
  const weekStart = addDays(selected, -3)
  const days = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index))
  const totalMinutes = tasks.reduce((sum, item) => sum + parseMinutes(item.duration), 0)

  const stats = useMemo(
    () => [
      { icon: Sprout, label: 'Acreage', value: formatAcres(farm.totalAcres) },
      { icon: Clock, label: 'Duration', value: totalMinutes ? `${totalMinutes} min` : '—' },
      { icon: Leaf, label: 'Crop', value: currentFarmer.mainCrop },
    ],
    [totalMinutes],
  )

  return (
    <div className="bg-sand-50">
      <section className="bg-[radial-gradient(120%_90%_at_50%_-10%,#3a6b5c_0%,#2d5a4d_46%,#1e4a3e_100%)] px-5 pb-8 pt-3 text-white">
        <header className="relative mb-6 flex h-11 items-center justify-center">
          <Link
            to="/profile"
            className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white"
            aria-label="Back to profile"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-[17px] font-semibold tracking-tight">Farm Schedule</h1>
        </header>

        <div className="mb-5 flex items-center justify-center gap-5 text-[15px] font-medium">
          <button
            type="button"
            className="text-white/80"
            aria-label="Previous week"
            onClick={() => setSelected(addDays(selected, -7))}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <p>{monthYear(selected)}</p>
          <button
            type="button"
            className="text-white/80"
            aria-label="Next week"
            onClick={() => setSelected(addDays(selected, 7))}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex justify-between gap-2">
          {days.map((day) => {
            const active = toDateKey(day) === selectedKey
            return (
              <button
                key={toDateKey(day)}
                type="button"
                onClick={() => setSelected(day)}
                className={cn(
                  'flex h-[72px] min-w-0 flex-1 flex-col items-center justify-center rounded-full text-[11px] font-medium transition-colors',
                  active
                    ? 'bg-hrc-950 text-white shadow-[0_8px_16px_rgb(16_40_32/0.28)]'
                    : 'bg-white text-ink-950',
                )}
              >
                <span className={cn('text-[10px]', active ? 'text-white/80' : 'text-ink-400')}>
                  {weekdayShort(day)}
                </span>
                <span className="mt-1 text-[15px] font-semibold leading-none">{day.getDate()}</span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="px-5 pt-5">
        <div className="grid grid-cols-3 rounded-[28px] bg-white px-2 py-4 shadow-[0_8px_24px_rgb(17_17_17/0.04)]">
          {stats.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1.5 text-center">
              <item.icon className="h-4 w-4 text-hrc-800" />
              <p className="text-[11px] text-ink-400">{item.label}</p>
              <p className="text-sm font-bold text-ink-950">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pt-7">
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="text-[20px] font-bold tracking-tight text-ink-950">
            {currentFarmer.mainCrop} care
          </h2>
          <p className="inline-flex items-center gap-1 text-sm text-ink-400">
            <Clock className="h-3.5 w-3.5" />
            {totalMinutes ? `${totalMinutes} mins` : 'No tasks'}
          </p>
        </div>

        {tasks.length ? (
          <div className="space-y-3">
            {tasks.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className="flex items-center gap-3 rounded-[22px] bg-white p-3 shadow-[0_8px_24px_rgb(17_17_17/0.04)]"
              >
                <span
                  className="h-14 w-14 shrink-0 rounded-[16px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] text-ink-400">{item.part}</span>
                  <span className="mt-0.5 block truncate text-[15px] font-bold text-ink-950">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block truncate text-[12px] text-ink-500">
                    {item.detail}
                  </span>
                </span>
                <span className="shrink-0 text-[12px] text-ink-400">{item.duration}</span>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Droplets}
            title="No work on this day"
            description="Choose another date, or log an application when you use a product."
          />
        )}
      </section>

      <section className="px-5 pb-4 pt-8">
        <Button
          as={Link}
          to="/applications"
          className="h-14 w-full bg-hrc-800 text-[16px] font-semibold hover:bg-hrc-900"
        >
          Log application
        </Button>
        <p className="mt-3 text-center text-[12px] text-ink-400">
          You can add notes after saving. Always follow the latest HRC recommendation.
        </p>
      </section>
    </div>
  )
}
