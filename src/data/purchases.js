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
    image: '/products/tagmil.png?v=2',
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
    image: '/products/gilquin.jpg',
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
    image: '/products/hemansuper.jpg',
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
    image: '',
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
    image: '/products/tagmycin.webp',
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
    image: '/products/viraat.webp',
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
    image: '/products/taggibb.webp',
    ...INVOICE,
  },
]

export const dayUsageGuides = [
  {
    purchasedOn: '2026-08-15',
    methods: [
      {
        id: 'spraying',
        label: 'Spraying',
        mixIn: '200 litres',
        items: [
          { catalogueId: 'cat-gilquin', productName: 'Gilquin', dose: '400 ml' },
          { catalogueId: 'cat-hemansuper', productName: 'Hemansuper', dose: '100 ml' },
          { catalogueId: 'cat-fm', productName: 'Fm 250 Gm New', dose: '1 packet' },
          { catalogueId: 'cat-tagmycin', productName: 'Tagmycin 6 Gm', dose: '3 packets' },
          { catalogueId: 'cat-viraat', productName: 'Viraat Plus 1 L', dose: '300 ml' },
          { catalogueId: 'cat-taggibb', productName: 'Taggibb 1 Gm', dose: '1 Nos' },
        ],
      },
      {
        id: 'pouring',
        label: 'Pouring',
        mixIn: '200 litres',
        items: [
          { catalogueId: 'cat-tagmil', productName: 'Tagmil', dose: '400 g' },
        ],
      },
    ],
  },
]

export function getPurchase(id) {
  return purchases.find((item) => item.id === id)
}

export function getDayUsageGuide(purchasedOn) {
  return dayUsageGuides.find((guide) => guide.purchasedOn === purchasedOn)
}

export function getPurchaseDays() {
  const grouped = new Map()
  for (const item of purchases) {
    const current = grouped.get(item.purchasedOn) || {
      purchasedOn: item.purchasedOn,
      billNo: item.billNo,
      location: item.location,
      payment: item.payment,
      items: [],
      amount: 0,
      gst: 0,
      crops: new Set(),
      categories: new Set(),
    }
    current.items.push(item)
    current.amount += item.amount
    current.gst += (item.amount * item.gstPercent) / (100 + item.gstPercent)
    current.crops.add(item.cropName)
    current.categories.add(item.category)
    grouped.set(item.purchasedOn, current)
  }

  return [...grouped.values()]
    .map((day) => ({
      purchasedOn: day.purchasedOn,
      billNo: day.billNo,
      location: day.location,
      payment: day.payment,
      items: day.items,
      itemCount: day.items.length,
      amount: day.amount,
      gst: day.gst,
      crops: [...day.crops],
      categories: [...day.categories],
    }))
    .sort((a, b) => (a.purchasedOn < b.purchasedOn ? 1 : -1))
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
