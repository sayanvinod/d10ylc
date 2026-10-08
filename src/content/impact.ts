export interface ImpactStory {
  title: string;
  category: 'Policy' | 'Service' | 'Events' | 'Workshops';
  date?: string;
  status: 'ongoing' | 'historical';
  communityNeed?: string;
  summary: string;
  partners?: string[];
  result?: string;
  imageSrc?: string;
  imageAlt?: string;
  published: boolean;
}

export const impactStories: ImpactStory[] = [
  {
    title: 'Workshops',
    category: 'Workshops',
    status: 'historical',
    summary:
      'A total of 15 attendees enjoyed financial and college-major exploration workshops produced by D10YLC.',
    imageSrc: '/images/impact/workshops.jpg',
    imageAlt:
      'Finance charts, a calculator, and a notebook labeled Finance.',
    published: true,
  },
  {
    title: 'AVCA Events',
    category: 'Events',
    status: 'ongoing',
    summary:
      "D10YLC volunteers continue to support the Almaden Valley Community Association (AVCA) through events including the Mayor's Budget Message, City Council candidate forums, and County Supervisor forums.",
    partners: ['Almaden Valley Community Association (AVCA)'],
    imageSrc: '/images/impact/avca-events.png',
    imageAlt: 'Almaden Valley Community Association logo.',
    published: true,
  },
  {
    title: 'Policies',
    category: 'Policy',
    status: 'ongoing',
    summary:
      'D10YLC’s ongoing policy work focuses on two proposals addressing poverty and transportation, intended for submission to the City of San José.',
    imageSrc: '/images/impact/policies.jpg',
    imageAlt: 'Illustration of a policy checklist and shield.',
    published: true,
  },
  {
    title: 'Instagram',
    category: 'Service',
    status: 'historical',
    summary:
      'The D10YLC technology team ran an Instagram account to share upcoming events, new policies, and other updates.',
    imageSrc: '/images/impact/instagram.jpg',
    imageAlt:
      'Phone displaying the Instagram logo with social notification icons.',
    published: true,
  },
  {
    title: 'Almaden Lake Park',
    category: 'Service',
    status: 'ongoing',
    summary:
      'D10YLC’s ongoing cleanup and stewardship of Almaden Lake Park helps care for the park and provide volunteer opportunities for San José youth.',
    imageSrc: '/images/impact/almaden-lake-park.jpg',
    imageAlt: 'Lake, walking paths, and benches at Almaden Lake Park.',
    published: true,
  },
  {
    title: 'Budget Summit',
    category: 'Events',
    status: 'historical',
    summary:
      'D10YLC members participated in a budget summit and created presentations recommending improvements to educational resources offered by the city.',
    imageSrc: '/images/impact/budget-summit.png',
    imageAlt:
      'Illustration of a budget checklist, coin, money bag, and building.',
    published: true,
  },
];

export function getPublishedImpact(items: ImpactStory[]): ImpactStory[] {
  return items
    .filter((item) => item.published)
    .sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}
