<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.ts";
    import { Input } from "$lib/components/ui/input/index.ts";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Button } from "$lib/components/ui/button/index.ts";
    import { LoaderCircle } from "lucide-svelte";


    import { getUserAvatarUrl } from "$lib/pocketbase.ts";

  
    let { data } = $props();

    let name = $state(data.user.name);
    let email = $state(data.user.email);
    let selectedSubjects = $state(data.user.subjects);
    let formError = $state(false);
    let formLoading = $state(false);
    
    let emailUPC = $derived(!(email && email.includes("@")) || email.endsWith("estudiantat.upc.edu"));
    
    const selectedLabels = $derived(
        selectedSubjects.length
            ? data.subjects
                .filter((s) => selectedSubjects.includes(s.id))
                .map((s) => s.acronym)
                .join(", ")
            : "Selecciona assignatures"
    );

    function updateUser() {
        console.log("updateUser");
    }
</script>

<form class="grid gap-4 pt-2" onsubmit={updateUser}>
    <div class="grid gap-2">
        <Label for="first-name">Nom</Label>
        <Input id="first-name" placeholder="Rosa" bind:value={name} required />
    </div>

    <div class="grid gap-2">
        <Label for="email">Correu electrònic</Label>
        <Input id="email" type="email" autocomplete="email" placeholder="alumne@estudiantat.upc.edu" bind:value={email} required />
        {#if !emailUPC}
          <span class="text-sm text-red-500">Només s'accepten adreçes pertanyents a la UPC.</span>
        {/if}
    </div>

    <div class="grid gap-2">
        <Label for="subjects">Assignatures cursades actualment</Label>
        <Select.Root type="multiple" bind:value={selectedSubjects}>
            <Select.Trigger>{selectedLabels}</Select.Trigger>
            <Select.Content>
                {#each data.subjects as subject}
                    <Select.Item value={subject.id}>{subject.acronym}</Select.Item>
                {/each}
            </Select.Content>
        </Select.Root>
    </div>

    {#if data.user.avatar}
        <div class="grid gap-2">
            <Label>Avatar</Label>
            <img src={getUserAvatarUrl(data.user)} alt={data.user.name} class="h-16 w-16" />
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