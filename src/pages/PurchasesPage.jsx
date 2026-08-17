import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { ChevronDown, ChevronLeft, ChevronRight, IndianRupee, Package, Receipt, ShoppingBag, Sprout } from 'lucide-react'
import { ProductPackThumb } from '../components/purchases/ProductPackThumb'
import { DayHowToUse } from '../components/purchases/DayHowToUse'
import { PurchaseDateCard } from '../components/purchases/PurchaseDateCard'
import { EmptyState } from '../components/ui/EmptyState'
import { PurchaseCalendar } from '../components/purchases/PurchaseCalendar'
import { getBills, getDayUsageGuide, getPurchaseDays, purchases } from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { cn } from '../utils/cn'
import {
  daysInMonth,
  formatCurrency,
  formatDate,
  monthYear,
  parseDate,
  toDateKey,
  weekdayShort,
} from '../utils/format'

export function PurchasesPage() {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const dateParam = searchParams.get('date')
  const from = searchParams.get('from')
  const viewParam = searchParams.get('view')
  const view =
    viewParam === 'bills'
      ? 'bills'
      : location.pathname === '/purchases/dates' || viewParam === 'dates'
        ? 'list'
        : 'day'
  const dayBackTo =
    from === 'bills'
      ? '/purchases?view=bills'
      : from === 'dates' || location.pathname === '/purchases/dates'
        ? '/purchases/dates'
        : '/'
  const [month, setMonth] = useState(() => {
    const seed = dateParam ? parseDate(dateParam) : new Date()
    return new Date(seed.getFullYear(), seed.getMonth(), 1)
  })
  const [selectedKey, setSelectedKey] = useState(() => dateParam || toDateKey(new Date()))
  const [calendarOpen, setCalendarOpen] = useState(false)
  const selectedRef = useRef(null)
  const purchaseKeys = useMemo(
    () => [...new Set(purchases.map((item) => item.purchasedOn))],
    [],
  )
  const purchaseDays = useMemo(() => getPurchaseDays(), [])

  useDocumentTitle(view === 'bills' ? 'My Bills' : 'Purchases')

  const days = useMemo(() => daysInMonth(month), [month])

  const dayPurchases = useMemo(
    () => purchases.filter((item) => item.purchasedOn === selectedKey),
    [selectedKey],
  )

  const bills = useMemo(() => getBills(), [])
  const usageGuide = useMemo(() => getDayUsageGuide(selectedKey), [selectedKey])

  const stats = useMemo(() => {
    const total = dayPurchases.reduce((sum, item) => sum + item.amount, 0)
    const crops = new Set(dayPurchases.map((item) => item.cropName))
    return {
      items: dayPurchases.length,
      total,
      crops: crops.size,
    }
  }, [dayPurchases])

  useEffect(() => {
    if (!dateParam) return
    const seed = parseDate(dateParam)
    setMonth(new Date(seed.getFullYear(), seed.getMonth(), 1))
    setSelectedKey(dateParam)
  }, [dateParam])

  useEffect(() => {
    if (view !== 'day') return
    selectedRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [selectedKey, month, view])

  const selectDate = (day) => {
    const nextMonth = new Date(day.getFullYear(), day.getMonth(), 1)
    setMonth(nextMonth)
    setSelectedKey(toDateKey(day))
    setCalendarOpen(false)
  }

  const shiftMonth = (amount) => {
    const next = new Date(month.getFullYear(), month.getMonth() + amount, 1)
    setMonth(next)
    const keys = purchases
      .map((item) => item.purchasedOn)
      .filter((key) => {
        const [year, monthValue] = key.split('-').map(Number)
        return year === next.getFullYear() && monthValue === next.getMonth() + 1
      })
    setSelectedKey(keys[0] || toDateKey(next))
  }

  return (
    <div className="overflow-x-hidden pb-4">
      {view === 'bills' ? (
        <header className="mb-4 flex h-11 items-center gap-3">
          <Link
            to="/"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_4px_12px_rgb(28_25_23/0.08)]"
            aria-label="Back to home"
          >
            <ChevronLeft className="h-5 w-5 text-ink-950" />
          </Link>
          <h1 className="text-[18px] font-bold tracking-tight text-ink-950">My Bills</h1>
        </header>
      ) : null}

      {view === 'bills' ? (
        <section className="page-enter">
          <div className="mb-3 flex items-end justify-between gap-3">
            <h2 className="text-[18px] font-bold text-ink-950">My Bills</h2>
            <p className="text-sm font-medium text-ink-500">
              {bills.length} {bills.length === 1 ? 'bill' : 'bills'}
            </p>
          </div>
          <div className="space-y-3">
            {bills.map((bill) => (
              <Link
                key={bill.billNo}
                to={`/purchases?date=${bill.purchasedOn}&from=bills`}
                className="flex items-center gap-3 rounded-[22px] bg-white p-3 shadow-[0_8px_24px_rgb(28_25_23/0.04)]"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-hrc-50 text-hrc-800">
                  <Receipt className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-medium uppercase tracking-wide text-ink-400">
                    {bill.billNo}
                  </span>
                  <span className="mt-0.5 block truncate text-[15px] font-semibold text-ink-950">
                    Horti Research Centre LLP
                  </span>
                  <span className="mt-0.5 block text-sm text-ink-500">
                    {formatDate(bill.purchasedOn)} · {bill.items.length} items · {bill.payment}
                  </span>
                </span>
                <span className="shrink-0 text-sm font-semibold text-ink-700">
                  {formatCurrency(bill.amount)}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : view === 'list' ? (
        <div className="page-enter">
          <header className="mb-4 flex h-11 items-center gap-3">
            <Link
              to="/"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_4px_12px_rgb(28_25_23/0.08)]"
              aria-label="Back to home"
            >
              <ChevronLeft className="h-5 w-5 text-ink-950" />
            </Link>
          </header>
          <div className="space-y-4">
            {purchaseDays.length ? (
              purchaseDays.map((day) => <PurchaseDateCard key={day.purchasedOn} day={day} />)
            ) : (
              <EmptyState
                icon={ShoppingBag}
                title="No purchases yet"
                description="Purchases collected from HRC will appear here."
                className="border-0 shadow-[0_8px_24px_rgb(28_25_23/0.04)]"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="page-enter">
          <header className="mb-3">
            <Link
              to={dayBackTo}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_4px_12px_rgb(28_25_23/0.08)]"
              aria-label="Back"
            >
              <ChevronLeft className="h-5 w-5 text-ink-950" />
            </Link>
          </header>
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-ink-700"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setCalendarOpen(true)}
              className="inline-flex items-center gap-0.5 rounded-full bg-white px-2.5 py-1 text-[13px] font-semibold text-ink-950 shadow-[0_4px_12px_rgb(28_25_23/0.06)]"
            >
              {monthYear(month)}
              <ChevronDown className="h-3.5 w-3.5 text-ink-500" />
            </button>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-ink-700"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {days.map((day) => {
              const key = toDateKey(day)
              const selected = key === selectedKey
              const hasPurchases = purchases.some((item) => item.purchasedOn === key)
              return (
                <button
                  key={key}
                  ref={selected ? selectedRef : null}
                  type="button"
                  onClick={() => setSelectedKey(key)}
                  className={cn(
                    'flex h-[72px] w-[58px] shrink-0 flex-col items-center justify-center rounded-full text-[11px] font-medium',
                    selected ? 'bg-[#1b4036] text-white' : 'bg-[#ececec] text-ink-950',
                  )}
                >
                  <span className={selected ? 'text-white/80' : 'text-ink-500'}>{weekdayShort(day)}</span>
                  <span className="mt-1 text-[15px] font-semibold">{day.getDate()}</span>
                  {hasPurchases && !selected ? (
                    <span className="mt-1 h-1 w-1 rounded-full bg-hrc-800" />
                  ) : (
                    <span className="mt-1 h-1 w-1" />
                  )}
                </button>
              )
            })}
          </div>

          <section className="mt-6">
            <h2 className="text-[18px] font-bold text-ink-950">Day summary</h2>
            <div className="mt-3 rounded-[24px] bg-white px-4 py-4 shadow-[0_8px_24px_rgb(28_25_23/0.04)]">
              <div className="grid grid-cols-3 gap-2">
                <SummaryStat icon={Package} label="Items" value={String(stats.items)} />
                <SummaryStat icon={IndianRupee} label="Spend" value={formatCurrency(stats.total)} />
                <SummaryStat icon={Sprout} label="Crops" value={String(stats.crops)} />
              </div>
            </div>
            {usageGuide ? <DayHowToUse guide={usageGuide} /> : null}
          </section>

          <section className="mt-6">
            <div className="mb-3 flex items-end justify-between gap-3">
              <h2 className="text-[18px] font-bold text-ink-950">Products</h2>
              <p className="text-sm font-medium text-ink-500">
                {stats.items ? `${stats.items} ${stats.items === 1 ? 'item' : 'items'}` : 'No items'}
              </p>
            </div>

            {dayPurchases.length ? (
              <div className="space-y-3">
                {dayPurchases.map((purchase, index) => (
                    <Link
                      key={purchase.id}
                      to={`/purchases/${purchase.id}`}
                      className="flex items-center gap-3 rounded-[22px] bg-white p-3 shadow-[0_8px_24px_rgb(28_25_23/0.04)]"
                    >
                      <ProductPackThumb
                        src={purchase.image}
                        alt={purchase.productName}
                        className="h-14 w-14 shrink-0 rounded-2xl"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] font-medium uppercase tracking-wide text-ink-400">
                          Item {index + 1}
                        </span>
                        <span className="mt-0.5 block truncate text-[15px] font-semibold text-ink-950">
                          {purchase.productName}
                        </span>
                        <span className="mt-0.5 block text-sm text-ink-500">
                          {purchase.quantityLabel} · {purchase.category}
                        </span>
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-ink-700">
                        {formatCurrency(purchase.amount)}
                      </span>
                    </Link>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={ShoppingBag}
                title="No purchases this day"
                description="Pick another date to see what was collected from HRC."
                className="border-0 shadow-[0_8px_24px_rgb(28_25_23/0.04)]"
              />
            )}
          </section>
          <PurchaseCalendar
            open={calendarOpen}
            month={month}
            selectedKey={selectedKey}
            purchaseKeys={purchaseKeys}
            onClose={() => setCalendarOpen(false)}
            onSelect={selectDate}
          />
        </div>
      )}
    </div>
  )
}

function SummaryStat({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col items-center py-1 text-center">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-hrc-50 text-hrc-800">
        <Icon className="h-4 w-4" />
      </span>
      <p className="mt-2 text-[11px] font-medium text-ink-400">{label}</p>
      <p className="mt-0.5 text-sm font-bold text-ink-950">{value}</p>
    </div>
  )
}
