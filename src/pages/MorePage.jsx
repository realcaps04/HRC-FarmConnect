import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { FarmerProfileCard } from '../components/FarmerProfileCard'
import { PageHeader } from '../components/ui/PageHeader'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { moreLinks } from '../layouts/navigation'

export function MorePage() {
  useDocumentTitle('More')

  return (
    <div>
      <PageHeader title="More" subtitle="Purchases, soil reports, advice and your profile." />
      <div className="mb-5">
        <FarmerProfileCard compact />
      </div>
      <div className="overflow-hidden rounded-xl border border-sand-200 bg-white">
        {moreLinks.map((item, index) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-sand-50 ${
              index ? 'border-t border-sand-200' : ''
            }`}
          >
            <item.icon className="h-4 w-4 text-hrc-800" />
            <span className="flex-1 text-sm font-medium text-ink-950">{item.label}</span>
            <ChevronRight className="h-4 w-4 text-ink-400" />
          </Link>
        ))}
      </div>
    </div>
  )
}
