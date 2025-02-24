<script lang="ts">
	let { data } = $props();
</script>

<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
	{#await data.assignatures}
		Loading assignatures...
	{:then assignatures}
		{#each data.assignatures as assignatura}
			<a href={`/assignatura/${assignatura.id}`} class="block">
				<div class="space-y-2 hover:opacity-80 transition-opacity">
					<h2>{assignatura.titol}</h2>
				</div>
			</a>
		{/each}
	{:catch error}
		<p>Error loading assignatures: {error.message}</p>
	{/await}

	<div class="grid auto-rows-min gap-4 md:grid-cols-3">
		<div class="bg-muted/50 aspect-video rounded-xl"></div>
		<div class="bg-muted/50 aspect-video rounded-xl"></div>
		<div class="bg-muted/50 aspect-video rounded-xl"></div>
	</div>

	<div class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"></div>
</div>
