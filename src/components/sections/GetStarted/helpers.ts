import step1Icon from '../../../assets/step-1-icon.svg'
import step2Icon from '../../../assets/step-2-icon.svg'
import step3Icon from '../../../assets/step-3-icon.svg'
import step4Icon from '../../../assets/step-4-icon.svg'

export interface GetStartedStep {
  id: string
  label: string
  title: string
  description: string
  icon: string
}

export const getStartedSteps: GetStartedStep[] = [
  {
    id: 'connect',
    label: 'STEP ONE',
    title: 'Connect Phone System',
    description: 'Forward or integrate your existing business number.',
    icon: step1Icon,
  },
  {
    id: 'configure',
    label: 'STEP TWO',
    title: 'Configure Your AI Agent',
    description: 'Add services, pricing, FAQs, and preferences.',
    icon: step2Icon,
  },
  {
    id: 'go-live',
    label: 'STEP THREE',
    title: 'Go Live Instantly',
    description: 'Shaer starts answering calls immediately.',
    icon: step3Icon,
  },
  {
    id: 'grow',
    label: 'STEP FOUR',
    title: 'Watch Revenue Grow',
    description: 'Track bookings, missed calls, and performance in real time.',
    icon: step4Icon,
  },
]
