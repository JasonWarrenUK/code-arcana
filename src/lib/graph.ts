import type { Card } from './types/card';

export interface GraphLayoutNode {
	id: string;
	type: 'card';
	name: string;
	group: 'major' | 'cups' | 'wands' | 'swords' | 'pentacles';
	x: number;
	y: number;
	angle: number;
}

export interface GraphEdge {
	a: string;
	b: string;
	path: string;
}

export interface GraphLayout {
	nodes: GraphLayoutNode[];
	edges: GraphEdge[];
	viewBox: string;
}

const CX = 500;
const CY = 500;
const R = 380;
const VIEW_SIZE = 1000;

// angular gap between groups (radians)
const GROUP_GAP = 0.12;

const GROUP_ORDER: Array<'major' | 'cups' | 'wands' | 'swords' | 'pentacles'> = [
	'major',
	'wands',
	'cups',
	'swords',
	'pentacles'
];

function groupOf(card: Card): 'major' | 'cups' | 'wands' | 'swords' | 'pentacles' {
	if (card.arcana === 'major') return 'major';
	return card.suit ?? 'wands';
}

// Sort within a group: numbered cards by number, court cards after (by rank order)
const COURT_ORDER: Record<string, number> = { page: 11, knight: 12, queen: 13, king: 14 };

function sortKey(card: Card): number {
	if (card.courtRank) return COURT_ORDER[card.courtRank] ?? 11;
	return card.number ?? 0;
}

export function buildGraphLayout(cards: Card[]): GraphLayout {
	// Partition cards by group, sorted within group
	const groups = new Map<string, Card[]>();
	for (const g of GROUP_ORDER) groups.set(g, []);
	for (const card of cards) {
		groups.get(groupOf(card))?.push(card);
	}
	for (const g of GROUP_ORDER) {
		groups.get(g)?.sort((a, b) => sortKey(a) - sortKey(b));
	}

	// Compute group sweeps — total arc = 2π minus all gaps
	const totalGap = GROUP_GAP * GROUP_ORDER.length;
	const totalSweep = 2 * Math.PI - totalGap;
	const totalCards = cards.length; // 78

	const groupSweeps = new Map<string, number>();
	for (const g of GROUP_ORDER) {
		const count = groups.get(g)?.length ?? 0;
		groupSweeps.set(g, (count / totalCards) * totalSweep);
	}

	// Assign angles — start at -π/2 (top) so major arcana opens at top of circle
	const nodes: GraphLayoutNode[] = [];
	let angle = -Math.PI / 2;

	for (const g of GROUP_ORDER) {
		const groupCards = groups.get(g) ?? [];
		const sweep = groupSweeps.get(g) ?? 0;

		for (let i = 0; i < groupCards.length; i++) {
			const card = groupCards[i];
			// Space cards evenly within the group sweep
			const cardAngle =
				groupCards.length > 1 ? angle + (i / (groupCards.length - 1)) * sweep : angle + sweep / 2;

			nodes.push({
				id: card.id,
				type: 'card',
				name: card.name,
				group: g,
				x: parseFloat((CX + R * Math.cos(cardAngle)).toFixed(2)),
				y: parseFloat((CY + R * Math.sin(cardAngle)).toFixed(2)),
				angle: cardAngle
			});
		}

		angle += sweep + GROUP_GAP;
	}

	// Build undirected edges — deduplicate a-b and b-a
	const nodeMap = new Map(nodes.map((n) => [n.id, n]));
	const seen = new Set<string>();
	const edges: GraphEdge[] = [];

	for (const card of cards) {
		for (const connId of card.connections ?? []) {
			const key = [card.id, connId].sort().join('|');
			if (seen.has(key)) continue;
			seen.add(key);

			const a = nodeMap.get(card.id);
			const b = nodeMap.get(connId);
			if (!a || !b) continue;

			// Quadratic Bézier: control point pulled toward centre
			// The deeper toward centre based on chord angle span
			const span = Math.abs(a.angle - b.angle);
			const normalised = Math.min(span, 2 * Math.PI - span) / Math.PI; // 0..1
			const pull = 0.35 + normalised * 0.45; // 0.35..0.8: wider chord → deeper bow

			// Lerp chord midpoint toward centre by pull factor
			const midX = (a.x + b.x) / 2;
			const midY = (a.y + b.y) / 2;
			const cX = parseFloat((midX + (CX - midX) * pull).toFixed(2));
			const cY = parseFloat((midY + (CY - midY) * pull).toFixed(2));

			edges.push({
				a: card.id,
				b: connId,
				path: `M${a.x} ${a.y} Q${cX} ${cY} ${b.x} ${b.y}`
			});
		}
	}

	return {
		nodes,
		edges,
		viewBox: `0 0 ${VIEW_SIZE} ${VIEW_SIZE}`
	};
}
