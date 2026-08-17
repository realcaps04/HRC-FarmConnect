import { NavLink, useLocation } from 'react-router-dom'
import { Heart, Home, Search, User, Wallet } from 'lucide-react'
import { cn } from '../utils/cn'

const morePrefixes = [
  '/soil-reports',
  '/advice',
  '/catalogue',
  '/notifications',
  '/settings',
  '/more',
  '/products',
  '/applications',
]

function isMorePath(pathname) {
  return morePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

const items = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/farm', label: 'My Farm', icon: Heart },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/purchases', label: 'Purchases', icon: Wallet },
  { to: '/more', label: 'More', icon: User },
]

export function MobileBottomNav() {
  const { pathname } = useLocation()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 bg-[#1e4a3e] pb-[env(safe-area-inset-bottom)] lg:hidden">
      <ul className="grid h-[4.25rem] grid-cols-5">
        {items.map((item) => (
          <li key={item.to} className="flex items-center justify-center">
            <NavLink
              to={item.to}
              end={item.end}
              aria-label={item.label}
              className={({ isActive }) => {
                const active = item.to === '/more' ? isMorePath(pathname) : isActive
                return cn(
                  'flex h-12 w-12 items-center justify-center rounded-full text-white transition-colors',
                  active && 'bg-[#16352d] shadow-[0_8px_16px_rgb(0_0_0/0.28)]',
                )
              }}
            >
              <item.icon className="h-5 w-5" strokeWidth={1.75} />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
