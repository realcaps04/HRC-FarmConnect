import { Navigate, useParams } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'
import { getAdvice } from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatDateLong } from '../utils/format'

export function AdviceDetailsPage() {
  const { id } = useParams()
  const article = getAdvice(id)
  useDocumentTitle(article?.title || 'Advice')

  if (!article) return <Navigate to="/advice" replace />

  return (
    <article>
      <PageHeader backTo="/advice" title={article.title} />
      <p className="mb-4 text-sm text-ink-500">
        {article.cropName} · {article.category}
      </p>
      <div
        className="mb-6 h-52 overflow-hidden rounded-xl bg-cover bg-center sm:h-72"
        style={{ backgroundImage: `url(${article.image})` }}
      />
      <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
        Published {formatDateLong(article.publishedOn)}
      </p>
      <p className="mt-4 text-[15px] leading-7 text-ink-700">{article.excerpt}</p>
      <div className="mt-5 space-y-4">
        {article.body.map((paragraph) => (
          <p key={paragraph} className="text-sm leading-7 text-ink-700">
            {paragraph}
          </p>
        ))}
      </div>
      <p className="mt-8 text-xs leading-5 text-ink-400">
        Sample HRC advisory text for this prototype. Follow the latest note from HRC at Chettukuzhy
        before acting in the field.
      </p>
    </article>
  )
}
