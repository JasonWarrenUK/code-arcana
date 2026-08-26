<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { Card } from '$lib/types/card';
	import CardFace from '$lib/components/CardFace.svelte';
	import { cardMeta } from '$lib/arcana';

	let { data }: { data: PageData } = $props();

	let drawn = $state<Card | null>(null);
	let revealed = $state(false);
	let drawKey = $state(0);

	const randomCard = (): Card => data.allCards[Math.floor(Math.random() * data.allCards.length)];

	onMount(() => {
		drawn = randomCard();
	});

	function act() {
		if (!drawn) drawn = randomCard();
		if (revealed) {
			drawn = randomCard();
			revealed = false;
		} else {
			revealed = true;
		}
		drawKey += 1;
	}

	const paragraphs = $derived(drawn ? (drawn.essay ?? '').split('\n\n') : []);
</script>

<svelte:head>
	<title>Draw a Card | Arcana of Code</title>
</svelte:head>

<div class="page draw grid-12">
	<div class="table">
		<button
			type="button"
			class="card-button face"
			onclick={act}
			aria-label={revealed ? 'Draw again' : 'Turn the card'}
		>
			{#if revealed && drawn}
				{#key drawKey}
					<CardFace card={drawn} index animate />
				{/key}
			{:else}
				<svg viewBox="0 0 200 300" class="back" aria-hidden="true">
					<rect width="200" height="300" fill="#0b0b0b" />
					<rect
						x="14"
						y="14"
						width="172"
						height="272"
						fill="none"
						stroke="#3a3733"
						stroke-width="1"
					/>
					<rect
						x="22"
						y="22"
						width="156"
						height="256"
						fill="none"
						stroke="#26241f"
						stroke-width="1"
					/>
				</svg>
			{/if}
		</button>
		<button type="button" class="btn btn-primary btn-large" onclick={act}>
			{revealed ? 'Draw again' : 'Turn the card'}
		</button>
	</div>

	<div class="reading" aria-live="polite" aria-atomic="true">
		{#if revealed && drawn}
			<div class="label">{cardMeta(drawn)}</div>
			<h1 class="display name">{drawn.name}</h1>
			<div class="rule-heavy"></div>
			<p class="insight">{drawn.codingInsight}</p>
			<div class="essay">
				{#each paragraphs as text}
					<p class="body excerpt">{text}</p>
				{/each}
			</div>
			<a href="/card/{drawn.id}" class="btn btn-secondary">Read the card</a>
		{:else}
			<div class="prompt">
				<div class="label">One card</div>
				<h1 class="display prompt-title">Turn one over</h1>
			</div>
		{/if}
	</div>
</div>

<style>
	.draw {
		padding-top: 60px;
		align-items: start;
		min-height: 620px;
	}

	.table {
		grid-column: 1 / 5;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.face {
		width: 100%;
		max-width: 340px;
		display: block;
	}

	.back {
		display: block;
		width: 100%;
		height: auto;
	}

	.table .btn {
		align-self: flex-start;
	}

	.reading {
		grid-column: 6 / 13;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.prompt {
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 52ch;
	}

	.prompt-title {
		font-size: clamp(44px, 5vw, 62px);
		line-height: 0.86;
		letter-spacing: -0.045em;
	}

	.name {
		font-size: clamp(44px, 5.5vw, 72px);
	}

	.reading .insight {
		padding: 10px 13px 12px;
	}

	.essay {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.excerpt {
		font-size: 16.5px;
		line-height: 1.62;
		max-width: 64ch;
	}

	.reading .btn {
		align-self: flex-start;
	}

	@media (max-width: 900px) {
		.table,
		.reading {
			grid-column: 1 / -1;
		}

		.draw {
			min-height: 0;
		}
	}
</style>
