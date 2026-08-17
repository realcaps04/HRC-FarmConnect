export const cropOptions = [
  {
    id: 'crop-cardamom',
    label: 'Cardamom',
    kind: 'crop',
    tone: 'green',
    href: '/farm/crops/crop-cardamom',
    image: '/crops/cardamom-plant.png',
    visible: true,
  },
  {
    id: 'crop-pepper',
    label: 'Pepper',
    kind: 'crop',
    tone: 'brown',
    href: '/farm/crops/crop-pepper',
    visible: false,
  },
  {
    id: 'crop-vegetables',
    label: 'Vegetables',
    kind: 'crop',
    tone: 'orange',
    href: '/products',
    visible: false,
  },
  {
    id: 'crop-all',
    label: 'All crops',
    kind: 'crop',
    tone: 'teal',
    href: '/farm',
    visible: false,
  },
]

export const cropTimes = [
  {
    id: 'time-monsoon',
    label: 'Monsoon',
    kind: 'time',
    tone: 'blue',
    note: 'Rainy months — drainage and root care.',
  },
  {
    id: 'time-flowering',
    label: 'Flowering',
    kind: 'time',
    tone: 'pink',
    note: 'Bloom period — follow HRC notes closely.',
  },
  {
    id: 'time-harvest',
    label: 'Harvest',
    kind: 'time',
    tone: 'gold',
    note: 'Picking season — keep records of what was used.',
  },
  {
    id: 'time-growing',
    label: 'Growing',
    kind: 'time',
    tone: 'lime',
    note: 'Active growth — nutrition and soil watch.',
  },
  {
    id: 'time-planting',
    label: 'Planting',
    kind: 'time',
    tone: 'mint',
    note: 'New clumps or vines — start with HRC’s list.',
  },
  {
    id: 'time-offseason',
    label: 'Off season',
    kind: 'time',
    tone: 'slate',
    note: 'Quieter months — review soil and stores.',
  },
  {
    id: 'time-postharvest',
    label: 'Post-harvest',
    kind: 'time',
    tone: 'amber',
    note: 'After picking — rest the plot and record use.',
  },
  {
    id: 'time-nursery',
    label: 'Nursery',
    kind: 'time',
    tone: 'coral',
    note: 'Young plants — keep this on a separate plan.',
  },
]

export const homeGridItems = [...cropOptions.filter((item) => item.visible !== false), ...cropTimes]

export function getCropOption(id) {
  return cropOptions.find((item) => item.id === id)
}

export function getCropTime(id) {
  return cropTimes.find((item) => item.id === id)
}
