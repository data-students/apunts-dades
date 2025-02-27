<script lang="ts">
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import { Separator } from "$lib/components/ui/separator";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Search } from "lucide-svelte";

	import SubjectCard from "$lib/components/SubjectCard.svelte";

	import { pb } from "$lib/pocketbase.ts";

	const currentUser = pb.authStore.model;

	let { data } = $props();
	let searchQuery = $state("");

	let selectedTab = $state("current");

	function filterSubjects(subjects: any[]) {
        return subjects.filter(subject => {
            if (searchQuery) {
                const searchText = subject.title.toLowerCase() + subject.acronym.toLowerCase();
                if (!searchText.includes(searchQuery.toLowerCase())) {
                    return false;
                }
            }

            if (selectedTab === "current") {
                return currentUser.subjects.includes(subject.id);
            }

            return true;
        });
    }
</script>

<h2 class="text-3xl font-semibold tracking-tight">Assignatures</h2>
<Separator />

<div class="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
	<Tabs.Root value={selectedTab} class="w-full" onValueChange={(value) => selectedTab = value}>
		<Tabs.List>
			<Tabs.Trigger value="current">Actuals</Tabs.Trigger>
			<Tabs.Trigger value="all">Totes</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>
	<div class="relative w-full md:max-w-sm">
		<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
		<Input 
			placeholder="Busca assignatures..." 
			class="pl-9 w-full" 
			bind:value={searchQuery}
		/>
	</div>
</div>

<div class="grid auto-rows-min gap-4 md:grid-cols-3">
	{#await data.subjects}
		<div class="grid auto-rows-min gap-4 md:grid-cols-3">
			<div class="bg-muted/50 aspect-video rounded-xl"></div>
			<div class="bg-muted/50 aspect-video rounded-xl"></div>
			<div class="bg-muted/50 aspect-video rounded-xl"></div>
		</div>
	{:then subjects}
		{#each filterSubjects(subjects) as subject}
			<SubjectCard subject={subject} />
		{:else}
			<p class="text-neutral-600">Cap assignatura trobada</p>
		{/each}
	{:catch error}
		<p>Error loading subjects: {error.message}</p>
	{/await}
</div>
