<script lang="ts">
	import type { PageData } from './$types';
	import CardPlaceholder from '$lib/components/CardPlaceholder.svelte';

	export let data: PageData;

	const { card, connectedCards } = data;
</script>

<svelte:head>
	<title>{card.name} | Arcana of Code</title>
</svelte:head>

<div class="container">
	<nav class="breadcrumb">
		<a href="/catalog">← Back to Catalog</a>
	</nav>

	<article class="card-detail">
		<div class="card-header">
			<div class="card-display">
				<CardPlaceholder {card} />
			</div>
			<div class="card-meta">
				<h1>{card.name}</h1>
				<div class="keywords">
					{#each card.keywords as keyword}
						<span class="keyword">{keyword}</span>
					{/each}
				</div>
				<p class="insight">{card.codingInsight}</p>
			</div>
		</div>

		<div class="essay">
			{#each (card.essay ?? '').split('\n\n') as paragraph}
				<p>{paragraph}</p>
			{/each}
		</div>

		{#if connectedCards.length > 0}
			<div class="connections">
				<h2>Related Cards</h2>
				<div class="connected-grid">
					{#each connectedCards as connectedCard}
						<a href="/card/{connectedCard.id}" class="connected-card">
							<CardPlaceholder card={connectedCard} />
							<div class="connected-name">{connectedCard.name}</div>
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</article>
</div>

<style>
	.breadcrumb {
		margin-bottom: var(--space-md);
	}

	.breadcrumb a {
		color: var(--text-secondary);
		text-decoration: none;
	}

	.breadcrumb a:hover {
		color: var(--text-primary);
		text-decoration: underline;
	}

	.card-header {
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: var(--space-lg);
		margin-bottom: var(--space-lg);
		padding-bottom: var(--space-lg);
		border-bottom: 2px solid var(--border);
	}

	.card-display {
		position: sticky;
		top: var(--space-md);
		align-self: start;
	}

	.card-meta h1 {
		font-size: var(--text-2xl);
		margin-bottom: var(--space-sm);
	}

	.keywords {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		margin-bottom: var(--space-md);
	}

	.keyword {
		font-size: 0.85rem;
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--border);
		text-transform: lowercase;
		letter-spacing: 0.025em;
	}

	.insight {
		font-size: var(--text-lg);
		font-weight: 600;
		line-height: 1.4;
		margin-top: var(--space-md);
	}

	.essay {
		max-width: 650px;
		margin: var(--space-lg) 0;
	}

	.essay p {
		margin-bottom: var(--space-md);
	}

	.connections {
		margin-top: var(--space-lg);
		padding-top: var(--space-lg);
		border-top: 2px solid var(--border);
	}

	.connections h2 {
		font-size: var(--text-lg);
		margin-bottom: var(--space-md);
	}

	.connected-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: var(--space-md);
	}

	.connected-card {
		display: block;
		text-decoration: none;
		transition: transform 0.1s ease;
	}

	.connected-card:hover {
		transform: translateY(-4px);
	}

	.connected-name {
		margin-top: var(--space-xs);
		font-size: 0.85rem;
		text-align: center;
		color: var(--text-secondary);
	}

	@media (max-width: 768px) {
		.card-header {
			grid-template-columns: 1fr;
			gap: var(--space-md);
		}

		.card-display {
			max-width: 300px;
			margin: 0 auto;
			position: relative;
			top: 0;
		}
	}
</style>
