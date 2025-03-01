<script lang="ts">
    import UserNoteCard from "$lib/components/UserNoteCard.svelte";

    let { data } = $props();

    let userNotes = data.notes.filter(note => note.author === data.user.id);
</script>

<div class="mt-2 space-y-4">
    {#each userNotes as note}
        <UserNoteCard note={note} />
    {/each}
</div>
