<script lang="ts">
    import { getFileUrl } from "$lib/pocketbase";

	let { data } = $props();
</script>

<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    {#await data.subject}
        Loading subject...
    {:then subject}
        <h2 class="text-3xl font-semibold">{subject.title}</h2>
        <p>Q{subject.quarter}</p>
    {:catch error}
        <p>Error loading subject: {error.message}</p>
    {/await}

    {#await data.notes}
        Loading notes...
    {:then notes}
        {#each data.notes as notes}
            <a href={getFileUrl(notes)} target="_blank">
                <div class="space-y-2 hover:opacity-80 transition-opacity">
                    <h2>{notes.title}</h2>
                </div>
            </a>
        {/each}
    {:catch error}
        <p>Error loading notes: {error.message}</p>
    {/await}

	<div class="grid auto-rows-min gap-4 md:grid-cols-3">
		<div class="bg-muted/50 aspect-video rounded-xl"></div>
		<div class="bg-muted/50 aspect-video rounded-xl"></div>
		<div class="bg-muted/50 aspect-video rounded-xl"></div>
	</div>

	<div class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"></div>
</div>
