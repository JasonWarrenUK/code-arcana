<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { PALETTE, suitAccent } from '$lib/arcana';
	import { GRAPH_H, GRAPH_W } from '$lib/graph';

	let { data }: { data: PageData } = $props();

	let hovered: string | null = $state(null);

	const nodeById = $derived(new Map(data.layout.nodes.map((n) => [n.id, n])));
	const hoveredNode = $derived(hovered ? nodeById.get(hovered) : undefined);
	const neighbours = $derived(
		new Set(
			hovered
				? data.layout.edges.flatMap((e) => (e.a === hovered ? [e.b] : e.b === hovered ? [e.a] : []))
				: []
		)
	);

	const neighbourNodes = $derived(
		[...neighbours].flatMap((id) => {
			const node = nodeById.get(id);
			return node ? [node] : [];
		})
	);

	// Anchor the tooltip on whichever side of the star has more room
	const tipLeft = $derived(hoveredNode ? (hoveredNode.x / GRAPH_W) * 100 : 0);
	const tipTop = $derived(hoveredNode ? (hoveredNode.y / GRAPH_H) * 100 : 0);
	const tipFlipX = $derived(hoveredNode ? hoveredNode.x > GRAPH_W * 0.6 : false);
	const tipFlipY = $derived(hoveredNode ? hoveredNode.y > GRAPH_H * 0.6 : false);

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
					onmouseenter={() => (hovered = node.id)}
					onmouseleave={() => (hovered = null)}
					onfocus={() => (hovered = node.id)}
					onblur={() => (hovered = null)}
					onclick={(event) => {
						event.preventDefault();
						goto(`/card/${node.id}`);
					}}
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
			{#each neighbourNodes as node (node.id)}
				<text
					x={node.x + (node.x > GRAPH_W * 0.85 ? -9 : 9)}
					y={node.y + 3.5}
					text-anchor={node.x > GRAPH_W * 0.85 ? 'end' : 'start'}
					class="neighbour-label"
					pointer-events="none"
				>
					{node.name.toUpperCase()}
				</text>
			{/each}
		</svg>
		{#if hoveredNode}
			<div
				class="tooltip"
				class:flip-x={tipFlipX}
				class:flip-y={tipFlipY}
				style:left="{tipLeft}%"
				style:top="{tipTop}%"
			>
				<span class="tooltip-name">{hoveredNode.name}</span>
				<span class="tooltip-insight">{hoveredNode.insight}</span>
			</div>
		{/if}
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

	.neighbour-label {
		font-family: var(--font-body);
		font-size: 9px;
		font-weight: 700;
		letter-spacing: 0.08em;
		fill: #efece5;
		paint-order: stroke;
		stroke: #0b0b0b;
		stroke-width: 3px;
		stroke-linejoin: round;
	}

	.tooltip {
		position: absolute;
		z-index: 10;
		pointer-events: none;
		display: flex;
		flex-direction: column;
		gap: 4px;
		width: 240px;
		padding: 8px 10px;
		background: #efece5;
		color: #0b0b0b;
		transform: translate(14px, -100%) translateY(-12px);
	}

	.tooltip.flip-x {
		transform: translate(calc(-100% - 14px), -100%) translateY(-12px);
	}

	.tooltip.flip-y {
		transform: translate(14px, 12px);
	}

	.tooltip.flip-x.flip-y {
		transform: translate(calc(-100% - 14px), 12px);
	}

	.tooltip-name {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.tooltip-insight {
		font-size: 11px;
		line-height: 1.4;
		color: #3a3733;
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
