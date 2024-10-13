<script>
  import * as Card from "$lib/components/ui/card/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { LoaderCircle } from "lucide-svelte";
  import { pb } from "$lib/pocketbase.js";

  let email = $state("");
  let formError = $state(false);
  let formLoading = $state(false);

  async function recover() {
    formError = false;
    formLoading = true;
    try {
      const response = await pb.collection('users').requestVerification(email);
    } catch (error) {
      formError = true;
    } finally {
      formLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Recupera la Contrasenya - Apunts Dades</title>
</svelte:head>

<div class="flex items-center justify-center h-screen">
  <Card.Root class="max-w-sm mx-auto border-0 shadow-none sm:border sm:shadow-sm">
    <Card.Header>
      <Card.Title class="text-2xl">Recupera la Contrasenya</Card.Title>
      <Card.Description>Introdueix el teu correu electrònic per rebre un correu de recuperació de contrasenya.</Card.Description>
    </Card.Header>
    <Card.Content>
      <form class="grid gap-4" onsubmit={recover}>
        <div class="grid gap-2">
          <Label for="email">Correu electrònic</Label>
          <Input id="email" type="email" autocomplete="email" placeholder="alumne@estudiantat.upc.edu" bind:value={email} required />
        </div>
        {#if formError}
          <span class="text-sm text-red-500">Aquest email no està associat a cap compte.</span>
        {/if}
        <Button type="submit" class="w-full" disabled={formLoading}>
          {#if formLoading}
            <LoaderCircle class="h-5 animate-spin" />
          {:else}
            Envia correu de recuperació
          {/if}
        </Button>
      </form>
      <div class="mt-4 text-sm text-center">
        Ja la recordes?
        <a href="/inicia-sessio" class="underline">Inicia sessió</a>
      </div>
    </Card.Content>
  </Card.Root>
</div>