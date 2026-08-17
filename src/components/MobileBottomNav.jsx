import { NavLink, useLocation } from 'react-router-dom'
import { Droplets, Home, Menu, Package, Sprout } from 'lucide-react'
import { cn } from '../utils/cn'

const morePrefixes = [
  '/purchases',
  '/soil-reports',
  '/advice',
  '/catalogue',
  '/notifications',
  '/settings',
  '/more',
  '/search',
]

function isMorePath(pathname) {
  return morePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

const items = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/farm', label: 'My Farm', icon: Sprout },
  { to: '/products', label: 'Products', icon: Package },
  { to: '/applications', label: 'Applications', icon: Droplets },
  { to: '/more', label: 'More', icon: Menu },
]

export function MobileBottomNav() {
  const { pathname } = useLocation()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-sand-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <ul className="grid grid-cols-5">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) => {
                const active = item.to === '/more' ? isMorePath(pathname) : isActive
                return cn(
                  'flex h-[3.75rem] flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors',
                  active ? 'text-hrc-800' : 'text-ink-400',
                )
              }}
            >
              {({ isActive }) => {
                const active = item.to === '/more' ? isMorePath(pathname) : isActive
                return (
                  <>
                    <item.icon className={cn('h-5 w-5', active && 'stroke-[2.25]')} />
                    {item.label}
                  </>
                )
              }}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
