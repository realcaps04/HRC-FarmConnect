import { useMemo, useState } from 'react'
import { Droplets } from 'lucide-react'
import { ApplicationCard } from '../components/ApplicationCard'
import { RecommendationCard } from '../components/RecommendationCard'
import { EmptyState } from '../components/ui/EmptyState'
import { FilterChips } from '../components/ui/FilterChips'
import { PageHeader, SectionHeader } from '../components/ui/PageHeader'
import { applications, recommendations } from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const statuses = ['All', 'Completed', 'Upcoming', 'Recommended']

export function ApplicationsPage() {
  useDocumentTitle('Applications')
  const [status, setStatus] = useState('All')

  const filtered = useMemo(
    () => applications.filter((item) => status === 'All' || item.status === status),
    [status],
  )

  const grouped = useMemo(() => {
    const map = new Map()
    filtered.forEach((item) => {
      const key = item.date
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(item)
    })
    return [...map.entries()].sort((a, b) => (a[0] < b[0] ? 1 : -1))
  }, [filtered])

  return (
    <div>
      <PageHeader
        title="Applications"
        subtitle="Products you have already used, and what HRC has marked next."
      />

      <section className="mb-8">
        <SectionHeader title="Upcoming" />
        <div className="space-y-3">
          {recommendations.map((item) => (
            <RecommendationCard key={item.id} recommendation={item} featured />
          ))}
        </div>
      </section>

      <FilterChips options={statuses} value={status} onChange={setStatus} className="mb-5" />

      {grouped.length ? (
        <div className="relative space-y-6 before:absolute before:bottom-0 before:left-[7px] before:top-2 before:w-px before:bg-sand-200">
          {grouped.map(([date, items]) => (
            <section key={date} className="relative pl-7">
              <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-hrc-800 bg-white" />
              <div className="space-y-3">
                {items.map((item) => (
                  <ApplicationCard key={item.id} application={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Droplets}
          title="No applications recorded"
          description="Once you record an application, it will appear here."
        />
      )}
    </div>
  )
}
