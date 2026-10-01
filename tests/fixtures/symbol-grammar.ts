import type { MajorSymbol } from '../../src/lib/data/major-symbols';

export const validSymbol: MajorSymbol = {
	concept: 'A frame with a fine cross',
	layout: 'framed',
	paths: [{ d: 'M0 0 H120 V168 H0 Z' }, { d: 'M0 0 L120 168', fine: true }]
};

export const lowercaseCommand: MajorSymbol = {
	concept: 'Relative commands are not allowed',
	layout: 'framed',
	paths: [{ d: 'M0 0 h120 v168 Z' }]
};

export const outOfBounds: MajorSymbol = {
	concept: 'Runs off the right of the box',
	layout: 'framed',
	paths: [{ d: 'M0 0 H130 V168 H0 Z' }]
};

export const arcOutOfBounds: MajorSymbol = {
	concept: 'Endpoints sit inside the box but the arc bulges past it',
	layout: 'framed',
	paths: [{ d: 'M0 160 A60 60 0 0 0 120 160' }, { d: 'M0 0 V168' }]
};

export const tooManyPaths: MajorSymbol = {
	concept: 'Seventeen paths',
	layout: 'framed',
	paths: Array.from({ length: 17 }, (_, k) => ({ d: `M0 ${k * 10} H120`, fine: true }))
};

export const tooManyMainPaths: MajorSymbol = {
	concept: 'Nine main-weight paths',
	layout: 'framed',
	paths: Array.from({ length: 9 }, (_, k) => ({ d: `M0 ${k * 20} H120` }))
};

export const tooSmall: MajorSymbol = {
	concept: 'Fills a corner of the box',
	layout: 'framed',
	paths: [{ d: 'M0 0 H30 V40 H0 Z' }]
};

export const badArity: MajorSymbol = {
	concept: 'L with three numbers',
	layout: 'framed',
	paths: [{ d: 'M0 0 L10 10 20' }]
};

export const missingMove: MajorSymbol = {
	concept: 'Does not start with M',
	layout: 'framed',
	paths: [{ d: 'L0 0 H120 V168' }]
};

export const openClearedRegion: MajorSymbol = {
	concept: 'A cleared region that is not closed',
	layout: 'framed',
	paths: [{ d: 'M0 0 H120 V168 H0 Z' }],
	cleared: ['M10 10 H60 V60']
};

export const clearedOutOfBounds: MajorSymbol = {
	concept: 'A cleared region that runs past the box',
	layout: 'framed',
	paths: [{ d: 'M0 0 H120 V168 H0 Z' }],
	cleared: ['M10 10 H140 V60 Z']
};

export const validStrip: MajorSymbol = {
	concept: 'A hero filling the hero zone over a floor line',
	layout: 'strip',
	paths: [{ d: 'M10 6 H110 V112 H10 Z' }, { d: 'M0 168 H120', fine: true }]
};

export const stripStartsLow: MajorSymbol = {
	concept: 'The highest point of the drawing is y 20, not 6',
	layout: 'strip',
	paths: [{ d: 'M10 20 H110 V100 H10 Z' }, { d: 'M0 168 H120', fine: true }]
};

export const stripHeroTooTall: MajorSymbol = {
	concept: 'The hero starts above the zone and is taller than 108',
	layout: 'strip',
	paths: [{ d: 'M10 4 H110 V120 Z' }, { d: 'M0 168 H120', fine: true }]
};

export const stripHeroOutsideZone: MajorSymbol = {
	concept: 'The hero is short enough but hangs below the zone',
	layout: 'strip',
	paths: [{ d: 'M10 40 H110 V140 H10 Z' }, { d: 'M0 168 H120', fine: true }]
};

export const stripShortOfFloor: MajorSymbol = {
	concept: 'The substrate stops at y 150, not 168',
	layout: 'strip',
	paths: [{ d: 'M10 6 H110 V112 H10 Z' }, { d: 'M0 150 H120', fine: true }]
};

export const ringWithBar: MajorSymbol = {
	concept: 'A ring holding a bar',
	layout: 'framed',
	paths: [{ d: 'M10 84 A50 50 0 1 0 110 84 A50 50 0 1 0 10 84 Z' }, { d: 'M50 60 H70 V100 H50 Z' }]
};

export const framedOpenFrame: MajorSymbol = {
	concept: 'A frame left open, so it encloses nothing',
	layout: 'framed',
	paths: [{ d: 'M10 10 H110 V150' }]
};

export const framedTooSmall: MajorSymbol = {
	concept: 'A closed frame only 40 units across',
	layout: 'framed',
	paths: [{ d: 'M40 40 H80 V80 H40 Z' }]
};

export const ringWithDot: MajorSymbol = {
	concept: 'The same ring as ringWithBar, holding a dot instead',
	layout: 'framed',
	paths: [
		{ d: 'M10 84 A50 50 0 1 0 110 84 A50 50 0 1 0 10 84 Z' },
		{ d: 'M54 84 A6 6 0 1 0 66 84 A6 6 0 1 0 54 84 Z' }
	]
};
