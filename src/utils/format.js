const SHORT_MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const LONG_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function parseDate(value) {
  return value instanceof Date ? value : new Date(value)
}

export function formatDate(value) {
  const date = parseDate(value)
  return `${date.getDate()} ${SHORT_MONTHS[date.getMonth()]} ${date.getFullYear()}`
}

export function formatDateLong(value) {
  const date = parseDate(value)
  return `${date.getDate()} ${LONG_MONTHS[date.getMonth()]} ${date.getFullYear()}`
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function greeting(now = new Date()) {
  const hour = now.getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function timeAgo(value, now = new Date()) {
  const date = parseDate(value)
  const diffMs = now.getTime() - date.getTime()
  const minutes = Math.round(diffMs / 60000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} min ago`

  const hours = Math.round(minutes / 60)
  if (hours < 24) return hours === 1 ? '1 hour ago' : `${hours} hours ago`

  const days = Math.round(hours / 24)
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`

  return formatDate(date)
}

export function weekdayShort(value) {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][parseDate(value).getDay()]
}

export function monthYear(value) {
  const date = parseDate(value)
  return `${LONG_MONTHS[date.getMonth()]} ${date.getFullYear()}`
}

export function toDateKey(value) {
  const date = parseDate(value)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export function addDays(value, amount) {
  const date = parseDate(value)
  date.setDate(date.getDate() + amount)
  return date
}

export function formatAcres(acres) {
  if (acres == null) return 'Homestead plot'
  const label = Number.isInteger(acres) ? String(acres) : acres.toFixed(1)
  return `${label} ${acres === 1 ? 'acre' : 'acres'}`
}
