import { useMemo, useState } from 'react'
import { BookOpen } from 'lucide-react'
import { AdviceCard } from '../components/AdviceCard'
import { EmptyState } from '../components/ui/EmptyState'
import { FilterChips } from '../components/ui/FilterChips'
import { PageHeader } from '../components/ui/PageHeader'
import { SearchBar } from '../components/ui/SearchBar'
import { adviceArticles, adviceCategories } from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { matchesQuery } from '../utils/search'

export function AdvicePage() {
  useDocumentTitle('HRC Advice')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(
    () =>
      adviceArticles.filter((item) => {
        const matchesCategory = category === 'All' || item.category === category
        const matchesSearch = matchesQuery(
          query,
          item.title,
          item.cropName,
          item.category,
          item.excerpt,
        )
        return matchesCategory && matchesSearch
      }),
    [query, category],
  )

  return (
    <div>
      <PageHeader
        title="HRC Advice"
        subtitle="Guidance HRC has shared for your crops and season."
      />
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search advice"
        className="mb-4"
      />
      <FilterChips
        options={adviceCategories}
        value={category}
        onChange={setCategory}
        className="mb-5"
      />
      {filtered.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((article) => (
            <AdviceCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={BookOpen}
          title="No advice to show"
          description="HRC notes for your farm will appear here as they are published."
        />
      )}
    </div>
  )
}
