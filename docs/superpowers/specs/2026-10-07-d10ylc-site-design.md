# D10YLC Site Design

## Direction

Build a static-first Astro site around three visitor tasks: understand D10YLC, find a current opportunity, and join. The approved revamp plan is the product brief. The existing Wix site is a reference boundary, not an authority for facts or reusable media.

## Content safety

- Publish only stable, noncontroversial language from the approved plan.
- Do not repeat disputed eligibility, commitment, leadership, affiliation, impact metrics, dates, or contact claims.
- Where a page needs unresolved information, show a useful editorial empty state and explain that details are being confirmed.
- Keep all time-sensitive entries in typed, version-controlled data with explicit status and expiry fields.
- Link to no membership form until an organization-owned form and privacy notice are approved.

## Experience

The visual system uses a distinct deep-teal, citrus, coral, and warm-paper palette inspired by youth civic action without copying the legacy brand. Rounded editorial cards, large type, simple civic-grid motifs, and restrained accents keep the site energetic and credible.

The six primary routes are Home, About, Our Impact, Events & Opportunities, Meetings & Resources, and Join. A prominent Join action remains visible on desktop and in the mobile menu. Privacy, accessibility, and contact guidance live in the footer and supporting pages.

## Architecture

- Astro static output with TypeScript and no client framework.
- Shared layout, header, footer, page intro, empty-state, and CTA components.
- Typed data modules for events, impact stories, and resources.
- Small client-side script only for the accessible mobile disclosure menu.
- CSS design tokens and component classes in one global stylesheet.
- Sitemap, robots rules, useful 404 page, social metadata, and Cloudflare Pages headers.

## Core behavior

The home page gives direct paths to Join and Events, explains three forms of member activity, and surfaces only verified current content. Empty collections render intentionally rather than disappearing or showing stale content. The Join page explains the future process without claiming eligibility or acceptance rules and routes visitors to the official source when configured.

## Accessibility and responsive behavior

Use semantic landmarks, one H1 per page, skip navigation, visible focus, 44-pixel touch targets, disclosure-based mobile navigation, reduced-motion support, high-contrast text, and reflow down to 320 pixels. Automated page checks are supplemented by keyboard and desktop/mobile visual inspection.

## Verification

Tests cover content-state filtering, required route output, metadata, internal links, and empty states. The release gate runs unit tests, Astro type checking, a production build, link checks, and browser accessibility checks against the built preview.

## Deployment

Cloudflare Pages builds with `npm run build` and publishes `dist/`. The production URL is an environment setting until the organization confirms its `pages.dev` project name. Preview builds are marked no-index. The README documents ownership, configuration, content updates, deployment, rollback, and launch gates.
