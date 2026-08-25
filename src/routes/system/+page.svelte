<script lang="ts">
	import type { Card } from '$lib/types/card';
	import CardFace from '$lib/components/CardFace.svelte';
	import { PALETTE } from '$lib/arcana';

	const palette: Array<{ label: string; value: string }> = [
		{ label: 'Cups', value: PALETTE.cups },
		{ label: 'Wands', value: PALETTE.wands },
		{ label: 'Swords', value: PALETTE.swords },
		{ label: 'Pentacles', value: PALETTE.pentacles },
		{ label: 'Majors', value: PALETTE.major }
	];

	const neutrals: Array<{ label: string; value: string }> = [
		{ label: 'Ink', value: '#0b0b0b' },
		{ label: 'Paper', value: '#e4e1d9' },
		{ label: 'Quiet ridge', value: '#8b8780' },
		{ label: 'Frame', value: '#3a3733' }
	];

	// Specimens: enough of a card to render a face, no essay required
	const spec = (
		id: string,
		arcana: Card['arcana'],
		suit: Card['suit'],
		number: number | undefined,
		courtRank?: Card['courtRank']
	): Card => ({ id, name: id, arcana, suit, number, courtRank, keywords: [], codingInsight: '' });

	interface GrammarRow {
		title: string;
		rule: string;
		withIndex: boolean;
		cards: Array<[Card, string]>;
	}

	const grammar: GrammarRow[] = [
		{
			title: 'Pips · Ace to Ten',
			rule: 'Ten ridges, one frame. Count up from the base: the accented ridge is the rank.',
			withIndex: false,
			cards: [
				[spec('ace-of-swords', 'minor', 'swords', 1), 'Ace'],
				[spec('three-of-swords', 'minor', 'swords', 3), 'Three'],
				[spec('five-of-swords', 'minor', 'swords', 5), 'Five'],
				[spec('seven-of-swords', 'minor', 'swords', 7), 'Seven'],
				[spec('nine-of-swords', 'minor', 'swords', 9), 'Nine'],
				[spec('ten-of-swords', 'minor', 'swords', 10), 'Ten']
			]
		},
		{
			title: 'Courts · Strata',
			rule: 'A doubled frame. The lowest ridges fill solid instead of stroking, and the depth of the solid is the rank.',
			withIndex: false,
			cards: [
				[spec('page-of-cups', 'minor', 'cups', undefined, 'page'), 'Page'],
				[spec('knight-of-cups', 'minor', 'cups', undefined, 'knight'), 'Knight'],
				[spec('queen-of-cups', 'minor', 'cups', undefined, 'queen'), 'Queen'],
				[spec('king-of-cups', 'minor', 'cups', undefined, 'king'), 'King'],
				[spec('queen-of-wands', 'minor', 'wands', undefined, 'queen'), 'Queen · Wands'],
				[spec('king-of-pentacles', 'minor', 'pentacles', undefined, 'king'), 'King · Pentacles']
			]
		},
		{
			title: 'Majors · Full bleed',
			rule: 'No frame, no counting. Red falls on the dominant swell; the numeral is white.',
			withIndex: true,
			cards: [
				[spec('the-fool', 'major', undefined, 0), 'The Fool'],
				[spec('the-empress', 'major', undefined, 3), 'The Empress'],
				[spec('the-hermit', 'major', undefined, 9), 'The Hermit'],
				[spec('death', 'major', undefined, 13), 'Death'],
				[spec('the-tower', 'major', undefined, 16), 'The Tower'],
				[spec('the-world', 'major', undefined, 21), 'The World']
			]
		}
	];
</script>

<svelte:head>
	<title>The System | Arcana of Code</title>
</svelte:head>

<div class="page system">
	<header class="head">
		<div class="label">Design System · v1</div>
		<h1 class="display title">The System</h1>
	</header>

	<section class="row">
		<div class="intro">
			<div class="label-strong">01 · Colour</div>
			<p class="intro-copy">
				One accent per card. It never leaves the card face. Suits sit at matched lightness so none
				outranks another; majors take the only high-chroma value here.
			</p>
		</div>
		<div class="stack">
			<div class="swatches swatches-5">
				{#each palette as p}
					<div class="swatch">
						<div class="chip-face">
							<div class="chip-bar" style:background={p.value}></div>
						</div>
						<div class="swatch-label">{p.label}</div>
						<div class="swatch-value">{p.value}</div>
					</div>
				{/each}
			</div>
			<div class="swatches swatches-4">
				{#each neutrals as p}
					<div class="swatch">
						<div class="neutral" style:background={p.value}></div>
						<div class="swatch-label">{p.label}</div>
						<div class="swatch-value">{p.value}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="row">
		<div class="intro">
			<div class="label-strong">02 · Type</div>
			<p class="intro-copy">
				Archivo, one family, three registers: condensed caps for display, regular for reading,
				wide-tracked caps for labels.
			</p>
		</div>
		<div class="specimens">
			<div class="specimen">
				<div class="specimen-label">Display 78 / 700</div>
				<div class="display spec-display">Ten of Swords</div>
			</div>
			<div class="specimen">
				<div class="specimen-label">Insight 22 / 700</div>
				<div><span class="insight">Upstream Owns You</span></div>
			</div>
			<div class="specimen">
				<div class="specimen-label">Body 16 / 1.6</div>
				<div class="body spec-body">
					Your project is a thin layer of intention sitting on a vast tower of other people's
					decisions.
				</div>
			</div>
			<div class="specimen specimen-last">
				<div class="specimen-label">Label 10 / 0.3em</div>
				<div class="label spec-label">Minor Arcana · Pentacles · Nine</div>
			</div>
		</div>
	</section>

	<section class="row">
		<div class="intro">
			<div class="label-strong">03 · Card grammar</div>
			<p class="intro-copy">
				Three categories, three logics. Rank and arcana read from the ridges alone; the numerals
				only confirm it.
			</p>
		</div>
		<div class="grammar">
			{#each grammar as g}
				<div class="grammar-row">
					<div class="grammar-head">
						<span class="grammar-title">{g.title}</span>
						<span class="grammar-rule">{g.rule}</span>
					</div>
					<div class="grammar-cards">
						{#each g.cards as [card, label]}
							<div class="grammar-card">
								<CardFace {card} index={g.withIndex} />
								<div class="grammar-label">{label}</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="row">
		<div class="intro">
			<div class="label-strong">04 · Components</div>
			<p class="intro-copy">
				Everything is a rule, a block, or a box. No shadows, no radii, no gradients.
			</p>
		</div>
		<div class="components">
			<div class="component-row">
				<button type="button" class="btn btn-primary">Primary</button>
				<button type="button" class="btn btn-secondary">Secondary</button>
				<span class="tag">keyword tag</span>
				<span class="tag-active">active filter</span>
			</div>
			<div class="rules">
				<div class="rule-heavy"></div>
				<div class="specimen-label">Heavy rule · section boundary</div>
				<div class="rule-hair"></div>
				<div class="specimen-label">Hairline · within a section</div>
				<div class="rule-ghost"></div>
				<div class="specimen-label">Ghost rule · list separator</div>
			</div>
		</div>
	</section>
</div>

<style>
	.system {
		gap: 56px;
		padding-top: 44px;
	}

	.head {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.title {
		font-size: clamp(48px, 6vw, 78px);
	}

	.row {
		display: grid;
		grid-template-columns: 260px 1fr;
		gap: 34px;
		align-items: start;
	}

	.intro {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.intro-copy {
		margin: 0;
		font-size: 14px;
		line-height: 1.55;
		color: var(--text-muted);
		text-wrap: pretty;
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: 26px;
	}

	.swatches {
		display: grid;
		gap: 16px;
	}

	.swatches-5 {
		grid-template-columns: repeat(5, 1fr);
	}

	.swatches-4 {
		grid-template-columns: repeat(4, 1fr);
	}

	.swatch {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.chip-face {
		height: 88px;
		background: var(--ink);
		display: flex;
		align-items: flex-end;
		padding: 10px;
	}

	.chip-bar {
		height: 4px;
		width: 100%;
	}

	.neutral {
		height: 54px;
		border: 1px solid var(--rule-ghost);
	}

	.swatch-label {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	.swatch-value {
		font-size: 10px;
		letter-spacing: 0.04em;
		color: var(--text-faint);
	}

	.specimens {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.specimen {
		display: grid;
		grid-template-columns: 130px 1fr;
		gap: 20px;
		align-items: baseline;
		border-bottom: 1px solid var(--rule-ghost);
		padding-bottom: 14px;
	}

	.specimen-last {
		border-bottom: none;
		padding-bottom: 0;
	}

	.specimen-label {
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--text-faint);
	}

	.spec-display {
		font-size: 54px;
		line-height: 0.86;
	}

	.specimen .insight {
		display: inline-block;
		padding: 8px 11px 10px;
	}

	.spec-body {
		max-width: 62ch;
	}

	.spec-label {
		color: var(--ink);
	}

	.grammar {
		display: flex;
		flex-direction: column;
		gap: 26px;
	}

	.grammar-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: 12px;
		border-top: 1px solid var(--rule-ghost);
		padding-top: 18px;
	}

	.grammar-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 20px;
	}

	.grammar-title {
		font-size: 17px;
		font-weight: 700;
		text-transform: uppercase;
		font-stretch: 84%;
	}

	.grammar-rule {
		font-size: 13px;
		line-height: 1.45;
		color: var(--text-muted);
		max-width: 62ch;
		text-align: right;
	}

	.grammar-cards {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 14px;
	}

	.grammar-card {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.grammar-label {
		font-size: 9.5px;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.components {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.component-row {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
		align-items: center;
	}

	.rules {
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 620px;
	}

	@media (max-width: 900px) {
		.row {
			grid-template-columns: 1fr;
		}

		.swatches-5,
		.swatches-4 {
			grid-template-columns: repeat(2, 1fr);
		}

		.specimen {
			grid-template-columns: 1fr;
			gap: 8px;
		}

		.grammar-head {
			flex-direction: column;
		}

		.grammar-rule {
			text-align: left;
		}

		.grammar-cards {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
