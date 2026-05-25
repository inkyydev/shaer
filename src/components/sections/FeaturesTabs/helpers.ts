import jobImg1 from '../../../assets/job-img-1.png'
import jobImg2 from '../../../assets/job-img-2.png'
import jobImg3 from '../../../assets/job-img-3.png'
import jobImg4 from '../../../assets/job-img-4.png'
import jobImg5 from '../../../assets/job-img-5.png'

export interface FeatureTab {
  id: string
  label: string
  title: string
  description: string
  image: string
}

export const featureTabs: FeatureTab[] = [
  {
    id: 'receptionist',
    label: 'Receptionist',
    title: 'Receptionist',
    description:
      'Answers every call instantly with natural human conversation and collects job details without scripts.',
    image: jobImg1,
  },
  {
    id: 'scheduler',
    label: 'Scheduler',
    title: 'Scheduler',
    description:
      'Books appointments directly into your calendar in real time, eliminating back-and-forth and manual coordination.',
    image: jobImg2,
  },
  {
    id: 'shaer-console',
    label: 'Shaer Console',
    title: 'Shaer Console',
    description:
      'Your central dashboard for monitoring calls, tracking performance, and managing customer interactions in one place.',
    image: jobImg3,
  },
  {
    id: 'intelligent-routing',
    label: 'Intelligent Routing',
    title: 'Intelligent Routing',
    description:
      'Automatically directs each call to the right technician or department based on urgency, service type, and availability.',
    image: jobImg4,
  },
  {
    id: 'availability',
    label: '24/7 Availability',
    title: '24/7 Availability',
    description:
      'Handles after-hours and emergency calls so you never miss high-value jobs — even when your team is offline.',
    image: jobImg5,
  },
]

export type CardLayer = 'front' | 'middle' | 'back' | 'out' | 'enter' | 'enter-front'

export function getStack(activeIndex: number) {
  const items: { tab: FeatureTab; layer: CardLayer }[] = []

  if (activeIndex + 2 < featureTabs.length) {
    items.push({ tab: featureTabs[activeIndex + 2], layer: 'back' })
  }
  if (activeIndex + 1 < featureTabs.length) {
    items.push({ tab: featureTabs[activeIndex + 1], layer: 'middle' })
  }
  items.push({ tab: featureTabs[activeIndex], layer: 'front' })

  return items
}

export function getPromoteStack(fromIndex: number, run: boolean) {
  const items: { tab: FeatureTab; layer: CardLayer }[] = []

  items.push({ tab: featureTabs[fromIndex], layer: run ? 'out' : 'front' })

  if (fromIndex + 1 < featureTabs.length) {
    items.push({
      tab: featureTabs[fromIndex + 1],
      layer: run ? 'front' : 'middle',
    })
  }
  if (fromIndex + 2 < featureTabs.length) {
    items.push({
      tab: featureTabs[fromIndex + 2],
      layer: run ? 'middle' : 'back',
    })
  }
  if (fromIndex + 3 < featureTabs.length) {
    items.push({
      tab: featureTabs[fromIndex + 3],
      layer: run ? 'back' : 'enter',
    })
  }

  return items
}

export function getDemoteStack(fromIndex: number, run: boolean) {
  const items: { tab: FeatureTab; layer: CardLayer }[] = []
  const toIndex = fromIndex - 1

  if (run && fromIndex + 2 < featureTabs.length) {
    items.push({ tab: featureTabs[fromIndex + 2], layer: 'out' })
  }
  if (fromIndex + 1 < featureTabs.length) {
    items.push({
      tab: featureTabs[fromIndex + 1],
      layer: run ? 'back' : 'middle',
    })
  }
  items.push({
    tab: featureTabs[fromIndex],
    layer: run ? 'middle' : 'front',
  })
  if (toIndex >= 0) {
    items.push({
      tab: featureTabs[toIndex],
      layer: run ? 'front' : 'enter-front',
    })
  }

  return items
}

export function isNextTab(from: number, to: number) {
  return to === from + 1
}

export function isPrevTab(from: number, to: number) {
  return to === from - 1
}
