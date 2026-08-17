import { Link } from 'react-router-dom'

export function HomePromoCard({ article }) {
  return (
    <article className="relative min-w-[82%] overflow-hidden rounded-[28px] bg-[#e8eef2] p-5 sm:min-w-[320px]">
      <div
        className="pointer-events-none absolute -right-4 -top-6 h-28 w-28 rounded-[28px] bg-cover bg-center opacity-90"
        style={{ backgroundImage: `url(${article.image})` }}
      />
      <div className="relative max-w-[70%]">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-hrc-800">
          {article.cropName} · {article.category}
        </p>
        <h3 className="mt-1 text-[17px] font-bold leading-6 text-ink-950">{article.title}</h3>
        <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-ink-500">{article.excerpt}</p>
        <Link
          to={`/advice/${article.id}`}
          className="mt-4 inline-flex h-8 items-center rounded-full bg-ink-950 px-4 text-[12px] font-semibold text-white"
        >
          Explore
        </Link>
      </div>
    </article>
  )
}
