# Arcana of Code

A tarot-based programming philosophy website. Alternative to "The Way of Code" but filtered through tarot archetypes rather than Taoist philosophy, with a British alternative aesthetic and neurodivergent-friendly, anti-authoritarian lens.

## What's Here

### The Complete Deck

All 78 cards are written and integrated:

- **22 Major Arcana** — the big philosophical questions (The Fool through The World)
- **56 Minor Arcana** — daily practices, specific techniques, recurring patterns, across four suits

Every card has a full essay, keywords, a one-line coding insight, and connections to related cards. The connections form a graph with 250 edges — cross-suit and cross-arcana — which the site renders as a navigable diagram.

### Suits

| Suit          | Theme                         |
| ------------- | ----------------------------- |
| **Cups**      | Collaboration & Communication |
| **Wands**     | Innovation & Energy           |
| **Swords**    | Analysis & Architecture       |
| **Pentacles** | Craft & Resources             |

### Technical Stack

```
SvelteKit + TypeScript
├── Static prerendering (@deno/svelte-adapter → Deno Deploy)
├── Deno for installs, tasks and CI
├── Vitest for unit tests
├── Inter font family
├── Vite for build tooling
└── Platform-independent deployment
```

### File Structure

```
src/
├── lib/
│   ├── types/
│   │   └── card.ts           # TypeScript interfaces
│   ├── data/
│   │   ├── cards.json         # Card content
│   │   ├── major-symbols.ts   # One drawn symbol per major arcana card
│   │   └── spreads.ts         # Spread layouts and positions
│   ├── components/
│   │   └── CardFace.svelte    # Card face: ridges, frame and symbol
│   ├── arcana.ts              # Card art grammar
│   ├── graph.ts               # Constellation layout
│   ├── symbol-grammar.ts      # Rules every major symbol must pass
│   └── symbol-shapes.ts       # Shape helpers for authoring symbols
├── routes/
│   ├── +layout.svelte         # Main site wrapper
│   ├── +layout.ts             # Prerender config
│   ├── +page.svelte           # Homepage
│   ├── catalog/
│   │   ├── +page.svelte       # All cards grouped by arcana/suit
│   │   └── +page.ts           # Data loader
│   ├── card/[id]/
│   │   ├── +page.svelte       # Individual card view
│   │   └── +page.ts           # Card data loader
│   ├── draw/
│   │   ├── +page.svelte       # Random card draw
│   │   └── +page.ts           # Cards list loader
│   ├── spread/
│   │   ├── +page.svelte       # Multi-card spreads
│   │   └── +page.ts           # Spread data loader
│   ├── graph/
│   │   ├── +page.svelte       # Constellation of card connections
│   │   └── +page.ts           # Graph data loader
│   └── system/
│       └── +page.svelte       # Card art system reference
├── app.css                    # Global styles
└── app.html                   # HTML template

tests/
└── fixtures/                  # Named test data, one file per module

static/
└── favicon.png
```

### Design Philosophy

**Aesthetic**: British alternative/post-punk minimalism

- High contrast black and white
- Stark typography, no decoration
- Deliberately anti-corporate, anti-Silicon Valley

**Tone**: Dry British wit, honest, anti-authoritarian

- No corporate speak
- No mystical woo
- Direct acknowledgement of neurodivergent thinking patterns

**Content Approach**:

- Written as inspiration strikes, not systematically
- Individual/small group coding practices focus
- Anti-Agile methodology stance
- Reclaiming craft over process compliance

### The Tarot Framework

**Major Arcana** (0 cards written): Big philosophical questions
**Minor Arcana** (2 cards written): Daily practices, specific techniques

#### Suits

- **Cups**: Collaboration & Communication
- **Wands**: Innovation & Energy
- **Swords**: Analysis & Architecture
- **Pentacles**: Craft & Resources

#### Numbers (1-10)

Ace through Ten represent progression from new beginnings to completion

#### Court Cards

Page, Knight, Queen, King represent different levels of mastery and approaches

### Data Structure

Cards are stored in JSON with this interface:

```typescript
interface Card {
	id: string;
	name: string;
	suit?: 'cups' | 'wands' | 'swords' | 'pentacles';
	arcana: 'major' | 'minor';
	number?: number;
	courtRank?: 'page' | 'knight' | 'queen' | 'king';
	keywords: string[];
	codingInsight: string;
	essay?: string;
	connections?: string[]; // IDs of related cards
}
```

### Card Art

Every face is drawn in SVG by `src/lib/arcana.ts`, seeded from the card id so the build and the browser render the same card. Pips count their rank in ridges and courts fill their lowest ridges solid; each major carries one red symbol over quiet ridges. The symbols live in `src/lib/data/major-symbols.ts` and must pass the rules in `src/lib/symbol-grammar.ts`, which `deno task test` checks for every card. The `/system` page lays out the whole grammar.

### Development Commands

`deno task` runs the scripts in `package.json`; there is no npm lockfile.

```bash
# Install dependencies
deno install

# Development server
deno task dev

# Build for production
deno task build

# Preview production build
deno task preview

# Type checking
deno task check

# Linting
deno task lint

# Unit tests
deno task test

# Format code
deno task format
```

### Deployment

See `DEPLOY.md` for full instructions. The short version: `deno task build` produces a Deno server at `.deno-deploy/server.ts`; Deno Deploy builds and deploys it on every push to `main`.

## What's Next

The deck is complete. The open questions are in the interactions, not the content:

- **Multi-card spreads**: draw 3 cards into named positions for a more structured prompt
- **Connection graph**: navigate the 250-edge relationship map visually
- **Platform independence** remains a principle: no vendor lock-in, no analytics, no tracking

### Philosophy Baked Into The Code

- **Anti-startup mentality**: Slow, deliberate accumulation
- **Platform independence**: No vendor lock-in
- **Minimal dependencies**: Keep it simple
- **No tracking**: No analytics, no data collection
- **Honest voice**: Raw, unapologetically niche

### Content Writing Guide

When adding new cards to `src/lib/data/cards.json`:

1. Keep archetypal essence, avoid literal tech transposition
2. Write 1-3 paragraphs initially (can expand later)
3. Focus on individual/small team practices
4. Critique corporate processes where relevant
5. Assume neurodivergent thinking as default
6. Use dry British tone, avoid American corporate speak

## Notes

This is deliberately not a sprint to MVP. The site grows organically, mirroring how actual understanding develops—in bursts, through association, never linearly.

No newsletter signups. No social media integration. No "growth hacking." Just the cards and their insights.
