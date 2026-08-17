import { NavLink } from 'react-router-dom'
import {
  BookOpen,
  Droplets,
  Home,
  Layers,
  Package,
  Settings,
  ShoppingBag,
  Sprout,
  Store,
  User,
} from 'lucide-react'
import { cn } from '../utils/cn'
import { HrcLogo } from './HrcLogo'

const desktopNav = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/farm', label: 'My Farm', icon: Sprout },
  { to: '/products', label: 'Products', icon: Package },
  { to: '/applications', label: 'Applications', icon: Droplets },
  { to: '/purchases', label: 'Purchases', icon: ShoppingBag },
  { to: '/soil-reports', label: 'Soil Reports', icon: Layers },
  { to: '/advice', label: 'HRC Advice', icon: BookOpen },
  { to: '/catalogue', label: 'Catalogue', icon: Store },
]

function SidebarLink({ to, end, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors',
          isActive ? 'bg-hrc-800 text-white' : 'text-ink-700 hover:bg-sand-50 hover:text-ink-950',
        )
      }
    >
      <Icon className="h-4 w-4" />
      {label}
    </NavLink>
  )
}

export function DesktopSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-sand-200 bg-white lg:flex lg:flex-col">
      <div className="flex h-16 items-center px-5">
        <HrcLogo />
      </div>
      <nav className="flex-1 space-y-1 px-3 py-3">
        {desktopNav.map((item) => (
          <SidebarLink key={item.to} {...item} />
        ))}
      </nav>
      <div className="border-t border-sand-200 p-3">
        <SidebarLink to="/profile" icon={User} label="Profile" />
        <SidebarLink to="/settings" icon={Settings} label="Settings" />
      </div>
    </aside>
  )
}
