import { Link, Navigate, useParams } from 'react-router-dom'
import { Disclaimer } from '../components/ui/Disclaimer'
import { PageHeader } from '../components/ui/PageHeader'
import { getCatalogueProduct, inventory } from '../data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function CatalogueProductPage() {
  const { id } = useParams()
  const product = getCatalogueProduct(id)
  useDocumentTitle(product?.name || 'Catalogue')
  const owned = inventory.find((item) => item.catalogueId === product?.id)

  if (!product) return <Navigate to="/catalogue" replace />

  return (
    <div>
      <PageHeader backTo="/catalogue" title={product.name} subtitle={product.purpose} />
      <div
        className="mb-5 h-48 overflow-hidden rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(${product.image})` }}
      />
      <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
        HRC-provided information
      </p>
      <p className="mt-3 text-sm leading-7 text-ink-700">{product.shortDescription}</p>
      <p className="mt-4 text-sm leading-7 text-ink-700">{product.about}</p>

      <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border border-sand-200 bg-white p-4">
          <dt className="text-ink-400">Category</dt>
          <dd className="mt-1 font-semibold text-ink-950">{product.category}</dd>
        </div>
        <div className="rounded-xl border border-sand-200 bg-white p-4">
          <dt className="text-ink-400">Suitable crops</dt>
          <dd className="mt-1 font-semibold text-ink-950">{product.suitableCrops.join(', ')}</dd>
        </div>
      </dl>

      <Disclaimer className="mt-5" />

      {owned ? (
        <Link
          to={`/products/${owned.id}`}
          className="mt-6 inline-flex text-sm font-medium text-hrc-800"
        >
          You have this in My Products
        </Link>
      ) : (
        <p className="mt-6 text-sm text-ink-500">This product is not in your current HRC list.</p>
      )}
    </div>
  )
}
