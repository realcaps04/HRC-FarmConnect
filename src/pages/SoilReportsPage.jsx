import { Layers } from 'lucide-react'
import { SoilReportCard } from '../components/SoilReportCard'
import { EmptyState } from '../components/ui/EmptyState'
import { PageHeader } from '../components/ui/PageHeader'
import { soilReports } from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function SoilReportsPage() {
  useDocumentTitle('Soil Reports')

  return (
    <div>
      <PageHeader
        title="Soil Reports"
        subtitle="Assessments HRC has on file for your farm."
      />
      {soilReports.length ? (
        <div className="space-y-3">
          {soilReports.map((report) => (
            <SoilReportCard key={report.id} report={report} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Layers}
          title="No soil reports yet"
          description="Your HRC soil assessment reports will appear here."
        />
      )}
    </div>
  )
}
