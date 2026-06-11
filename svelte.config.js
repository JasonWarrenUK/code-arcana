import adapter from 'svelte-adapter-deno';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Deno server build for Deno Deploy
		adapter: adapter({
			out: 'build',
			precompress: true
		}),

		// Prerender everything; the Deno server serves the static output
		prerender: {
			handleHttpError: 'warn'
		}
	}
};

export default config;
