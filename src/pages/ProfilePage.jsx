import { useState } from 'react'
import { FarmerProfileCard } from '../components/FarmerProfileCard'
import { BottomSheet } from '../components/ui/BottomSheet'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { PageHeader } from '../components/ui/PageHeader'
import { currentFarmer } from '../data'
import { useIsDesktop } from '../hooks/useMediaQuery'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useToast } from '../hooks/useToast'

export function ProfilePage() {
  useDocumentTitle('Profile')
  const [open, setOpen] = useState(false)
  const isDesktop = useIsDesktop()
  const { showToast } = useToast()

  const close = () => setOpen(false)
  const save = () => {
    setOpen(false)
    showToast('Profile editing will connect when the HRC backend is ready.')
  }

  const form = (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault()
        save()
      }}
    >
      <label className="block text-sm">
        <span className="mb-1.5 block text-ink-500">Name</span>
        <input
          defaultValue={currentFarmer.fullName}
          className="h-11 w-full rounded-lg border border-sand-200 px-3 outline-none focus:border-hrc-700 focus:ring-4 focus:ring-hrc-100"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block text-ink-500">Phone</span>
        <input
          defaultValue={currentFarmer.phone}
          className="h-11 w-full rounded-lg border border-sand-200 px-3 outline-none focus:border-hrc-700 focus:ring-4 focus:ring-hrc-100"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block text-ink-500">Location</span>
        <input
          defaultValue={currentFarmer.location}
          className="h-11 w-full rounded-lg border border-sand-200 px-3 outline-none focus:border-hrc-700 focus:ring-4 focus:ring-hrc-100"
        />
      </label>
      <Button type="submit" className="w-full">
        Save changes
      </Button>
    </form>
  )

  return (
    <div>
      <PageHeader
        title="Profile"
        subtitle="How HRC has your farm recorded."
        actions={
          <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
            Edit Profile
          </Button>
        }
      />
      <FarmerProfileCard />
      <section className="mt-4 rounded-xl border border-sand-200 bg-white p-4 text-sm shadow-[0_1px_2px_rgb(28_25_23/0.04)]">
        <p className="text-ink-400">Phone</p>
        <p className="mt-1 font-medium text-ink-950">{currentFarmer.phone}</p>
      </section>

      {isDesktop ? (
        <Modal open={open} onClose={close} title="Edit Profile">
          {form}
        </Modal>
      ) : (
        <BottomSheet open={open} onClose={close} title="Edit Profile">
          {form}
        </BottomSheet>
      )}
    </div>
  )
}
