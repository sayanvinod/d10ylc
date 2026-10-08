import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

const root = process.cwd();
const routes = [
  ['', 'Youth shaping the future of San Jose District 10'],
  ['about', 'Built for youth voice and civic action'],
  ['impact', 'Our impact'],
  ['events', 'Events &amp; opportunities'],
  ['meetings', 'Meetings &amp; resources'],
  ['join', 'Your next step starts here'],
  ['contact', 'Contact D10YLC'],
  ['privacy', 'Privacy'],
  ['accessibility', 'Accessibility'],
] as const;

function page(route: string): string {
  return readFileSync(join(root, 'dist', route, 'index.html'), 'utf8');
}

function htmlFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith('.html') ? [path] : [];
  });
}

beforeAll(() => {
  execFileSync('npm', ['run', 'build'], { cwd: root, stdio: 'pipe' });
});

describe('built site', () => {
  it.each(routes)('builds /%s with the expected heading', (route, heading) => {
    expect(existsSync(join(root, 'dist', route, 'index.html'))).toBe(true);
    expect(page(route)).toContain(`<h1`);
    expect(page(route)).toContain(heading);
  });

  it('provides semantic navigation and a skip link on every core page', () => {
    for (const [route] of routes) {
      const html = page(route);
      expect(html).toContain('href="#main-content"');
      expect(html).toContain('<nav');
      expect(html).toContain('<main');
      expect(html).toContain('<footer');
      expect(html).toContain('Join D10YLC');
      expect(html).toContain('content="noindex, nofollow"');
    }
  });

  it('keeps unresolved current content explicit and honest', () => {
    expect(page('events')).toContain('No current listings are published');
    expect(page('meetings')).toContain('No public meeting resources are published');
    expect(page('join')).toContain('The official application is not yet published');
  });

  it('renders the complete authorized historical project archive', () => {
    const html = page('impact');

    for (const title of [
      'Workshops',
      'AVCA Events',
      'Policies',
      'Instagram',
      'Almaden Lake Park',
      'Budget Summit',
    ]) {
      expect(html).toContain(`<h2>${title}</h2>`);
    }

    expect(html.match(/<img /g)).toHaveLength(6);
    expect(html.match(/Historical project/g)).toHaveLength(6);
    expect(html).not.toContain('Verified stories are being prepared');
  });

  it('does not link or refer visitors to the retired Wix website', () => {
    for (const file of htmlFiles(join(root, 'dist'))) {
      expect(readFileSync(file, 'utf8')).not.toContain(
        'sanjoseyouth.wixsite.com/d10ylc',
      );
    }
  });

  it('publishes the confirmed contact email without a contact form', () => {
    const emailHref = 'mailto:YouthCom10@sanjoseca.gov';

    for (const route of ['contact', 'privacy', 'accessibility']) {
      expect(page(route)).toContain(`href="${emailHref}"`);
    }

    expect(page('contact')).toContain('The official contact email is <a');
    expect(page('contact')).toContain('Official email: <a');
    expect(page('contact')).toContain('>Email us</a>');
    expect(page('contact')).not.toContain('<form');
    expect(page('contact')).not.toContain('pending verification');
  });

  it('ships a useful not-found page and crawl controls', () => {
    expect(existsSync(join(root, 'dist', '404.html'))).toBe(true);
    expect(readFileSync(join(root, 'dist', '404.html'), 'utf8')).toContain(
      'This page took a different route',
    );
    expect(readFileSync(join(root, 'dist', 'robots.txt'), 'utf8')).toContain(
      'Sitemap:',
    );
    expect(readFileSync(join(root, 'dist', 'robots.txt'), 'utf8')).toContain(
      'Disallow: /',
    );
    expect(existsSync(join(root, 'dist', 'sitemap-index.xml'))).toBe(true);
  });
});
