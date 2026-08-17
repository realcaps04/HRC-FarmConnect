import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Bell, Mail, MapPin, Phone, Receipt } from 'lucide-react'
import { HomeServiceTile } from '../components/home/HomeServiceTile'
import { currentFarmer, notifications } from '../data'
import { cropOptions } from '../data/cropTimes'
import { shop } from '../data/shop'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useToast } from '../hooks/useToast'
import { greeting } from '../utils/format'

export function HomePage() {
  useDocumentTitle('Home')
  const { showToast } = useToast()
  const [cropId, setCropId] = useState('crop-cardamom')
  const unread = notifications.some((item) => item.unread)

  const selectItem = (item) => {
    setCropId(item.id)
    showToast(`${item.label} selected`)
  }

  return (
    <div className="overflow-x-hidden pb-2">
      <header className="relative mb-4 flex h-12 items-center justify-between">
        <Link
          to="/"
          className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1 shadow-[0_4px_12px_rgb(28_25_23/0.08)]"
          aria-label="Horti Research Centre LLP"
        >
          <img
            src="/hrc-logo.png"
            alt="Horti Research Centre LLP"
            className="h-full w-full object-contain"
          />
        </Link>
        <Link
          to="/notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-950"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unread ? (
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-hrc-700" />
          ) : null}
        </Link>
      </header>

      <section className="overflow-hidden rounded-[32px] bg-gradient-to-b from-[#d8f3e4] via-[#eefaf3] to-white p-5 shadow-[0_12px_30px_rgb(47_158_95/0.08)]">
        <div>
          <p className="text-[13px] text-ink-500">{greeting()}</p>
          <p className="mt-1 text-[28px] font-bold leading-none tracking-tight text-ink-950">
            {currentFarmer.fullName}
          </p>
          <p className="mt-2 text-sm font-medium text-hrc-800">{currentFarmer.address}</p>
        </div>

        <p className="mt-3 text-xs text-ink-500">{currentFarmer.customerSinceLabel}</p>

        <div className="mt-6 flex gap-10 px-2">
          <Link to="/purchases/dates" className="flex flex-col items-center gap-2">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgb(28_25_23/0.08)]">
              <ArrowUpRight className="h-5 w-5 text-ink-950" />
            </span>
            <span className="text-[12px] font-medium text-ink-700">Purchases</span>
          </Link>
          <Link to="/purchases?view=bills" className="flex flex-col items-center gap-2">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgb(28_25_23/0.08)]">
              <Receipt className="h-5 w-5 text-ink-950" />
            </span>
            <span className="text-[12px] font-medium text-ink-700">My Bills</span>
          </Link>
        </div>
      </section>

      <section className="mt-4 rounded-[32px] bg-white px-3 py-5 shadow-[0_8px_24px_rgb(28_25_23/0.04)]">
        <p className="mb-3 px-2 text-[12px] font-semibold uppercase tracking-wide text-ink-400">
          Crops
        </p>
        <div className="grid grid-cols-4 gap-y-5">
          {cropOptions
            .filter((item) => item.visible !== false)
            .map((item) => (
            <HomeServiceTile
              key={item.id}
              item={item}
              selected={item.id === cropId}
              onSelect={selectItem}
            />
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-[32px] bg-white px-5 py-5 shadow-[0_8px_24px_rgb(28_25_23/0.04)]">
        <p className="text-[16px] font-semibold tracking-tight text-ink-950">{shop.name}</p>
        <p className="mt-2 flex gap-2 text-sm leading-6 text-ink-700">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-hrc-800" />
          <span>
            {shop.addressLines[0]}
            <br />
            {shop.addressLines[1]}
          </span>
        </p>
        <a
          href={`mailto:${shop.email}`}
          className="mt-3 flex items-center gap-2 text-sm font-medium text-hrc-800"
        >
          <Mail className="h-4 w-4 shrink-0" />
          {shop.email}
        </a>
        <p className="mt-3 flex items-center gap-2 text-sm font-medium text-ink-950">
          <Phone className="h-4 w-4 shrink-0 text-hrc-800" />
          <span>
            {shop.phones.map((phone, index) => (
              <span key={phone.href}>
                {index > 0 ? <span className="text-ink-400"> | </span> : null}
                <a href={phone.href}>{phone.display}</a>
              </span>
            ))}
          </span>
        </p>
      </section>
    </div>
  )
}
