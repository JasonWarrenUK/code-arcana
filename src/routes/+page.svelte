<script lang="ts">
</script>

<div class="container">
	<div class="hero">
		<h1>Programming Wisdom Through Tarot</h1>
		<p class="tagline">
			Not "The Way of Code." Not corporate agile theatre. Just honest insights about writing
			software, organised through archetypal patterns that actually make sense.
		</p>
	</div>

	<div class="intro">
		<p>
			The full tarot deck, reread through programming. Not a map of code concepts onto card
			names—the Ace of Swords isn't "open your IDE"—but a set of archetypal lenses for the recurring
			patterns in programming life: the codebase you've inherited, the architecture you can't commit
			to, the colleague who ships everything and documents nothing.
		</p>
		<p>
			Aimed at developers with enough scar tissue to find methodology slogans irritating. No steps
			to success. No actionable takeaways. Just honest observations, filed under the framework that
			happened to fit.
		</p>
	</div>

	<div class="cta-grid">
		<a href="/catalog" class="cta-card">
			<h2>Browse the Catalog</h2>
			<p>Explore all 78 cards and their programming insights</p>
		</a>

		<a href="/draw" class="cta-card">
			<h2>Draw a Card</h2>
			<p>Get a random perspective on your current work</p>
		</a>

		<a href="/spread" class="cta-card">
			<h2>Draw a Spread</h2>
			<p>Three cards, three positions, one specific problem</p>
		</a>
	</div>
</div>

<style>
	.hero {
		text-align: center;
		margin-bottom: var(--space-lg);
		padding: var(--space-lg) 0;
		border-bottom: 2px solid var(--border);
	}

	.hero h1 {
		font-size: var(--text-2xl);
		margin-bottom: var(--space-md);
	}

	.tagline {
		font-size: var(--text-lg);
		max-width: 700px;
		margin: 0 auto;
		line-height: 1.5;
	}

	.intro {
		max-width: 650px;
		margin: var(--space-lg) auto;
	}

	.intro p {
		margin-bottom: var(--space-md);
	}

	.cta-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--space-md);
		margin-top: var(--space-lg);
	}

	.cta-card {
		border: 2px solid var(--border);
		padding: var(--space-md);
		text-decoration: none;
		transition: transform 0.1s ease;
	}

	.cta-card:hover {
		transform: translateY(-4px);
	}

	.cta-card h2 {
		margin-bottom: var(--space-sm);
	}

	.cta-card p {
		color: var(--text-secondary);
		margin: 0;
	}
</style>
