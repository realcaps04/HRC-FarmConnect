export const images = {
  farmHero:
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80',
  cardamom:
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80',
  pepper:
    'https://images.unsplash.com/photo-1509358271058-acd22cc9341d?auto=format&fit=crop&w=1200&q=80',
  vegetables:
    'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?auto=format&fit=crop&w=1200&q=80',
  soil:
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80',
  roots:
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80',
  greenhouse:
    'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80',
  mistyHills:
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
  fieldWork:
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1400&q=80',
  foliage:
    'https://images.unsplash.com/photo-1466692476866-aef1dfb1e739?auto=format&fit=crop&w=1200&q=80',
  compost:
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
}

export const farm = {
  id: 'farm-1',
  name: "Edison's Cardamom Farm",
  location: 'Thopramkudy',
  landmark: 'Mullappallil, Idukki',
  totalAcres: 3.5,
  plotCount: 3,
  elevation: '1,100 m',
  image: images.mistyHills,
  notes: 'Cardamom under shade trees, with pepper on support trees along the lower slope.',
}

export const plots = [
  {
    id: 'plot-1',
    name: 'Plot 1',
    cropId: 'crop-cardamom',
    acres: 1.5,
    slope: 'Mid-slope',
  },
  {
    id: 'plot-2',
    name: 'Plot 2',
    cropId: 'crop-cardamom',
    acres: 1,
    slope: 'Upper slope',
  },
  {
    id: 'plot-3',
    name: 'Plot 3',
    cropId: 'crop-pepper',
    acres: 1,
    slope: 'Lower slope',
  },
]

export const crops = [
  {
    id: 'crop-cardamom',
    name: 'Cardamom',
    acres: 2.5,
    variety: 'Njallani',
    plots: ['Plot 1', 'Plot 2'],
    image: '/crops/cardamom-plant.png',
    accent: '#1a4a38',
    summary: 'Main crop on the mid and upper slopes, grown under mixed shade.',
  },
  {
    id: 'crop-pepper',
    name: 'Pepper',
    acres: 1,
    variety: 'Karimunda',
    plots: ['Plot 3'],
    image: images.pepper,
    accent: '#6b4a32',
    summary: 'Grown on support trees along the lower slope of the farm.',
  },
]

export function getCrop(id) {
  return crops.find((crop) => crop.id === id)
}

export function getPlot(id) {
  return plots.find((plot) => plot.id === id)
}
