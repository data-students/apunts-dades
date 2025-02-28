<script lang="ts">
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Search } from "lucide-svelte";
    
    import NoteCard from "$lib/components/NoteCard.svelte";

	let { data } = $props();

    let selectedTab = $state("Tots");
    let searchQuery = $state("");

    let filteredNotes = $derived(data.notes.filter(note => {
        if (selectedTab !== "Tots" && note.type !== selectedTab) return false;
        
        if (searchQuery) {
            const searchText = note.title.toLowerCase();
            return searchText.includes(searchQuery.toLowerCase());
        }
        
        return true;
    }));
</script>

<div class="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
    <Tabs.Root value={selectedTab} onValueChange={(value) => selectedTab = value}>
        <Tabs.List>
            <Tabs.Trigger value="Tots">Tots</Tabs.Trigger>
            {#each data.noteTypes as type}
                <Tabs.Trigger value={type}>{type}</Tabs.Trigger>
            {/each}
        </Tabs.List>
    </Tabs.Root>
	<div class="relative w-full md:max-w-sm">
		<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
		<Input 
			placeholder="Busca apunts..." 
			class="pl-9 w-full" 
			bind:value={searchQuery}
		/>
	</div>
</div>

{#await data.notes}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="bg-muted/50 aspect-video rounded-xl"></div>
        <div class="bg-muted/50 aspect-video rounded-xl hidden sm:block"></div>
        <div class="bg-muted/50 aspect-video rounded-xl hidden lg:block"></div>
    </div>
{:then notes}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each filteredNotes as note}
            <NoteCard note={note} />
        {/each}
    </div>
{:catch error}
    <p class="text-sm text-red-500 text-center mt-32">Error carregant apunts: {error.message}</p>
{/await}
