export type EventStatus = 'draft' | 'published' | 'archived';

export interface EventItem {
  title: string;
  type: 'D10YLC event' | 'Volunteer opportunity' | 'External opportunity';
  startsAt: string;
  registrationDeadline: string | null;
  expiresAt: string;
  location: string;
  eligibility: string;
  owner: string;
  sourceLabel: string;
  sourceUrl: string;
  status: EventStatus;
}

export const events: EventItem[] = [];

export function getActiveEvents(items: EventItem[], now = new Date()): EventItem[] {
  return items
    .filter((item) => item.status === 'published' && new Date(item.expiresAt) >= now)
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
}
