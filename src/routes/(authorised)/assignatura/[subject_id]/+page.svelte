<script lang="ts">
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Separator } from "$lib/components/ui/separator";
    import { Input } from "$lib/components/ui/input/index.js";
    import NoteCard from "$lib/components/NoteCard.svelte";

	let { data } = $props();

    let selectedTab = $state("all");
    let searchQuery = $state("");

    function filterNotes(notes: any[], type: string, query: string) {
        return notes
            .filter(note => {
                if (type !== "all" && note.type !== type) return false;
                
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
    <div class="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
        <h2 class="text-3xl font-semibold">{subject.title}</h2>
        <div class="flex gap-2">
            <Badge variant="outline">{subject.type}</Badge>
            <Badge variant="outline">{subject.quarter}</Badge>
        </div>
    </div>
    <Separator />
{:catch error}
    <p>Error loading subject: {error.message}</p>
{/await}

<div class="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
    <Tabs.Root value={selectedTab} onValueChange={(value) => selectedTab = value}>
        <Tabs.List>
            <Tabs.Trigger value="all">Tots</Tabs.Trigger>
            <Tabs.Trigger value="theory">Teoria</Tabs.Trigger>
            <Tabs.Trigger value="lab">Laboratori</Tabs.Trigger>
            <Tabs.Trigger value="exam">Examens</Tabs.Trigger>
        </Tabs.List>
    </Tabs.Root>
    <Input 
        placeholder="Busca apunts..." 
        class="max-w-sm" 
        bind:value={searchQuery}
    />
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