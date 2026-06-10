# Deployment Guide

The site is a SvelteKit app built with [`svelte-adapter-deno`](https://github.com/pluvial/svelte-adapter-deno). Every page is prerendered; the adapter wraps the output in a standalone Deno server suitable for [Deno Deploy](https://deno.com/deploy).

## Build

```bash
npm install
npm run build
# Output: build/ (Deno server entrypoint at build/index.js)
```

## Run Locally

```bash
deno task start
# or directly:
deno run --allow-env --allow-read --allow-net build/index.js
# deno task start serves on http://localhost:8000; the bare deno run command
# defaults to port 3000 (override with PORT / HOST env vars)
```

## Deno Deploy

### One-time setup (manual)

1. Sign in at <https://dash.deno.com> and create a new project (suggested name: `arcana-of-code`).
2. Link the GitHub repository, **or** rely on the GitHub Action below (preferred — it builds with npm first).
3. If using the Action: the workflow at `.github/workflows/deploy.yml` deploys on every push to `main` via OIDC — no secrets needed, but the `project:` field in the workflow must match the project name you created.

### Custom domain (manual)

1. In the Deno Deploy dashboard: project → Settings → Domains → Add domain.
2. Add the provided `A`/`AAAA` (apex) or `CNAME` (subdomain) records at your DNS provider.
3. Deno Deploy provisions the TLS certificate automatically once DNS propagates.

### Smoke test checklist (post-deploy)

- [ ] `/` — homepage
- [ ] `/catalog` — all 78 cards render
- [ ] `/card/three-of-wands` — card detail with essay and connections
- [ ] `/draw` — draws a random card
- [ ] `/about`
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
