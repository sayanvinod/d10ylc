import { describe, expect, it } from 'vitest';
import { getActiveEvents, type EventItem } from '../src/content/events';
import {
  getPublishedImpact,
  impactStories,
  type ImpactStory,
} from '../src/content/impact';
import {
  getPublicResources,
  type MeetingResource,
} from '../src/content/resources';

describe('time-sensitive content', () => {
  it('shows only published events that have not expired', () => {
    const base: EventItem = {
      title: 'Current event',
      type: 'D10YLC event',
      startsAt: '2026-10-08T18:00:00Z',
      registrationDeadline: '2026-10-08T16:00:00Z',
      expiresAt: '2026-10-09T00:00:00Z',
      location: 'To be confirmed',
      eligibility: 'To be confirmed',
      owner: 'D10YLC editorial owner',
      sourceLabel: 'Official event page',
      sourceUrl: 'https://example.org/event',
      status: 'published',
    };
    const items: EventItem[] = [
      base,
      { ...base, title: 'Expired', expiresAt: '2026-10-07T11:59:59Z' },
      { ...base, title: 'Draft', status: 'draft' },
      { ...base, title: 'Archived', status: 'archived' },
    ];

    expect(
      getActiveEvents(items, new Date('2026-10-07T12:00:00Z')).map(
        (item) => item.title,
      ),
    ).toEqual(['Current event']);
  });

  it('keeps unpublished impact stories out of the public list', () => {
    const story: ImpactStory = {
      title: 'Verified story',
      category: 'Service',
      date: '2026-09-01',
      status: 'historical',
      communityNeed: 'A documented local need.',
      summary: 'Members took a documented action.',
      partners: ['Verified partner'],
      result: 'A verified result.',
      published: true,
    };

    expect(
      getPublishedImpact([
        { ...story, title: 'Unverified story', published: false },
        story,
      ]).map((item) => item.title),
    ).toEqual(['Verified story']);
  });

  it('distinguishes ongoing initiatives from historical projects without dates', () => {
    const stories = getPublishedImpact(impactStories);

    expect(
      Object.fromEntries(stories.map((story) => [story.title, story.status])),
    ).toEqual({
      Workshops: 'historical',
      'AVCA Events': 'ongoing',
      Policies: 'ongoing',
      Instagram: 'historical',
      'Almaden Lake Park': 'ongoing',
      'Budget Summit': 'historical',
    });
    expect(stories.every((story) => story.date === undefined)).toBe(true);
  });

  it('never exposes private meeting resources', () => {
    const resource: MeetingResource = {
      title: 'September 2026 Meeting Minutes',
      meetingDate: '2026-09-10',
      kind: 'Minutes',
      summary: 'Approved public summary.',
      url: '/documents/september-2026-minutes.pdf',
      visibility: 'public',
    };

    expect(
      getPublicResources([
        { ...resource, title: 'Private notes', visibility: 'private' },
        resource,
      ]).map((item) => item.title),
    ).toEqual(['September 2026 Meeting Minutes']);
  });
});
