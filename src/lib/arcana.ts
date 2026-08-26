import type { Card, CourtRank, Suit } from './types/card';

/**
 * Card art grammar. Three categories, three visual logics:
 *
 *   PIPS    ten ridges in a frame; the Nth from the base is accented. The count is the rank.
 *   COURTS  strata: the lowest ridges fill solid, doubled frame. Depth of solid = Page…King.
 *   MAJORS  full bleed, no frame; the accent falls on the single dominant swell.
 *
 * Everything is seeded from the card id, so the same card renders identically
 * at build time and in the browser.
 */

export type ArtKey = Suit | 'major';

export interface RidgeLine {
	key: number;
	stroke: string;
	fill: string;
	band: string;
	colour: string;
	weight: number;
	length: number;
}

export interface CardArt {
	lines: RidgeLine[];
	accent: string;
	framed: boolean;
	doubleFrame: boolean;
	category: CardCategory;
	note: string;
}

export type CardCategory = 'Major' | 'Court' | 'Pip';

interface Geometry {
	lines: number;
	points: number;
	smoothing: number;
	tremor: number;
	amp: number;
	width: number;
	peaks: number;
	quantise: number;
}

const GEOM: Record<ArtKey, Geometry> = {
	cups: {
		lines: 10,
		points: 30,
		smoothing: 4,
		tremor: 0.5,
		amp: 27,
		width: 0.2,
		peaks: 1,
		quantise: 0
	},
	wands: {
		lines: 10,
		points: 34,
		smoothing: 1,
		tremor: 2.4,
		amp: 44,
		width: 0.07,
		peaks: 1,
		quantise: 0
	},
	swords: {
		lines: 10,
		points: 46,
		smoothing: 0,
		tremor: 4.6,
		amp: 31,
		width: 0.11,
		peaks: 3,
		quantise: 0
	},
	pentacles: {
		lines: 10,
		points: 22,
		smoothing: 2,
		tremor: 0.3,
		amp: 23,
		width: 0.24,
		peaks: 2,
		quantise: 5
	},
	major: {
		lines: 16,
		points: 34,
		smoothing: 3,
		tremor: 1.0,
		amp: 44,
		width: 0.28,
		peaks: 1,
		quantise: 0
	}
};

export const SUIT_NOTE: Record<ArtKey, string> = {
	cups: 'Rolling swells: smoothed, wide, slow',
	wands: 'Leaping peaks: tall, narrow, restless',
	swords: 'Shattered spikes: dense, unsmoothed, brittle',
	pentacles: 'Terraces: quantised steps, low and settled',
	major: 'Monumental arcs: full bleed, one dominant swell'
};

/* Palette: chroma 0.14 across the suits so none outranks another. Cups sit at
   violet-indigo to clear the cold cyan of swords; majors take bold red, the one
   high-chroma value. */
export const PALETTE: Record<ArtKey, string> = {
	cups: 'oklch(0.68 0.14 285)',
	wands: 'oklch(0.76 0.14 72)',
	swords: 'oklch(0.82 0.12 205)',
	pentacles: 'oklch(0.74 0.14 158)',
	major: 'oklch(0.60 0.21 27)'
};
export const QUIET = '#8b8780';
export const BONE = '#efece5';
export const INK = '#0b0b0b';
export const PAPER = '#e4e1d9';
export const FRAME = '#3a3733';

const COURT_ORDER: Record<CourtRank, number> = { page: 1, knight: 2, queen: 3, king: 4 };

export const isCourt = (card: Card): boolean => Boolean(card.courtRank);
export const isMajor = (card: Card): boolean => card.arcana === 'major';
export const artKey = (card: Card): ArtKey => (isMajor(card) ? 'major' : (card.suit ?? 'major'));
export const cardAccent = (card: Card): string => PALETTE[artKey(card)];
export const suitAccent = (suit: ArtKey): string => PALETTE[suit];

const ROMAN = [
	'0',
	'I',
	'II',
	'III',
	'IV',
	'V',
	'VI',
	'VII',
	'VIII',
	'IX',
	'X',
	'XI',
	'XII',
	'XIII',
	'XIV',
	'XV',
	'XVI',
	'XVII',
	'XVIII',
	'XIX',
	'XX',
	'XXI'
];
const PIP_WORD = [
	'',
	'Ace',
	'Two',
	'Three',
	'Four',
	'Five',
	'Six',
	'Seven',
	'Eight',
	'Nine',
	'Ten'
];

const capitalise = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

export const cardIndex = (card: Card): string => {
	if (isMajor(card)) return ROMAN[card.number ?? 0] ?? '—';
	if (card.courtRank) return card.courtRank.slice(0, 2).toUpperCase();
	return String(card.number ?? '');
};

export const cardCategory = (card: Card): CardCategory =>
	isMajor(card) ? 'Major' : isCourt(card) ? 'Court' : 'Pip';

export const rankWord = (card: Card): string => {
	if (isMajor(card)) return ROMAN[card.number ?? 0];
	if (card.courtRank) return capitalise(card.courtRank);
	return PIP_WORD[card.number ?? 0];
};

/** "Major Arcana · XVI", "King of Cups · Court" or "Ten of Swords" */
export const cardMeta = (card: Card): string => {
	if (isMajor(card)) return `Major Arcana · ${cardIndex(card)}`;
	const base = `${rankWord(card)} of ${capitalise(card.suit ?? '')}`;
	return isCourt(card) ? `${base} · Court` : base;
};

/** Short meta for grid captions: "XVI" or "Pip · 10" */
export const cardShortMeta = (card: Card): string =>
	isMajor(card) ? cardIndex(card) : `${cardCategory(card)} · ${cardIndex(card)}`;

/** Vertical position of the index numeral inside the 200x300 face */
export const indexY = (card: Card): number => (isMajor(card) ? 32 : 36);

// xmur3 string hash: deterministic seed from a card id
export const hashSeed = (input: string): number => {
	let h = 1779033703 ^ input.length;
	for (let i = 0; i < input.length; i++) {
		h = Math.imul(h ^ input.charCodeAt(i), 3432918353);
		h = (h << 13) | (h >>> 19);
	}
	h = Math.imul(h ^ (h >>> 16), 2246822507);
	h = Math.imul(h ^ (h >>> 13), 3266489909);
	return (h ^ (h >>> 16)) >>> 0;
};

// mulberry32 PRNG: small, fast, good enough for line art
export const mulberry32 = (seed: number): (() => number) => {
	let state = seed;
	return () => {
		state = (state + 0x6d2b79f5) | 0;
		let t = Math.imul(state ^ (state >>> 15), 1 | state);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
};

interface Dimensions {
	top: number;
	bottom: number;
	xs: number;
	xe: number;
}

const DIM: Record<'major' | 'minor', Dimensions> = {
	major: { top: 20, bottom: 300, xs: 0, xe: 200 },
	minor: { top: 48, bottom: 256, xs: 32, xe: 168 }
};

interface RawLine {
	key: number;
	stroke: string;
	pts: Array<[number, number]>;
	mask: string;
	length: number;
}

const pointPath = (pts: Array<[number, number]>): string =>
	pts.map(([x, y], j) => `${j === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join('');

const artCache = new Map<string, CardArt>();

export const cardArt = (card: Card): CardArt => {
	const cached = artCache.get(card.id);
	if (cached) return cached;

	const major = isMajor(card);
	const court = isCourt(card);
	const key = artKey(card);
	const g = GEOM[key];
	const { top, bottom, xs, xe } = major ? DIM.major : DIM.minor;
	const random = mulberry32(hashSeed(card.id));
	const accent = cardAccent(card);

	const raw: RawLine[] = [];
	let dominant = 0;
	let best = -1;
	for (let i = 0; i < g.lines; i++) {
		const baseY = top + ((bottom - top) * i) / (g.lines - 1);
		const centres: number[] = [];
		for (let p = 0; p < g.peaks; p++) {
			centres.push(0.5 + (random() - 0.5) * (g.peaks > 1 ? 0.85 : 0.34));
		}
		const amp = g.amp * (0.4 + random() * 0.6);
		if (amp > best) {
			best = amp;
			dominant = i;
		}
		let values: number[] = [];
		for (let k = 0; k < g.points; k++) values.push(random());
		for (let pass = 0; pass < g.smoothing; pass++) {
			values = values.map((v, k) => ((values[k - 1] ?? v) + v + (values[k + 1] ?? v)) / 3);
		}
		const pts: Array<[number, number]> = [];
		let length = 0;
		let px: number | null = null;
		let py = 0;
		for (let k = 0; k < g.points; k++) {
			const t = k / (g.points - 1);
			const x = xs + t * (xe - xs);
			let env = 0;
			for (const c of centres) env = Math.max(env, Math.exp(-((t - c) ** 2) / (2 * g.width ** 2)));
			const taper = Math.min(1, Math.sin(Math.PI * t) * 3);
			let off = (env * amp * values[k] + (values[k] - 0.5) * 2 * g.tremor) * taper;
			if (g.quantise) off = Math.round(off / g.quantise) * g.quantise;
			const y = baseY - off;
			if (px !== null) length += Math.hypot(x - px, y - py);
			px = x;
			py = y;
			pts.push([x, y]);
		}
		const d = pointPath(pts);
		raw.push({
			key: i,
			stroke: d,
			pts,
			mask: `${d}L${xe} 320L${xs} 320Z`,
			length: Math.round(length)
		});
	}

	const n = raw.length;
	const lines: RidgeLine[] = raw.map((l) => ({
		key: l.key,
		stroke: l.stroke,
		length: l.length,
		fill: l.mask,
		band: 'none',
		colour: QUIET,
		weight: 1.1
	}));

	if (major) {
		lines[dominant].colour = accent;
		lines[dominant].weight = 2.6;
	} else if (court && card.courtRank) {
		// Solid mass runs from the topmost strata line down to the lowest drawn
		// ridge; it never spills past the last line into the frame.
		const depth = COURT_ORDER[card.courtRank];
		const first = Math.max(0, n - 1 - depth);
		for (let k = first; k < n; k++) {
			lines[k].colour = accent;
			lines[k].weight = 1.1;
			if (k < n - 1) {
				const forward = pointPath(raw[k].pts);
				const back = [...raw[k + 1].pts]
					.reverse()
					.map(([x, y]) => `L${x.toFixed(1)} ${y.toFixed(1)}`)
					.join('');
				lines[k].fill = forward + back + 'Z';
				lines[k].band = accent;
			}
		}
	} else {
		const idx = n - (card.number ?? 1);
		if (lines[idx]) {
			lines[idx].colour = accent;
			lines[idx].weight = 2.2;
		}
	}

	const art: CardArt = {
		lines,
		accent,
		framed: !major,
		doubleFrame: court,
		category: cardCategory(card),
		note: SUIT_NOTE[key]
	};
	artCache.set(card.id, art);
	return art;
};

/** Pick n distinct random card ids from the deck */
export const pickCardIds = (cards: Card[], n: number): string[] => {
	const pool = [...cards];
	const out: string[] = [];
	while (out.length < n && pool.length) {
		out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0].id);
	}
	return out;
};

/** The card of the day: rotates deterministically once per UTC day */
export const cardOfTheDay = (cards: Card[], date: Date = new Date()): Card => {
	const day = Math.floor(date.getTime() / 86_400_000);
	return cards[day % cards.length];
};
