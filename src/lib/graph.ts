import type { Card } from './types/card';
import { artKey, isMajor, mulberry32, type ArtKey } from './arcana';

/**
 * Constellation layout: a small force simulation, seeded so the build and the
 * browser agree on where every star sits. Runs once at load time.
 */

export const GRAPH_W = 1000;
export const GRAPH_H = 620;

export interface GraphNode {
	id: string;
	name: string;
	group: ArtKey;
	major: boolean;
	x: number;
	y: number;
}

export interface GraphEdge {
	a: string;
	b: string;
}

export interface GraphLayout {
	nodes: GraphNode[];
	edges: GraphEdge[];
}

interface SimNode extends GraphNode {
	vx: number;
	vy: number;
}

export function buildGraphLayout(cards: Card[], seed = 78): GraphLayout {
	const random = mulberry32(seed);
	const n = cards.length;
	const cx = GRAPH_W / 2;
	const cy = GRAPH_H / 2;

	const nodes: SimNode[] = cards.map((c, i) => {
		const a = (i / n) * Math.PI * 2;
		return {
			id: c.id,
			name: c.name,
			group: artKey(c),
			major: isMajor(c),
			x: cx + Math.cos(a) * 240 + (random() - 0.5) * 40,
			y: cy + Math.sin(a) * 200 + (random() - 0.5) * 40,
			vx: 0,
			vy: 0
		};
	});
	const index = new Map(nodes.map((nd) => [nd.id, nd]));

	const edges: Array<[SimNode, SimNode]> = [];
	const seen = new Set<string>();
	for (const c of cards) {
		for (const other of c.connections ?? []) {
			const key = [c.id, other].sort().join('|');
			const target = index.get(other);
			const source = index.get(c.id);
			if (seen.has(key) || !target || !source) continue;
			seen.add(key);
			edges.push([source, target]);
		}
	}

	const ITERATIONS = 320;
	for (let iter = 0; iter < ITERATIONS; iter++) {
		const k = 1 - iter / ITERATIONS;
		for (let i = 0; i < nodes.length; i++) {
			for (let j = i + 1; j < nodes.length; j++) {
				const a = nodes[i];
				const b = nodes[j];
				const dx = a.x - b.x;
				const dy = a.y - b.y;
				const d2 = dx * dx + dy * dy || 0.01;
				const f = 2600 / d2;
				const d = Math.sqrt(d2);
				a.vx += (dx / d) * f;
				a.vy += (dy / d) * f;
				b.vx -= (dx / d) * f;
				b.vy -= (dy / d) * f;
			}
		}
		for (const [a, b] of edges) {
			const dx = b.x - a.x;
			const dy = b.y - a.y;
			const d = Math.hypot(dx, dy) || 0.01;
			const f = (d - 84) * 0.03;
			a.vx += (dx / d) * f;
			a.vy += (dy / d) * f;
			b.vx -= (dx / d) * f;
			b.vy -= (dy / d) * f;
		}
		for (const nd of nodes) {
			nd.vx += (cx - nd.x) * 0.004;
			nd.vy += (cy - nd.y) * 0.004;
			nd.x += nd.vx * k * 0.5;
			nd.y += nd.vy * k * 0.5;
			nd.vx *= 0.82;
			nd.vy *= 0.82;
			nd.x = Math.max(26, Math.min(GRAPH_W - 26, nd.x));
			nd.y = Math.max(22, Math.min(GRAPH_H - 22, nd.y));
		}
	}

	// Stretch the settled cloud to fill the frame
	const pad = 34;
	const xs = nodes.map((nd) => nd.x);
	const ys = nodes.map((nd) => nd.y);
	const x0 = Math.min(...xs);
	const x1 = Math.max(...xs);
	const y0 = Math.min(...ys);
	const y1 = Math.max(...ys);
	const sx = (GRAPH_W - pad * 2) / Math.max(1, x1 - x0);
	const sy = (GRAPH_H - pad * 2) / Math.max(1, y1 - y0);

	return {
		nodes: nodes.map(({ id, name, group, major, x, y }) => ({
			id,
			name,
			group,
			major,
			x: parseFloat((pad + (x - x0) * sx).toFixed(1)),
			y: parseFloat((pad + (y - y0) * sy).toFixed(1))
		})),
		edges: edges.map(([a, b]) => ({ a: a.id, b: b.id }))
	};
}
