import { useMemo, useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { PurchaseCard } from '../components/PurchaseCard'
import { EmptyState } from '../components/ui/EmptyState'
import { FilterChips } from '../components/ui/FilterChips'
import { PageHeader } from '../components/ui/PageHeader'
import { SearchBar } from '../components/ui/SearchBar'
import { purchases } from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatDate } from '../utils/format'
import { matchesQuery } from '../utils/search'

const months = ['All dates', 'August 2026', 'July 2026', 'June 2026']
const cropOptions = ['All crops', 'Cardamom', 'Pepper', 'Vegetables']
const productOptions = ['All products', ...new Set(purchases.map((item) => item.productName))]

function inMonth(dateValue, label) {
  if (label === 'All dates') return true
  const date = new Date(dateValue)
  const formatted = `${date.toLocaleString('en-IN', { month: 'long' })} ${date.getFullYear()}`
  return formatted === label
}

export function PurchasesPage() {
  useDocumentTitle('Purchase History')
  const [query, setQuery] = useState('')
  const [month, setMonth] = useState('All dates')
  const [crop, setCrop] = useState('All crops')
  const [product, setProduct] = useState('All products')

  const filtered = useMemo(
    () =>
      purchases.filter((item) => {
        const matchesSearch = matchesQuery(
          query,
          item.productName,
          item.cropName,
          item.billNo,
          formatDate(item.purchasedOn),
        )
        const matchesMonth = inMonth(item.purchasedOn, month)
        const matchesCrop = crop === 'All crops' || item.cropName === crop
        const matchesProduct = product === 'All products' || item.productName === product
        return matchesSearch && matchesMonth && matchesCrop && matchesProduct
      }),
    [query, month, crop, product],
  )

  return (
    <div>
      <PageHeader
        title="Purchase History"
        subtitle="What you collected from HRC, in order of date."
      />
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search purchases"
        className="mb-4"
      />
      <div className="mb-5 space-y-2">
        <FilterChips options={months} value={month} onChange={setMonth} />
        <FilterChips options={cropOptions} value={crop} onChange={setCrop} />
        <FilterChips options={productOptions} value={product} onChange={setProduct} />
      </div>
      {filtered.length ? (
        <div className="space-y-3">
          {filtered.map((purchase) => (
            <PurchaseCard key={purchase.id} purchase={purchase} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={ShoppingBag}
          title="No purchases found"
          description="Try another date, crop, or product name. New HRC purchases will appear here."
        />
      )}
    </div>
  )
}
