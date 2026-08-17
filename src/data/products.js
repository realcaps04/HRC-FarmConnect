import { images } from './farm'

export const productFilters = [
  'All',
  'Fertilizer',
  'Disease Management',
  'Pest Management',
  'Microbial',
  'Other',
]

export const USAGE_DISCLAIMER =
  'Always follow the latest HRC recommendation and the product label before application.'

export const catalogueProducts = [
  {
    id: 'cat-pasil',
    slug: 'pasil',
    name: 'Pasil',
    category: 'Agricultural Input',
    filterCategory: 'Other',
    purpose: 'Nematode Management',
    suitableCrops: ['Cardamom', 'Pepper'],
    image: images.soil,
    shortDescription:
      'HRC-provided information: an agricultural input used in nematode management programmes for plantation crops.',
    about:
      'Pasil is recorded in your HRC companion as an input used to support nematode management in cardamom. This screen explains how HRC has grouped the product for your farm — it is not a substitute for the product label or a field visit.',
    howToUse: [
      'Measure the recommended quantity',
      'Prepare according to the recommended method',
      'Apply to the appropriate area',
      'Follow the recommended interval',
    ],
    guidance: {
      dose: 'Example — 50 g / plant',
      method: 'Example — Soil application',
      timing: 'Example — As advised after soil observation',
      crops: 'Cardamom, Pepper',
      precautions: 'Example — Keep away from water channels; wash hands after handling',
    },
  },
  {
    id: 'cat-pseudo',
    slug: 'pseudo',
    name: 'Pseudo',
    category: 'Microbial',
    filterCategory: 'Microbial',
    purpose: 'Root and soil health support',
    suitableCrops: ['Cardamom', 'Pepper', 'Vegetables'],
    image: images.roots,
    shortDescription:
      'HRC-provided information: a microbial product listed for supporting root-zone health as part of a broader crop-care plan.',
    about:
      'Pseudo is listed by HRC as a microbial input. In this companion it is shown against the crops HRC has linked to your purchases. Use only the quantity and method given on the latest HRC note and the product label.',
    howToUse: [
      'Check the latest HRC note for this crop',
      'Measure the example quantity shown below',
      'Mix or prepare as described on the label',
      'Apply to the crop area named by HRC',
    ],
    guidance: {
      dose: 'Example — 5 g / litre of water',
      method: 'Example — Drench to the root zone',
      timing: 'Example — During cool hours of the day',
      crops: 'Cardamom, Pepper, Vegetables',
      precautions: 'Example — Do not mix with products unless HRC has said it is suitable',
    },
  },
  {
    id: 'cat-trichoderma',
    slug: 'trichoderma',
    name: 'Trichoderma',
    category: 'Microbial',
    filterCategory: 'Microbial',
    purpose: 'Disease Management',
    suitableCrops: ['Cardamom', 'Pepper'],
    image: images.foliage,
    shortDescription:
      'HRC-provided information: a microbial input used in disease-management programmes for plantation crops.',
    about:
      'Trichoderma is shown here as a microbial product HRC supplies for disease-management plans. The steps below are mock examples for this prototype and must not be treated as a field prescription.',
    howToUse: [
      'Confirm the crop and plot with HRC advice',
      'Measure the recommended quantity',
      'Prepare according to the recommended method',
      'Apply evenly to the indicated area',
    ],
    guidance: {
      dose: 'Example — 10 g / litre of water',
      method: 'Example — Soil drench',
      timing: 'Example — After a rain break, when soil is moist',
      crops: 'Cardamom, Pepper',
      precautions: 'Example — Store in a cool, shaded place; use before the labelled date',
    },
  },
  {
    id: 'cat-vertis',
    slug: 'vertis',
    name: 'Vertis',
    category: 'Pest Management',
    filterCategory: 'Pest Management',
    purpose: 'Pest Management',
    suitableCrops: ['Cardamom', 'Pepper'],
    image: images.greenhouse,
    shortDescription:
      'HRC-provided information: a pest-management product listed for use only as directed by HRC and the product label.',
    about:
      'Vertis is grouped under pest management in your HRC records. This page summarises how the product is filed for your farm. Timing, crop, and quantity must come from HRC and the label — not from this mock screen.',
    howToUse: [
      'Read the latest HRC pest note for the crop',
      'Measure only the quantity advised',
      'Apply with the method named by HRC',
      'Record the application in this companion after use',
    ],
    guidance: {
      dose: 'Example — 2 ml / litre of water',
      method: 'Example — Foliar spray',
      timing: 'Example — Early morning, as advised',
      crops: 'Cardamom, Pepper',
      precautions: 'Example — Avoid spray drift to neighbouring plots; wear basic protection',
    },
  },
  {
    id: 'cat-azospirillum',
    slug: 'azospirillum',
    name: 'Azospirillum',
    category: 'Fertilizer',
    filterCategory: 'Fertilizer',
    purpose: 'Crop Nutrition',
    suitableCrops: ['Vegetables', 'Cardamom'],
    image: images.vegetables,
    shortDescription:
      'HRC-provided information: a microbial fertilizer listed to support crop nutrition programmes.',
    about:
      'Azospirillum is recorded as a nutrition-related microbial fertilizer in the HRC catalogue. Your companion shows it against the crops linked to your purchase. Follow HRC’s latest note for where and when it should be used.',
    howToUse: [
      'Shake or mix as described on the label',
      'Measure the example quantity below',
      'Apply to the crop named in your HRC note',
      'Keep a simple record of the date and plot',
    ],
    guidance: {
      dose: 'Example — 5 ml / litre of water',
      method: 'Example — Root-zone application',
      timing: 'Example — At planting or as advised in season',
      crops: 'Vegetables, Cardamom',
      precautions: 'Example — Do not expose the bottle to direct sun for long periods',
    },
  },
]

export const inventory = [
  {
    id: 'inv-pasil',
    catalogueId: 'cat-pasil',
    cropId: 'crop-cardamom',
    cropName: 'Cardamom',
    quantityLabel: '2 kg',
    quantityValue: 2,
    unit: 'kg',
    purchasedOn: '2026-08-12',
    status: 'Available',
    remainingLabel: '2 kg remaining',
  },
  {
    id: 'inv-trichoderma',
    catalogueId: 'cat-trichoderma',
    cropId: 'crop-cardamom',
    cropName: 'Cardamom',
    quantityLabel: '1 kg',
    quantityValue: 1,
    unit: 'kg',
    purchasedOn: '2026-08-05',
    status: 'Partially Used',
    remainingLabel: '750 g remaining',
  },
  {
    id: 'inv-azospirillum',
    catalogueId: 'cat-azospirillum',
    cropId: null,
    cropName: 'Vegetables',
    quantityLabel: '2 L',
    quantityValue: 2,
    unit: 'L',
    purchasedOn: '2026-07-28',
    status: 'Available',
    remainingLabel: '2 L remaining',
  },
  {
    id: 'inv-pseudo',
    catalogueId: 'cat-pseudo',
    cropId: 'crop-cardamom',
    cropName: 'Cardamom',
    quantityLabel: '500 g',
    quantityValue: 0.5,
    unit: 'kg',
    purchasedOn: '2026-07-14',
    status: 'Available',
    remainingLabel: '500 g remaining',
  },
  {
    id: 'inv-vertis',
    catalogueId: 'cat-vertis',
    cropId: 'crop-cardamom',
    cropName: 'Cardamom',
    quantityLabel: '250 ml',
    quantityValue: 0.25,
    unit: 'L',
    purchasedOn: '2026-06-30',
    status: 'Used Up',
    remainingLabel: 'None remaining',
  },
]

export function getCatalogueProduct(id) {
  return catalogueProducts.find((item) => item.id === id || item.slug === id)
}

export function getInventoryItem(id) {
  return inventory.find((item) => item.id === id)
}

export function hydrateInventoryItem(item) {
  const product = getCatalogueProduct(item.catalogueId)
  return { ...item, product }
}

export function getHydratedInventory() {
  return inventory.map(hydrateInventoryItem)
}
