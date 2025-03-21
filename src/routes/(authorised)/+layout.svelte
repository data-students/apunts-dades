<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	import AppSidebar from '$lib/components/AppSidebar.svelte';

	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import posthog from 'posthog-js';

	let { children, data } = $props();

	beforeNavigate(() => posthog.capture('$pageleave'));
	afterNavigate(() => posthog.capture('$pageview'));
</script>

<svelte:head>
	<title>{page.data.title} - Apunts Dades</title>
</svelte:head>

<Sidebar.Provider>
	<AppSidebar {data} />
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2">
			<div class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item class="hidden md:block">
							<Breadcrumb.Link href="/">Inici</Breadcrumb.Link>
						</Breadcrumb.Item>
						{#if page.data.breadcrumb != 'Inici'}
							<Breadcrumb.Separator class="hidden md:block" />
							<Breadcrumb.Item>
								<Breadcrumb.Page>{page.data.breadcrumb}</Breadcrumb.Page>
							</Breadcrumb.Item>
						{/if}
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
			<h2 class="text-2xl md:text-3xl font-semibold tracking-tight">{page.data.title}</h2>
			<Separator />
			{@render children()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
