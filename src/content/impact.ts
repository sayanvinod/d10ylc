export interface ImpactStory {
  title: string;
  category: 'Policy' | 'Service' | 'Events' | 'Workshops';
  date?: string;
  historical?: boolean;
  communityNeed?: string;
  summary: string;
  partners?: string[];
  result?: string;
  imageSrc?: string;
  imageAlt?: string;
  evidenceLabel: string;
  evidenceUrl: string;
  published: boolean;
}

const archivedProjectsUrl =
  'https://sanjoseyouth.wixsite.com/d10ylc/s-projects-side-by-side';

export const impactStories: ImpactStory[] = [
  {
    title: 'Workshops',
    category: 'Workshops',
    historical: true,
    summary:
      'A total of 15 attendees enjoyed financial and college-major exploration workshops produced by D10YLC.',
    imageSrc: '/images/impact/workshops.jpg',
    imageAlt:
      'Finance charts, a calculator, and a notebook labeled Finance.',
    evidenceLabel: 'View the authorized source',
    evidenceUrl: archivedProjectsUrl,
    published: true,
  },
  {
    title: 'AVCA Events',
    category: 'Events',
    historical: true,
    summary:
      "D10YLC volunteers helped members of the Almaden Valley Community Association (AVCA) with multiple events, including the Mayor's Budget Message, City Council candidate forums, and County Supervisor forums.",
    partners: ['Almaden Valley Community Association (AVCA)'],
    imageSrc: '/images/impact/avca-events.png',
    imageAlt: 'Almaden Valley Community Association logo.',
    evidenceLabel: 'View the authorized source',
    evidenceUrl: archivedProjectsUrl,
    published: true,
  },
  {
    title: 'Policies',
    category: 'Policy',
    historical: true,
    summary:
      'The D10YLC policy department produced two policy proposals focused on poverty and transportation, intended for submission to the City of San José.',
    imageSrc: '/images/impact/policies.jpg',
    imageAlt: 'Illustration of a policy checklist and shield.',
    evidenceLabel: 'View the authorized source',
    evidenceUrl: archivedProjectsUrl,
    published: true,
  },
  {
    title: 'Instagram',
    category: 'Service',
    historical: true,
    summary:
      'The D10YLC technology team ran an Instagram account to share upcoming events, new policies, and other updates.',
    imageSrc: '/images/impact/instagram.jpg',
    imageAlt:
      'Phone displaying the Instagram logo with social notification icons.',
    evidenceLabel: 'View the authorized source',
    evidenceUrl: archivedProjectsUrl,
    published: true,
  },
  {
    title: 'Almaden Lake Park',
    category: 'Service',
    historical: true,
    summary:
      'D10YLC adopted Almaden Lake Park to help care for the park and provide volunteer opportunities for San José youth.',
    imageSrc: '/images/impact/almaden-lake-park.jpg',
    imageAlt: 'Lake, walking paths, and benches at Almaden Lake Park.',
    evidenceLabel: 'View the authorized source',
    evidenceUrl: archivedProjectsUrl,
    published: true,
  },
  {
    title: 'Budget Summit',
    category: 'Events',
    historical: true,
    summary:
      'D10YLC members participated in a budget summit and created presentations recommending improvements to educational resources offered by the city.',
    imageSrc: '/images/impact/budget-summit.png',
    imageAlt:
      'Illustration of a budget checklist, coin, money bag, and building.',
    evidenceLabel: 'View the authorized source',
    evidenceUrl: archivedProjectsUrl,
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
