import type { MajorSymbol } from '../../src/lib/data/major-symbols';

export const validSymbol: MajorSymbol = {
	concept: 'A frame with a fine cross',
	paths: [{ d: 'M0 0 H120 V168 H0 Z' }, { d: 'M0 0 L120 168', fine: true }]
};

export const lowercaseCommand: MajorSymbol = {
	concept: 'Relative commands are not allowed',
	paths: [{ d: 'M0 0 h120 v168 Z' }]
};

export const outOfBounds: MajorSymbol = {
	concept: 'Runs off the right of the box',
	paths: [{ d: 'M0 0 H130 V168 H0 Z' }]
};

export const arcOutOfBounds: MajorSymbol = {
	concept: 'Endpoints sit inside the box but the arc bulges past it',
	paths: [{ d: 'M0 160 A60 60 0 0 0 120 160' }, { d: 'M0 0 V168' }]
};

export const tooManyPaths: MajorSymbol = {
	concept: 'Seventeen paths',
	paths: Array.from({ length: 17 }, (_, k) => ({ d: `M0 ${k * 10} H120`, fine: true }))
};

export const tooManyMainPaths: MajorSymbol = {
	concept: 'Nine main-weight paths',
	paths: Array.from({ length: 9 }, (_, k) => ({ d: `M0 ${k * 20} H120` }))
};

export const tooSmall: MajorSymbol = {
	concept: 'Fills a corner of the box',
	paths: [{ d: 'M0 0 H30 V40 H0 Z' }]
};

export const badArity: MajorSymbol = {
	concept: 'L with three numbers',
	paths: [{ d: 'M0 0 L10 10 20' }]
};

export const missingMove: MajorSymbol = {
	concept: 'Does not start with M',
	paths: [{ d: 'L0 0 H120 V168' }]
};

export const openClearedRegion: MajorSymbol = {
	concept: 'A cleared region that is not closed',
	paths: [{ d: 'M0 0 H120 V168 H0 Z' }],
	cleared: ['M10 10 H60 V60']
};

export const clearedOutOfBounds: MajorSymbol = {
	concept: 'A cleared region that runs past the box',
	paths: [{ d: 'M0 0 H120 V168 H0 Z' }],
	cleared: ['M10 10 H140 V60 Z']
};
