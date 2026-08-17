import { Link } from 'react-router-dom'
import { formatDate } from '../utils/format'

export function AdviceCard({ article }) {
  return (
    <Link
      to={`/advice/${article.id}`}
      className="group overflow-hidden rounded-xl border border-sand-200 bg-white shadow-[0_1px_2px_rgb(28_25_23/0.04)] transition-colors hover:bg-sand-50"
    >
      <div
        className="h-36 bg-cover bg-center"
        style={{ backgroundImage: `url(${article.image})` }}
      />
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-hrc-700">
          {article.cropName} · {article.category}
        </p>
        <h3 className="mt-2 text-[15px] font-semibold text-ink-950">{article.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-500">{article.excerpt}</p>
        <p className="mt-3 text-xs text-ink-400">Published {formatDate(article.publishedOn)}</p>
      </div>
    </Link>
  )
}
