<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	const nav = [
		{ href: '/catalog', label: 'The Deck' },
		{ href: '/draw', label: 'Draw' },
		{ href: '/spread', label: 'Spread' },
		{ href: '/graph', label: 'Connections' },
		{ href: '/system', label: 'System' },
		{ href: '/about', label: 'About' }
	];

	const isActive = (href: string, pathname: string): boolean =>
		href === '/catalog'
			? pathname.startsWith('/catalog') || pathname.startsWith('/card/')
			: pathname.startsWith(href);
</script>

<svg aria-hidden="true" class="grain">
	<filter id="grain">
		<feTurbulence type="fractalNoise" baseFrequency="0.88" numOctaves="4" />
		<feColorMatrix type="saturate" values="0" />
	</filter>
	<rect width="100%" height="100%" filter="url(#grain)" />
</svg>

<div class="shell">
	<header class="masthead">
		<a href="/" class="brand">Arcana of Code</a>
		<nav class="nav" aria-label="Primary">
			{#each nav as item}
				<a href={item.href} class="chip" class:active={isActive(item.href, page.url.pathname)}>
					{item.label}
				</a>
			{/each}
		</nav>
	</header>
	<div class="rule-heavy"></div>

	<main>
		{@render children()}
	</main>

	<footer class="footer">
		<div class="rule-heavy"></div>
		<p class="label footer-line">A tarot-based programming philosophy. No bullshit.</p>
	</footer>
</div>

<style>
	.grain {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		mix-blend-mode: multiply;
		opacity: 0.22;
		z-index: 40;
	}

	.shell {
		display: flex;
		flex-direction: column;
		padding: 30px var(--page-pad-x) 72px;
		max-width: var(--page-max);
		margin: 0 auto;
		min-height: 100vh;
	}

	.masthead {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: var(--grid-gap);
		align-items: center;
		padding-bottom: 18px;
	}

	.brand {
		grid-column: 1 / 5;
		background: var(--ink);
		color: var(--paper);
		padding: 8px 13px;
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 0.26em;
		text-transform: uppercase;
		text-decoration: none;
		justify-self: stretch;
	}

	.brand:hover {
		text-decoration: none;
		background: var(--paper);
		color: var(--ink);
		box-shadow: inset 0 0 0 2px var(--ink);
	}

	.nav {
		grid-column: 5 / 13;
		display: flex;
		gap: 4px;
		justify-content: flex-end;
		flex-wrap: wrap;
	}

	main {
		flex: 1;
	}

	.footer {
		display: flex;
		flex-direction: column;
		gap: 14px;
		margin-top: 72px;
	}

	.footer-line {
		margin: 0;
		letter-spacing: 0.24em;
	}

	@media (max-width: 900px) {
		.masthead {
			display: flex;
			flex-direction: column;
			align-items: stretch;
			gap: 12px;
		}

		.nav {
			justify-content: flex-start;
		}
	}
</style>
