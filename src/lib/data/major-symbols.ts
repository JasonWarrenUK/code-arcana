/**
 * One line-drawn symbol per major arcana card, keyed by card id.
 *
 * Grammar (enforced by symbol-grammar.ts and its tests):
 *   - authored in a 120 x 168 box; CardFace centres it on the face
 *   - stroke only; `fine` paths draw at half weight
 *   - absolute commands only: M L H V C Q A Z
 *   - a path ending in Z is a closed shape: ridges are cleared from its interior
 *   - a space enclosed by open lines is listed in `cleared` (closed paths, not drawn)
 *   - layout 'strip': paths[0] is the hero, inside y 6 to 114 (the Moon's crescent); the rest
 *     is a substrate strip. Every strip card spans exactly y 6 (highest symbol) to y 168
 *     (lowest substrate), the Moon's extent
 *   - layout 'framed': paths[0] is the enclosing frame, a closed outline spanning at least 80
 *     units each way; a frame that is only an outline (a portal) lists its opening in `cleared`
 *   - paired cards (Fool and Magician, Priestess and Hierophant, Empress and Emperor) call the
 *     same frame helper with the same arguments
 *   - no colour here: the symbol takes the major accent
 */

import {
	circle,
	diamondFrame,
	ellipse,
	hexagonFrame,
	hexagram,
	infinity,
	pentagram,
	portalFrame,
	portalOpening,
	raysAround,
	ringFrame,
	shieldFrame,
	squareFrame,
	star
} from '../symbol-shapes';

export interface SymbolPath {
	d: string;
	fine?: boolean;
	/** Filled with the card's ink, so anything drawn earlier (a frame line) is hidden behind it */
	opaque?: boolean;
}

export type SymbolLayout = 'strip' | 'framed';

export interface MajorSymbol {
	concept: string;
	/**
	 * strip: paths[0] is the hero in the upper zone, the rest is a substrate strip below.
	 * framed: paths[0] is the enclosing frame, the rest sits inside it.
	 */
	layout: SymbolLayout;
	paths: SymbolPath[];
	/** Closed regions cleared of ridges but not drawn: interiors that open lines enclose */
	cleared?: string[];
}

export const SYMBOL_BOX = { width: 120, height: 168, x: 40, y: 66 } as const;

export const MAJOR_SYMBOLS: Record<string, MajorSymbol> = {
	'the-fool': {
		concept: "A single dot steps out through the bottom of the Magician's ring",
		layout: 'framed',
		paths: [
			{ d: ringFrame(), fine: true },
			{ d: circle(60, 142, 20), opaque: true }
		]
	},
	'the-magician': {
		concept: 'An infinity loop held in a ring',
		layout: 'framed',
		paths: [{ d: ringFrame(), fine: true }, { d: infinity(60, 84, 42, 24) }]
	},
	'the-high-priestess': {
		concept: 'A crescent between two pillars',
		layout: 'framed',
		cleared: [portalOpening()],
		paths: [
			{ d: portalFrame(), fine: true },
			{ d: 'M80.6 62.8 A32.4 32.4 0 1 0 80.6 125.2 A37.2 37.2 0 0 1 80.6 62.8 Z' }
		]
	},
	'the-empress': {
		concept: 'A pointed crown set with pearls, over a sprig of wheat',
		layout: 'framed',
		paths: [
			{ d: shieldFrame(), fine: true },
			{ d: 'M34 66 V46 L47 56 L60 40 L73 56 L86 46 V66 Z' },
			{ d: 'M34 60 H86', fine: true },
			{ d: circle(34, 42, 3.5) },
			{ d: circle(60, 36, 3.5) },
			{ d: circle(86, 42, 3.5) },
			{ d: 'M60 132 V82' },
			{ d: ellipse(60, 76, 4, 9), fine: true },
			{ d: 'M60 120 L50 110', fine: true },
			{ d: 'M60 120 L70 110', fine: true },
			{ d: 'M60 106 L50 96', fine: true },
			{ d: 'M60 106 L70 96', fine: true },
			{ d: 'M60 92 L50 82', fine: true },
			{ d: 'M60 92 L70 82', fine: true }
		]
	},
	'the-emperor': {
		concept: 'A castellated crown over a sceptre topped with an orb and cross',
		layout: 'framed',
		paths: [
			{ d: shieldFrame(), fine: true },
			{ d: 'M34 66 V42 H44 V50 H54 V42 H66 V50 H76 V42 H86 V66 Z' },
			{ d: circle(60, 98, 9) },
			{ d: 'M60 89 V78 M55 83 H65' },
			{ d: 'M60 107 V134' },
			{ d: 'M55 120 H65', fine: true }
		]
	},
	'the-hierophant': {
		concept: 'A three-barred cross between two pillars',
		layout: 'framed',
		cleared: [portalOpening()],
		paths: [
			{ d: portalFrame(), fine: true },
			{ d: 'M60 62 V142' },
			{ d: 'M48 78 H72' },
			{ d: 'M40 96 H80' },
			{ d: 'M32 114 H88' }
		]
	},
	'the-lovers': {
		concept: 'Two rings, interlocked, held in a diamond',
		layout: 'framed',
		paths: [{ d: diamondFrame(), fine: true }, { d: circle(44, 84, 20) }, { d: circle(76, 84, 20) }]
	},
	'the-chariot': {
		concept: 'Velocity is a vector: one arrow in a square',
		layout: 'framed',
		paths: [{ d: squareFrame(), fine: true }, { d: 'M16 70 H64 V54 L102 84 L64 114 V98 H16 Z' }]
	},
	strength: {
		concept: 'Force meets an equal and opposite resistance, held in a square',
		layout: 'framed',
		paths: [
			{ d: squareFrame(), fine: true },
			{ d: 'M14 70 H40 V58 L58 84 L40 110 V98 H14 Z' },
			{ d: 'M106 70 H80 V58 L62 84 L80 110 V98 H106 Z' }
		]
	},
	'the-hermit': {
		concept: 'A lantern alone in a ring: nothing else is allowed inside it',
		layout: 'framed',
		paths: [
			{ d: circle(60, 84, 58), fine: true },
			{ d: 'M60 30 V40', fine: true },
			{ d: 'M38 62 L60 40 L82 62 Z' },
			{ d: 'M42 62 H78 V120 H42 Z' },
			{ d: 'M46 120 L52 132 H68 L74 120 Z', fine: true },
			...hexagram(60, 90, 16).map((d) => ({ d, fine: true }))
		]
	},
	'wheel-of-fortune': {
		concept: 'A turning wheel of eight spokes',
		layout: 'framed',
		paths: [
			{ d: circle(60, 84, 56) },
			{ d: circle(60, 84, 38), fine: true },
			{ d: circle(60, 84, 8) },
			...raysAround(60, 84, 8, 38, 8)
		]
	},
	justice: {
		concept: 'Scales hung from a beam on a central stem, standing on a tiled floor',
		layout: 'strip',
		cleared: ['M28 32 L8 78 H48 Z', 'M92 32 L72 78 H112 Z'],
		paths: [
			{ d: 'M60 6 V114 M8 32 H112' },
			{ d: 'M8 78 H48 A20 20 0 0 1 8 78 Z' },
			{ d: 'M72 78 H112 A20 20 0 0 1 72 78 Z' },
			{ d: 'M28 32 L8 78', fine: true },
			{ d: 'M28 32 L48 78', fine: true },
			{ d: 'M92 32 L72 78', fine: true },
			{ d: 'M92 32 L112 78', fine: true },
			{ d: 'M44 114 H76 V132 H44 Z' },
			{ d: 'M0 132 H120 V168 H0 Z' },
			{ d: 'M20 132 V168 M40 132 V168 M60 132 V168 M80 132 V168 M100 132 V168', fine: true },
			{ d: 'M0 150 H120', fine: true }
		]
	},
	'the-hanged-man': {
		concept: 'A plumb bob hangs point-down from a living branch over its own roots',
		layout: 'strip',
		paths: [
			{ d: 'M48 52 H72 V76 L60 114 L48 76 Z' },
			{ d: 'M20 6 H100' },
			{ d: 'M60 6 V52', fine: true },
			{ d: 'M48 64 H72', fine: true },
			{ d: 'M0 134 H120' },
			{ d: 'M24 134 Q28 146 20 156 Q16 162 18 168', fine: true },
			{ d: 'M50 134 Q46 148 56 158 Q60 164 56 168', fine: true },
			{ d: 'M78 134 Q84 146 74 156 Q70 162 74 168', fine: true },
			{ d: 'M100 134 Q96 148 104 158 Q108 164 104 168', fine: true }
		]
	},
	death: {
		concept: 'A scythe leaning, upper left to lower right, in a field already cut',
		layout: 'strip',
		paths: [
			{ d: 'M67.9 6 C23.8 9.7 5.4 43.4 9.1 87.4 C28.2 57.6 50.1 43.6 74.1 41.4 Z' },
			{ d: 'M67.9 6 L92.2 143.8' },
			{ d: 'M73.8 96.6 L93.5 93.2', fine: true },
			{ d: 'M76.5 112.6 L96.2 109.2', fine: true },
			{ d: 'M0 168 H120' },
			{
				d: 'M8 168 V156 M20 168 V150 M32 168 V158 M44 168 V152 M56 168 V158 M68 168 V154 M104 168 V150 M114 168 V158',
				fine: true
			}
		]
	},
	temperance: {
		concept: 'One cup tilted to pour, the liquid falling, held in a hexagon',
		layout: 'framed',
		paths: [
			{ d: hexagonFrame(), fine: true },
			{ d: 'M82.6 62.5 L65.5 109.5 Q30.2 96.7 38.8 73.2 Q47.3 49.7 82.6 62.5 Z' },
			{ d: 'M38.8 73.2 L20 66.3' },
			{ d: 'M25.1 52.3 L14.8 80.4' },
			{ d: 'M66 112 Q74 122 70 134', fine: true }
		]
	},
	'the-devil': {
		concept: 'The inverted pentagram, held in a hexagon',
		layout: 'framed',
		paths: [{ d: hexagonFrame(), fine: true }, { d: pentagram(60, 86, 40, true) }]
	},
	'the-tower': {
		concept: 'A struck tower standing on its own broken rubble heap',
		layout: 'strip',
		paths: [
			{ d: 'M38 114 V62 H30 V40 H42 V48 H52 V40 H68 V48 H78 V40 H90 V62 H82 V114 Z' },
			{ d: 'M104 6 L86 24 H97 L68 40' },
			{ d: 'M52 114 V94 A8 8 0 0 1 68 94 V114', fine: true },
			{ d: 'M60 62 L54 80 L64 94', fine: true },
			{
				d: 'M34 114 L26 130 L32 136 L14 152 L24 158 L6 168 H114 L96 158 L106 152 L88 136 L94 130 L86 114 Z'
			},
			{ d: 'M60 114 L56 134 L64 148 L58 168', fine: true },
			{ d: 'M42 124 L46 140', fine: true },
			{ d: 'M78 124 L74 142', fine: true },
			{ d: 'M8 140 L16 134 L20 142 L12 146 Z', fine: true },
			{ d: 'M112 140 L104 134 L100 142 L108 146 Z', fine: true }
		]
	},
	'the-star': {
		concept: 'A single eight-pointed star above still water',
		layout: 'strip',
		paths: [
			{ d: star(60, 60, 54, 19, 8) },
			{
				d: 'M6 147 Q21 137 36 147 Q51 157 66 147 Q81 137 96 147 Q106 153 114 147',
				fine: true
			},
			{
				d: 'M6 163 Q21 153 36 163 Q51 173 66 163 Q81 153 96 163 Q106 169 114 163',
				fine: true
			}
		]
	},
	'the-moon': {
		concept: 'A large crescent above, two towers and a road as the low landscape',
		layout: 'strip',
		paths: [
			{ d: 'M89 8 A54 54 0 1 0 89 112 A62 62 0 0 1 89 8 Z' },
			{ d: 'M6 168 V140 H10 V132 H16 V140 H24 V132 H30 V140 H34 V168 Z' },
			{ d: 'M114 168 V140 H110 V132 H104 V140 H96 V132 H90 V140 H86 V168 Z' },
			{ d: 'M60 168 C60 158 46 154 60 146 C74 138 60 134 60 128', fine: true }
		]
	},
	'the-sun': {
		concept: 'A sunburst above a low field of sunflowers on long stems',
		layout: 'strip',
		paths: [
			{ d: star(60, 60, 54, 39, 12) },
			{ d: circle(60, 60, 25) },
			{ d: circle(60, 60, 13), fine: true },
			{ d: circle(22, 128, 8) },
			{ d: circle(60, 138, 8) },
			{ d: circle(98, 128, 8) },
			{ d: 'M22 136 V152', fine: true },
			{ d: 'M60 146 V152', fine: true },
			{ d: 'M98 136 V152', fine: true },
			{ d: 'M6 152 H114', fine: true },
			{ d: 'M6 168 H114', fine: true }
		]
	},
	judgement: {
		concept: 'Spread wings above three figures rising from their tombstones',
		layout: 'strip',
		paths: [
			{
				d: 'M54 42 C40 30 22 14 6 6 Q2 18 10 26 Q4 36 14 44 Q12 54 24 62 Q38 68 54 58 Z M66 42 C80 30 98 14 114 6 Q118 18 110 26 Q116 36 106 44 Q108 54 96 62 Q82 68 66 58 Z'
			},
			{ d: circle(22, 118, 5) },
			{ d: 'M22 136 V126 M22 132 L14 122 M22 132 L30 122', fine: true },
			{ d: 'M8 168 V150 A14 14 0 0 1 36 150 V168 Z' },
			{ d: circle(60, 118, 5) },
			{ d: 'M60 136 V126 M60 132 L52 122 M60 132 L68 122', fine: true },
			{ d: 'M46 168 V150 A14 14 0 0 1 74 150 V168 Z' },
			{ d: circle(98, 118, 5) },
			{ d: 'M98 136 V126 M98 132 L90 122 M98 132 L106 122', fine: true },
			{ d: 'M84 168 V150 A14 14 0 0 1 112 150 V168 Z' }
		]
	},
	'the-world': {
		concept: 'A laurel wreath around a dancer, standing on a plain horizon',
		layout: 'strip',
		paths: [
			{ d: ellipse(60, 60, 40, 54) },
			{ d: ellipse(60, 60, 32, 46), fine: true },
			{ d: 'M60 32 L72 60 L60 88 L48 60 Z' },
			{ d: 'M6 144 H114' },
			{ d: 'M6 168 H114', fine: true }
		]
	}
};
