<script lang="ts">
	import type { PageData } from './$types';
	import CardFace from '$lib/components/CardFace.svelte';
	import { cardArt, cardCategory, cardIndex, cardMeta, isMajor } from '$lib/arcana';

	let { data }: { data: PageData } = $props();

	const card = $derived(data.card);
	const paragraphs = $derived((card.essay ?? '').split('\n\n'));
	const faceLabel = $derived(isMajor(card) ? card.name : cardCategory(card));
</script>

<svelte:head>
	<title>{card.name} | Arcana of Code</title>
	<meta name="description" content={card.codingInsight} />
</svelte:head>

<article class="page detail">
	<div class="grid-12 top">
		<div class="face-col">
			<CardFace {card} index />
			<div class="face-strip">
				<span>{faceLabel}</span><span>{cardIndex(card)}</span>
			</div>
			<div class="note">{cardArt(card).note}</div>
		</div>

		<div class="copy-col">
			<header class="heading">
				<div class="label">{cardMeta(card)}</div>
				<h1 class="display name">{card.name}</h1>
				<div class="rule-heavy"></div>
				<p class="insight">{card.codingInsight}</p>
			</header>

			<div class="essay">
				<ul class="keywords" aria-label="Keywords">
					{#each card.keywords as keyword}
						<li>{keyword}</li>
					{/each}
				</ul>
				<div class="paragraphs">
					{#each paragraphs as text}
						<p class="body">{text}</p>
					{/each}
				</div>
			</div>
		</div>
	</div>

	{#if data.related.length > 0}
		<section class="related" aria-labelledby="related-heading">
			<div class="related-head">
				<span id="related-heading">Related</span>
			</div>
			<div class="related-grid">
				{#each data.related as r (r.id)}
					<a href="/card/{r.id}" class="card-button related-card">
						<CardFace card={r} />
						<span class="related-copy">
							<span class="card-caption related-name">{r.name}</span>
							<span class="related-insight">{r.codingInsight}</span>
						</span>
					</a>
				{/each}
			</div>
		</section>
	{/if}
</article>

<style>
	.detail {
		gap: 52px;
		padding-top: 44px;
	}

	.top {
		align-items: start;
	}

	.face-col {
		grid-column: 1 / 4;
		display: flex;
		flex-direction: column;
	}

	.face-strip {
		background: var(--ink);
		color: var(--paper);
		display: flex;
		justify-content: space-between;
		gap: 14px;
		padding: 8px 10px;
		font-size: 9px;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.note {
		font-size: 11px;
		line-height: 1.5;
		color: var(--text-faint);
		padding-top: 12px;
	}

	.copy-col {
		grid-column: 5 / 13;
		display: flex;
		flex-direction: column;
		gap: 26px;
	}

	.heading {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.name {
		font-size: clamp(44px, 6vw, 84px);
		line-height: 0.84;
	}

	.heading .insight {
		font-size: 23px;
		padding: 10px 13px 12px;
	}

	.essay {
		display: grid;
		grid-template-columns: 150px 1fr;
		gap: 24px;
		align-items: start;
	}

	.keywords {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 7px;
	}

	.keywords li {
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.paragraphs {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.paragraphs .body {
		font-size: 16.5px;
		line-height: 1.62;
	}

	.related {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.related-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		border-bottom: 3px solid var(--ink);
		padding-bottom: 8px;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.26em;
		text-transform: uppercase;
	}

	.related-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--grid-gap);
	}

	.related-card {
		display: grid;
		grid-template-columns: 70px 1fr;
		gap: 12px;
		align-items: start;
	}

	.related-copy {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.related-name {
		font-size: 13px;
		font-weight: 700;
		text-transform: uppercase;
		font-stretch: 86%;
		line-height: 1.1;
	}

	.related-insight {
		font-size: 12px;
		line-height: 1.4;
		color: var(--text-muted);
	}

	@media (max-width: 900px) {
		.face-col,
		.copy-col {
			grid-column: 1 / -1;
		}

		.face-col {
			max-width: 280px;
		}

		.essay {
			grid-template-columns: 1fr;
		}

		.keywords {
			flex-direction: row;
			flex-wrap: wrap;
			gap: 12px;
		}

		.related-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
