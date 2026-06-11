import type { Card } from './types/card';

/**
 * Joy Division-esque ridge-line illustrations.
 *
 * Every card gets a unique, deterministic stack of horizontal ridge lines
 * seeded from its id — same card, same illustration, every build, server
 * and client alike. Suit sets the character of the lines; rank scales the
 * energy. Rendered as SVG paths in a 200x300 viewBox.
 */

export const ILLUSTRATION_X_START = 28;
export const ILLUSTRATION_X_END = 172;

const Y_TOP = 92;
const Y_BOTTOM = 240;

interface SuitStyle {
	lineCount: number;
	pointCount: number;
	roughness: number; // 0 = rolling hills, 1 = jagged spikes
	smoothing: number; // box-blur passes over the raw noise
	maxAmplitude: number;
}

const STYLES: Record<string, SuitStyle> = {
	cups: { lineCount: 19, pointCount: 30, roughness: 0.35, smoothing: 3, maxAmplitude: 30 },
	wands: { lineCount: 19, pointCount: 30, roughness: 0.75, smoothing: 1, maxAmplitude: 38 },
	swords: { lineCount: 19, pointCount: 34, roughness: 1, smoothing: 0, maxAmplitude: 33 },
	pentacles: { lineCount: 21, pointCount: 28, roughness: 0.5, smoothing: 2, maxAmplitude: 26 },
	major: { lineCount: 24, pointCount: 32, roughness: 0.65, smoothing: 1, maxAmplitude: 40 }
};

// xmur3 string hash — deterministic seed from a card id
const hashSeed = (input: string): number => {
	let h = 1779033703 ^ input.length;
	for (let i = 0; i < input.length; i++) {
		h = Math.imul(h ^ input.charCodeAt(i), 3432918353);
		h = (h << 13) | (h >>> 19);
	}
	h = Math.imul(h ^ (h >>> 16), 2246822507);
	h = Math.imul(h ^ (h >>> 13), 3266489909);
	return (h ^ (h >>> 16)) >>> 0;
};

// mulberry32 PRNG — small, fast, good enough for line art
const mulberry32 = (seed: number): (() => number) => {
	let state = seed;
	return () => {
		state = (state + 0x6d2b79f5) | 0;
		let t = Math.imul(state ^ (state >>> 15), 1 | state);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
};

const COURT_VALUES: Record<string, number> = { page: 11, knight: 12, queen: 13, king: 14 };

// higher ranks get slightly more energetic illustrations
const rankWeight = (card: Card): number => {
	if (card.arcana === 'major') {
		return 0.7 + ((card.number ?? 0) / 21) * 0.3;
	}
	if (card.courtRank) {
		return 0.55 + (COURT_VALUES[card.courtRank] / 14) * 0.45;
	}
	return 0.55 + ((card.number ?? 1) / 14) * 0.45;
};

export const generateRidgePaths = (card: Card): string[] => {
	const style = card.arcana === 'major' ? STYLES.major : (STYLES[card.suit ?? ''] ?? STYLES.major);
	const random = mulberry32(hashSeed(card.id));
	const weight = rankWeight(card);
	const paths: string[] = [];

	for (let line = 0; line < style.lineCount; line++) {
		const baseY = Y_TOP + ((Y_BOTTOM - Y_TOP) * line) / (style.lineCount - 1);
		const centre = 0.5 + (random() - 0.5) * 0.3;
		const width = 0.09 + random() * 0.1;
		const lineAmplitude = style.maxAmplitude * weight * (0.45 + random() * 0.55);

		let values: number[] = [];
		for (let i = 0; i < style.pointCount; i++) {
			values.push(random());
		}
		for (let pass = 0; pass < style.smoothing; pass++) {
			values = values.map((value, i) => {
				const previous = values[i - 1] ?? value;
				const next = values[i + 1] ?? value;
				return (previous + value + next) / 3;
			});
		}

		const segments: string[] = [];
		for (let i = 0; i < style.pointCount; i++) {
			const t = i / (style.pointCount - 1);
			const x = ILLUSTRATION_X_START + t * (ILLUSTRATION_X_END - ILLUSTRATION_X_START);
			// energy concentrated in a band, pinned flat at both edges
			const envelope = Math.exp(-((t - centre) ** 2) / (2 * width ** 2));
			const taper = Math.min(1, Math.sin(Math.PI * t) * 3);
			const tremor = (values[i] - 0.5) * 2.5;
			const offset = (envelope * lineAmplitude * values[i] + tremor) * taper;
			const y = baseY - offset;
			segments.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
		}
		paths.push(segments.join(''));
	}

	return paths;
};
