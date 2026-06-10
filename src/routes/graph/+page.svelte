<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let activeId: string | null = null;

	function activate(id: string) {
		activeId = id;
	}

	function deactivate() {
		activeId = null;
	}
</script>

<svelte:head>
	<title>Connections | Arcana of Code</title>
</svelte:head>

<div class="container">
	<div class="graph-intro">
		<h1>Connections</h1>
		<p>
			Every card points at others. Hover to trace a line of thought; click to follow it. 250 edges
			across 78 cards—none of them obvious until you see them.
		</p>
	</div>

	<div class="graph-wrapper">
		<svg
			viewBox={data.layout.viewBox}
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Connection graph of all 78 cards"
			class="graph-svg"
		>
			<title>Arcana of Code — Card Connections</title>

			{#each data.layout.edges as edge}
				<path
					d={edge.path}
					class="edge"
					class:edge-active={activeId !== null && (edge.a === activeId || edge.b === activeId)}
					class:edge-dim={activeId !== null && edge.a !== activeId && edge.b !== activeId}
				/>
			{/each}

			{#each data.layout.nodes as node}
				<a
					href="/card/{node.id}"
					aria-label={node.name}
					on:mouseenter={() => activate(node.id)}
					on:mouseleave={deactivate}
					on:focus={() => activate(node.id)}
					on:blur={deactivate}
				>
					<circle
						cx={node.x}
						cy={node.y}
						r={node.group === 'major' ? 8 : 6}
						class="node"
						class:node-major={node.group === 'major'}
						class:node-active={activeId === node.id}
					>
						<title>{node.name}</title>
					</circle>
				</a>
				{#if activeId === node.id}
					<text
						x={node.x}
						y={node.y - 14}
						class="node-label"
						text-anchor="middle"
						pointer-events="none"
					>
						{node.name}
					</text>
				{/if}
			{/each}
		</svg>
	</div>

	<p class="graph-legend">
		Major arcana nodes are slightly larger. Groups: Major · Wands · Cups · Swords · Pentacles
		(clockwise from top).
	</p>
</div>

<style>
	.graph-intro {
		max-width: 650px;
		margin: 0 auto var(--space-lg);
		padding-bottom: var(--space-lg);
		border-bottom: 2px solid var(--border);
		text-align: center;
	}

	.graph-intro h1 {
		margin-bottom: var(--space-sm);
	}

	.graph-intro p {
		color: var(--text-secondary);
	}

	.graph-wrapper {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
		border: 2px solid var(--border);
	}

	.graph-svg {
		width: 100%;
		height: auto;
		display: block;
		background: var(--bg-primary);
	}

	.edge {
		fill: none;
		stroke: var(--text-primary);
		stroke-width: 1;
		opacity: 0.15;
		transition: opacity 0.1s ease;
	}

	.edge-active {
		opacity: 0.9;
		stroke-width: 1.5;
	}

	.edge-dim {
		opacity: 0.03;
	}

	.node {
		fill: var(--bg-primary);
		stroke: var(--text-primary);
		stroke-width: 1.5;
		cursor: pointer;
		transition: fill 0.1s ease;
	}

	.node-major {
		stroke-width: 2;
	}

	.node-active {
		fill: var(--text-primary);
	}

	.node-label {
		font-family: var(--font-body, 'Inter', sans-serif);
		font-size: 11px;
		fill: var(--text-primary);
		font-weight: 600;
	}

	.graph-legend {
		max-width: 800px;
		margin: var(--space-sm) auto 0;
		font-size: 0.8rem;
		color: var(--text-secondary);
		text-align: center;
	}

	a {
		text-decoration: none;
	}
</style>
