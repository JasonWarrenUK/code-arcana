export type LabelSide = 'below' | 'right';

export interface SpreadSlot {
	position: string;
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

export const spreads: SpreadLayout[] = [
	{
		id: 'three',
		title: 'Three Cards',
		blurb:
			'Three cards in a rank. The simplest reading and the one most likely to be useful: what shaped this codebase, what it is now, and what it is about to become.',
		slots: [
			{ position: 'Before', x: 18, y: 50, w: 200, rot: 0 },
			{ position: 'Now', x: 50, y: 50, w: 200, rot: 0 },
			{ position: 'Next', x: 82, y: 50, w: 200, rot: 0 }
		]
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
