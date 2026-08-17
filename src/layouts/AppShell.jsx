import { Outlet, useLocation } from 'react-router-dom'
import { DesktopSidebar } from '../components/DesktopSidebar'
import { Header } from '../components/Header'
import { MobileBottomNav } from '../components/MobileBottomNav'

const titles = {
  '/': 'Home',
  '/farm': 'My Farm',
  '/products': 'My Products',
  '/purchases': 'Purchase History',
  '/applications': 'Applications',
  '/soil-reports': 'Soil Reports',
  '/advice': 'HRC Advice',
  '/catalogue': 'Catalogue',
  '/notifications': 'Notifications',
  '/profile': 'Profile',
  '/settings': 'Settings',
  '/more': 'More',
  '/search': 'Search',
}

function titleFromPath(pathname) {
  if (titles[pathname]) return titles[pathname]
  if (pathname.startsWith('/farm/crops')) return 'Crop'
  if (pathname.startsWith('/products')) return 'Product'
  if (pathname.startsWith('/purchases')) return 'Purchase'
  if (pathname.startsWith('/applications')) return 'Application'
  if (pathname.startsWith('/soil-reports')) return 'Soil Report'
  if (pathname.startsWith('/advice')) return 'Advice'
  if (pathname.startsWith('/catalogue')) return 'Catalogue'
  return 'HRC Farmer Companion'
}

export function AppShell() {
  const location = useLocation()
  const title = titleFromPath(location.pathname)

  return (
    <div className="min-h-dvh bg-sand-50 text-ink-950">
      <DesktopSidebar />
      <div className="lg:pl-64">
        <Header title={title} />
        <main className="mx-auto w-full max-w-5xl px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-5 lg:px-8 lg:pb-12 lg:pt-8">
          <div key={location.pathname} className="page-enter">
            <Outlet />
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  )
}
