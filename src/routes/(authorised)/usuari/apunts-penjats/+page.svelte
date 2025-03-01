<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js";
    import { Button } from "$lib/components/ui/button";
    import Upload from "lucide-svelte/icons/upload";
    import Edit from "lucide-svelte/icons/pencil";

    let { data } = $props();

    let userNotes = data.notes.filter(note => note.author === data.user.id);

    function formatDate(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('ca-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
    }
</script>

<div class="mt-4">
    {#if userNotes.length > 0}
        <Table.Root>
            <Table.Header>
                <Table.Row class="hover:bg-transparent">
                    <Table.Head>Títol</Table.Head>
                    <Table.Head>Assignatura</Table.Head>
                    <Table.Head class="hidden md:table-cell max-w-20">Penjat</Table.Head>
                    <Table.Head class="max-w-4"></Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each userNotes as note}
                    <Table.Row >
                        <a href={`/usuari/apunts-penjats/${note.id}`} class="contents">
                            <Table.Cell class="font-semibold">{note.title}</Table.Cell>
                            <Table.Cell>{note.expand.subject.acronym}</Table.Cell>
                            <Table.Cell class="hidden md:table-cell max-w-20">{formatDate(note.created)}</Table.Cell>
                            <Table.Cell class="max-w-4">
                                <Edit class="w-4 h-4" />
                            </Table.Cell>
                        </a>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    {:else}
        <div class="text-center mt-16">
            <p class="mb-8 text-muted-foreground">Encara no has compartit cap apunt.</p>
            <Button href="/usuari/penja-apunts">
                <Upload class="h-4 w-4 mr-2" />
                Penja apunts
            </Button>
        </div>
    {/if}
</div>