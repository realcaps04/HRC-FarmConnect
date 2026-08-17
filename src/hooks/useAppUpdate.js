import { useCallback, useEffect, useState } from 'react'
import {
  APP_VERSION,
  UPDATE_CHECK_MS,
  fetchRemoteVersion,
  isSnoozed,
  snoozeUpdate,
} from '../utils/appVersion'

export function useAppUpdate() {
  const [available, setAvailable] = useState(false)

  const check = useCallback(async () => {
    try {
      const remote = await fetchRemoteVersion()
      if (remote && remote !== APP_VERSION && !isSnoozed()) {
        setAvailable(true)
      }
    } catch {
      // Keep the current session running if the version check fails.
    }
  }, [])

  const dismiss = useCallback(() => {
    snoozeUpdate()
    setAvailable(false)
  }, [])

  useEffect(() => {
    check()
    const timer = window.setInterval(check, UPDATE_CHECK_MS)

    const onVisible = () => {
      if (document.visibilityState === 'visible') check()
    }

    window.addEventListener('focus', check)
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      window.clearInterval(timer)
      window.removeEventListener('focus', check)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [check])

  return { available, check, dismiss }
}
