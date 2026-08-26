# Deployment Guide

The site is a SvelteKit app built with [`@deno/svelte-adapter`](https://www.npmjs.com/package/@deno/svelte-adapter), the official Deno adapter. Every page is prerendered; the adapter wraps the output in a Deno server at `.deno-deploy/server.ts` for [Deno Deploy](https://deno.com/deploy).

## Build

```bash
npm install
npm run build
# Output: .deno-deploy/ (server entrypoint at .deno-deploy/server.ts)
```

## Run Locally

```bash
deno task start
# or directly:
deno run --allow-env --allow-read --allow-net .deno-deploy/server.ts
```

## Deno Deploy

The `code-arcana` app on Deno Deploy is linked to this GitHub repository. Deno Deploy clones the repo, runs the install and build itself (framework preset: SvelteKit) and serves `.deno-deploy/server.ts`. Every push to `main` deploys; other branches can get preview deployments if that is enabled in the app settings.

There is no GitHub Action for deployment: the platform does the build, so a second pipeline pushing to the same app would only race it.

### Custom domain (manual)

1. In the Deno Deploy dashboard: app → Settings → Domains → Add domain.
2. Add the provided `A`/`AAAA` (apex) or `CNAME` (subdomain) records at your DNS provider.
3. Deno Deploy provisions the TLS certificate automatically once DNS propagates.

### Smoke test checklist (post-deploy)

- [ ] `/` — homepage with card of the day
- [ ] `/catalog` — all 78 cards render, filters work
- [ ] `/card/three-of-wands` — card detail with essay and related cards
- [ ] `/draw` — turns a card over
- [ ] `/spread` — deals a spread
- [ ] `/graph` — constellation renders
- [ ] `/system`, `/about`
- [ ] A nonexistent card id returns 404

## Adding New Cards

Edit `src/lib/data/cards.json` and add new card objects:

```json
{
	"id": "ace-of-cups",
	"name": "Ace of Cups",
	"suit": "cups",
	"arcana": "minor",
	"number": 1,
	"keywords": ["new beginning", "emotional start"],
	"codingInsight": "Your pithy insight here",
	"essay": "Your essay here.\n\nParagraphs separated by double newlines.",
	"connections": ["two-of-cups", "ace-of-wands"]
}
```

Then rebuild and push — CI redeploys automatically.

## Architecture Notes

- No database, no API endpoints, no environment variables required at runtime.
- All routes are prerendered at build time; the Deno server exists to serve them (and correct 404s) on Deno Deploy.
- Card illustrations are generated deterministically from each card's id at render time — no image assets.
