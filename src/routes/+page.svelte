<script lang="ts">
	import type { PageData } from './$types';
	import CardFace from '$lib/components/CardFace.svelte';
	import { cardMeta, cardOfTheDay } from '$lib/arcana';

	export let data: PageData;

	$: daily = cardOfTheDay(data.cards);
	$: excerpt = (daily.essay ?? '').split('\n\n')[0];

	const entries = [
		{ href: '/catalog', number: '01', title: 'The Deck' },
		{ href: '/spread', number: '02', title: 'Spreads' },
		{ href: '/graph', number: '03', title: 'Constellation' }
	];
</script>

<svelte:head>
	<title>Arcana of Code</title>
	<meta name="description" content="A tarot deck about writing software." />
</svelte:head>

<div class="page home">
	<div class="hero grid-12">
		<h1 class="display hero-title">A tarot deck about writing software</h1>
		<div class="hero-cta">
			<a href="/draw" class="btn btn-primary btn-large">Draw a card</a>
		</div>
	</div>

	<div class="rule-heavy"></div>

	<section class="daily grid-12" aria-labelledby="daily-heading">
		<div class="daily-face">
			<div class="label" id="daily-heading">Card of the day</div>
			<a href="/card/{daily.id}" aria-label="Read {daily.name}">
				<CardFace card={daily} index />
			</a>
		</div>
		<div class="daily-copy">
			<div class="label">{cardMeta(daily)}</div>
			<h2 class="display daily-name">{daily.name}</h2>
			<div class="rule-hair"></div>
			<p class="insight">{daily.codingInsight}</p>
			<p class="body">{excerpt}</p>
			<a href="/card/{daily.id}" class="btn btn-secondary">Read the card</a>
		</div>
	</section>

	<nav class="entries" aria-label="Sections">
		{#each entries as entry}
			<a href={entry.href} class="entry">
				<span class="entry-number">{entry.number}</span>
				<span class="entry-title">{entry.title}</span>
			</a>
		{/each}
	</nav>
</div>

<style>
	.home {
		gap: 60px;
		padding-top: 52px;
	}

	.hero {
		align-items: end;
	}

	.hero-title {
		grid-column: 1 / 9;
		font-size: clamp(48px, 7vw, 108px);
		line-height: 0.82;
		letter-spacing: -0.055em;
		font-stretch: 72%;
	}

	.hero-cta {
		grid-column: 10 / 13;
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.hero-cta .btn {
		align-self: flex-start;
	}

	.daily {
		align-items: start;
	}

	.daily-face {
		grid-column: 1 / 4;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.daily-copy {
		grid-column: 5 / 13;
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.daily-name {
		font-size: clamp(36px, 4vw, 56px);
		line-height: 0.88;
		font-stretch: 76%;
		letter-spacing: -0.04em;
	}

	.daily-copy .label {
		letter-spacing: 0.28em;
	}

	.daily-copy .insight {
		font-size: 21px;
	}

	.daily-copy .btn {
		align-self: flex-start;
	}

	.entries {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--grid-gap);
	}

	.entry {
		text-align: left;
		background: transparent;
		border: 2px solid var(--ink);
		padding: 22px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		color: var(--ink);
		text-decoration: none;
		transition:
			background 0.1s ease,
			color 0.1s ease;
	}

	.entry:hover {
		background: var(--ink);
		color: var(--paper);
		text-decoration: none;
	}

	.entry-number {
		font-size: 10px;
		letter-spacing: 0.28em;
		text-transform: uppercase;
		opacity: 0.6;
	}

	.entry-title {
		font-size: 30px;
		font-weight: 700;
		text-transform: uppercase;
		font-stretch: 80%;
		letter-spacing: -0.03em;
		line-height: 0.94;
	}

	@media (max-width: 900px) {
		.hero-title,
		.hero-cta,
		.daily-face,
		.daily-copy {
			grid-column: 1 / -1;
		}

		.daily-face {
			max-width: 280px;
		}

		.entries {
			grid-template-columns: 1fr;
		}
	}
</style>
