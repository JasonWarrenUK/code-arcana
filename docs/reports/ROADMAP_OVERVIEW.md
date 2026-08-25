# Arcana of Code MVP: Roadmap Overview

**23 tasks across 3 milestones.** Files: `.claude/roadmaps.json` (machine-readable), `docs/roadmaps/mvp.md` (full task list with Mermaid dependency diagram).

> Migrated from the old single-file roadmap format on 2026-08-25. Narrative sections below are stubs synthesised from milestone goals; flesh out as needed.

---

## What we're building

Public launch of Arcana of Code: a Deno Deploy migration of the SvelteKit site, all 78 tarot-style cards written with prototype essay content, and Joy Division _Unknown Pleasures_-esque generated SVG line art as the visual identity.

## Milestone sequence and the reasoning behind it

**Milestone 1 (Deno Migration)** moves the site off `adapter-static` onto `svelte-adapter-deno`, so it can run on Deno Deploy under a real domain. Most of the code-side work is done; what remains is manual account and DNS setup.

**Milestone 2 (Card Content)** covers writing prototype essays for all 78 cards across five groups (Cups, Wands, Swords, Pentacles, Major Arcana), validated against a schema for structural integrity.

**Milestone 3 (Visual Identity)** replaces placeholder symbols with a deterministic, parameterised SVG generator producing one unique illustration per card, styled after Joy Division's _Unknown Pleasures_ artwork.

## Decisions that shaped the structure

- `@sveltejs/adapter-deno` doesn't exist as an official package; the migration used the community `svelte-adapter-deno`, which forced a SvelteKit 1 → 2 upgrade (plus Vite and Svelte version bumps) as a side effect.
- Card illustrations are generated at build time from a deterministic seed (card id) rather than stored as image assets, keeping the repo lightweight.

## External blockers (flag early)

- **1DE.6** (Deno Deploy project setup) requires manual dash.deno.com account access and blocks both the custom domain (1DE.7) and the live smoke test (1DE.9).
- **1DE.7** (custom domain) additionally requires DNS access.
