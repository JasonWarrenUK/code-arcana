<!-- doc-changelog: generated 2026-10-02. Delete this line once you hand-edit this file. -->

# Changelog

All notable changes to Arcana of Code are recorded here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] - 2026-10-02

### Breaking

- npm no longer works for this repo. `package-lock.json` and the npm build task are gone; install with `deno install` and build with `deno task build`.
- `CardArt.framed` is removed because every card is framed now. `indexY()` takes no argument and `MajorSymbol` requires a `layout` field.
- Every major card's ridge shapes change, because they are generated from the frame's new size.

### Added

- Each of the 22 major arcana cards has its own red symbol over the quiet ridge pattern, drawn to shared rules so the deck reads as one family.
- Majors carry the same border as the minors, with the numeral above it and the name below.
- Paired cards (Fool and Magician, High Priestess and Hierophant, Empress and Emperor) share a frame.
- A validator checks every symbol against the layout rules, measuring the curves themselves rather than their control points.
- Vitest test runner, run with `deno task test`.

### Changed

- Major ridges run edge to edge inside the border and are cleared from the inside of each symbol.
- The `/system` page shows real card names on its specimens.
- CI runs install, check, lint, test and build through Deno tasks.
- `DEPLOY.md` and the README use Deno commands.

### Fixed

- Lint no longer fails on the missing `@eslint/js` dependency.

## [0.3.0] - 2026-08-26

### Changed

- The constellation page labels a hovered card's neighbours and shows a tooltip with its name and coding insight.

### Removed

- The `/about` page.

## [0.2.0] - 2026-08-26

### Breaking

- Build output moves from `build/` to `.deno-deploy/`, and `deno task start` runs it. The GitHub deploy Action is gone; pushes to `main` deploy through the Deno Deploy app.
- `@fontsource/inter` is removed. Archivo loads from Google Fonts in `app.html`.

### Added

- Ink-on-paper redesign of every page, with Archivo in three registers, a film-grain overlay and no shadows, radii or gradients.
- A card art grammar in `src/lib/arcana.ts`: pips count their rank in ridges, courts fill their lowest strata solid inside a doubled frame and majors run full bleed with one accented swell. Art is seeded from the card id, so the build and the browser agree.
- A card of the day on the home page, a filterable nine-column deck and a face-down draw that turns over with the ridges drawing in.
- Positional spreads on a table, including the Cross and the Horseshoe.
- A seeded force-directed constellation of card connections.
- A `/system` page documenting the design.

### Changed

- The toolchain moves to Svelte 5, Vite 7 and ESLint 9 with a flat config. Every component moves to runes. Dependabot findings drop from 21 to 3 low.
- Deploys use the official `@deno/svelte-adapter`.

### Fixed

- Deno Deploy builds no longer fail at the install step, which the community `svelte-adapter-deno` caused.

## [0.1.0] - 2026-08-25

### Added

- A `/spread` page with three starter spreads: The Stuck, The Decision and The Codebase.
- A `/graph` page showing the 250 connections between cards.
- A CI workflow that runs check, lint and build on every pull request.
- A global focus ring, reduced-motion handling for hover transitions and `aria-live` on the draw result.

### Changed

- The README, the about page and the home page intro describe the finished 78-card deck.
- `three-of-wands` and `five-of-pentacles` essays rewritten to the deck's standard.
- Prettier moves to v3 and `eslint-config-prettier` to v9.
- The roadmap moves to the phase-array format.

### Fixed

- `eslint .` no longer errors on every run; the missing config exists and the Prettier v2-only flag is gone.
- The unreachable "essay coming" branch on the card page is removed.

### Removed

- A 23 MB source tarball, the legacy React prototype and tracked `.DS_Store` files.

[Unreleased]: https://github.com/JasonWarrenUK/code-arcana/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/JasonWarrenUK/code-arcana/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/JasonWarrenUK/code-arcana/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/JasonWarrenUK/code-arcana/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/JasonWarrenUK/code-arcana/releases/tag/v0.1.0
