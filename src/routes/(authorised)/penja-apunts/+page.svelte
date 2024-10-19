<script>
  import * as Card from "$lib/components/ui/card/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { LoaderCircle } from "lucide-svelte";
  import { pb } from "$lib/pocketbase.js";

  let title = $state("");
  let files = $state(null);
  let formLoading = $state(false);

  async function upload() {
    formLoading = true;
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("file", files[0]);
      const record = await pb.collection("apunts").create(data);
      // success
    } catch (error) {
      // error
    } finally {
      formLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Penja Apunts - Apunts Dades</title>
</svelte:head>

<div class="flex items-center justify-center h-screen">
  <Card.Root class="max-w-sm mx-auto border-0 shadow-none sm:border sm:shadow-sm">
    <Card.Header>
      <Card.Title class="text-2xl">Penja Apunts</Card.Title>
      <Card.Description>Penja apunts a Apunts Dades.</Card.Description>
    </Card.Header>
    <Card.Content>
      <form class="grid gap-4" onsubmit={upload}>
        <div class="grid gap-2">
          <Label for="title">Títol</Label>
          <Input id="title" type="text" bind:value={title} required />
        </div>
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <Label for="file">Arxiu</Label>
          <input type="file" bind:files required>
        </div>
        <Button type="submit" class="w-full" disabled={formLoading}>
          {#if formLoading}
            <LoaderCircle class="h-5 animate-spin" />
          {:else}
            Penja Apunts
          {/if}
        </Button>
      </form>
    </Card.Content>
  </Card.Root>
</div>