import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
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
  '/profile': 'Profile',
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

function tabIndex(pathname) {
  if (pathname === '/') return 0
  if (pathname.startsWith('/purchases')) return 1
  if (pathname.startsWith('/profile') || pathname.startsWith('/settings')) return 2
  return -1
}

export function AppShell() {
  const location = useLocation()
  const title = titleFromPath(location.pathname)
  const isHome = location.pathname === '/'
  const isPurchases = location.pathname === '/purchases' || location.pathname === '/purchases/dates'
  const isImmersive = isHome || isPurchases
  const index = tabIndex(location.pathname)
  const previousIndex = useRef(index)
  const direction =
    index >= 0 && previousIndex.current >= 0 && index !== previousIndex.current
      ? index > previousIndex.current
        ? 'right'
        : 'left'
      : 'fade'

  useEffect(() => {
    if (index >= 0) previousIndex.current = index
  }, [index])

  return (
    <div className={cn('min-h-dvh text-ink-950', isImmersive ? 'h-dvh overflow-hidden bg-[#eef8f3]' : 'bg-sand-50')}>
      <DesktopSidebar />
      <div className={cn('lg:pl-64', isImmersive && 'h-full')}>
        {isImmersive ? null : <Header title={title} />}
        <main
          className={cn(
            'mx-auto w-full pb-[calc(6.5rem+env(safe-area-inset-bottom))]',
            isImmersive
              ? 'h-full max-w-[430px] overflow-x-hidden overflow-y-auto px-4 pt-3 scrollbar-none lg:max-w-lg lg:pt-8'
              : 'max-w-5xl px-4 pt-5 lg:px-8 lg:pb-12 lg:pt-8',
          )}
        >
          <div
            key={location.pathname}
            className={cn(
              direction === 'right' && 'page-enter-right',
              direction === 'left' && 'page-enter-left',
              direction === 'fade' && 'page-enter',
            )}
          >
            <Outlet />
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  )
}
