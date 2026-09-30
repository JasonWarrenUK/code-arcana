<script lang="ts">
	import type { Card } from '$lib/types/card';
	import { cardArt, cardIndex, indexY } from '$lib/arcana';
	import { SYMBOL_BOX } from '$lib/data/major-symbols';

	// Stroke width of the clearing around a symbol line, in face units
	const CLEARANCE = 8;
	const symbolId = $props.id();

	interface Props {
		card: Card;
		/** Print the rank numeral at the top of the face */
		index?: boolean;
		/** Draw the ridges in, base to crown, on mount */
		animate?: boolean;
	}

	let { card, index = false, animate = false }: Props = $props();

	const art = $derived(cardArt(card));
</script>

<svg viewBox="0 0 200 300" role="img" aria-label={card.name} class="face">
	<rect width="200" height="300" fill="#0b0b0b" />
	{#if art.framed}
		<rect x="14" y="14" width="172" height="272" fill="none" stroke="#3a3733" stroke-width="1" />
	{/if}
	{#if art.doubleFrame}
		<rect x="20" y="20" width="160" height="260" fill="none" stroke="#3a3733" stroke-width="1" />
	{/if}
	{#if art.symbol}
		<!-- ridges are masked out of the symbol: closed shapes lose their interior, every line gets a margin -->
		<mask id="clear-{symbolId}" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="300">
			<rect width="200" height="300" fill="white" />
			<g
				transform="translate({SYMBOL_BOX.x} {SYMBOL_BOX.y})"
				stroke="black"
				stroke-width={CLEARANCE}
				stroke-linejoin="round"
				stroke-linecap="round"
			>
				{#each art.symbol.paths as path (path.d)}
					<path d={path.d} fill={/z\s*$/i.test(path.d) ? 'black' : 'none'} />
				{/each}
				{#each art.symbol.cleared ?? [] as region (region)}
					<path d={region} fill="black" />
				{/each}
			</g>
		</mask>
	{/if}
	<g mask={art.symbol ? `url(#clear-${symbolId})` : undefined}>
		{#each art.lines as line, i (line.key)}
			<!-- silhouette first so nearer ridges occlude the ones behind -->
			<path d={line.fill} fill={line.band} />
			<path
				d={line.stroke}
				fill="none"
				stroke={line.colour}
				stroke-width={line.weight}
				stroke-linejoin="round"
				stroke-linecap="round"
				stroke-dasharray={animate ? line.length : undefined}
				stroke-dashoffset={animate ? line.length : undefined}
				class:ridge-in={animate}
				style:animation-delay={animate ? `${i * 70}ms` : undefined}
			/>
		{/each}
	</g>
	{#if art.symbol}
		<g
			transform="translate({SYMBOL_BOX.x} {SYMBOL_BOX.y})"
			fill="none"
			stroke={art.accent}
			stroke-linejoin="round"
			stroke-linecap="round"
		>
			{#each art.symbol.paths as path (path.d)}
				<path
					d={path.d}
					stroke-width={path.fine ? 1.1 : 2.2}
					pathLength="1"
					stroke-dasharray={animate ? 1 : undefined}
					stroke-dashoffset={animate ? 1 : undefined}
					class:ridge-in={animate}
					style:animation-delay={animate ? `${art.lines.length * 70}ms` : undefined}
				/>
			{/each}
		</g>
	{/if}
	{#if index}
		<text x="100" y={indexY(card)} text-anchor="middle" class="index">{cardIndex(card)}</text>
	{/if}
</svg>

<style>
	.face {
		display: block;
		width: 100%;
		height: auto;
		background: #0b0b0b;
	}

	.index {
		font-family: var(--font-body);
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.18em;
		fill: #efece5;
	}

	.ridge-in {
		animation: ridge-in 900ms cubic-bezier(0.2, 0.7, 0.3, 1) forwards;
	}

	@keyframes ridge-in {
		to {
			stroke-dashoffset: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.ridge-in {
			animation: none;
			stroke-dashoffset: 0;
		}
	}
</style>
