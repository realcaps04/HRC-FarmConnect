import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'

export function NotFoundPage() {
  return (
    <div>
      <PageHeader title="Page not found" subtitle="This screen is not in the farmer companion yet." />
      <Link to="/" className="text-sm font-medium text-hrc-800">
        Back to Home
      </Link>
    </div>
  )
}
