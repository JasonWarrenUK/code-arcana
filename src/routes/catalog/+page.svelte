<script lang="ts">
	import type { PageData } from './$types';
	import CardPlaceholder from '$lib/components/CardPlaceholder.svelte';

	export let data: PageData;
</script>

<div class="container">
	<h1>Card Catalog</h1>
	<p class="intro">
		All 78 cards, organised by arcana and suit. Click any card to see its full insight.
	</p>

	{#if data.majorArcana.length > 0}
		<section class="arcana-section">
			<h2>Major Arcana</h2>
			<p class="section-note">The big philosophical questions.</p>
			<div class="card-grid">
				{#each data.majorArcana as card}
					<a href="/card/{card.id}" class="card-link">
						<CardPlaceholder {card} />
					</a>
				{/each}
			</div>
		</section>
	{/if}

	<section class="arcana-section">
		<h2>Minor Arcana</h2>
		<p class="section-note">
			Daily practices, specific techniques, the actual work of writing code.
		</p>

		{#each Object.entries(data.suits) as [suitName, suitCards]}
			{#if suitCards.length > 0}
				<div class="suit-section">
					<h3>{suitName.charAt(0).toUpperCase() + suitName.slice(1)}</h3>
					<div class="card-grid">
						{#each suitCards as card}
							<a href="/card/{card.id}" class="card-link">
								<CardPlaceholder {card} />
								<div class="card-insight">
									{card.codingInsight}
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	</section>
</div>

<style>
	.intro {
		color: var(--text-secondary);
		margin-bottom: var(--space-lg);
	}

	.arcana-section {
		margin-bottom: var(--space-lg);
		padding-bottom: var(--space-lg);
		border-bottom: 2px solid var(--border);
	}

	.arcana-section:last-child {
		border-bottom: none;
	}

	.arcana-section h2 {
		margin-bottom: var(--space-xs);
	}

	.section-note {
		color: var(--text-secondary);
		font-size: 0.9rem;
		margin-bottom: var(--space-md);
	}

	.suit-section {
		margin-top: var(--space-lg);
	}

	.suit-section h3 {
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: var(--text-base);
		margin-bottom: var(--space-sm);
	}

	.card-link {
		display: block;
		text-decoration: none;
		transition: transform 0.1s ease;
	}

	.card-link:hover {
		transform: translateY(-4px);
	}

	.card-insight {
		margin-top: var(--space-xs);
		font-size: 0.9rem;
		color: var(--text-secondary);
		text-align: center;
	}
</style>
