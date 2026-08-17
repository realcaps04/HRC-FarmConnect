import { matchesQuery } from '../utils/search'
import { adviceArticles } from './advice'
import { applications, recommendations } from './applications'
import { crops } from './farm'
import { catalogueProducts, getHydratedInventory } from './products'
import { purchases } from './purchases'
import { soilReports } from './soilReports'

export { currentFarmer, sampleFarmers } from './farmer'
export { farm, crops, plots, images, getCrop, getPlot } from './farm'
export {
  catalogueProducts,
  inventory,
  productFilters,
  USAGE_DISCLAIMER,
  getCatalogueProduct,
  getInventoryItem,
  getHydratedInventory,
  hydrateInventoryItem,
} from './products'
export { purchases, getPurchase, getBills, getDayUsageGuide } from './purchases'
export {
  applications,
  recommendations,
  getApplication,
  getRecommendation,
} from './applications'
export { soilReports, getSoilReport } from './soilReports'
export { adviceArticles, adviceCategories, getAdvice } from './advice'
export { notifications } from './notifications'
export { shop } from './shop'

export function searchAll(query) {
  const q = query.trim()
  const empty = {
    products: [],
    purchases: [],
    applications: [],
    crops: [],
    advice: [],
    recommendations: [],
    soil: [],
  }
  if (!q) return empty

  const inventoryItems = getHydratedInventory()
  const ownedCatalogueIds = new Set(inventoryItems.map((item) => item.catalogueId))

  return {
    products: [
      ...inventoryItems
        .filter((item) =>
          matchesQuery(
            q,
            item.product?.name,
            item.product?.purpose,
            item.cropName,
            item.product?.category,
          ),
        )
        .map((item) => ({
          type: 'Product',
          id: item.id,
          title: item.product?.name,
          subtitle: item.product?.purpose,
          href: `/products/${item.id}`,
        })),
      ...catalogueProducts
        .filter((item) => !ownedCatalogueIds.has(item.id))
        .filter((item) =>
          matchesQuery(q, item.name, item.purpose, item.category, item.shortDescription),
        )
        .map((item) => ({
          type: 'Catalogue',
          id: item.id,
          title: item.name,
          subtitle: item.purpose,
          href: `/catalogue/${item.slug}`,
        })),
    ],
    purchases: purchases
      .filter((item) =>
        matchesQuery(q, item.productName, item.cropName, item.billNo, item.location),
      )
      .map((item) => ({
        type: 'Purchase',
        id: item.id,
        title: item.productName,
        subtitle: item.purchasedOn,
        href: `/purchases/${item.id}`,
      })),
    applications: applications
      .filter((item) =>
        matchesQuery(q, item.productName, item.cropName, item.plotName, item.purpose),
      )
      .map((item) => ({
        type: 'Application',
        id: item.id,
        title: item.productName,
        subtitle: item.cropName,
        href: `/applications/${item.id}`,
      })),
    crops: crops
      .filter((item) => matchesQuery(q, item.name, item.variety, item.summary))
      .map((item) => ({
        type: 'Crop',
        id: item.id,
        title: item.name,
        subtitle: item.variety,
        href: `/farm/crops/${item.id}`,
      })),
    advice: adviceArticles
      .filter((item) =>
        matchesQuery(q, item.title, item.cropName, item.category, item.excerpt),
      )
      .map((item) => ({
        type: 'Advice',
        id: item.id,
        title: item.title,
        subtitle: item.cropName,
        href: `/advice/${item.id}`,
      })),
    recommendations: recommendations
      .filter((item) => matchesQuery(q, item.productName, item.cropName, item.title))
      .map((item) => ({
        type: 'Recommendation',
        id: item.id,
        title: item.productName,
        subtitle: item.title,
        href: `/applications/${item.applicationId}`,
      })),
    soil: soilReports
      .filter((item) => matchesQuery(q, item.title, item.farmName, item.cropName, item.plotName))
      .map((item) => ({
        type: 'Soil report',
        id: item.id,
        title: item.title,
        subtitle: item.plotName,
        href: `/soil-reports/${item.id}`,
      })),
  }
}
