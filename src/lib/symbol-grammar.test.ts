import { describe, expect, it } from 'vitest';
import cards from './data/cards.json';
import { MAJOR_SYMBOLS } from './data/major-symbols';
import { cardArt } from './arcana';
import { validateSymbol } from './symbol-grammar';
import type { Card } from './types/card';
import * as fixtures from '../../tests/fixtures/symbol-grammar';

const majors = (cards as Card[]).filter((card) => card.arcana === 'major');

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
