import { NavLink, useLocation } from 'react-router-dom'
import { Home, User, Wallet } from 'lucide-react'
import { cn } from '../utils/cn'

const items = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/purchases', label: 'Purchases', icon: Wallet },
  { to: '/profile', label: 'Profile', icon: User },
]

function isItemActive(item, pathname, isActive) {
  if (item.to === '/purchases') return pathname.startsWith('/purchases')
  if (item.to === '/profile') {
    return pathname.startsWith('/profile') || pathname.startsWith('/settings')
  }
  return isActive
}

export function MobileBottomNav() {
  const { pathname } = useLocation()

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="pointer-events-auto mx-auto w-full max-w-[430px] px-5 pb-[calc(1.15rem+env(safe-area-inset-bottom))]">
        <ul className="flex h-[68px] items-center justify-around rounded-full bg-[#1b4036] px-6 shadow-[0_12px_28px_rgb(16_40_34/0.32)]">
          {items.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                aria-label={item.label}
                className={({ isActive }) => {
                  const active = isItemActive(item, pathname, isActive)
                  return cn(
                    'flex h-12 w-12 items-center justify-center rounded-full text-white',
                    active &&
                      'bg-[#132e27] shadow-[inset_0_3px_8px_rgb(0_0_0/0.45),inset_0_-1px_0_rgb(255_255_255/0.06)]',
                  )
                }}
              >
                <item.icon className="h-[22px] w-[22px]" strokeWidth={1.7} />
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
