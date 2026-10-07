export interface ImpactStory {
  title: string;
  category: 'Policy' | 'Service' | 'Events' | 'Workshops';
  date: string;
  communityNeed: string;
  summary: string;
  partners: string[];
  result: string;
  evidenceLabel: string;
  evidenceUrl: string;
  published: boolean;
}

export const impactStories: ImpactStory[] = [];

export function getPublishedImpact(items: ImpactStory[]): ImpactStory[] {
  return items
    .filter((item) => item.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
