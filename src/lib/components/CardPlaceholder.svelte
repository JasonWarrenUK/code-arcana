<script lang="ts">
	import type { Card } from '$lib/types/card';
	import { generateRidgePaths, ILLUSTRATION_X_START, ILLUSTRATION_X_END } from '$lib/illustration';

	export let card: Card;

	const ROMAN = [
		'0',
		'I',
		'II',
		'III',
		'IV',
		'V',
		'VI',
		'VII',
		'VIII',
		'IX',
		'X',
		'XI',
		'XII',
		'XIII',
		'XIV',
		'XV',
		'XVI',
		'XVII',
		'XVIII',
		'XIX',
		'XX',
		'XXI'
	];

	const getCardLabel = (card: Card): string => {
		if (card.arcana === 'major') {
			return ROMAN[card.number ?? 0] ?? '?';
		}
		if (card.courtRank) {
			return card.courtRank.toUpperCase();
		}
		return card.number?.toString() || '?';
	};

	$: ridges = generateRidgePaths(card);
</script>

<div class="card-face">
	<svg viewBox="0 0 200 300" role="img" aria-label={card.name}>
		<rect width="200" height="300" fill="#000000" />
		{#each ridges as ridge}
			<!-- silhouette first so nearer ridges occlude the ones behind -->
			<path d="{ridge}L{ILLUSTRATION_X_END} 300L{ILLUSTRATION_X_START} 300Z" fill="#000000" />
			<path
				d={ridge}
				fill="none"
				stroke="#ffffff"
				stroke-width="1.2"
				stroke-linejoin="round"
				stroke-linecap="round"
			/>
		{/each}
		<text class="card-label" x="100" y="46" text-anchor="middle">
			{getCardLabel(card)}
		</text>
		<text class="card-name" x="100" y="276" text-anchor="middle">
			{card.name}
		</text>
	</svg>
</div>

<style>
	.card-face {
		aspect-ratio: 2/3;
		background: #000000;
		border: 2px solid var(--border);
	}

	svg {
		display: block;
		width: 100%;
		height: 100%;
	}

	.card-label {
		font-family: var(--font-body);
		font-size: 15px;
		font-weight: 600;
		letter-spacing: 0.1em;
		fill: #ffffff;
	}

	.card-name {
		font-family: var(--font-body);
		font-size: 9.5px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		fill: #ffffff;
	}
</style>
