<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.ts";
    import { Input } from "$lib/components/ui/input/index.ts";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Button } from "$lib/components/ui/button/index.ts";
    import { LoaderCircle } from "lucide-svelte";

    import { getUserAvatarUrl } from "$lib/pocketbase.ts";

    import { pb } from "$lib/pocketbase.ts";

    let { data } = $props();

    let user = $state(data.user);
    let formError = $state(false);
    let formLoading = $state(false);
    
    let emailUPC = $derived(!(user.email && user.email.includes("@")) || user.email.endsWith("estudiantat.upc.edu"));
    
    const selectedLabels = $derived(
        user.subjects.length
            ? data.subjects
                .filter((s) => user.subjects.includes(s.id))
                .map((s) => s.acronym)
                .join(", ")
            : "Selecciona assignatures"
    );

    async function updateUser() {
        formLoading = true;
	  try {
        const record = await pb.collection('users').update(data.user.id, user);
        window.location.reload();
		// success
	  } catch (error) {
		// error
	  } finally {
        formLoading = false;
      }
    }
</script>

<form class="grid gap-4 pt-2" onsubmit={updateUser}>
    <div class="grid gap-2">
        <Label for="first-name">Nom</Label>
        <Input id="first-name" bind:value={user.name} required />
    </div>

    <div class="grid gap-2">
        <Label for="email">Correu electrònic</Label>
        <Input id="email" type="email" bind:value={user.email} required />
        {#if !emailUPC}
          <span class="text-sm text-red-500">Només s'accepten adreçes pertanyents a la UPC.</span>
        {/if}
    </div>

    <div class="grid gap-2">
        <Label for="subjects">Assignatures cursades actualment</Label>
        <Select.Root type="multiple" bind:value={user.subjects}>
            <Select.Trigger>{selectedLabels}</Select.Trigger>
            <Select.Content>
                {#each data.subjects as subject}
                    <Select.Item value={subject.id}>{subject.acronym}</Select.Item>
                {/each}
            </Select.Content>
        </Select.Root>
    </div>

    {#if user.avatar}
        <div class="grid gap-2">
            <Label>Avatar</Label>
            <img src={getUserAvatarUrl(data.user)} alt={user.name} class="h-16 w-16" />
        </div>
    {/if}

    {#if formError}
        <span class="text-sm text-red-500">Error al crear el compte. Credencials invàlides.</span>
    {/if}
    <Button type="submit" class="w-full">
        {#if formLoading}
            <LoaderCircle class="h-5 animate-spin" />
        {:else}
            Guardar
        {/if}
    </Button>
</form>