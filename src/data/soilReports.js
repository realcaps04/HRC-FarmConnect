import { images } from './farm'

export const soilReports = [
  {
    id: 'soil-jul-2026',
    title: 'Soil Report',
    date: '2026-07-12',
    farmName: "Edison's Cardamom Farm",
    cropName: 'Cardamom',
    plotName: 'Plot 1',
    image: images.soil,
    parameters: [
      { label: 'pH', value: '5.8' },
      { label: 'Organic Carbon', value: '1.2%' },
      { label: 'Nitrogen', value: 'Low–medium' },
      { label: 'Phosphorus', value: 'Medium' },
      { label: 'Potassium', value: 'Medium' },
      { label: 'Moisture note', value: 'Adequately moist at sampling' },
    ],
    observation:
      'HRC observation (mock sample): the sample from Plot 1 is moderately acidic, with organic carbon in a workable range for cardamom under shade. Nitrogen is on the lower side compared with phosphorus and potassium.',
    recommendations: [
      'Discuss the nitrogen note with HRC before changing any fertilizer plan.',
      'Keep mulch in place to protect soil moisture on the mid-slope.',
      'Follow the latest HRC product list for Plot 1; do not add extra inputs from this screen.',
    ],
  },
  {
    id: 'soil-feb-2026',
    title: 'Soil Report',
    date: '2026-02-18',
    farmName: "Edison's Cardamom Farm",
    cropName: 'Pepper',
    plotName: 'Plot 3',
    image: images.compost,
    parameters: [
      { label: 'pH', value: '6.0' },
      { label: 'Organic Carbon', value: '1.0%' },
      { label: 'Nitrogen', value: 'Medium' },
      { label: 'Phosphorus', value: 'Low–medium' },
      { label: 'Potassium', value: 'Medium' },
      { label: 'Moisture note', value: 'Slightly dry at sampling' },
    ],
    observation:
      'HRC observation (mock sample): Plot 3 pepper support-tree rows showed a near-neutral pH and moderate potassium. Phosphorus was noted as the parameter to watch in the next visit.',
    recommendations: [
      'Carry this report to the next HRC consultation for Plot 3.',
      'Do not interpret these numbers as a fertilizer recipe.',
      'Record any new applications in the companion after they are done.',
    ],
  },
]

export function getSoilReport(id) {
  return soilReports.find((item) => item.id === id)
}
