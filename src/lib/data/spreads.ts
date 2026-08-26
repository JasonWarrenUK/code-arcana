export type LabelSide = 'below' | 'right';

export interface SpreadSlot {
	position: string;
	/** What this position asks of the card placed on it */
	interpretation?: string;
	/** Percentage of the table width and height, centre of the card */
	x: number;
	y: number;
	/** Card width in px at the reference table size */
	w: number;
	rot: number;
	labelAt?: LabelSide;
}

export interface SpreadLayout {
	id: string;
	title: string;
	blurb: string;
	slots: SpreadSlot[];
}

/** Three cards in a rank: the geometry shared by every three-card reading */
const rank = (positions: Array<[string, string?]>): SpreadSlot[] =>
	positions.map(([position, interpretation], i) => ({
		position,
		interpretation,
		x: [18, 50, 82][i],
		y: 50,
		w: 200,
		rot: 0
	}));

export const spreads: SpreadLayout[] = [
	{
		id: 'the-stuck',
		title: 'The Stuck',
		blurb: 'For when you know something is wrong but not what.',
		slots: rank([
			[
				'What you are avoiding',
				'The thing you keep deferring. Not because it is hard, but because looking at it directly requires admitting something.'
			],
			[
				'What is actually the problem',
				'Not the symptom you have been debugging. The actual root. It is probably structural.'
			],
			[
				'The boring fix',
				'The solution that has been obvious for a while. The one that requires no cleverness, just time and the willingness to do unglamorous work.'
			]
		])
	},
	{
		id: 'the-decision',
		title: 'The Decision',
		blurb: 'For the choice you have been thinking about too long.',
		slots: rank([
			[
				'The thing you want to do',
				'What your instinct says. Not the answer you have rehearsed for the standup, but the one you have been sitting with at 11pm.'
			],
			[
				'The thing you should do',
				'What the constraints, the team, the codebase, or basic professionalism require. The version of you that has to live with the consequences.'
			],
			[
				'What you will actually do at 4pm on Friday',
				'Neither of the above, shaped by deadline pressure and diminishing capacity. Worth knowing in advance.'
			]
		])
	},
	{
		id: 'the-codebase',
		title: 'The Codebase',
		blurb:
			'A diagnostic for inherited or stagnant systems: what shaped this codebase, what it is now, and what it is about to become.',
		slots: rank([
			[
				'What it pretends to be',
				'The README version. The architecture diagram drawn before the first line of code. The story the original authors told themselves.'
			],
			[
				'What it is',
				'The lived reality. The workarounds, the modules that only one person understands, the tests that are disabled because they are too slow.'
			],
			[
				'What it is becoming',
				'Not what you plan to do to it: what it is already moving toward, given the changes being made now. Direction matters more than destination.'
			]
		])
	},
	{
		id: 'cross',
		title: 'The Cross',
		blurb:
			'The situation, the thing crossing it, the root beneath, and the outcome above. The crossing card lies at right angles because it is not on your side.',
		slots: [
			{ position: 'The situation', x: 34, y: 50, w: 146, rot: 0, labelAt: 'below' },
			{ position: 'What crosses it', x: 34, y: 50, w: 146, rot: 90, labelAt: 'right' },
			{ position: 'The root', x: 34, y: 82, w: 128, rot: 0, labelAt: 'below' },
			{ position: 'The crown', x: 34, y: 16, w: 128, rot: 0, labelAt: 'below' },
			{ position: 'The advice', x: 74, y: 50, w: 146, rot: 0, labelAt: 'below' }
		]
	},
	{
		id: 'horseshoe',
		title: 'The Horseshoe',
		blurb:
			'Five cards in an arc. The shape reads left to right as a passage of time, rising through the decision and settling on the other side.',
		slots: [
			{ position: 'Behind', x: 11, y: 68, w: 145, rot: -12 },
			{ position: 'Approaching', x: 30.5, y: 47, w: 145, rot: -6 },
			{ position: 'The crux', x: 50, y: 33, w: 145, rot: 0 },
			{ position: 'What resists', x: 69.5, y: 47, w: 145, rot: 6 },
			{ position: 'After', x: 89, y: 68, w: 145, rot: 12 }
		]
	}
];
