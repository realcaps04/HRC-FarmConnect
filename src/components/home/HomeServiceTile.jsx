import {
  CloudRain,
  Flower2,
  LayoutGrid,
  Leaf,
  Moon,
  Package,
  Salad,
  Shovel,
  Sprout,
  Sun,
  Wheat,
} from 'lucide-react'
import { cn } from '../../utils/cn'

const tones = {
  green: {
    wrap: 'from-[#7ed39a] to-[#2f9e5f]',
    shine: 'from-white/50 to-transparent',
    icon: 'text-white',
  },
  brown: {
    wrap: 'from-[#e0b48a] to-[#b07848]',
    shine: 'from-white/45 to-transparent',
    icon: 'text-white',
  },
  orange: {
    wrap: 'from-[#ffc48a] to-[#f08a3a]',
    shine: 'from-white/50 to-transparent',
    icon: 'text-white',
  },
  teal: {
    wrap: 'from-[#8ee0d2] to-[#2aa89a]',
    shine: 'from-white/50 to-transparent',
    icon: 'text-white',
  },
  blue: {
    wrap: 'from-[#9ad4ff] to-[#3b8fe0]',
    shine: 'from-white/50 to-transparent',
    icon: 'text-white',
  },
  pink: {
    wrap: 'from-[#f7b7d2] to-[#e56b9a]',
    shine: 'from-white/50 to-transparent',
    icon: 'text-white',
  },
  gold: {
    wrap: 'from-[#ffe08a] to-[#e0b030]',
    shine: 'from-white/55 to-transparent',
    icon: 'text-white',
  },
  lime: {
    wrap: 'from-[#c6e86a] to-[#7cb342]',
    shine: 'from-white/50 to-transparent',
    icon: 'text-white',
  },
  mint: {
    wrap: 'from-[#b8f0d0] to-[#4caf7a]',
    shine: 'from-white/50 to-transparent',
    icon: 'text-white',
  },
  slate: {
    wrap: 'from-[#cfd6dd] to-[#7d8793]',
    shine: 'from-white/45 to-transparent',
    icon: 'text-white',
  },
  amber: {
    wrap: 'from-[#ffd39a] to-[#e09a3a]',
    shine: 'from-white/50 to-transparent',
    icon: 'text-white',
  },
  coral: {
    wrap: 'from-[#ffb3a8] to-[#e06a5a]',
    shine: 'from-white/50 to-transparent',
    icon: 'text-white',
  },
}

const icons = {
  'crop-cardamom': Sprout,
  'crop-pepper': Leaf,
  'crop-vegetables': Salad,
  'crop-all': LayoutGrid,
  'time-monsoon': CloudRain,
  'time-flowering': Flower2,
  'time-harvest': Wheat,
  'time-growing': Sun,
  'time-planting': Shovel,
  'time-offseason': Moon,
  'time-postharvest': Package,
  'time-nursery': Sprout,
}

export function HomeServiceTile({ item, selected, onSelect }) {
  const tone = tones[item.tone]
  const Icon = icons[item.id] || Sprout

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="flex flex-col items-center gap-2 rounded-2xl py-1.5 text-center transition-transform duration-150 active:scale-[0.97]"
    >
      <span
        className={cn(
          'relative flex h-[58px] w-[58px] items-center justify-center rounded-[22px] bg-gradient-to-b shadow-[0_10px_18px_rgb(28_25_23/0.12)]',
          tone.wrap,
          selected && 'ring-2 ring-ink-950 ring-offset-2',
        )}
      >
        <span
          className={cn(
            'pointer-events-none absolute inset-x-2 top-1 h-4 rounded-full bg-gradient-to-b',
            tone.shine,
          )}
        />
        <Icon className={cn('relative h-[22px] w-[22px]', tone.icon)} strokeWidth={2.2} />
      </span>
      <span className="max-w-[72px] text-[11px] font-medium leading-4 text-ink-700">
        {item.label}
      </span>
    </button>
  )
}
