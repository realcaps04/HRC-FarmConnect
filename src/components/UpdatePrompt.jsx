import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { Button } from './ui/Button'
import { Modal } from './ui/Modal'
import { useAppUpdate } from '../hooks/useAppUpdate'
import { reloadToUpdate } from '../utils/appVersion'

export function UpdatePrompt({ required = false, onDismiss }) {
  const { available, dismiss } = useAppUpdate()
  const [closed, setClosed] = useState(false)
  const open = !closed && (required || available)

  const close = () => {
    setClosed(true)
    dismiss()
    onDismiss?.()
  }

  return (
    <Modal
      open={open}
      onClose={close}
      title={required ? 'Please update to continue' : 'Update available'}
      dismissible
    >
      <div className="flex gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-hrc-50 text-hrc-800">
          <RefreshCw className="h-5 w-5" />
        </span>
        <p className="text-sm leading-6 text-ink-700">
          {required
            ? 'A new version of HRC FarmConnect is ready. Update now so the app can keep running without errors.'
            : 'A new version of HRC FarmConnect is ready. You can keep using this version for now, then update when you are ready.'}
        </p>
      </div>
      <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="secondary" className="w-full sm:w-auto" onClick={close}>
          Continue
        </Button>
        <Button className="w-full bg-hrc-800 hover:bg-hrc-900 sm:w-auto" onClick={reloadToUpdate}>
          Update now
        </Button>
      </div>
    </Modal>
  )
}
