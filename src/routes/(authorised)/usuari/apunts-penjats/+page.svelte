<script lang="ts">
    import UserNoteCard from "$lib/components/UserNoteCard.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import Upload from "lucide-svelte/icons/upload";

    let { data } = $props();

    let userNotes = data.notes.filter(note => note.author === data.user.id);
</script>

<div class="mt-2 space-y-4">
    {#each userNotes as note}
        <UserNoteCard note={note} />
    {:else}
        <div class="text-center mt-16">
            <p class="mb-8 text-muted-foreground">Encara no has compartit cap apunt.</p>
            <Button href="/usuari/penja-apunts">
                <Upload />
                Penja apunts
            </Button>
        </div>
    {/each}
</div>
