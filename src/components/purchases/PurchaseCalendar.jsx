import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { cn } from '../../utils/cn'
import { calendarCells, monthYear, toDateKey } from '../../utils/format'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export function PurchaseCalendar({
  open,
  month,
  selectedKey,
  purchaseKeys,
  onClose,
  onSelect,
}) {
  const [viewMonth, setViewMonth] = useState(month)
  const cells = useMemo(() => calendarCells(viewMonth), [viewMonth])
  const marked = useMemo(() => new Set(purchaseKeys), [purchaseKeys])

  useEffect(() => {
    if (open) setViewMonth(month)
  }, [open, month])

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Choose a date"
      className="max-w-[360px] rounded-[32px] p-4"
    >
      <div className="mb-4 flex items-center justify-between px-1">
        <button
          type="button"
          onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ececec] text-ink-700"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="text-sm font-semibold text-ink-950">{monthYear(viewMonth)}</p>
        <button
          type="button"
          onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ececec] text-ink-700"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center">
        {WEEKDAYS.map((label, index) => (
          <span key={`${label}-${index}`} className="text-[11px] font-semibold text-ink-400">
            {label}
          </span>
        ))}
        {cells.map((day, index) => {
          if (!day) return <span key={`empty-${index}`} />
          const key = toDateKey(day)
          const selected = key === selectedKey
          const hasPurchases = marked.has(key)
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(day)}
              className={cn(
                'mx-auto flex h-10 w-10 flex-col items-center justify-center rounded-full text-[13px] font-semibold',
                selected ? 'bg-[#1b4036] text-white' : 'text-ink-950 hover:bg-[#ececec]',
              )}
            >
              {day.getDate()}
              <span
                className={cn(
                  'mt-0.5 h-1 w-1 rounded-full',
                  hasPurchases ? (selected ? 'bg-white' : 'bg-hrc-800') : 'bg-transparent',
                )}
              />
            </button>
          )
        })}
      </div>
      <p className="mt-4 text-center text-[11px] text-ink-400">Days with a green dot have purchases.</p>
    </Modal>
  )
}
