<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/state';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	let { children } = $props();

	const items = [
		{ href: '/usuari/configuracio', title: 'Configuració' },
		{ href: '/usuari/penja-apunts', title: 'Penja apunts' },
		{ href: '/usuari/apunts-penjats', title: 'Apunts penjats' }
	];

	let current = $derived(items.find((item) => item.href === page.url.pathname));

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});
</script>

<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
	<aside class="lg:w-1/5">
		<nav class="flex flex-col space-y-1">
			{#each items as item (item.href)}
				<Button
					href={item.href}
					variant="ghost"
					class="justify-start w-full relative hover:bg-transparent"
				>
					{#if item === current}
						<div
							class="absolute inset-0 rounded-md bg-muted"
							in:send={{ key: 'active-sidebar-tab' }}
							out:receive={{ key: 'active-sidebar-tab' }}
						></div>
					{/if}
					<span class="relative z-10">{item.title}</span>
				</Button>
			{/each}
		</nav>
	</aside>
	<div class="flex-1 flex-col gap-4 lg:max-w-2xl">
		{@render children()}
	</div>
</div>
