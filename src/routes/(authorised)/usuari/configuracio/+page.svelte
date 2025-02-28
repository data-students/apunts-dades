<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.ts";
    import * as Select from "$lib/components/ui/select/index.js";
  
    let { data } = $props();
    let selected = $state([]);
    
    const selectedLabels = $derived(
        selected.length
            ? data.subjects
                .filter((s) => selected.includes(s.id))
                .map((s) => s.acronym)
                .join(", ")
            : "Selecciona assignatures"
    );
</script>

<form class="grid gap-4 pt-2">
    <div class="grid gap-2">
        <Label for="subjects">Assignatures</Label>
        <Select.Root type="multiple" bind:value={selected}>
            <Select.Trigger>{selectedLabels}</Select.Trigger>
            <Select.Content>
                {#each data.subjects as subject}
                    <Select.Item value={subject.id}>{subject.acronym}</Select.Item>
                {/each}
            </Select.Content>
        </Select.Root>
    </div>
</form>