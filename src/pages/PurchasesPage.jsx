import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronDown, ChevronLeft, ChevronRight, IndianRupee, Package, Receipt, ShoppingBag, Sprout } from 'lucide-react'
import { ProductPackThumb } from '../components/purchases/ProductPackThumb'
import { EmptyState } from '../components/ui/EmptyState'
import { PurchaseCalendar } from '../components/purchases/PurchaseCalendar'
import { getBills, purchases } from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { cn } from '../utils/cn'
import {
  daysInMonth,
  formatCurrency,
  formatDate,
  monthYear,
  toDateKey,
  weekdayShort,
} from '../utils/format'

const START_MONTH = new Date(2026, 7, 1)

export function PurchasesPage() {
  const [searchParams] = useSearchParams()
  const [month, setMonth] = useState(START_MONTH)
  const [selectedKey, setSelectedKey] = useState('2026-08-15')
  const [calendarOpen, setCalendarOpen] = useState(false)
  const view = searchParams.get('view') === 'bills' ? 'bills' : 'purchases'
  const selectedRef = useRef(null)
  const purchaseKeys = useMemo(
    () => [...new Set(purchases.map((item) => item.purchasedOn))],
    [],
  )

  useDocumentTitle(view === 'bills' ? 'My Bills' : 'Purchases')

  const days = useMemo(() => daysInMonth(month), [month])

  const dayPurchases = useMemo(
    () => purchases.filter((item) => item.purchasedOn === selectedKey),
    [selectedKey],
  )

  const bills = useMemo(() => getBills(), [])

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
    selectedRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [selectedKey, month])

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
      <header className="mb-5 flex h-11 items-center gap-3">
        <Link
          to="/"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_4px_12px_rgb(28_25_23/0.08)]"
          aria-label="Back to home"
        >
          <ChevronLeft className="h-5 w-5 text-ink-950" />
        </Link>
        {view === 'bills' ? (
          <h1 className="text-[18px] font-bold tracking-tight text-ink-950">My Bills</h1>
        ) : null}
      </header>

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
                to="/purchases"
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
      ) : (
        <div className="page-enter">
          <div className="mb-4 flex items-center justify-between px-1">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setCalendarOpen(true)}
              className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-ink-950 shadow-[0_4px_12px_rgb(28_25_23/0.06)]"
            >
              {monthYear(month)}
              <ChevronDown className="h-4 w-4 text-ink-500" />
            </button>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
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
