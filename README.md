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
├── Static prerendering (svelte-adapter-deno → Deno Deploy)
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
│   │   └── cards.json         # Card content
│   └── components/
│       └── CardPlaceholder.svelte
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
│   └── about/
│       └── +page.svelte       # Project philosophy
├── app.css                    # Global styles
└── app.html                   # HTML template

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
	court?: 'page' | 'knight' | 'queen' | 'king';
	keywords: string[];
	codingInsight: string;
	essay?: string;
	connections?: string[]; // IDs of related cards
}
```

### Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run check

# Linting
npm run lint

# Format code
npm run format
```

### Deployment

See `DEPLOY.md` for full instructions. The short version: `npm run build` produces a Deno server at `build/index.js`; deploy to Deno Deploy via the GitHub Action in `.github/workflows/deploy.yml`.

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
