import { SYMBOL_BOX, type MajorSymbol } from './data/major-symbols';

export const MAX_PATHS = 16;
export const MAX_MAIN_PATHS = 8;
/** The drawing must span at least this share of the box in each direction */
export const MIN_COVERAGE = 0.5;

type Point = [number, number];

const COMMAND_ARITY: Record<string, number> = { M: 2, L: 2, H: 1, V: 1, C: 6, Q: 4, A: 7, Z: 0 };
const ARC_SAMPLES = 24;

/** Sample an SVG elliptical arc (spec F.6.5: endpoint to centre parameterisation) */
const sampleArc = (
	from: Point,
	[rxIn, ryIn, rotation, largeArc, sweep, x, y]: number[]
): Point[] => {
	let rx = Math.abs(rxIn);
	let ry = Math.abs(ryIn);
	if (rx === 0 || ry === 0) return [[x, y]];

	const phi = (rotation * Math.PI) / 180;
	const cosPhi = Math.cos(phi);
	const sinPhi = Math.sin(phi);
	const dx = (from[0] - x) / 2;
	const dy = (from[1] - y) / 2;
	const x1 = cosPhi * dx + sinPhi * dy;
	const y1 = -sinPhi * dx + cosPhi * dy;

	const scale = (x1 * x1) / (rx * rx) + (y1 * y1) / (ry * ry);
	if (scale > 1) {
		rx *= Math.sqrt(scale);
		ry *= Math.sqrt(scale);
	}

	const numerator = rx * rx * ry * ry - rx * rx * y1 * y1 - ry * ry * x1 * x1;
	const denominator = rx * rx * y1 * y1 + ry * ry * x1 * x1;
	const factor = (largeArc === sweep ? -1 : 1) * Math.sqrt(Math.max(0, numerator / denominator));
	const cxPrime = (factor * rx * y1) / ry;
	const cyPrime = (-factor * ry * x1) / rx;
	const cx = cosPhi * cxPrime - sinPhi * cyPrime + (from[0] + x) / 2;
	const cy = sinPhi * cxPrime + cosPhi * cyPrime + (from[1] + y) / 2;

	const angle = (ux: number, uy: number, vx: number, vy: number): number =>
		Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy);
	const start = angle(1, 0, (x1 - cxPrime) / rx, (y1 - cyPrime) / ry);
	let sweepAngle = angle(
		(x1 - cxPrime) / rx,
		(y1 - cyPrime) / ry,
		(-x1 - cxPrime) / rx,
		(-y1 - cyPrime) / ry
	);
	if (!sweep && sweepAngle > 0) sweepAngle -= 2 * Math.PI;
	if (sweep && sweepAngle < 0) sweepAngle += 2 * Math.PI;

	return Array.from({ length: ARC_SAMPLES }, (_, k) => {
		const theta = start + (sweepAngle * (k + 1)) / ARC_SAMPLES;
		return [
			cosPhi * rx * Math.cos(theta) - sinPhi * ry * Math.sin(theta) + cx,
			sinPhi * rx * Math.cos(theta) + cosPhi * ry * Math.sin(theta) + cy
		] as Point;
	});
};

/** Every point a path reaches, or an error string when the path breaks the grammar */
export const pathPoints = (d: string): { points: Point[]; error?: string } => {
	const stray = d.replace(/[MLHVCQAZ\s\d.,-]/g, '');
	if (stray)
		return {
			points: [],
			error: `unsupported characters "${stray}" (absolute M L H V C Q A Z only)`
		};
	if (!d.trim().startsWith('M')) return { points: [], error: 'path must start with M' };

	const points: Point[] = [];
	let current: Point = [0, 0];
	let subpathStart: Point = [0, 0];

	for (const [, command, args] of d.matchAll(/([MLHVCQAZ])([^MLHVCQAZ]*)/g)) {
		const numbers = (args.match(/-?\d*\.?\d+/g) ?? []).map(Number);
		const arity = COMMAND_ARITY[command];
		if (arity === 0 ? numbers.length !== 0 : numbers.length === 0 || numbers.length % arity !== 0) {
			return {
				points: [],
				error: `${command} takes groups of ${arity} numbers, got ${numbers.length}`
			};
		}

		if (command === 'Z') {
			current = subpathStart;
			continue;
		}
		for (let i = 0; i < numbers.length; i += arity) {
			const group = numbers.slice(i, i + arity);
			if (command === 'H') {
				current = [group[0], current[1]];
				points.push(current);
			} else if (command === 'V') {
				current = [current[0], group[0]];
				points.push(current);
			} else if (command === 'A') {
				points.push(...sampleArc(current, group));
				current = [group[5], group[6]];
			} else {
				// M, L, and the control and end points of C and Q (a convex-hull bound)
				for (let k = 0; k < group.length; k += 2) points.push([group[k], group[k + 1]]);
				current = [group[group.length - 2], group[group.length - 1]];
			}
			if (command === 'M' && i === 0) subpathStart = current;
		}
	}
	return { points };
};

/** Grammar problems for one symbol; an empty list means it passes */
export const validateSymbol = (symbol: MajorSymbol): string[] => {
	const problems: string[] = [];
	const { paths } = symbol;
	const main = paths.filter((path) => !path.fine).length;
	if (paths.length === 0) return ['no paths'];
	if (paths.length > MAX_PATHS) problems.push(`${paths.length} paths (max ${MAX_PATHS})`);
	if (main > MAX_MAIN_PATHS) problems.push(`${main} main-weight paths (max ${MAX_MAIN_PATHS})`);

	const outsideBox = (points: Point[]): string | undefined => {
		const outside = points.find(
			([x, y]) =>
				x < -0.05 || y < -0.05 || x > SYMBOL_BOX.width + 0.05 || y > SYMBOL_BOX.height + 0.05
		);
		return (
			outside &&
			`point (${outside[0].toFixed(1)}, ${outside[1].toFixed(1)}) is outside the ${SYMBOL_BOX.width}x${SYMBOL_BOX.height} box`
		);
	};

	const all: Point[] = [];
	paths.forEach((path, index) => {
		const { points, error } = pathPoints(path.d);
		if (error) {
			problems.push(`path ${index}: ${error}`);
			return;
		}
		const outside = outsideBox(points);
		if (outside) problems.push(`path ${index}: ${outside}`);
		all.push(...points);
	});

	(symbol.cleared ?? []).forEach((region, index) => {
		const { points, error } = pathPoints(region);
		if (error) {
			problems.push(`cleared ${index}: ${error}`);
			return;
		}
		if (!/z\s*$/i.test(region)) problems.push(`cleared ${index}: must end with Z`);
		const outside = outsideBox(points);
		if (outside) problems.push(`cleared ${index}: ${outside}`);
	});

	if (all.length > 0) {
		const xs = all.map(([x]) => x);
		const ys = all.map(([, y]) => y);
		const width = Math.max(...xs) - Math.min(...xs);
		const height = Math.max(...ys) - Math.min(...ys);
		if (width < SYMBOL_BOX.width * MIN_COVERAGE || height < SYMBOL_BOX.height * MIN_COVERAGE) {
			problems.push(
				`drawing spans ${width.toFixed(0)}x${height.toFixed(0)}, under ${MIN_COVERAGE * 100}% of the box in one direction`
			);
		}
	}
	return problems;
};
