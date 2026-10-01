import { describe, expect, it } from 'vitest';
import cards from './data/cards.json';
import { cardArt, cardIndex, indexY } from './arcana';
import type { Card } from './types/card';

const all = cards as Card[];
const majors = all.filter((card) => card.arcana === 'major');
const minors = all.filter((card) => card.arcana === 'minor');

/** Every x coordinate a ridge stroke path visits */
const ridgeXs = (stroke: string): number[] =>
	[...stroke.matchAll(/[ML]([\d.-]+) [\d.-]+/g)].map((match) => Number(match[1]));

describe('major layout', () => {
	it('keeps every ridge inside the frame width (14 to 186)', () => {
		for (const card of majors) {
			for (const line of cardArt(card).lines) {
				for (const x of ridgeXs(line.stroke)) {
					expect(x).toBeGreaterThanOrEqual(14);
					expect(x).toBeLessThanOrEqual(186);
				}
			}
		}
	});

	it('runs ridges the full width of the frame, edge to edge', () => {
		const xs = cardArt(majors[0]).lines.flatMap((line) => ridgeXs(line.stroke));
		expect(Math.min(...xs)).toBe(14);
		expect(Math.max(...xs)).toBe(186);
	});

	it('gives each major the numeral drawn in the top band', () => {
		const byId = Object.fromEntries(majors.map((card) => [card.id, cardIndex(card)]));
		expect(byId['the-fool']).toBe('0');
		expect(byId['the-world']).toBe('XXI');
		expect(byId['the-devil']).toBe('XV');
	});
});

describe('minor layout', () => {
	it('keeps minor ridges inset (32 to 168), unchanged by the major layout', () => {
		for (const card of minors.slice(0, 12)) {
			for (const line of cardArt(card).lines) {
				const xs = ridgeXs(line.stroke);
				expect(Math.min(...xs)).toBeGreaterThanOrEqual(32);
				expect(Math.max(...xs)).toBeLessThanOrEqual(168);
			}
		}
	});

	it('places the minor index numeral inside the frame', () => {
		expect(indexY()).toBe(36);
	});
});
