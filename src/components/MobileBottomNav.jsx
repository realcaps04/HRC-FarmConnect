import { NavLink, useLocation } from 'react-router-dom'
import { Home, User, Wallet } from 'lucide-react'
import { cn } from '../utils/cn'

const items = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/purchases', label: 'Purchases', icon: Wallet },
  { to: '/profile', label: 'Profile', icon: User },
]

function activeIndex(pathname) {
  if (pathname.startsWith('/purchases')) return 1
  if (pathname.startsWith('/profile') || pathname.startsWith('/settings')) return 2
  if (pathname === '/') return 0
  return 0
}

export function MobileBottomNav() {
  const { pathname } = useLocation()
  const index = activeIndex(pathname)

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="pointer-events-auto mx-auto w-full max-w-[430px] px-5 pb-[calc(1.15rem+env(safe-area-inset-bottom))]">
        <ul className="relative grid h-[68px] grid-cols-3 items-center rounded-full bg-[#1b4036] px-2 shadow-[0_12px_28px_rgb(16_40_34/0.32)]">
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-[#132e27] shadow-[inset_0_3px_8px_rgb(0_0_0/0.45),inset_0_-1px_0_rgb(255_255_255/0.06)] transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              left: `calc((100% / 3) * ${index} + (100% / 6) - 24px)`,
            }}
          />
          {items.map((item) => (
            <li key={item.to} className="relative z-10 flex justify-center">
              <NavLink
                to={item.to}
                end={item.end}
                aria-label={item.label}
                className="flex h-12 w-12 items-center justify-center rounded-full text-white"
              >
                <item.icon className="h-[22px] w-[22px] transition-transform duration-300 ease-out" strokeWidth={1.7} />
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
