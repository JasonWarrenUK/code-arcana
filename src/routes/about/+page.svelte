<svelte:head>
	<title>About | Arcana of Code</title>
</svelte:head>

<article class="page about">
	<header class="head">
		<div class="label">Notes</div>
		<h1 class="display title">About</h1>
	</header>

	<section class="row">
		<div class="label-strong">What this is</div>
		<div class="copy">
			<p class="body">
				A collection of programming insights organised through the archetypal framework of tarot.
				Not mysticism, not corporate methodology: honest observations about writing software,
				filtered through 78 symbolic lenses that help make sense of the patterns we encounter.
			</p>
			<p class="body">
				Each card represents a different aspect of programming life: collaboration dynamics,
				technical decisions, the emotional landscape of debugging, the craft of maintaining code.
				The tarot provides structure without imposing rigid process, allowing for nuance and context
				that traditional methodology frameworks tend to steamroll.
			</p>
		</div>
	</section>

	<section class="row">
		<div class="label-strong">Who it's for</div>
		<div class="copy">
			<p class="body">
				Developers with roughly three years of experience: long enough to have shipped real
				projects, debugged production issues, and realised that the gap between what they teach in
				bootcamps and what actually matters is substantial.
			</p>
			<p class="body">
				If you've started questioning whether Agile ceremonies are theatre, if you've noticed that
				the best code emerges from genuine collaboration rather than process compliance, if you're
				interested in the craft rather than career optimisation, this might resonate.
			</p>
		</div>
	</section>

	<section class="row">
		<div class="label-strong">The approach</div>
		<div class="copy">
			<p class="body">
				All 78 cards are written and connected. The connections between cards emerged organically
				rather than through predetermined structure, which is why the High Priestess links to the
				Hermit and the Eight of Swords rather than whatever a methodology would suggest.
			</p>
			<p class="body">
				The aesthetic is deliberately stark: ink on paper, one accent per card, no shadows, no
				radii, no gradients. The tone is dry British, anti-corporate, comfortable with
				contradiction.
			</p>
		</div>
	</section>

	<section class="row">
		<div class="label-strong">Technical</div>
		<div class="copy">
			<p class="body">
				Built with SvelteKit and TypeScript. Static generation for platform independence. No
				tracking, no analytics, no newsletter signup forms. Just the cards and their insights.
			</p>
			<p class="body">No newsletter. No roadmap. No sprint to anything.</p>
		</div>
	</section>
</article>

<style>
	.about {
		gap: 44px;
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
		border-top: 1px solid var(--rule-ghost);
		padding-top: 24px;
	}

	.copy {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	@media (max-width: 900px) {
		.row {
			grid-template-columns: 1fr;
			gap: 12px;
		}
	}
</style>
