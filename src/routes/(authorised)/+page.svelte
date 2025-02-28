<script lang="ts">
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Search } from "lucide-svelte";

	import SubjectCard from "$lib/components/SubjectCard.svelte";

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
                return data.user.subjects.includes(subject.id);
            }

            return true;
        });
    }
</script>

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

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#await data.subjects}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-muted/50 aspect-video rounded-xl"></div>
            <div class="bg-muted/50 aspect-video rounded-xl hidden sm:block"></div>
            <div class="bg-muted/50 aspect-video rounded-xl hidden lg:block"></div>
        </div>
    {:then subjects}
        {#each filterSubjects(subjects) as subject}
            <SubjectCard subject={subject} />
        {:else}
            <p class="text-muted-foreground text-sm">Cap assignatura trobada</p>
        {/each}
    {:catch error}
        <p>Error carregant assignatures: {error.message}</p>
    {/await}
</div>
