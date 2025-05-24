<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Search from '@lucide/svelte/icons/search';
	import CirclePlus from '@lucide/svelte/icons/circle-plus';

	import SubjectCard from '$lib/components/SubjectCard.svelte';

	let { data } = $props();

	let searchQuery = $state('');
	let selectedTab = $state('current');

	const filteredSubjects = $derived(
		data.subjects.filter((subject) => {
			if (selectedTab === 'current' && !data.user.subjects.includes(subject.id)) return false;

			if (searchQuery) {
				const searchText = (subject.title + ' ' + subject.acronym).toLowerCase();
				return searchText.includes(searchQuery.toLowerCase());
			}

			return true;
		})
	);

	function quarterSubjects(quarter: string) {
		return filteredSubjects.filter((subject) => subject.quarter === quarter);
	}
</script>

<div class="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
	<Tabs.Root value={selectedTab} class="w-full" onValueChange={(value) => (selectedTab = value)}>
		<Tabs.List>
			<Tabs.Trigger value="current">Actuals</Tabs.Trigger>
			<Tabs.Trigger value="all">Totes</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>
	<div class="relative w-full md:max-w-sm">
		<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
		<Input placeholder="Busca assignatures..." class="pl-9 w-full" bind:value={searchQuery} />
	</div>
</div>

{#await data.subjects}
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
		<div class="bg-muted/50 aspect-video rounded-xl"></div>
		<div class="bg-muted/50 aspect-video rounded-xl hidden sm:block"></div>
		<div class="bg-muted/50 aspect-video rounded-xl hidden lg:block"></div>
	</div>
{:then subjects}
	{#if filteredSubjects.length > 0}
		{#each data.quarters as quarter (quarter)}
			{#if quarterSubjects(quarter).length > 0}
				<div class="mb-4">
					<h2 class="text-lg font-semibold">{quarter}</h2>
					<Separator class="mt-2 mb-4" />
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{#each quarterSubjects(quarter) as subject (subject.id)}
							<SubjectCard {subject} />
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	{:else if selectedTab === 'current' && data.user.subjects.length === 0}
		<div class="text-center mt-32">
			<p class="mb-8 text-muted-foreground">
				Afegeix les assignatures que estàs cursant per veure-les aqui.
			</p>
			<Button href="/usuari/configuracio">
				<CirclePlus />
				Afegeix assignatures
			</Button>
		</div>
	{:else}
		<p class="text-sm text-muted-foreground text-center mt-32">Cap assignatura trobada</p>
	{/if}
{:catch error}
	<p class="text-sm text-red-500 text-center mt-32">
		Error carregant assignatures: {error.message}
	</p>
{/await}
