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

export const officialCalendarUrl =
  'https://calendar.google.com/calendar/embed?src=f265343ec1aecc6bb3c2a96b1a1839106e64637cb362fc090022b47e11ca8c8c%40group.calendar.google.com&ctz=America%2FLos_Angeles';

export const events: EventItem[] = [];

export function getActiveEvents(items: EventItem[], now = new Date()): EventItem[] {
  return items
    .filter((item) => item.status === 'published' && new Date(item.expiresAt) >= now)
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
}
