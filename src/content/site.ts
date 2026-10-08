export const siteName = 'District 10 Youth Leadership Coalition';
export const shortName = 'D10YLC';

export const navigation = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/impact/', label: 'Our Impact' },
  { href: '/events/', label: 'Events & Opportunities' },
  { href: '/meetings/', label: 'Meetings & Resources' },
  { href: '/join/', label: 'Join' },
] as const;

export const verificationNote =
  'This detail is being confirmed with D10YLC before publication.';

export const contactEmail = 'YouthCom10@sanjoseca.gov';

export const siteUrl =
  import.meta.env.PUBLIC_SITE_URL ?? 'https://d10ylc.pages.dev';
