import { Outlet, useLocation } from 'react-router-dom'
import { DesktopSidebar } from '../components/DesktopSidebar'
import { Header } from '../components/Header'
import { MobileBottomNav } from '../components/MobileBottomNav'
import { cn } from '../utils/cn'

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
  return 'HRC FarmConnect'
}

export function AppShell() {
  const location = useLocation()
  const title = titleFromPath(location.pathname)
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-dvh bg-sand-50 text-ink-950">
      <DesktopSidebar />
      <div className="lg:pl-64">
        {isHome ? null : <Header title={title} />}
        <main
          className={cn(
            'mx-auto w-full pb-[calc(6rem+env(safe-area-inset-bottom))]',
            isHome
              ? 'max-w-[430px] overflow-hidden lg:mt-6 lg:max-w-lg lg:rounded-[32px] lg:shadow-[0_12px_40px_rgb(17_17_17/0.08)]'
              : 'max-w-5xl px-4 pt-5 lg:px-8 lg:pb-12 lg:pt-8',
          )}
        >
          <div key={location.pathname} className="page-enter">
            <Outlet />
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  )
}
