import businessImage1 from '../../../assets/business-image-1.png'
import businessImage2 from '../../../assets/business-image-2.png'
import businessImage3 from '../../../assets/business-image-3.png'
import businessImage4 from '../../../assets/business-image-4.png'

export interface BusinessCard {
  id: string
  title: string
  description: string
  image: string
}

export const businessCards: BusinessCard[] = [
  {
    id: 'overview',
    title: 'Lorem ipsum dolor',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    image: businessImage1,
  },
  {
    id: 'notifications',
    title: 'Lorem ipsum dolor',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: businessImage2,
  },
  {
    id: 'booking',
    title: 'Lorem ipsum dolor',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    image: businessImage3,
  },
  {
    id: 'revenue',
    title: 'Lorem ipsum dolor',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    image: businessImage4,
  },
]
