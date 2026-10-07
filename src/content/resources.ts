export interface MeetingResource {
  title: string;
  meetingDate: string;
  kind: 'Agenda' | 'Minutes' | 'Presentation' | 'Report';
  summary: string;
  url: string;
  visibility: 'public' | 'private';
}

export const resources: MeetingResource[] = [];

export function getPublicResources(items: MeetingResource[]): MeetingResource[] {
  return items
    .filter((item) => item.visibility === 'public')
    .sort(
      (a, b) =>
        new Date(b.meetingDate).getTime() - new Date(a.meetingDate).getTime(),
    );
}
