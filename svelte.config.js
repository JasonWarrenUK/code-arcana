import adapter from '@deno/svelte-adapter';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// Official Deno adapter: Deno Deploy builds from the repo and runs
		// .deno-deploy/server.ts
		adapter: adapter(),

		// Prerender everything; the server only serves the static output
		prerender: {
			handleHttpError: 'warn'
		}
	}
};

export default config;
