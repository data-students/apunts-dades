<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.ts";
    import { Separator } from "$lib/components/ui/separator";
    import * as Select from "$lib/components/ui/select/index.js";
  
    let { data } = $props();
    let selected = $state<string[]>([]);
    
    const selectedLabels = $derived(
        selected.length
            ? data.subjects
                .filter((s) => selected.includes(s.id))
                .map((s) => s.acronym)
                .join(", ")
            : "Selecciona assignatures"
    );
</script>

<h2 class="text-3xl font-semibold tracking-tight">Configuració</h2>
<Separator />

<Label for="subjects">Assignatures</Label>
<Select.Root type="multiple" bind:value={selected}>
	<Select.Trigger>{selectedLabels}</Select.Trigger>
	<Select.Content>
		{#each data.subjects as subject}
			<Select.Item value={subject.id}>{subject.acronym}</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
