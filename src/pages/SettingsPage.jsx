import { useState } from 'react'
import { PageHeader } from '../components/ui/PageHeader'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useToast } from '../hooks/useToast'
import { cn } from '../utils/cn'

function Toggle({ checked, onChange, label, description }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-xl border border-sand-200 bg-white px-4 py-3.5 text-left"
    >
      <span>
        <span className="block text-sm font-medium text-ink-950">{label}</span>
        <span className="mt-0.5 block text-sm text-ink-500">{description}</span>
      </span>
      <span
        className={cn(
          'relative h-6 w-11 shrink-0 rounded-full transition-colors',
          checked ? 'bg-hrc-800' : 'bg-sand-200',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform',
            checked ? 'translate-x-5' : 'translate-x-0.5',
          )}
        />
      </span>
    </button>
  )
}

export function SettingsPage() {
  useDocumentTitle('Settings')
  const { showToast } = useToast()
  const [reminders, setReminders] = useState(true)
  const [adviceAlerts, setAdviceAlerts] = useState(true)
  const [malayalam, setMalayalam] = useState(false)

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Simple preferences for this companion. Nothing is saved to a server yet."
      />
      <div className="space-y-3">
        <Toggle
          checked={reminders}
          onChange={(value) => {
            setReminders(value)
            showToast(value ? 'Application reminders are on.' : 'Application reminders are off.')
          }}
          label="Upcoming application reminders"
          description="Show a quiet note when a recommended application is due soon."
        />
        <Toggle
          checked={adviceAlerts}
          onChange={(value) => {
            setAdviceAlerts(value)
            showToast(value ? 'HRC advice alerts are on.' : 'HRC advice alerts are off.')
          }}
          label="New HRC advice"
          description="Let me know when HRC publishes a note for my crops."
        />
        <Toggle
          checked={malayalam}
          onChange={(value) => {
            setMalayalam(value)
            showToast('Malayalam language support will be added in a later version.')
          }}
          label="Prefer Malayalam"
          description="A Malayalam interface is planned. This toggle is visual only."
        />
      </div>
      <p className="mt-8 text-xs leading-5 text-ink-400">
        Horti Research Centre LLP, Chettukuzhy, Idukki, Kerala. Farmer Companion prototype —
        mock data only.
      </p>
    </div>
  )
}
