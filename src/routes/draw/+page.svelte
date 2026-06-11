<script lang="ts">
	import type { PageData } from './$types';
	import type { Card } from '$lib/types/card';
	import CardPlaceholder from '$lib/components/CardPlaceholder.svelte';

	export let data: PageData;

	let drawnCard: Card | null = null;
	let isDrawing = false;

	function drawCard() {
		isDrawing = true;

		// Brief animation delay
		setTimeout(() => {
			const randomIndex = Math.floor(Math.random() * data.allCards.length);
			drawnCard = data.allCards[randomIndex];
			isDrawing = false;
		}, 300);
	}

	function reset() {
		drawnCard = null;
	}
</script>

<svelte:head>
	<title>Draw a Card | Arcana of Code</title>
</svelte:head>

<div class="container">
	<div class="draw-intro">
		<h1>Draw a Card</h1>
		<p>
			Get a random perspective on your current work. Not fortune-telling, just a prompt for
			reflection—a different lens through which to view whatever problem you're wrestling with.
		</p>
	</div>

	<div class="draw-area" aria-live="polite" aria-atomic="true">
		{#if !drawnCard}
			<button on:click={drawCard} disabled={isDrawing} class="draw-button">
				{isDrawing ? 'Drawing...' : 'Draw a Card'}
			</button>
		{:else}
			<div class="drawn-card">
				<div class="card-display">
					<CardPlaceholder card={drawnCard} />
				</div>
				<div class="card-content">
					<h2>{drawnCard.name}</h2>
					<p class="insight">{drawnCard.codingInsight}</p>

					{#if drawnCard.essay}
						<div class="essay">
							{#each drawnCard.essay.split('\n\n') as paragraph}
								<p>{paragraph}</p>
							{/each}
						</div>
					{/if}

					<div class="actions">
						<a href="/card/{drawnCard.id}" class="action-link"> View Full Card → </a>
						<button on:click={reset} class="reset-button"> Draw Again </button>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.draw-intro {
		text-align: center;
		max-width: 650px;
		margin: 0 auto var(--space-lg);
		padding-bottom: var(--space-lg);
		border-bottom: 2px solid var(--border);
	}

	.draw-intro h1 {
		margin-bottom: var(--space-sm);
	}

	.draw-intro p {
		color: var(--text-secondary);
	}

	.draw-area {
		min-height: 400px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.draw-button {
		font-size: var(--text-lg);
		padding: var(--space-md) var(--space-lg);
		border: 3px solid var(--border);
	}

	.drawn-card {
		width: 100%;
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: var(--space-lg);
		align-items: start;
	}

	.card-display {
		position: sticky;
		top: var(--space-md);
	}

	.card-content h2 {
		font-size: var(--text-2xl);
		margin-bottom: var(--space-sm);
	}

	.insight {
		font-size: var(--text-lg);
		font-weight: 600;
		margin-bottom: var(--space-md);
		padding-bottom: var(--space-md);
		border-bottom: 1px solid var(--border);
	}

	.essay {
		margin: var(--space-md) 0;
		max-width: 650px;
	}

	.essay p {
		margin-bottom: var(--space-md);
	}

	.actions {
		margin-top: var(--space-lg);
		display: flex;
		gap: var(--space-md);
		align-items: center;
	}

	.action-link {
		text-decoration: none;
		padding: var(--space-xs) var(--space-sm);
		border: 2px solid var(--border);
	}

	.action-link:hover {
		background: var(--text-primary);
		color: var(--bg-primary);
	}

	.reset-button {
		background: var(--bg-secondary);
	}

	@media (max-width: 768px) {
		.drawn-card {
			grid-template-columns: 1fr;
		}

		.card-display {
			max-width: 300px;
			margin: 0 auto;
			position: relative;
			top: 0;
		}
	}
</style>
