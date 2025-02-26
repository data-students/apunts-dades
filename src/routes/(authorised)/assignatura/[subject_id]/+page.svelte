<script lang="ts">
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Separator } from "$lib/components/ui/separator";
    import NoteCard from "$lib/components/NoteCard.svelte";

	let { data } = $props();
    let selectedTab = $state("all");

    function getNotesByType(notes, type: string) {
        if (type === "all") return notes;
        return notes.filter((note) => note.type === type);
    }
</script>

{#await data.subject}
    Loading subject...
{:then subject}
    <div>
        <h2 class="text-3xl font-semibold">{subject.title}</h2>
        <Badge variant="outline">{subject.quarter}</Badge>
    </div>
{:catch error}
    <p>Error loading subject: {error.message}</p>
{/await}

<Tabs.Root value={selectedTab} class="w-full" onValueChange={(value) => selectedTab = value}>
    <Tabs.List>
        <Tabs.Trigger value="all">Tots</Tabs.Trigger>
        <Tabs.Trigger value="theory">Teoria</Tabs.Trigger>
        <Tabs.Trigger value="lab">Laboratori</Tabs.Trigger>
        <Tabs.Trigger value="exam">Examens</Tabs.Trigger>
    </Tabs.List>
</Tabs.Root>

<Separator />

<div class="grid auto-rows-min gap-4 md:grid-cols-3">
    {#await data.notes}
        <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <div class="bg-muted/50 aspect-video rounded-xl"></div>
            <div class="bg-muted/50 aspect-video rounded-xl"></div>
            <div class="bg-muted/50 aspect-video rounded-xl"></div>
        </div>
        <div class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"></div>
    {:then notes}
        {#each getNotesByType(notes, selectedTab) as note}
            <NoteCard note={note} />
        {/each}
    {:catch error}
        <p>Error loading notes: {error.message}</p>
    {/await}
</div>