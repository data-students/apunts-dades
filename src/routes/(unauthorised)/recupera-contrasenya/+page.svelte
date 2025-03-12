<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.ts";
  import { Label } from "$lib/components/ui/label/index.ts";
  import { Input } from "$lib/components/ui/input/index.ts";
  import { Button } from "$lib/components/ui/button/index.ts";
  import { LoaderCircle } from "lucide-svelte";
  import { toast } from "svelte-sonner";
  
  import { pb } from "$lib/pocketbase";

  let email = $state("");

  let loading = $state(false);

  async function recover() {
    loading = true;
    try {
      await pb.collection('users').requestPasswordReset(email);
      toast.success('Correu de recuperació enviat correctament');
    } catch (error) {
      toast.error('Error al recuperar la contrasenya. Verifica el correu electrònic');
    } finally {
      loading = false;
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
        <Button type="submit" class="w-full" disabled={loading}>
          {#if loading}
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
