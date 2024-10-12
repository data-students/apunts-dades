<script>
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<svelte:head>
  <title>Recupera la contrasenya - Apunts Dades</title>
</svelte:head>

<div class="flex items-center justify-center h-screen">
    <Card.Root class="max-w-sm mx-auto">
    <Card.Header>
        <Card.Title class="text-2xl">Recupera la contrasenya</Card.Title>
        <Card.Description>Introdueix el teu correu electrònic per rebre un correu de recuperació de contrasenya.</Card.Description>
    </Card.Header>
    <Card.Content>
        <div class="grid gap-4">
        <div class="grid gap-2">
            <Label for="email">Correu electrònic</Label>
            <Input id="email" type="email" placeholder="alumne@estudiantat.upc.edu" required />
        </div>
        <Button type="submit" class="w-full">Envia correu de recuperació</Button>
        </div>
        <div class="mt-4 text-sm text-center">
          Ja la recordes?
          <a href="/inicia-sessio" class="underline">Inicia sessió</a>
        </div>
    </Card.Content>
    </Card.Root>
</div>