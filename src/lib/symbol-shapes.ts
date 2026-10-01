/**
 * Geometry helpers for authoring major arcana symbols. Each returns SVG path data in the
 * 120 x 168 symbol box, using only the commands the grammar allows (M L H V C Q A Z).
 */

const round = (n: number): number => Math.round(n * 10) / 10;

export const polar = (cx: number, cy: number, r: number, deg: number): string => {
	const rad = (deg * Math.PI) / 180;
	return `${round(cx + r * Math.cos(rad))} ${round(cy + r * Math.sin(rad))}`;
};

export const circle = (cx: number, cy: number, r: number): string =>
	`M${cx - r} ${cy} A${r} ${r} 0 1 0 ${cx + r} ${cy} A${r} ${r} 0 1 0 ${cx - r} ${cy} Z`;

export const ellipse = (cx: number, cy: number, rx: number, ry: number): string =>
	`M${cx - rx} ${cy} A${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A${rx} ${ry} 0 1 0 ${cx - rx} ${cy} Z`;

/** A straight ray from radius `from` to radius `to`, at `deg` degrees (0 = right, 90 = down) */
export const ray = (cx: number, cy: number, from: number, to: number, deg: number): string =>
	`M${polar(cx, cy, from, deg)} L${polar(cx, cy, to, deg)}`;

export const raysAround = (
	cx: number,
	cy: number,
	from: number,
	to: number,
	count: number
): Array<{ d: string; fine: true }> =>
	Array.from({ length: count }, (_, k) => ({
		d: ray(cx, cy, from, to, (360 / count) * k),
		fine: true as const
	}));

/** A closed star polygon with a point straight up (or down when `flip` is set) */
export const star = (
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
export const pentagram = (cx: number, cy: number, r: number, flip = false): string => {
	const start = flip ? 90 : -90;
	const vertices = [0, 2, 4, 1, 3].map((k) => polar(cx, cy, r, start + 72 * k));
	return `M${vertices.join(' L')} Z`;
};

/** Two triangles, one point up and one point down */
export const hexagram = (cx: number, cy: number, r: number): string[] => [
	`M${polar(cx, cy, r, -90)} L${polar(cx, cy, r, 30)} L${polar(cx, cy, r, 150)} Z`,
	`M${polar(cx, cy, r, 90)} L${polar(cx, cy, r, 210)} L${polar(cx, cy, r, 330)} Z`
];

/**
 * Frames for approach B cards: a closed outline that encloses the hero and clears the ridges.
 * Paired cards call the same helper with the same arguments so their frames match exactly.
 */
export const ringFrame = (cx = 60, cy = 84, r = 58): string => circle(cx, cy, r);

export const squareFrame = (cx = 60, cy = 84, half = 52): string =>
	`M${cx - half} ${cy - half} H${cx + half} V${cy + half} H${cx - half} Z`;

export const diamondFrame = (cx = 60, cy = 84, half = 58): string =>
	`M${cx} ${cy - half} L${cx + half} ${cy} L${cx} ${cy + half} L${cx - half} ${cy} Z`;

/**
 * Two pillars under a lintel, as one closed outline. The opening between them is not part of
 * the outline's fill, so list `portalOpening` in `cleared` to clear the ridges inside it.
 */
export const portalFrame = (
	cx = 60,
	top = 36,
	bottom = 150,
	half = 48,
	pillar = 12,
	lintel = 14
): string =>
	`M${cx - half} ${bottom} V${top} H${cx + half} V${bottom} H${cx + half - pillar} V${top + lintel} H${cx - half + pillar} V${bottom} Z`;

export const portalOpening = (
	cx = 60,
	top = 36,
	bottom = 150,
	half = 48,
	pillar = 12,
	lintel = 14
): string =>
	`M${cx - half + pillar} ${top + lintel} H${cx + half - pillar} V${bottom} H${cx - half + pillar} Z`;

/** A heraldic shield: flat top, straight shoulders, curving to a point at the bottom */
export const shieldFrame = (cx = 60, top = 28, bottom = 152, half = 48, shoulder = 84): string =>
	`M${cx - half} ${top} H${cx + half} V${shoulder} Q${cx + half} ${bottom - 24} ${cx} ${bottom} Q${cx - half} ${bottom - 24} ${cx - half} ${shoulder} Z`;

/** A hexagon with a point at the top and bottom */
export const hexagonFrame = (cx = 60, cy = 84, r = 58): string =>
	`M${[0, 1, 2, 3, 4, 5].map((k) => polar(cx, cy, r, -90 + 60 * k)).join(' L')} Z`;

/** A lemniscate crossing at (cx, cy); `lobe` is how far each loop rises and falls */
export const infinity = (cx: number, cy: number, halfWidth: number, lobe: number): string =>
	`M${cx} ${cy} C${cx + halfWidth / 2} ${cy - lobe} ${cx + halfWidth} ${cy - lobe} ${cx + halfWidth} ${cy} C${cx + halfWidth} ${cy + lobe} ${cx + halfWidth / 2} ${cy + lobe} ${cx} ${cy} C${cx - halfWidth / 2} ${cy - lobe} ${cx - halfWidth} ${cy - lobe} ${cx - halfWidth} ${cy} C${cx - halfWidth} ${cy + lobe} ${cx - halfWidth / 2} ${cy + lobe} ${cx} ${cy} Z`;
