import { describe, expect, it } from 'vitest';
import cards from './data/cards.json';
import { MAJOR_SYMBOLS } from './data/major-symbols';
import { cardArt } from './arcana';
import { framesMatch, pathBounds, validateLayout, validateSymbol } from './symbol-grammar';
import type { Card } from './types/card';
import * as fixtures from '../../tests/fixtures/symbol-grammar';

const majors = (cards as Card[]).filter((card) => card.arcana === 'major');

/** Frames that must share geometry because the cards echo each other */
const PAIRS: Array<[string, string]> = [
	['the-fool', 'the-magician'],
	['the-high-priestess', 'the-hierophant'],
	['the-empress', 'the-emperor']
];

describe('major symbol set', () => {
	it('has exactly one symbol per major arcana card', () => {
		expect(Object.keys(MAJOR_SYMBOLS).sort()).toEqual(majors.map((card) => card.id).sort());
	});

	it.each(majors.map((card) => [card.id]))('%s passes the grammar', (id) => {
		expect(validateSymbol(MAJOR_SYMBOLS[id])).toEqual([]);
	});

	it('has no two majors sharing the same drawing', () => {
		const drawings = Object.values(MAJOR_SYMBOLS).map((symbol) =>
			symbol.paths.map((path) => path.d).join('|')
		);
		expect(new Set(drawings).size).toBe(drawings.length);
	});

	it('reaches the renderer for majors only', () => {
		const fool = majors.find((card) => card.id === 'the-fool')!;
		const minor = (cards as Card[]).find((card) => card.arcana === 'minor')!;
		expect(cardArt(fool).symbol).toBe(MAJOR_SYMBOLS['the-fool']);
		expect(cardArt(minor).symbol).toBeUndefined();
	});

	it('draws every ridge in the quiet colour on a major', () => {
		const colours = new Set(cardArt(majors[0]).lines.map((line) => line.colour));
		expect(colours.size).toBe(1);
	});
});

describe('major layouts', () => {
	it.each(majors.map((card) => [card.id]))('%s passes its layout rules', (id) => {
		expect(validateLayout(MAJOR_SYMBOLS[id])).toEqual([]);
	});

	it('uses the strip layout for the nine landscape cards and framed for the rest', () => {
		const strip = Object.entries(MAJOR_SYMBOLS)
			.filter(([, symbol]) => symbol.layout === 'strip')
			.map(([id]) => id)
			.sort();
		expect(strip).toEqual(
			[
				'death',
				'judgement',
				'justice',
				'the-hanged-man',
				'the-moon',
				'the-star',
				'the-sun',
				'the-tower',
				'the-world'
			].sort()
		);
	});

	it('gives every strip card the Moon’s overall height, lowest substrate to highest symbol', () => {
		const spans = Object.entries(MAJOR_SYMBOLS)
			.filter(([, symbol]) => symbol.layout === 'strip')
			.map(([id, symbol]) => {
				const all = symbol.paths.flatMap((path) => pathBounds(path.d) ?? []);
				const top = Math.min(...all.map((bounds) => bounds.minY));
				const bottom = Math.max(...all.map((bounds) => bounds.maxY));
				return [id, bottom - top] as const;
			});
		const moon = spans.find(([id]) => id === 'the-moon')![1];
		expect(moon).toBeCloseTo(162, 0);
		for (const [, span] of spans) expect(span).toBeCloseTo(moon, 0);
	});

	it('hides the Fool’s ring line behind its opaque dot', () => {
		const fool = MAJOR_SYMBOLS['the-fool'];
		expect(fool.paths.filter((path) => path.opaque)).toHaveLength(1);
		expect(fool.paths[0].opaque).toBeUndefined();
	});

	it('gives the Star, Moon and Sun the same hero height', () => {
		for (const id of ['the-star', 'the-moon', 'the-sun']) {
			const hero = pathBounds(MAJOR_SYMBOLS[id].paths[0].d)!;
			expect(hero.height).toBeCloseTo(108, 0);
		}
	});

	it('shares frame geometry between paired cards', () => {
		for (const [first, second] of PAIRS) {
			expect(framesMatch(MAJOR_SYMBOLS[first], MAJOR_SYMBOLS[second])).toBe(true);
		}
	});
});

describe('validateLayout', () => {
	it('accepts a strip and a framed symbol that follow the rules', () => {
		expect(validateLayout(fixtures.validStrip)).toEqual([]);
		expect(validateLayout(fixtures.validSymbol)).toEqual([]);
	});

	it.each([
		['stripHeroTooTall', fixtures.stripHeroTooTall, /outside the hero zone/],
		['stripHeroTooTall', fixtures.stripHeroTooTall, /hero is 116\.0 tall/],
		['stripHeroOutsideZone', fixtures.stripHeroOutsideZone, /outside the hero zone/],
		['stripShortOfFloor', fixtures.stripShortOfFloor, /ends at y 150\.0, not 168/],
		['stripStartsLow', fixtures.stripStartsLow, /starts at y 20\.0, not 6/],
		['framedOpenFrame', fixtures.framedOpenFrame, /must be a closed outline/],
		['framedTooSmall', fixtures.framedTooSmall, /frame spans 40x40/]
	])('rejects %s', (_name, symbol, expected) => {
		expect(validateLayout(symbol).join('\n')).toMatch(expected);
	});

	it('matches frames by their outline only, not by what they hold', () => {
		expect(framesMatch(fixtures.ringWithBar, fixtures.ringWithDot)).toBe(true);
		expect(framesMatch(fixtures.ringWithBar, fixtures.framedTooSmall)).toBe(false);
		expect(framesMatch(fixtures.ringWithBar, fixtures.framedOpenFrame)).toBe(false);
	});
});

describe('pathBounds', () => {
	it('measures the curve itself, not its control points', () => {
		const bounds = pathBounds('M0 100 Q60 -20 120 100')!;
		expect(bounds.minY).toBeCloseTo(40, 0);
		expect(bounds.maxY).toBe(100);
		const cubic = pathBounds('M0 100 C0 0 120 0 120 100')!;
		expect(cubic.minY).toBeCloseTo(25, 0);
	});

	it('accepts a curve whose control point leaves the box but whose curve does not', () => {
		const symbol = {
			concept: 'A wave with its control point above the box',
			layout: 'framed' as const,
			paths: [{ d: 'M0 100 Q60 -20 120 100' }, { d: 'M0 0 V168' }]
		};
		expect(validateSymbol(symbol).join('\n')).not.toMatch(/outside/);
	});
});

describe('validateSymbol', () => {
	it('accepts a well-formed symbol', () => {
		expect(validateSymbol(fixtures.validSymbol)).toEqual([]);
	});

	it.each([
		['lowercaseCommand', fixtures.lowercaseCommand, /unsupported characters/],
		['outOfBounds', fixtures.outOfBounds, /outside the 120x168 box/],
		['arcOutOfBounds', fixtures.arcOutOfBounds, /outside the 120x168 box/],
		['tooManyPaths', fixtures.tooManyPaths, /17 paths/],
		['tooManyMainPaths', fixtures.tooManyMainPaths, /9 main-weight paths/],
		['tooSmall', fixtures.tooSmall, /under 50%/],
		['badArity', fixtures.badArity, /takes groups of 2/],
		['missingMove', fixtures.missingMove, /must start with M/],
		['openClearedRegion', fixtures.openClearedRegion, /cleared 0: must end with Z/],
		['clearedOutOfBounds', fixtures.clearedOutOfBounds, /cleared 0: point .* outside/]
	])('rejects %s', (_name, symbol, expected) => {
		expect(validateSymbol(symbol).join('\n')).toMatch(expected);
	});
});
