<script lang="ts">
	import type { PageData } from './$types';
	import type { Card } from '$lib/types/card';
	import CardFace from '$lib/components/CardFace.svelte';
	import { cardShortMeta, isCourt, isMajor } from '$lib/arcana';

	let { data }: { data: PageData } = $props();

	type Filter = 'all' | 'major' | 'cups' | 'wands' | 'swords' | 'pentacles' | 'court';

	const filters: Array<[Filter, string]> = [
		['all', 'All'],
		['major', 'Majors'],
		['cups', 'Cups'],
		['wands', 'Wands'],
		['swords', 'Swords'],
		['pentacles', 'Pentacles'],
		['court', 'Courts']
	];

	let filter: Filter = $state('all');

	const applyFilter = (cards: Card[], f: Filter): Card[] => {
		if (f === 'all') return cards;
		if (f === 'major') return cards.filter(isMajor);
		if (f === 'court') return cards.filter(isCourt);
		return cards.filter((c) => c.suit === f);
	};

	const visible = $derived(applyFilter(data.cards, filter));
</script>

<svelte:head>
	<title>The Deck | Arcana of Code</title>
</svelte:head>

<div class="page catalog">
	<div class="head">
		<h1 class="display title">The Deck</h1>
		<div class="label count" aria-live="polite">{visible.length} of {data.cards.length} cards</div>
	</div>

	<div class="filters" role="group" aria-label="Filter the deck">
		{#each filters as [id, label]}
			<button
				type="button"
				class="filter"
				class:active={filter === id}
				aria-pressed={filter === id}
				onclick={() => (filter = id)}
			>
				{label}
			</button>
		{/each}
	</div>

	<div class="grid">
		{#each visible as card (card.id)}
			<a href="/card/{card.id}" class="card-button cell">
				<CardFace {card} />
				<span class="card-caption name">{card.name}</span>
				<span class="meta">{cardShortMeta(card)}</span>
				<span class="cell-insight">{card.codingInsight}</span>
			</a>
		{/each}
	</div>
</div>

<style>
	.catalog {
		gap: 30px;
		padding-top: 44px;
	}

	.head {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 30px;
		flex-wrap: wrap;
		row-gap: 16px;
	}

	.title {
		font-size: 62px;
		line-height: 0.94;
		letter-spacing: -0.045em;
		white-space: nowrap;
	}

	.count {
		letter-spacing: 0.24em;
	}

	.filters {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
		border-top: 1px solid var(--ink);
		border-bottom: 1px solid var(--ink);
		padding: 12px 0;
	}

	.filter {
		font-family: inherit;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		padding: 5px 11px;
		cursor: pointer;
		border: 1px solid var(--ink);
		background: transparent;
		color: var(--ink);
	}

	.filter:hover,
	.filter.active {
		background: var(--ink);
		color: var(--paper);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(9, 1fr);
		gap: 16px;
	}

	.cell {
		display: flex;
		flex-direction: column;
		gap: 7px;
	}

	.name {
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		line-height: 1.2;
	}

	.meta {
		font-size: 9px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--text-faint);
	}

	.cell-insight {
		font-size: 11px;
		line-height: 1.35;
		color: var(--text-muted);
	}

	@media (max-width: 1200px) {
		.grid {
			grid-template-columns: repeat(6, 1fr);
		}
	}

	@media (max-width: 760px) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}

		.title {
			font-size: 48px;
		}
	}
</style>
