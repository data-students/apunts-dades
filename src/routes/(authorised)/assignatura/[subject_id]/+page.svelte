<script lang="ts">
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import * as Table from "$lib/components/ui/table/index.js";
    import Search from "lucide-svelte/icons/search";
    import Upload from "lucide-svelte/icons/upload";

    import { getFileUrl } from "$lib/pocketbase";
    import { formatDate } from "$lib/utils";
    
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
    {#each Array.from({ length: 24 }) as _, index (index)}
        <div class="bg-muted/50 aspect-video h-12 w-full rounded-lg"></div>
    {/each}
{:then notes}
    {#if filteredNotes.length > 0}
        <Table.Root>
            <Table.Header>
                <Table.Row class="hover:bg-transparent">
                    <Table.Head>Títol</Table.Head>
                    <Table.Head>Tema</Table.Head>
                    <Table.Head>Tipus</Table.Head>
                    <Table.Head class="hidden md:table-cell">Compartit per</Table.Head>
                    <Table.Head class="hidden md:table-cell">Penjat</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each filteredNotes as note}
                    <Table.Row class="hover:cursor-pointer">
                        <a 
                            href={getFileUrl(note)} 
                            target="_blank"
                            class="contents"
                        >
                            <Table.Cell class="font-semibold">{note.title}</Table.Cell>
                            <Table.Cell>
                                {#if note.expand.topic}
                                    {note.expand.topic.title}
                                {/if}
                            </Table.Cell>
                            <Table.Cell>
                                <Badge variant="outline">{note.type}</Badge>
                            </Table.Cell>
                            <Table.Cell class="hidden md:table-cell">
                                {#if note.hideAuthor}
                                    Anònim
                                {:else}
                                    {note.expand.author.name}
                                {/if}
                            </Table.Cell>
                            <Table.Cell class="hidden md:table-cell">{formatDate(note.created)}</Table.Cell>
                        </a>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    {:else if data.notes.length === 0}
        <div class="text-center mt-32">
            <p class="mb-8 text-muted-foreground">Aquesta assignatura encara no te cap apunt.</p>
            <Button href="/usuari/penja-apunts">
                <Upload />
                Penja apunts
            </Button>
        </div>
    {:else}
        <p class="text-sm text-muted-foreground text-center mt-32">Cap apunt trobat</p>
    {/if}
{:catch error}
    <p class="text-sm text-red-500 text-center mt-32">Error carregant apunts: {error.message}</p>
{/await}
