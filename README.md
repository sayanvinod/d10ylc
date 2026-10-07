# D10YLC website

Static, accessible website for the District 10 Youth Leadership Coalition
(D10YLC), built with Astro and designed for Cloudflare Pages.

This repository contains only public website source. Never commit application
responses, student records, private meeting links, credentials, recovery
information, or unapproved photos and quotes.

## Run locally

Requirements: Node.js 22.19 or newer and npm.

```sh
npm ci
npm run dev -- --host 0.0.0.0 --port 4327
```

Open `http://localhost:4327`.

Useful commands:

```sh
npm test              # unit and generated-page tests
npm run check         # Astro and TypeScript checks
npm run build         # production output in dist/
npm run validate:site # metadata, internal-link, and placeholder checks
npm run verify        # complete non-browser verification
```

## Content model

- `src/content/events.ts` stores dated events and opportunities. A published
  item must include a verified owner and expiry date.
- `src/content/impact.ts` stores evidence-backed impact stories.
- `src/content/resources.ts` stores only meeting resources approved for public
  access.
- `src/content/site.ts` stores navigation and shared site values.

The empty arrays are intentional. Add an item only after an authorized editor
checks its facts, dates, links, public status, and required permissions. The UI
provides useful empty states instead of reusing stale legacy content.

## Environment variables

| Variable | Purpose | Default |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | Canonical production origin, with no trailing slash | `https://d10ylc.pages.dev` |
| `PUBLIC_ALLOW_INDEXING` | Set to `true` only on the approved production deployment | unset; all crawlers are blocked |

The default URL is a proposed build value, not evidence that the address is
registered or organization-controlled. Replace it with the approved
`pages.dev` URL before launch.

## Deploy to Cloudflare Pages

Connect the organization-owned GitHub repository to an organization-controlled
Cloudflare account, then use:

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Production branch | the protected branch approved by D10YLC |
| Node version | `22.19.0` or newer |

Set `PUBLIC_SITE_URL` for production and previews. Set
`PUBLIC_ALLOW_INDEXING=true` only in the production environment after editorial
go-live approval; previews remain blocked through `robots.txt`.

`public/_headers` adds baseline security headers. Cloudflare automatically
serves the static `404.html`. Preview deployments should be reviewed before
merge.

## Launch and ownership gates

The site is not ready for public launch until:

1. Core membership, eligibility, commitment, affiliation, contact, leadership,
   privacy, and form facts have approved wording.
2. One organization-owned application form has tested delivery and an approved
   privacy notice.
3. The repository is in the designated GitHub organization and the Cloudflare
   Pages project has at least two organization-designated administrators with
   recovery authority and two-factor authentication.
4. A non-developer organization administrator has tested review, deployment,
   rollback, member management, and recovery.
5. Editorial and technical approvers have authorized indexing and go-live.

## Publishing and rollback

Make content changes through a pull request. Review facts, expiry, links,
permissions, headings, mobile layout, and private-data safety before merge. A
Cloudflare preview deployment is the review artifact.

For rollback, select the last known-good production deployment in Cloudflare
Pages and choose **Rollback to this deployment**. Revert the corresponding Git
commit in a reviewed pull request so source and production remain aligned.

When ownership changes, transfer GitHub and Cloudflare access before removing
outgoing maintainers. Re-authorize the GitHub integration and repeat deployment
and recovery tests after every transfer.
