<script lang="ts">
  import { Label } from "$lib/components/ui/label/index.ts";
  import { Input } from "$lib/components/ui/input/index.ts";
  import { Button } from "$lib/components/ui/button/index.ts";
  import { LoaderCircle } from "lucide-svelte";
  import { Switch } from "$lib/components/ui/switch/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { pb } from "$lib/pocketbase.ts";

  let { data } = $props();

  const noteTypes = [
    { value: 'theory', label: 'Teoria' },
    { value: 'lab', label: 'Laboratori' },
    { value: 'exam', label: 'Examens' }
  ];

  let title = $state("");
  let files = $state(null);
  let subject = $state(null);
  let type = $state(null);
  let hideAuthor = $state(false);
  let formLoading = $state(false);

  async function upload() {
    formLoading = true;
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("file", files[0]);
      data.append("hide_author", hideAuthor);
      data.append("subject", subject);
      data.append("type", type);
      const record = await pb.collection("notes").create(data);
      // success
    } catch (error) {
      // error
    } finally {
      formLoading = false;
    }
  }
</script>

<div class="mx-auto max-w-2xl w-full">
  <div class="space-y-2">
    <h2 class="text-3xl font-semibold">Penja Apunts</h2>
    <p class="text-sm text-neutral-600">
      Contribueix a Apunts Dades penjant apunts per compartir-los amb la resta d'estudiants. 
      Abans de penjar un apunt duplicat, comprova si ja està disponible a la plataforma.
    </p>
  </div>

  <form class="grid gap-4 mt-8" onsubmit={upload}>
    <div class="grid gap-2">
      <Label for="title">Títol</Label>
      <Input id="title" type="text" bind:value={title} required />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="grid gap-2">
        <Label for="first-name">Assignatura</Label>
        <Select.Root type="single" bind:value={subject} required>
          <Select.Trigger>
            {subject ? data.subjects.find(s => s.id === subject)?.title : "Selecciona una assignatura"}
          </Select.Trigger>
          <Select.Content>
            {#each data.subjects as subject}
              <Select.Item value={subject.id}>{subject.title}</Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </div>
      <div class="grid gap-2">
        <Label for="type">Tipus</Label>
        <Select.Root type="single" bind:value={type} required>
          <Select.Trigger>
            {type ? noteTypes.find(t => t.value === type)?.label : "Selecciona un tipus"}
          </Select.Trigger>
          <Select.Content>
            {#each noteTypes as { value, label }}
              <Select.Item {value}>{label}</Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </div>
    </div>

    <div class="grid gap-2">
      <Label for="show-author">Anonimitza l'autor</Label>
      <Switch bind:checked={hideAuthor} />
    </div>
    
    <div class="grid gap-2">
      <Label for="title">Fitxer</Label>
      <div class="relative h-60 w-full border-2 border-dashed rounded-lg hover:border-neutral-400 transition-colors flex items-center justify-center">
        <input
          type="file"
          bind:files
          required
          class="absolute w-full h-full opacity-0 cursor-pointer"
        />
        {#if files?.[0]}
          <p class="text-sm font-medium">{files[0].name}</p>
        {:else}
          <p class="text-sm">Feu clic per carregar o arrossegueu i deixeu anar</p>
        {/if}
      </div>
    </div>

    <Button type="submit" class="w-full" disabled={formLoading}>
      {#if formLoading}
        <LoaderCircle class="h-5 animate-spin" />
      {:else}
        Penja Apunts
      {/if}
    </Button>
  </form>
</div>