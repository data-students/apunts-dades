<script lang="ts">
	import '../app.css';
	import { Toaster } from "$lib/components/ui/sonner/index.js";
	import posthog from 'posthog-js'
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let { children } = $props();

	const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
	const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

	onMount(() => {
		if (browser) {
			posthog.init(
				posthogKey,
				{ 
					api_host: posthogHost,
					person_profiles: 'identified_only',
				}
			)
		}
		return
	});
</script>

<Toaster theme="light" />

{@render children()}
