import { Package } from 'lucide-react'
import { cn } from '../../utils/cn'

export function ProductPackThumb({ src, alt, className, imgClassName }) {
  if (!src) {
    return (
      <span className={cn('flex items-center justify-center bg-[#f3f3f1]', className)}>
        <Package className="h-5 w-5 text-ink-400" aria-hidden />
        <span className="sr-only">{alt}</span>
      </span>
    )
  }

  return (
    <span className={cn('overflow-hidden bg-white', className)}>
      <img src={src} alt={alt} className={cn('h-full w-full object-contain p-1', imgClassName)} />
    </span>
  )
}
