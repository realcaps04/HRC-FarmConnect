import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Search } from 'lucide-react'
import { notifications } from '../data'
import { DevelopmentNotice } from './DevelopmentNotice'
import { HrcLogo } from './HrcLogo'

export function Header({ title }) {
  const [noticeOpen, setNoticeOpen] = useState(false)
  const unread = notifications.filter((item) => item.unread).length

  return (
    <header className="sticky top-0 z-30 border-b border-sand-200 bg-sand-50/90 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between gap-3 px-4 lg:h-16 lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="lg:hidden">
            <HrcLogo compact />
          </div>
          <p className="truncate text-[15px] font-semibold text-ink-950 lg:text-base">
            {title || 'HRC FarmConnect'}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Link
            to="/search"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-ink-700 transition-colors hover:bg-sand-100"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Link>
          <button
            type="button"
            onClick={() => setNoticeOpen(true)}
            className="relative flex h-11 w-11 items-center justify-center rounded-lg text-ink-700 transition-colors hover:bg-sand-100"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unread ? (
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-hrc-700" />
            ) : null}
          </button>
        </div>
      </div>
      <DevelopmentNotice open={noticeOpen} onClose={() => setNoticeOpen(false)} />
    </header>
  )
}
