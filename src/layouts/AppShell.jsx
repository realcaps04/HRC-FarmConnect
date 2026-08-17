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
    <div className={cn('min-h-dvh text-ink-950', isHome ? 'h-dvh overflow-hidden bg-[#eef8f3]' : 'bg-sand-50')}>
      <DesktopSidebar />
      <div className={cn('lg:pl-64', isHome && 'h-full')}>
        {isHome ? null : <Header title={title} />}
        <main
          className={cn(
            'mx-auto w-full pb-[calc(4.75rem+env(safe-area-inset-bottom))]',
            isHome
              ? 'h-full max-w-[430px] overflow-x-hidden overflow-y-auto px-4 pt-3 scrollbar-none lg:max-w-lg lg:pt-8'
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
