import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Store } from 'lucide-react'
import { EmptyState } from '../components/ui/EmptyState'
import { FilterChips } from '../components/ui/FilterChips'
import { PageHeader } from '../components/ui/PageHeader'
import { SearchBar } from '../components/ui/SearchBar'
import { catalogueProducts, productFilters } from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { matchesQuery } from '../utils/search'

export function CataloguePage() {
  useDocumentTitle('Catalogue')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(
    () =>
      catalogueProducts.filter((item) => {
        const matchesFilter = filter === 'All' || item.filterCategory === filter
        const matchesSearch = matchesQuery(
          query,
          item.name,
          item.purpose,
          item.category,
          item.shortDescription,
          item.suitableCrops.join(' '),
        )
        return matchesFilter && matchesSearch
      }),
    [query, filter],
  )

  return (
    <div>
      <PageHeader
        title="Product Catalogue"
        subtitle="Products available from Horti Research Centre LLP."
      />
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search the HRC catalogue"
        className="mb-4"
      />
      <FilterChips
        options={productFilters}
        value={filter}
        onChange={setFilter}
        className="mb-5"
      />
      {filtered.length ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((item) => (
            <Link
              key={item.id}
              to={`/catalogue/${item.slug}`}
              className="overflow-hidden rounded-xl border border-sand-200 bg-white shadow-[0_1px_2px_rgb(28_25_23/0.04)] transition-colors hover:bg-sand-50"
            >
              <div
                className="h-36 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
                  {item.category}
                </p>
                <h3 className="mt-1 text-[15px] font-semibold text-ink-950">{item.name}</h3>
                <p className="mt-1 text-sm text-ink-500">{item.purpose}</p>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-ink-700">
                  {item.shortDescription}
                </p>
                <p className="mt-3 text-xs text-ink-400">
                  Suitable for {item.suitableCrops.join(', ')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Store}
          title="No catalogue items match"
          description="Try another product name or category."
        />
      )}
    </div>
  )
}
