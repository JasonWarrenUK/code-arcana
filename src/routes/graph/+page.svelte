<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { PALETTE, suitAccent } from '$lib/arcana';
	import { GRAPH_H, GRAPH_W } from '$lib/graph';

	export let data: PageData;

	let hovered: string | null = null;

	$: nodeById = new Map(data.layout.nodes.map((n) => [n.id, n]));
	$: hoveredNode = hovered ? nodeById.get(hovered) : undefined;
	$: neighbours = new Set(
		hovered
			? data.layout.edges.flatMap((e) => (e.a === hovered ? [e.b] : e.b === hovered ? [e.a] : []))
			: []
	);

	$: labelX = hoveredNode ? Math.min(860, hoveredNode.x + 12) : 0;
	$: labelW = hoveredNode ? Math.max(90, hoveredNode.name.length * 9.2) : 0;

	const legend: Array<[keyof typeof PALETTE, string]> = [
		['major', 'Majors'],
		['cups', 'Cups'],
		['wands', 'Wands'],
		['swords', 'Swords'],
		['pentacles', 'Pentacles']
	];
</script>

<svelte:head>
	<title>Constellation | Arcana of Code</title>
</svelte:head>

<div class="page graph">
	<div class="head">
		<h1 class="display title">Constellation</h1>
		<p class="intro">
			Every card points at others. Hover to trace a line of thought; click to follow it.
			{data.layout.edges.length} edges across {data.layout.nodes.length} cards, none of them obvious until
			you see them.
		</p>
	</div>

	<div class="frame">
		<svg
			viewBox="0 0 {GRAPH_W} {GRAPH_H}"
			class="sky"
			role="img"
			aria-label="Connection graph of all {data.layout.nodes.length} cards"
		>
			<rect width={GRAPH_W} height={GRAPH_H} fill="#0b0b0b" />
			{#each data.layout.edges as edge}
				{@const live = hovered !== null && (edge.a === hovered || edge.b === hovered)}
				{@const a = nodeById.get(edge.a)}
				{@const b = nodeById.get(edge.b)}
				{#if a && b}
					<line
						x1={a.x}
						y1={a.y}
						x2={b.x}
						y2={b.y}
						stroke={live ? '#efece5' : '#2e2b27'}
						stroke-width={live ? 1.2 : 0.6}
					/>
				{/if}
			{/each}
			{#each data.layout.nodes as node (node.id)}
				{@const on = !hovered || node.id === hovered || neighbours.has(node.id)}
				<a
					href="/card/{node.id}"
					aria-label={node.name}
					on:mouseenter={() => (hovered = node.id)}
					on:mouseleave={() => (hovered = null)}
					on:focus={() => (hovered = node.id)}
					on:blur={() => (hovered = null)}
					on:click|preventDefault={() => goto(`/card/${node.id}`)}
				>
					<circle
						cx={node.x}
						cy={node.y}
						r={node.major ? 6 : 4}
						fill={on ? suitAccent(node.group) : '#3a3733'}
						stroke={node.id === hovered ? '#efece5' : 'none'}
						stroke-width={node.id === hovered ? 2 : 0}
						class="star"
					/>
				</a>
			{/each}
			{#if hoveredNode}
				<g pointer-events="none">
					<rect x={labelX} y={hoveredNode.y - 30} width={labelW} height="22" fill="#efece5" />
					<text x={labelX + 8} y={hoveredNode.y - 14} class="tooltip">
						{hoveredNode.name.toUpperCase()}
					</text>
				</g>
			{/if}
		</svg>
	</div>

	<ul class="legend" aria-label="Legend">
		{#each legend as [key, label]}
			<li>
				<span class="swatch" style:background={PALETTE[key]}></span>
				<span class="legend-label">{label}</span>
			</li>
		{/each}
	</ul>
</div>

<style>
	.graph {
		gap: 26px;
		padding-top: 44px;
	}

	.head {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 24px;
		flex-wrap: wrap;
	}

	.title {
		font-size: 62px;
		line-height: 0.94;
		letter-spacing: -0.045em;
	}

	.intro {
		margin: 0;
		font-size: 14px;
		line-height: 1.55;
		color: var(--text-muted);
		max-width: 52ch;
		text-wrap: pretty;
	}

	.frame {
		border: 1px solid var(--rule-ghost);
		background: #0b0b0b;
		position: relative;
	}

	.sky {
		display: block;
		width: 100%;
		height: auto;
	}

	.star {
		cursor: pointer;
		transition: fill 0.1s ease;
	}

	.tooltip {
		font-family: var(--font-body);
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.04em;
		fill: #0b0b0b;
	}

	.legend {
		list-style: none;
		display: flex;
		gap: 22px;
		flex-wrap: wrap;
	}

	.legend li {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.swatch {
		width: 12px;
		height: 12px;
		display: block;
	}

	.legend-label {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
	}

	@media (max-width: 760px) {
		.title {
			font-size: 48px;
		}
	}
</style>
