export type reward = {
  id: number
  title: string
  points: number
  description: string
}

export const rewards: reward[] = [
  {
    id: 1,
    title: 'Big Box (gastronomic experience)',
    points: 300,
    description: 'Some cool description',
  },
  {
    id: 2,
    title: 'Amazon Giftcard $50 USD',
    points: 500,
    description: 'Another cool description',
  },
  {
    id: 3,
    title: 'Distillery Swag Store $50 USD',
    points: 500,
    description: 'Original cool description',
  },
  {
    id: 4,
    title: 'Distillery Swag Store $100 USD',
    points: 1000,
    description: 'Another cool description',
  },
  {
    id: 5,
    title: 'Certification Sponsorship* (not work/project related)',
    points: 2000,
    description: 'Another cool description',
  },
  {
    id: 6,
    title: 'Learning Material Sponsorship*',
    points: 2000,
    description: 'Unraveled cool description',
  },
  {
    id: 7,
    title: 'Conferences Tickets Sponsorship*',
    points: 2000,
    description: 'Original cool description',
  },
  {
    id: 8,
    title: 'Experiences: Dinner for 2, recital/concert tickets, spa*',
    points: 2000,
    description: 'Another cool description',
  },
  {
    id: 9,
    title: 'Office Items (office furniture, devices)',
    points: 10000,
    description: 'Unraveled cool description',
  },
  {
    id: 10,
    title: 'Traveling between offices',
    points: 20000,
    description: 'Another cool description',
  },
]
