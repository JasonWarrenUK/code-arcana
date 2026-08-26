<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { Card } from '$lib/types/card';
	import CardFace from '$lib/components/CardFace.svelte';
	import { pickCardIds } from '$lib/arcana';

	let { data }: { data: PageData } = $props();

	const byId = $derived(new Map(data.allCards.map((c) => [c.id, c])));

	let spreadId: string | null = $state(null);
	let ids: string[] = $state([]);

	const reshuffle = () => {
		ids = pickCardIds(data.allCards, 5);
	};

	onMount(reshuffle);

	const spread = $derived(data.spreads.find((s) => s.id === spreadId) ?? data.spreads[0]);
	const slots = $derived(
		ids.length ? spread.slots.map((slot, i) => ({ slot, card: byId.get(ids[i]) as Card })) : []
	);
</script>

<svelte:head>
	<title>Spreads | Arcana of Code</title>
</svelte:head>

<div class="page spread">
	<div class="head">
		<h1 class="display title">{spread.title}</h1>
		<div class="controls">
			{#each data.spreads as s}
				<button
					type="button"
					class="chip"
					class:active={spreadId === s.id}
					aria-pressed={spreadId === s.id}
					onclick={() => (spreadId = s.id)}
				>
					{s.title}
				</button>
			{/each}
			<button type="button" class="chip reshuffle" onclick={reshuffle}>Reshuffle</button>
		</div>
	</div>

	<p class="body blurb">{spread.blurb}</p>

	<div class="table" aria-live="polite">
		{#each slots as { slot, card } (`${slot.position}-${card.id}`)}
			<div class="slot" style:left="{slot.x}%" style:top="{slot.y}%" style:width="{slot.w}px">
				<a href="/card/{card.id}" class="card" style:transform="rotate({slot.rot}deg)">
					<CardFace {card} />
				</a>
				<div class="caption" class:caption-right={slot.labelAt === 'right'}>
					<span class="position">{slot.position}</span>
					<span class="name">{card.name}</span>
				</div>
			</div>
		{/each}
	</div>

	{#if slots.length}
		<section class="reading" aria-label="The reading">
			<div class="reading-head"><span>The reading</span></div>
			<ol class="list">
				{#each slots as { slot, card } (`${slot.position}-${card.id}`)}
					<li class="reading-row">
						<div class="reading-position">
							<span class="position">{slot.position}</span>
							{#if slot.interpretation}
								<p class="interpretation">{slot.interpretation}</p>
							{/if}
						</div>
						<a href="/card/{card.id}" class="card-button reading-card">
							<CardFace {card} />
							<span class="reading-copy">
								<span class="card-caption list-name">{card.name}</span>
								<span class="list-insight">{card.codingInsight}</span>
							</span>
						</a>
					</li>
				{/each}
			</ol>
		</section>
	{/if}
</div>

<style>
	.spread {
		gap: 34px;
		padding-top: 44px;
	}

	.head {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 24px;
		flex-wrap: wrap;
		row-gap: 16px;
	}

	.title {
		font-size: 50px;
		line-height: 1;
		letter-spacing: -0.04em;
		white-space: nowrap;
	}

	.controls {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
	}

	.reshuffle {
		background: var(--ink);
		color: var(--paper);
	}

	.reshuffle:hover {
		background: var(--paper);
		color: var(--ink);
	}

	.blurb {
		margin-top: -14px;
		max-width: 62ch;
		color: var(--text-muted);
		font-size: 14px;
	}

	.table {
		position: relative;
		width: 100%;
		height: 780px;
		border: 1px solid var(--rule-ghost);
	}

	.slot {
		position: absolute;
		transform: translate(-50%, -50%);
	}

	.card {
		display: block;
		transform-origin: center;
	}

	.caption {
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		z-index: 5;
		display: flex;
		flex-direction: column;
		gap: 3px;
		margin-top: 7px;
		padding: 5px 7px;
		background: var(--paper);
	}

	.caption-right {
		top: 50%;
		left: 100%;
		width: 150px;
		margin-top: 0;
		margin-left: 84px;
		transform: translateY(-50%);
	}

	.position {
		font-size: 9px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--text-faint);
	}

	.name {
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		font-stretch: 86%;
		line-height: 1.15;
	}

	.reading {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.reading-head {
		border-bottom: 3px solid var(--ink);
		padding-bottom: 8px;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.26em;
		text-transform: uppercase;
	}

	.list {
		list-style: none;
		display: flex;
		flex-direction: column;
	}

	.reading-row {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		gap: 34px;
		border-bottom: 1px solid var(--rule-ghost);
		padding: 18px 0;
	}

	.reading-position {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.reading-position .position {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.24em;
		color: var(--ink);
	}

	.interpretation {
		margin: 0;
		font-size: 14px;
		line-height: 1.55;
		color: var(--text-muted);
		max-width: 52ch;
		text-wrap: pretty;
	}

	.reading-card {
		display: grid;
		grid-template-columns: 70px 1fr;
		gap: 12px;
		align-items: start;
	}

	.reading-copy {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.list-name {
		font-size: 14px;
		font-weight: 700;
		text-transform: uppercase;
		font-stretch: 86%;
		line-height: 1.1;
	}

	.list-insight {
		font-size: 12px;
		line-height: 1.4;
		color: var(--text-muted);
	}

	@media (max-width: 900px) {
		.table {
			display: none;
		}

		.reading-row {
			grid-template-columns: 1fr;
			gap: 12px;
		}

		.title {
			font-size: 40px;
			white-space: normal;
		}
	}
</style>
