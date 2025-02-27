<script lang="ts">
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import { Separator } from "$lib/components/ui/separator";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Search } from "lucide-svelte";
    import NoteCard from "$lib/components/NoteCard.svelte";

	let { data } = $props();

    let selectedTab = $state("Tots");
    const noteTypes = ["Teoria", "Lab", "Examen"];

    let searchQuery = $state("");

    function filterNotes(notes: any[], type: string, query: string) {
        return notes
            .filter(note => {
                if (type !== "Tots" && note.type != type) return false;
                
                if (query) {
                    const searchText = note.title.toLowerCase();
                    return searchText.includes(query.toLowerCase());
                }
                
                return true;
            });
    }
</script>

{#await data.subject}
    <div class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"></div>
{:then subject}
    <h2 class="text-3xl font-semibold tracking-tight">{subject.title}</h2>
    <Separator />
{:catch error}
    <p>Error loading subject: {error.message}</p>
{/await}

<div class="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
    <Tabs.Root value={selectedTab} onValueChange={(value) => selectedTab = value}>
        <Tabs.List>
            <Tabs.Trigger value="Tots">Tots</Tabs.Trigger>
            {#each noteTypes as type}
                <Tabs.Trigger value={type}>{type}</Tabs.Trigger>
            {/each}
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
    {#await data.notes}
        <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <div class="bg-muted/50 aspect-video rounded-xl"></div>
            <div class="bg-muted/50 aspect-video rounded-xl"></div>
            <div class="bg-muted/50 aspect-video rounded-xl"></div>
        </div>
    {:then notes}
        {#each filterNotes(notes, selectedTab, searchQuery) as note}
            <NoteCard note={note} />
        {:else}
            <p class="text-neutral-600">Cap apunt trobat</p>
        {/each}
    {:catch error}
        <p>Error loading notes: {error.message}</p>
    {/await}
</div>