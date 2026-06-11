<svelte:head>
	<title>About | Arcana of Code</title>
</svelte:head>

<div class="container">
	<article class="about">
		<h1>About This Project</h1>

		<section>
			<h2>What This Is</h2>
			<p>
				A collection of programming insights organised through the archetypal framework of tarot.
				Not mysticism, not corporate methodology—just honest observations about writing software,
				filtered through 78 symbolic lenses that help make sense of the patterns we encounter.
			</p>
			<p>
				Each card represents a different aspect of programming life: collaboration dynamics,
				technical decisions, the emotional landscape of debugging, the craft of maintaining code.
				The tarot provides structure without imposing rigid process, allowing for nuance and context
				that traditional methodology frameworks tend to steamroll.
			</p>
		</section>

		<section>
			<h2>Who It's For</h2>
			<p>
				This is aimed at developers with roughly three years of experience—long enough to have
				shipped real projects, debugged production issues, and realised that the gap between what
				they teach in bootcamps and what actually matters is substantial.
			</p>
			<p>
				If you've started questioning whether Agile ceremonies are theatre, if you've noticed that
				the best code emerges from genuine collaboration rather than process compliance, if you're
				interested in the craft rather than career optimization—this might resonate.
			</p>
		</section>

		<section>
			<h2>The Approach</h2>
			<p>
				All 78 cards are written and connected. The connections between cards emerged organically
				rather than through predetermined structure—which is why the High Priestess links to the
				Hermit and the Eight of Swords, rather than whatever a methodology would suggest.
			</p>
			<p>
				The site grows slowly from here: not more cards, but more ways to navigate the ones that
				exist.
			</p>
			<p>
				The aesthetic is deliberately stark: post-punk minimalism, not Silicon Valley gloss. The
				tone is dry British, anti-corporate, comfortable with contradiction. Neurodivergent thinking
				patterns are assumed as default rather than exception.
			</p>
		</section>

		<section>
			<h2>Technical Details</h2>
			<p>
				Built with SvelteKit and TypeScript. Static generation for platform independence. No
				tracking, no analytics, no newsletter signup forms. Just the cards and their insights.
			</p>
		</section>

		<section>
			<h2>Future Plans</h2>
			<p>
				The deck is complete. What's left is navigation: multi-card spreads for structured prompts,
				and a proper visualisation of the connection graph—250 edges of cross-suit, cross-arcana
				relationships that the JSON already knows about.
			</p>
			<p>No newsletter. No roadmap. No sprint to anything.</p>
		</section>
	</article>
</div>

<style>
	.about {
		max-width: 650px;
		margin: 0 auto;
	}

	section {
		margin-bottom: var(--space-lg);
		padding-bottom: var(--space-lg);
		border-bottom: 1px solid var(--border);
	}

	section:last-child {
		border-bottom: none;
	}

	h1 {
		margin-bottom: var(--space-lg);
	}

	h2 {
		margin-bottom: var(--space-md);
		font-size: var(--text-lg);
	}

	p {
		margin-bottom: var(--space-md);
	}

	p:last-child {
		margin-bottom: 0;
	}
</style>
