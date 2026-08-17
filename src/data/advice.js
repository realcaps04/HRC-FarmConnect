import { images } from './farm'

export const adviceCategories = [
  'All',
  'Crop Nutrition',
  'Disease Management',
  'Pest Management',
  'Soil',
  'Seasonal Advice',
  'General Farming',
]

export const adviceArticles = [
  {
    id: 'adv-root-health',
    title: 'Managing Root Health',
    cropName: 'Cardamom',
    category: 'Disease Management',
    publishedOn: '2026-08-10',
    image: images.roots,
    excerpt:
      'Understanding soil moisture, root health and disease prevention in cardamom under shade.',
    body: [
      'This note is sample HRC advisory content for the companion prototype. It is written in plain language so it is easy to read on the farm.',
      'Root health in cardamom is closely tied to soil moisture and shade. Water that stays too long around the clump, or soil that dries hard between rains, both make roots less able to take up nutrients.',
      'HRC’s field notes for this farm point farmers to watch new shoots, leaf colour, and the feel of the soil a hand-span from the clump — then to use only the products already listed for the plot.',
      'If something looks unusual, bring a photo or a small soil sample to HRC at Chettukuzhy rather than adding extra products on your own.',
    ],
  },
  {
    id: 'adv-monsoon-cardamom',
    title: 'Monsoon care for cardamom',
    cropName: 'Cardamom',
    category: 'Seasonal Advice',
    publishedOn: '2026-07-22',
    image: images.mistyHills,
    excerpt:
      'A short seasonal note on drainage, shade and timing of applications during heavy rain.',
    body: [
      'Sample seasonal advice: during heavy monsoon spells, keep drains clear so water does not sit around cardamom clumps.',
      'Shade trees help, but low branches that keep leaves wet for long hours can be discussed with HRC during the next visit.',
      'Do not treat this article as a spraying calendar. Application dates in your companion come from HRC recommendations linked to your farm.',
    ],
  },
  {
    id: 'adv-pepper-nutrition',
    title: 'Feeding pepper on support trees',
    cropName: 'Pepper',
    category: 'Crop Nutrition',
    publishedOn: '2026-07-04',
    image: images.pepper,
    excerpt:
      'How HRC groups nutrition notes for pepper grown along the lower slope.',
    body: [
      'This is mock advisory text. Pepper on support trees needs a steady organic mulch and a nutrition plan that matches the soil report for Plot 3.',
      'Your companion already lists purchases linked to pepper and vegetables. Use those records when you speak with HRC, rather than guessing quantities from memory.',
    ],
  },
  {
    id: 'adv-soil-mulch',
    title: 'Keeping soil covered on the slope',
    cropName: 'Cardamom',
    category: 'Soil',
    publishedOn: '2026-06-16',
    image: images.soil,
    excerpt:
      'Why mulch and shade matter for Idukki slopes, in simple farm language.',
    body: [
      'Bare soil on a slope loses moisture quickly and washes with hard rain. HRC sample notes ask farmers to keep leaf litter and mulch in place around clumps.',
      'This article does not replace a soil report. Open your latest soil report in this app before changing anything in the field.',
    ],
  },
  {
    id: 'adv-homestead-veg',
    title: 'Homestead vegetables beside the farm',
    cropName: 'Vegetables',
    category: 'General Farming',
    publishedOn: '2026-06-02',
    image: images.vegetables,
    excerpt:
      'A short note on keeping vegetable beds on a separate, simple plan from plantation crops.',
    body: [
      'Azospirillum in your purchase list is linked to homestead vegetables. Keep vegetable beds on their own record so plantation products are not mixed by habit.',
      'Ask HRC which inputs are meant for vegetables and which are only for cardamom or pepper.',
    ],
  },
  {
    id: 'adv-pest-watch',
    title: 'Watching for pests without rushing to spray',
    cropName: 'Cardamom',
    category: 'Pest Management',
    publishedOn: '2026-05-20',
    image: images.foliage,
    excerpt:
      'Look first, record what you see, then follow HRC before using a pest-management product.',
    body: [
      'Vertis appears in your history as a pest-management product that has already been used up. New use should wait for a fresh HRC note.',
      'This prototype article is here to show how pest advice will sit beside your application history — not to tell you what to spray today.',
    ],
  },
]

export function getAdvice(id) {
  return adviceArticles.find((item) => item.id === id)
}
