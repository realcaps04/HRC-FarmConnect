import { useMemo, useState } from 'react'
import { Package } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { EmptyState } from '../components/ui/EmptyState'
import { FilterChips } from '../components/ui/FilterChips'
import { PageHeader } from '../components/ui/PageHeader'
import { SearchBar } from '../components/ui/SearchBar'
import { getHydratedInventory, productFilters } from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { matchesQuery } from '../utils/search'

export function ProductsPage() {
  useDocumentTitle('My Products')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const items = getHydratedInventory()

  const filtered = useMemo(
    () =>
      items.filter((item) => {
        const matchesFilter =
          filter === 'All' || item.product?.filterCategory === filter
        const matchesSearch = matchesQuery(
          query,
          item.product?.name,
          item.product?.purpose,
          item.cropName,
          item.product?.category,
          item.status,
        )
        return matchesFilter && matchesSearch
      }),
    [items, filter, query],
  )

  return (
    <div>
      <PageHeader
        title="My Products"
        subtitle="Products purchased from HRC"
      />
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search your products"
        className="mb-4"
      />
      <FilterChips
        options={productFilters}
        value={filter}
        onChange={setFilter}
        className="mb-5"
      />
      {filtered.length ? (
        <div className="space-y-3">
          {filtered.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Package}
          title="No products recorded yet"
          description={
            query || filter !== 'All'
              ? 'Nothing matches this search. Try another product name or filter.'
              : 'Your HRC purchases will appear here.'
          }
        />
      )}
    </div>
  )
}
