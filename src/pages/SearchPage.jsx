import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { EmptyState } from '../components/ui/EmptyState'
import { PageHeader } from '../components/ui/PageHeader'
import { SearchBar } from '../components/ui/SearchBar'
import { searchAll } from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatDate } from '../utils/format'

const groups = [
  ['products', 'Products'],
  ['purchases', 'Purchases'],
  ['applications', 'Applications'],
  ['crops', 'Crops'],
  ['advice', 'HRC Advice'],
  ['recommendations', 'Upcoming'],
  ['soil', 'Soil Reports'],
]

export function SearchPage() {
  useDocumentTitle('Search')
  const [query, setQuery] = useState('')
  const results = useMemo(() => searchAll(query), [query])
  const total = groups.reduce((sum, [key]) => sum + results[key].length, 0)

  return (
    <div>
      <PageHeader title="Search" subtitle="Look across products, purchases, applications, crops and advice." />
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Try Pasil, cardamom, soil…"
        autoFocus
        className="mb-6"
      />

      {!query.trim() ? (
        <EmptyState
          icon={Search}
          title="Search your farm records"
          description="Type a product, crop, purchase or HRC note. For example, Pasil."
        />
      ) : null}

      {query.trim() && total === 0 ? (
        <EmptyState
          icon={Search}
          title="Nothing found"
          description="Try another product name, crop, or a shorter word."
        />
      ) : null}

      {query.trim() && total > 0 ? (
        <div className="space-y-6">
          {groups.map(([key, label]) => {
            const items = results[key]
            if (!items.length) return null
            return (
              <section key={key}>
                <h2 className="mb-2 text-[13px] font-semibold uppercase tracking-wide text-ink-400">
                  {label}
                </h2>
                <div className="overflow-hidden rounded-xl border border-sand-200 bg-white">
                  {items.map((item, index) => (
                    <Link
                      key={`${item.type}-${item.id}`}
                      to={item.href}
                      className={`block px-4 py-3.5 transition-colors hover:bg-sand-50 ${
                        index ? 'border-t border-sand-200' : ''
                      }`}
                    >
                      <p className="text-[11px] font-medium uppercase tracking-wide text-hrc-700">
                        {item.type}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-ink-950">{item.title}</p>
                      <p className="mt-0.5 text-sm text-ink-500">
                        {key === 'purchases' ? formatDate(item.subtitle) : item.subtitle}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
