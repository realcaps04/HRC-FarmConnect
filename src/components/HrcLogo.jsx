import { Link } from 'react-router-dom'

export function HrcLogo({ compact = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="h-8 w-8 shrink-0"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="8" fill="#1A4A38" />
        <path
          d="M9 22V10h3.2c2.4 0 3.9 1.3 3.9 3.4 0 1.3-.7 2.4-1.9 2.9 1.4.4 2.3 1.6 2.3 3.1 0 2.3-1.7 3.6-4.2 3.6H9zm3.1-7.1h.7c1.1 0 1.7-.6 1.7-1.5s-.6-1.5-1.7-1.5h-.7v3zm0 5.3h1c1.2 0 1.9-.6 1.9-1.7s-.7-1.6-1.9-1.6h-1v3.3z"
          fill="#F4F1EB"
        />
        <path
          d="M21.2 9.2c2.8 1.2 4.6 3.6 4.6 6.6 0 3.8-2.9 6.6-6.4 6.6h-.4c.8-1.1 1.3-2.5 1.3-4 0-3.3-2.2-5.8-4.3-7.2 1.2-1.5 3-2.4 5.2-2z"
          fill="#C4A574"
        />
      </svg>
      {compact ? null : (
        <span className="leading-tight">
          <span className="block text-sm font-semibold tracking-tight text-ink-950">HRC</span>
          <span className="block text-[11px] text-ink-500">Farmer Companion</span>
        </span>
      )}
    </Link>
  )
}
