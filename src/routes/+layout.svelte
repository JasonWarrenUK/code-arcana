<script lang="ts">
	import '../app.css';
</script>

<div class="site-wrapper">
	<header>
		<div class="container">
			<nav>
				<a href="/" class="site-title">ARCANA OF CODE</a>
				<div class="nav-links">
					<a href="/catalog">Catalog</a>
					<a href="/draw">Draw</a>
					<a href="/spread">Spread</a>
					<a href="/graph">Connections</a>
					<a href="/about">About</a>
				</div>
			</nav>
		</div>
	</header>

	<main>
		<slot />
	</main>

	<footer>
		<div class="container">
			<p>A tarot-based programming philosophy. No bullshit.</p>
		</div>
	</footer>
</div>

<style>
	.site-wrapper {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	header {
		border-bottom: 2px solid var(--border);
		padding: var(--space-sm) 0;
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.site-title {
		font-size: var(--text-xl);
		font-weight: 600;
		text-decoration: none;
		letter-spacing: 0.05em;
	}

	.nav-links {
		display: flex;
		gap: var(--space-md);
	}

	.nav-links a {
		text-decoration: none;
		padding-bottom: 2px;
		border-bottom: 2px solid transparent;
	}

	.nav-links a:hover {
		border-bottom-color: var(--border);
	}

	main {
		flex: 1;
		padding: var(--space-lg) 0;
	}

	footer {
		border-top: 2px solid var(--border);
		padding: var(--space-md) 0;
		margin-top: var(--space-lg);
	}

	footer p {
		font-size: 0.9rem;
		color: var(--text-secondary);
		text-align: center;
		margin: 0;
	}
</style>
