<script lang="ts">
	import type { PageData } from './$types';
	import type { Card, Spread } from '$lib/types/card';
	import CardPlaceholder from '$lib/components/CardPlaceholder.svelte';

	export let data: PageData;

	let selectedSpread: Spread | null = null;
	let drawnCards: Card[] = [];
	let isDrawing = false;

	function selectSpread(spread: Spread) {
		selectedSpread = spread;
		drawnCards = [];
	}

	function drawSpread() {
		if (!selectedSpread) return;
		isDrawing = true;
		setTimeout(() => {
			const pool = [...data.allCards];
			drawnCards = selectedSpread!.positions.map(
				() => pool.splice(Math.floor(Math.random() * pool.length), 1)[0]
			);
			isDrawing = false;
		}, 300);
	}

	function reset() {
		selectedSpread = null;
		drawnCards = [];
	}
</script>

<svelte:head>
	<title>Spreads | Arcana of Code</title>
</svelte:head>

<div class="container">
	<div class="spread-intro">
		<h1>Draw a Spread</h1>
		<p>
			Three cards, three positions, one specific problem. Not fortune-telling—structured prompts for
			reflection on whatever is actually in front of you.
		</p>
	</div>

	{#if !selectedSpread}
		<div class="spread-picker">
			{#each data.spreads as spread}
				<button class="spread-option" on:click={() => selectSpread(spread)}>
					<h2>{spread.name}</h2>
					<p>{spread.description}</p>
					<div class="position-names">
						{#each spread.positions as position}
							<span class="position-label">{position.name}</span>
						{/each}
					</div>
				</button>
			{/each}
		</div>
	{:else}
		<div class="spread-header">
			<h2>{selectedSpread.name}</h2>
			<button class="back-button" on:click={reset}>← Choose another spread</button>
		</div>

		{#if drawnCards.length === 0}
			<div class="draw-area">
				<button on:click={drawSpread} disabled={isDrawing} class="draw-button">
					{isDrawing ? 'Drawing...' : 'Draw the Spread'}
				</button>
			</div>
		{:else}
			<div class="spread-result" aria-live="polite" aria-atomic="true">
				<div class="card-grid">
					{#each selectedSpread.positions as position, i}
						<div class="spread-slot">
							<span class="position-name">{position.name}</span>
							<a href="/card/{drawnCards[i].id}" class="card-link">
								<CardPlaceholder card={drawnCards[i]} />
							</a>
							<p class="position-interpretation">{position.interpretation}</p>
							<p class="position-insight">{drawnCards[i].codingInsight}</p>
						</div>
					{/each}
				</div>
				<div class="spread-actions">
					<button on:click={drawSpread} class="draw-button">Draw Again</button>
					<button on:click={reset} class="reset-button">Choose another spread</button>
				</div>
			</div>
		{/if}
	{/if}
</div>

<style>
	.spread-intro {
		text-align: center;
		max-width: 650px;
		margin: 0 auto var(--space-lg);
		padding-bottom: var(--space-lg);
		border-bottom: 2px solid var(--border);
	}

	.spread-intro h1 {
		margin-bottom: var(--space-sm);
	}

	.spread-intro p {
		color: var(--text-secondary);
	}

	.spread-picker {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-md);
	}

	.spread-option {
		text-align: left;
		padding: var(--space-md);
		border: 2px solid var(--border);
		background: var(--bg-primary);
		cursor: pointer;
		transition: transform 0.1s ease;
	}

	.spread-option:hover {
		transform: translateY(-4px);
		background: var(--text-primary);
		color: var(--bg-primary);
	}

	.spread-option h2 {
		font-size: var(--text-lg);
		margin-bottom: var(--space-xs);
	}

	.spread-option p {
		font-size: 0.9rem;
		margin-bottom: var(--space-sm);
		color: var(--text-secondary);
	}

	.spread-option:hover p {
		color: var(--bg-secondary);
	}

	.position-names {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.position-label {
		font-size: 0.8rem;
		opacity: 0.7;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.spread-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: var(--space-lg);
		padding-bottom: var(--space-md);
		border-bottom: 2px solid var(--border);
	}

	.spread-header h2 {
		font-size: var(--text-xl);
		margin: 0;
	}

	.back-button {
		font-size: 0.9rem;
		border: none;
		background: none;
		padding: 0;
		cursor: pointer;
		color: var(--text-secondary);
		text-decoration: underline;
		text-decoration-thickness: 1px;
	}

	.back-button:hover {
		background: none;
		color: var(--text-primary);
		text-decoration-thickness: 2px;
	}

	.draw-area {
		min-height: 300px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.draw-button {
		font-size: var(--text-lg);
		padding: var(--space-md) var(--space-lg);
		border: 3px solid var(--border);
	}

	.spread-slot {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.position-name {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-secondary);
		font-weight: 600;
	}

	.card-link {
		display: block;
		text-decoration: none;
		transition: transform 0.1s ease;
	}

	.card-link:hover {
		transform: translateY(-4px);
	}

	.position-interpretation {
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.5;
		margin-top: var(--space-xs);
	}

	.position-insight {
		font-size: 0.9rem;
		font-weight: 600;
		margin: 0;
	}

	.spread-actions {
		margin-top: var(--space-lg);
		display: flex;
		gap: var(--space-md);
		align-items: center;
		padding-top: var(--space-md);
		border-top: 1px solid var(--border);
	}

	.reset-button {
		background: var(--bg-secondary);
	}

	@media (max-width: 768px) {
		.spread-header {
			flex-direction: column;
			gap: var(--space-sm);
		}

		.spread-actions {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
