export interface StatItem {
  id: string
  title: string
  label: string
}

export const stats: StatItem[] = [
  {
    id: 'calls-answered',
    title: '100%',
    label: 'Calls answered, day or night.',
  },
  {
    id: 'response-time',
    title: '< 1s',
    label: 'Average response time to every caller.',
  },
  {
    id: 'languages',
    title: '40+',
    label: 'Languages supported out of the box.',
  },
  {
    id: 'jobs-booked',
    title: '24/7',
    label: 'Jobs booked while your team focuses on the work.',
  },
]
