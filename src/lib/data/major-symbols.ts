/**
 * One line-drawn symbol per major arcana card, keyed by card id.
 *
 * Grammar (enforced by symbol-grammar.ts and its tests):
 *   - authored in a 120 x 168 box; CardFace centres it on the face
 *   - stroke only; `fine` paths draw at half weight
 *   - absolute commands only: M L H V C Q A Z
 *   - a path ending in Z is a closed shape: ridges are cleared from its interior
 *   - a space enclosed by open lines is listed in `cleared` (closed paths, not drawn)
 *   - no colour here: the symbol takes the major accent
 */

export interface SymbolPath {
	d: string;
	fine?: boolean;
}

export interface MajorSymbol {
	concept: string;
	paths: SymbolPath[];
	/** Closed regions cleared of ridges but not drawn: interiors that open lines enclose */
	cleared?: string[];
}

export const SYMBOL_BOX = { width: 120, height: 168, x: 40, y: 66 } as const;

const round = (n: number): number => Math.round(n * 10) / 10;
const polar = (cx: number, cy: number, r: number, deg: number): string => {
	const rad = (deg * Math.PI) / 180;
	return `${round(cx + r * Math.cos(rad))} ${round(cy + r * Math.sin(rad))}`;
};

const circle = (cx: number, cy: number, r: number): string =>
	`M${cx - r} ${cy} A${r} ${r} 0 1 0 ${cx + r} ${cy} A${r} ${r} 0 1 0 ${cx - r} ${cy} Z`;

const ellipse = (cx: number, cy: number, rx: number, ry: number): string =>
	`M${cx - rx} ${cy} A${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A${rx} ${ry} 0 1 0 ${cx - rx} ${cy} Z`;

/** A straight ray from radius `from` to radius `to`, at `deg` degrees (0 = right, 90 = down) */
const ray = (cx: number, cy: number, from: number, to: number, deg: number): string =>
	`M${polar(cx, cy, from, deg)} L${polar(cx, cy, to, deg)}`;

const raysAround = (
	cx: number,
	cy: number,
	from: number,
	to: number,
	count: number
): SymbolPath[] =>
	Array.from({ length: count }, (_, k) => ({
		d: ray(cx, cy, from, to, (360 / count) * k),
		fine: true
	}));

/** A closed star polygon with a point straight up (or down when `flip` is set) */
const star = (
	cx: number,
	cy: number,
	outer: number,
	inner: number,
	points: number,
	flip = false
): string => {
	const start = flip ? 90 : -90;
	const vertices = Array.from({ length: points * 2 }, (_, k) =>
		polar(cx, cy, k % 2 === 0 ? outer : inner, start + (180 / points) * k)
	);
	return `M${vertices.join(' L')} Z`;
};

/** Five points joined every second vertex; `flip` puts one point straight down */
const pentagram = (cx: number, cy: number, r: number, flip = false): string => {
	const start = flip ? 90 : -90;
	const vertices = [0, 2, 4, 1, 3].map((k) => polar(cx, cy, r, start + 72 * k));
	return `M${vertices.join(' L')} Z`;
};

export const MAJOR_SYMBOLS: Record<string, MajorSymbol> = {
	'the-fool': {
		concept: 'A sun above a cliff edge, a leap already under way',
		paths: [
			{ d: circle(60, 50, 28) },
			...raysAround(60, 50, 36, 46, 8),
			{ d: 'M0 132 H76 V168' },
			{ d: 'M76 128 Q92 98 108 122', fine: true },
			{ d: circle(108, 130, 8) }
		]
	},
	'the-magician': {
		concept: 'An infinity loop over a table laid with the four tools',
		cleared: ['M22 134 H98 V168 H22 Z'],
		paths: [
			{
				d: 'M60 36 C80 8 108 8 108 36 C108 64 80 64 60 36 C40 8 12 8 12 36 C12 64 40 64 60 36 Z'
			},
			{ d: 'M8 122 H112 V134 H8 Z' },
			{ d: 'M22 134 V168' },
			{ d: 'M98 134 V168' },
			{ d: 'M14 96 H34 L30 118 H18 Z', fine: true },
			{ d: 'M48 80 V120', fine: true },
			{ d: 'M74 80 V120', fine: true },
			{ d: 'M66 104 H82', fine: true },
			{ d: circle(98, 106, 10), fine: true }
		]
	},
	'the-high-priestess': {
		concept: 'Two pillars with a crescent between them and a scroll below',
		paths: [
			{ d: 'M8 20 H36 V168 H8 Z' },
			{ d: 'M84 20 H112 V168 H84 Z' },
			{ d: 'M70 40 A24 24 0 1 0 70 88 A30 30 0 0 1 70 40 Z' },
			{ d: 'M48 120 H72 V152 H48 Z', fine: true },
			{ d: 'M54 130 H66', fine: true },
			{ d: 'M54 138 H66', fine: true }
		]
	},
	'the-empress': {
		concept: 'The Venus glyph: a full disc over a cross, a good default in bloom',
		paths: [
			{ d: circle(60, 54, 34) },
			{ d: 'M60 88 V156' },
			{ d: 'M32 122 H88' },
			{ d: circle(60, 54, 22), fine: true }
		]
	},
	'the-emperor': {
		concept: 'A high-backed square throne under a crest',
		paths: [
			{ d: 'M22 12 H98 V96 H114 V160 H6 V96 H22 Z' },
			{ d: 'M22 96 H98', fine: true },
			{ d: circle(60, 46, 14), fine: true },
			{ d: 'M60 132 V160', fine: true }
		]
	},
	'the-hierophant': {
		concept: 'A three-barred cross inside a niche',
		cleared: ['M10 168 V112 A50 50 0 0 1 110 112 V168 Z'],
		paths: [
			{ d: 'M60 6 V160' },
			{ d: 'M44 30 H76' },
			{ d: 'M32 58 H88' },
			{ d: 'M20 86 H100' },
			{ d: 'M10 168 V112 A50 50 0 0 1 110 112 V168', fine: true }
		]
	},
	'the-lovers': {
		concept: 'Two overlapping rings above a path that forks',
		paths: [
			{ d: circle(40, 56, 32) },
			{ d: circle(80, 56, 32) },
			{ d: 'M60 168 V128', fine: true },
			{ d: 'M60 128 L34 104', fine: true },
			{ d: 'M60 128 L86 104', fine: true }
		]
	},
	'the-chariot': {
		concept: 'A canopied cart on a single wheel',
		cleared: ['M22 58 H98 V112 H22 Z'],
		paths: [
			{ d: 'M12 58 A48 48 0 0 1 108 58 Z' },
			{ d: 'M22 58 V112' },
			{ d: 'M98 58 V112' },
			{ d: 'M12 112 H108 V132 H12 Z' },
			{ d: circle(60, 150, 18) },
			{ d: 'M42 150 H78', fine: true },
			{ d: 'M60 132 V168', fine: true }
		]
	},
	strength: {
		concept: 'An infinity loop over a lion held gently by the face',
		paths: [
			{ d: 'M60 24 C74 4 100 4 100 24 C100 44 74 44 60 24 C46 4 20 4 20 24 C20 44 46 44 60 24 Z' },
			{
				d: 'M20 84 Q20 68 36 68 H84 Q100 68 100 84 V126 Q100 160 60 160 Q20 160 20 126 Z'
			},
			{ d: 'M38 100 H54', fine: true },
			{ d: 'M66 100 H82', fine: true },
			{ d: 'M50 120 H70 L60 132 Z', fine: true },
			{ d: 'M60 132 V146', fine: true }
		]
	},
	'the-hermit': {
		concept: 'A lantern holding a six-pointed star, carried on a staff',
		cleared: ['M38 120 L46 134 H74 L82 120 Z'],
		paths: [
			{ d: 'M30 52 L60 24 L90 52 Z' },
			{ d: 'M60 24 V6' },
			{ d: 'M34 52 H86 V120 H34 Z' },
			{ d: 'M38 120 L46 134 H74 L82 120', fine: true },
			{ d: 'M60 62 L76 96 H44 Z', fine: true },
			{ d: 'M60 110 L44 76 H76 Z', fine: true },
			{ d: 'M108 30 V168' }
		]
	},
	'wheel-of-fortune': {
		concept: 'A turning wheel of eight spokes',
		paths: [
			{ d: circle(60, 84, 56) },
			{ d: circle(60, 84, 38), fine: true },
			{ d: circle(60, 84, 8) },
			...raysAround(60, 84, 8, 38, 8)
		]
	},
	justice: {
		concept: 'Scales hung from a beam on an upright sword',
		cleared: ['M28 44 L8 96 H48 Z', 'M92 44 L72 96 H112 Z'],
		paths: [
			{ d: 'M8 44 H112' },
			{ d: 'M60 4 V168' },
			{ d: 'M46 138 H74' },
			{ d: 'M8 96 H48 A20 20 0 0 1 8 96 Z' },
			{ d: 'M72 96 H112 A20 20 0 0 1 72 96 Z' },
			{ d: 'M28 44 L8 96', fine: true },
			{ d: 'M28 44 L48 96', fine: true },
			{ d: 'M92 44 L72 96', fine: true },
			{ d: 'M92 44 L112 96', fine: true }
		]
	},
	'the-hanged-man': {
		concept: 'A figure hung by one foot from a gallows, head-down',
		cleared: ['M8 168 V10 H112 V168 Z'],
		paths: [
			{ d: 'M8 168 V10 H112 V168' },
			{ d: 'M60 10 V34', fine: true },
			{ d: 'M60 34 L46 78' },
			{ d: 'M60 34 L74 78' },
			{ d: 'M44 78 H76 L66 118 H54 Z' },
			{ d: circle(60, 142, 16) }
		]
	},
	death: {
		concept: 'A scythe: the blade, the snath and the hand-grip',
		paths: [
			{ d: 'M88 8 V168' },
			{ d: 'M88 8 C40 4 10 40 6 92 C34 62 58 50 88 50 Z' },
			{ d: 'M78 108 H98', fine: true },
			{ d: 'M78 124 H98', fine: true }
		]
	},
	temperance: {
		concept: 'Two cups, one pouring into the other',
		paths: [
			{ d: 'M8 24 H48 Q48 58 28 58 Q8 58 8 24 Z' },
			{ d: 'M28 58 V72', fine: true },
			{ d: 'M18 72 H38', fine: true },
			{ d: 'M72 100 H112 Q112 134 92 134 Q72 134 72 100 Z' },
			{ d: 'M92 134 V148', fine: true },
			{ d: 'M82 148 H102', fine: true },
			{ d: 'M48 26 C72 26 90 58 90 98', fine: true }
		]
	},
	'the-devil': {
		concept: 'An inverted pentagram in a ring, on a chain',
		paths: [
			{ d: circle(60, 72, 56) },
			{ d: pentagram(60, 72, 48, true) },
			{ d: circle(60, 142, 7), fine: true },
			{ d: circle(60, 158, 7), fine: true }
		]
	},
	'the-tower': {
		concept: 'A crenellated tower struck at the crown by a bolt',
		paths: [
			{
				d: 'M32 168 V72 H22 V44 H36 V54 H50 V44 H70 V54 H84 V44 H98 V72 H88 V168 Z'
			},
			{ d: 'M112 0 L88 22 H102 L76 42' },
			{ d: 'M50 168 V132 A10 10 0 0 1 70 132 V168', fine: true },
			{ d: 'M60 54 L52 84 L66 104 L56 128', fine: true }
		]
	},
	'the-star': {
		concept: 'A single eight-pointed star above still water',
		paths: [
			{ d: star(60, 62, 58, 20, 8) },
			{ d: 'M6 138 Q21 128 36 138 Q51 148 66 138 Q81 128 96 138 Q106 144 114 138', fine: true },
			{ d: 'M6 154 Q21 144 36 154 Q51 164 66 154 Q81 144 96 154 Q106 160 114 154', fine: true }
		]
	},
	'the-moon': {
		concept: 'A crescent over two towers with a road running between them',
		paths: [
			{ d: 'M72 8 A42 42 0 1 0 72 88 A48 48 0 0 1 72 8 Z' },
			{ d: 'M6 168 V108 H12 V100 H20 V108 H28 V100 H36 V108 H42 V168 Z' },
			{ d: 'M114 168 V108 H108 V100 H100 V108 H92 V100 H84 V108 H78 V168 Z' },
			{ d: 'M60 168 C60 150 44 144 60 128 C76 112 60 106 60 100', fine: true }
		]
	},
	'the-sun': {
		concept: 'A twelve-rayed sun with a bright disc',
		paths: [
			{ d: star(60, 84, 60, 44, 12) },
			{ d: circle(60, 84, 28) },
			{ d: circle(60, 84, 16), fine: true }
		]
	},
	judgement: {
		concept: 'A trumpet with a banner, over three rising graves',
		paths: [
			{ d: 'M8 60 L64 56 L112 22 V110 L64 78 L8 74 Z' },
			{ d: 'M36 74 V96', fine: true },
			{ d: 'M56 76 V96', fine: true },
			{ d: 'M28 96 H64 V136 H28 Z' },
			{ d: 'M46 104 V128', fine: true },
			{ d: 'M37 114 H55', fine: true },
			{ d: 'M8 146 H32 V168 H8 Z' },
			{ d: 'M48 146 H72 V168 H48 Z' },
			{ d: 'M88 146 H112 V168 H88 Z' }
		]
	},
	'the-world': {
		concept: 'A wreath around a dancer, the four creatures at the corners',
		paths: [
			{ d: ellipse(60, 84, 44, 68) },
			{ d: ellipse(60, 84, 36, 58), fine: true },
			{ d: 'M60 52 L76 84 L60 116 L44 84 Z' },
			{ d: circle(12, 14, 8) },
			{ d: circle(108, 14, 8) },
			{ d: circle(12, 154, 8) },
			{ d: circle(108, 154, 8) }
		]
	}
};
