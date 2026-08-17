import { Bell, BookOpen, Layers, Settings, ShoppingBag, Store, User } from 'lucide-react'

export const moreLinks = [
  { to: '/purchases', label: 'Purchase History', icon: ShoppingBag },
  { to: '/soil-reports', label: 'Soil Reports', icon: Layers },
  { to: '/advice', label: 'HRC Advice', icon: BookOpen },
  { to: '/catalogue', label: 'Product Catalogue', icon: Store },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/settings', label: 'Settings', icon: Settings },
]
