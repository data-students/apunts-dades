<script lang="ts">
	import { Badge } from "$lib/components/ui/badge/index.js";

	let { data } = $props();
</script>

{#await data.subjects}
	Loading subjects...
{:then subjects}
	{#each subjects as subject}
		<a href={`/assignatura/${subject.id}`}>
			<div class="space-y-2 hover:opacity-80 transition-opacity">
				<h2>{subject.title}</h2>
				<Badge variant="outline">{subject.quarter}</Badge>
			</div>
		</a>
	{/each}
{:catch error}
	<p>Error loading subjects: {error.message}</p>
{/await}

<div class="grid auto-rows-min gap-4 md:grid-cols-3">
	<div class="bg-muted/50 aspect-video rounded-xl"></div>
	<div class="bg-muted/50 aspect-video rounded-xl"></div>
	<div class="bg-muted/50 aspect-video rounded-xl"></div>
</div>

<div class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"></div>
