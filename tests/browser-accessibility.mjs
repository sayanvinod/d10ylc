import AxeBuilder from '@axe-core/playwright';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join } from 'node:path';
import { chromium } from 'playwright';

const suppliedUrl = process.env.SITE_PREVIEW_URL;
const baseUrl = suppliedUrl ?? 'http://127.0.0.1:4339';
let previewServer;

if (!suppliedUrl) {
  const contentTypes = {
    '.css': 'text/css',
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
  };

  previewServer = createServer((request, response) => {
    const pathname = new URL(request.url ?? '/', baseUrl).pathname;
    const requested = join(process.cwd(), 'dist', pathname);
    const candidates = [
      requested,
      join(requested, 'index.html'),
      join(process.cwd(), 'dist', '404.html'),
    ];
    const file = candidates.find(
      (candidate) => existsSync(candidate) && statSync(candidate).isFile(),
    );
    const status = file?.endsWith('404.html') ? 404 : 200;

    response.writeHead(status, {
      'Content-Type': contentTypes[extname(file)] ?? 'application/octet-stream',
    });
    response.end(readFileSync(file));
  });

  await new Promise((resolve) =>
    previewServer.listen(4339, '127.0.0.1', resolve),
  );
}
const routes = [
  '/',
  '/about/',
  '/impact/',
  '/events/',
  '/meetings/',
  '/join/',
  '/contact/',
  '/privacy/',
  '/accessibility/',
  '/missing-page',
];

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
const failures = [];

for (const route of routes) {
  await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
  const results = await new AxeBuilder({ page }).analyze();

  if (results.violations.length > 0) {
    failures.push(
      ...results.violations.map(
        (violation) =>
          `${route}: ${violation.id} (${violation.impact}) — ${violation.help}; targets: ${violation.nodes
            .flatMap((node) => node.target)
            .join(', ')}`,
      ),
    );
  }
}

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(baseUrl, { waitUntil: 'networkidle' });
const menuButton = page.getByRole('button', { name: 'Menu' });
await menuButton.click();

if ((await menuButton.getAttribute('aria-expanded')) !== 'true') {
  failures.push('/: mobile menu did not expose its expanded state');
}

const mobileEventsLink = page
  .getByRole('navigation', { name: 'Primary' })
  .getByRole('link', { name: 'Events & Opportunities' });

if (!(await mobileEventsLink.isVisible())) {
  failures.push('/: mobile navigation labels are not fully visible');
}

await browser.close();
await new Promise((resolve) => previewServer?.close(resolve) ?? resolve());

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Browser accessibility passed across ${routes.length} routes.`);
