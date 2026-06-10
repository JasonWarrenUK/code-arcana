import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],

	// Optimize for our static build
	build: {
		target: 'es2020'
	},

	// For development
	server: {
		port: 3000
	}
});
