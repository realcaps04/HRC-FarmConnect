import { images } from './farm'

const INVOICE = {
  billNo: 'B2C/26-27/4530',
  purchasedOn: '2026-08-15',
  location: 'HRC, Chettukuzhy',
  payment: 'UPI',
  preparedBy: 'ASHIKA',
  notes: 'Tax invoice from Horti Research Centre LLP. Paid in full by UPI at Chettukuzhy.',
}

export const purchases = [
  {
    id: 'pur-tagmil-aug15',
    catalogueId: 'cat-tagmil',
    productName: 'Tagmil 1 Kg',
    cropName: 'Cardamom',
    category: 'Pesticide',
    quantityLabel: '10 Nos',
    quantity: 10,
    unit: 'Nos',
    rate: 889.83,
    gstPercent: 18,
    amount: 10499.99,
    image: images.foliage,
    ...INVOICE,
  },
  {
    id: 'pur-gilquin-aug15',
    catalogueId: 'cat-gilquin',
    productName: 'Gilquin 1 Ltr',
    cropName: 'Cardamom',
    category: 'Pesticide',
    quantityLabel: '4 Nos',
    quantity: 4,
    unit: 'Nos',
    rate: 576.27,
    gstPercent: 18,
    amount: 2719.99,
    image: images.soil,
    ...INVOICE,
  },
  {
    id: 'pur-hemansuper-aug15',
    catalogueId: 'cat-hemansuper',
    productName: 'Hemansuper 1 Ltr',
    cropName: 'Cardamom',
    category: 'Pesticide',
    quantityLabel: '1 Nos',
    quantity: 1,
    unit: 'Nos',
    rate: 550.85,
    gstPercent: 18,
    amount: 650,
    image: images.roots,
    ...INVOICE,
  },
  {
    id: 'pur-fm-aug15',
    catalogueId: 'cat-fm',
    productName: 'Fm 250 Gm New',
    cropName: 'Cardamom',
    category: 'Pesticide',
    quantityLabel: '10 PCS',
    quantity: 10,
    unit: 'PCS',
    rate: 114.29,
    gstPercent: 5,
    amount: 1200.05,
    image: images.compost,
    ...INVOICE,
  },
  {
    id: 'pur-tagmycin-aug15',
    catalogueId: 'cat-tagmycin',
    productName: 'Tagmycin 6 Gm',
    cropName: 'Cardamom',
    category: 'Pesticide',
    quantityLabel: '30 Nos',
    quantity: 30,
    unit: 'Nos',
    rate: 29.66,
    gstPercent: 18,
    amount: 1049.96,
    image: images.cardamom,
    ...INVOICE,
  },
  {
    id: 'pur-viraat-aug15',
    catalogueId: 'cat-viraat',
    productName: 'Viraat Plus 1 L',
    cropName: 'Cardamom',
    category: 'Pesticide',
    quantityLabel: '3 Nos',
    quantity: 3,
    unit: 'Nos',
    rate: 288.13,
    gstPercent: 18,
    amount: 1019.98,
    image: images.pepper,
    ...INVOICE,
  },
  {
    id: 'pur-taggibb-aug15',
    catalogueId: 'cat-taggibb',
    productName: 'Taggibb 1 Gm',
    cropName: 'Cardamom',
    category: 'Pesticide',
    quantityLabel: '10 Nos',
    quantity: 10,
    unit: 'Nos',
    rate: 66.67,
    gstPercent: 5,
    amount: 700.04,
    image: images.vegetables,
    ...INVOICE,
  },
]

export function getPurchase(id) {
  return purchases.find((item) => item.id === id)
}

export function getBills() {
  const grouped = new Map()
  for (const item of purchases) {
    const current = grouped.get(item.billNo) || {
      billNo: item.billNo,
      purchasedOn: item.purchasedOn,
      location: item.location,
      payment: item.payment,
      items: [],
      amount: 0,
    }
    current.items.push(item)
    current.amount += item.amount
    grouped.set(item.billNo, current)
  }
  return [...grouped.values()].sort((a, b) => (a.purchasedOn < b.purchasedOn ? 1 : -1))
}
