<script lang="ts">
	import * as Tabs from "$lib/components/ui/tabs/index.js";

	import SubjectCard from "$lib/components/SubjectCard.svelte";

	let { data } = $props();

	let selectedTab = $state("all");
</script>

<h2 class="text-3xl font-semibold">Assignatures</h2>

<Tabs.Root value={selectedTab} class="w-full" onValueChange={(value) => selectedTab = value}>
    <Tabs.List>
        <Tabs.Trigger value="all">Totes</Tabs.Trigger>
        <Tabs.Trigger value="theory">Actuals</Tabs.Trigger>
    </Tabs.List>
</Tabs.Root>

<div class="grid auto-rows-min gap-4 md:grid-cols-3">

	{#await data.subjects}
		Loading subjects...
	{:then subjects}
		{#each subjects as subject}
			<SubjectCard subject={subject} />
		{/each}
	{:catch error}
		<p>Error loading subjects: {error.message}</p>
	{/await}
</div>



<div class="grid auto-rows-min gap-4 md:grid-cols-3">
	<div class="bg-muted/50 aspect-video rounded-xl"></div>
	<div class="bg-muted/50 aspect-video rounded-xl"></div>
	<div class="bg-muted/50 aspect-video rounded-xl"></div>
</div>

<div class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"></div>
