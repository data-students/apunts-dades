<script lang="ts">
	import '../app.css';
	import { Toaster } from "$lib/components/ui/sonner/index.js";
	import posthog from 'posthog-js'
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		if (browser) {
			posthog.init(
				import.meta.env.VITE_PUBLIC_POSTHOG_KEY,
				{ 
					api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
					person_profiles: 'identified_only',
				}
			)
		}
		return
	});
</script>

<Toaster theme="light" />

{@render children()}
