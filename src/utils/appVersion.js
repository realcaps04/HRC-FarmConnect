const CHECK_MS = 20_000
const SNOOZE_MS = 10 * 60 * 1000
const SNOOZE_KEY = 'hrc-update-snooze'

export const APP_VERSION = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : 'dev'

export function isChunkLoadError(error) {
  const message = error?.message || String(error || '')
  return (
    error?.name === 'ChunkLoadError' ||
    /Failed to fetch dynamically imported module/i.test(message) ||
    /Importing a module script failed/i.test(message) ||
    /Loading chunk [\w-]+ failed/i.test(message) ||
    /error loading dynamically imported module/i.test(message)
  )
}

export async function fetchRemoteVersion() {
  const response = await fetch(`/version.json?t=${Date.now()}`, { cache: 'no-store' })
  if (!response.ok) return null
  const data = await response.json()
  return data?.version || null
}

export function isSnoozed(now = Date.now()) {
  const until = Number(sessionStorage.getItem(SNOOZE_KEY) || 0)
  return until > now
}

export function snoozeUpdate(now = Date.now()) {
  sessionStorage.setItem(SNOOZE_KEY, String(now + SNOOZE_MS))
}

export function clearUpdateSnooze() {
  sessionStorage.removeItem(SNOOZE_KEY)
}

export function reloadToUpdate() {
  clearUpdateSnooze()
  window.location.reload()
}

export const UPDATE_CHECK_MS = CHECK_MS
