# Content Writing Guide

## Philosophy First

Before writing a single card, remember: this is **not** about mapping tarot onto programming literally. It's about using tarot's archetypal framework to organize programming insights in a way that makes intuitive sense.

### What This Means

- The Ace of Cups isn't "npm init for feelings"
- The Tower isn't "when production goes down"
- The Five of Pentacles isn't literally about money

Instead, we're using the archetypal _essence_ of each card to explore parallel patterns in programming.

## The Framework

### Suits

**Cups (Collaboration & Communication)**

- Team dynamics, interpersonal aspects
- User empathy, community interaction
- Emotional intelligence in technical work
- Communication patterns and their effects

**Wands (Innovation & Energy)**

- Creative problem-solving approaches
- New projects, experimentation
- Passion, drive, enthusiasm
- Risk-taking, pioneering work

**Swords (Analysis & Architecture)**

- Logic, rational decision-making
- Debugging, systematic problem-solving
- System design, architecture
- Technical communication, precision

**Pentacles (Craft & Resources)**

- Code quality, craftsmanship
- Performance optimization
- Career development, sustainability
- Resource management, pragmatism

### Numbers

- **Ace**: Potential, seed of idea, new beginning
- **Two**: Choices, balance, initial decisions
- **Three**: Growth through collaboration, early team formation
- **Four**: Stability, established patterns, foundations
- **Five**: Conflict, challenges, things going wrong
- **Six**: Harmony, successful collaboration, flow state
- **Seven**: Testing boundaries, advanced techniques
- **Eight**: Mastery in progress, skilled work
- **Nine**: Near completion, refinement stage
- **Ten**: Completion, full cycle, ready to begin again

### Court Cards

- **Page**: Learning, junior developer energy, curiosity
- **Knight**: Action-oriented, sometimes reckless implementation
- **Queen**: Nurturing expertise, mentoring, emotional intelligence
- **King**: Mastery, leadership, architectural authority

## Writing Process

### 1. Feel the Archetype

Before writing, sit with the card's traditional meaning. What's the emotional core? What pattern does it represent?

For example, Five of Pentacles traditionally: hardship, being left out in the cold, resourcefulness in difficult times.

Programming parallel: Working with constraints, technical debt, making do with what you have.

### 2. Find the Coding Insight

This is your one-line hook. It should be:

- Pithy but not reductive
- Unexpected but true
- Memorable

Examples:

- "Collaboration is Creativity" (Three of Wands)
- "Pragmatic Compromise" (Five of Pentacles)

NOT:

- "Use Git for Version Control" (too literal)
- "The Journey of Self-Discovery Through Code" (too vague)

### 3. Write the Essay

**Length**: 1-3 paragraphs to start. You can expand later.

**Tone**:

- Dry British wit
- Direct, honest
- Anti-corporate
- Assumes reader intelligence
- Comfortable with contradiction

**Structure**:
First paragraph: The insight, the pattern, what's actually happening

Second paragraph (optional): Nuance, caveats, how to think about it

Avoid:

- Listicles
- "Steps to success"
- Corporate platitudes
- American self-help energy

**Example Tone Markers**:
✓ "The myth of the lone genius coder is bollocks."
✓ "Sometimes the elegant solution is a luxury you can't afford."
✓ "This isn't defeat; it's craft."

✗ "Let's explore 5 ways collaboration supercharges your code!"
✗ "Embrace the journey of pragmatic excellence!"
✗ "Success means never settling for less than perfect."

### 4. Add Connections

Which other cards relate to this one? Think:

- **Complement**: Cards that work well together
- **Contrast**: Cards representing opposing approaches
- **Progression**: Natural sequence or evolution
- **Prerequisite**: One card's concept builds on another
- **Analogy**: Similar patterns in different contexts

Keep connections sparse—3-5 maximum. Quality over quantity.

## Anti-Patterns to Avoid

### Don't Be Literal

❌ "The Ace of Swords represents opening your IDE"
✓ "The Ace of Swords is about clarity of thought—that moment when a complex problem suddenly makes sense"

### Don't Be Prescriptive

❌ "Always write tests before code"
✓ "There's something to be said for writing tests first, but dogma is death to craft"

### Don't Be Corporate

❌ "Leveraging synergistic collaboration to optimize team velocity"
✓ "Real innovation happens when different minds collide"

### Don't Be Mystical

❌ "Channel the cosmic energy of the Empress into your code"
✓ "The Empress is about nurturing growth—which in programming means creating systems that make it easy to do the right thing"

### Don't Be American Self-Help

❌ "Believe in yourself and your code will thrive!"
✓ "Confidence matters, but so does knowing when you're out of your depth"

## The Target Reader

- ~3 years JavaScript experience
- Has shipped real projects
- Has dealt with production issues
- Starting to question imposed methodologies
- Interested in craft over career optimization
- Likely neurodivergent (but you never say this explicitly)
- British or comfortable with British directness

## Neurodivergent Lens

Don't announce it, just assume:

- Pattern recognition as natural mode of thought
- Systems thinking as default
- Hyperfocus as potential superpower
- Different processing styles are valid
- "Standard" workflows often don't fit

## Anti-Authority Scope

Critique:

- Agile theatre (stand-ups as performance)
- Corporate process compliance
- Methodology dogma
- "Best practices" as religion

Don't critique (scope too broad):

- Entire FAANG culture
- Capitalism writ large
- Government surveillance
- Tech industry as a whole

Stay focused on: how individual developers can reclaim agency in their craft.

## JSON Format

```json
{
	"id": "five-of-pentacles",
	"name": "Five of Pentacles",
	"suit": "pentacles",
	"arcana": "minor",
	"number": 5,
	"keywords": ["pragmatism", "resourcefulness", "making do"],
	"codingInsight": "Pragmatic Compromise",
	"essay": "First paragraph here.\n\nSecond paragraph here.",
	"connections": ["five-of-swords", "eight-of-pentacles"]
}
```

**Notes**:

- `id`: kebab-case, no spaces
- `suit`: lowercase, one of: cups, wands, swords, pentacles
- `arcana`: "major" or "minor"
- `number`: 1-10 for numbered cards, omit for court cards
- `courtRank`: "page", "knight", "queen", "king" if applicable (omit `number` for court cards)
- `keywords`: 2-5 words, lowercase
- `essay`: Use `\n\n` for paragraph breaks
- `connections`: Array of card IDs

## Inspiration vs. Obligation

Write cards when they come to you. Don't force it. The site explicitly embraces slow, organic growth over systematic completion.

If a card doesn't want to be written yet, leave it. Come back when you understand what it needs to say.

## Final Check

Before adding a card, ask:

- Does this feel true to my experience?
- Would I want to read this?
- Does it avoid being preachy?
- Is the tone right?
- Does it respect the reader's intelligence?

If yes to all: commit it. If no to any: let it sit.
