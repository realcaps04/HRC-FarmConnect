import { Link } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { EmptyState } from '../components/ui/EmptyState'
import { PageHeader } from '../components/ui/PageHeader'
import { notifications } from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { cn } from '../utils/cn'
import { timeAgo } from '../utils/format'

export function NotificationsPage() {
  useDocumentTitle('Notifications')

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle="Quiet updates from HRC about your farm."
      />
      {notifications.length ? (
        <div className="space-y-2">
          {notifications.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                'block rounded-xl border px-4 py-4 transition-colors hover:bg-sand-50',
                item.unread
                  ? 'border-hrc-100 bg-hrc-50/60'
                  : 'border-sand-200 bg-white',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-[15px] font-semibold text-ink-950">{item.title}</h2>
                {item.unread ? (
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-hrc-700" />
                ) : null}
              </div>
              <p className="mt-1 text-sm leading-6 text-ink-700">{item.body}</p>
              <p className="mt-2 text-xs text-ink-400">{timeAgo(item.date)}</p>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bell}
          title="No notifications yet"
          description="When HRC has a new note for your farm, it will appear here."
        />
      )}
    </div>
  )
}
