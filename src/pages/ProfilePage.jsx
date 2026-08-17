import { PageHeader } from '../components/ui/PageHeader'
import { currentFarmer } from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function ProfilePage() {
  useDocumentTitle('Profile')

  return (
    <div>
      <PageHeader title="Profile" subtitle="Your HRC customer details." />
      <section className="rounded-2xl border border-sand-200 bg-white px-5 py-5">
        <p className="text-[22px] font-semibold tracking-tight text-ink-950">
          {currentFarmer.fullName}
        </p>
        <p className="mt-2 text-sm leading-6 text-ink-700">{currentFarmer.address}</p>
        <p className="mt-3 text-sm text-ink-500">{currentFarmer.customerSinceLabel}</p>
        <p className="mt-4 text-sm font-medium text-ink-950">
          Main crop · {currentFarmer.mainCrop}
        </p>
      </section>
    </div>
  )
}
