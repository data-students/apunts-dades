<script>
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Separator } from "$lib/components/ui/separator";
</script>

<svelte:head>
  <title>Inicia sessió - Apunts Dades</title>
</svelte:head>

<div class="flex items-center justify-center h-screen">
    <Card.Root class="max-w-sm mx-auto">
    <Card.Header>
        <Card.Title class="text-2xl">Inicia sessió</Card.Title>
        <Card.Description>Introdueix el teu correu electrònic i contrasenya per iniciar sessió al teu compte.</Card.Description>
    </Card.Header>
    <Card.Content>
        <div class="grid gap-4">
        <div class="grid gap-2">
            <Label for="email">Correu electrònic</Label>
            <Input id="email" type="email" placeholder="alumne@estudiantat.upc.edu" required />
        </div>
        <div class="grid gap-2">
            <div class="flex items-center">
            <Label for="password">Contrasenya</Label>
            <a href="/recupera-contrasenya" class="inline-block ml-auto text-sm underline">
                Has oblidat la contrasenya?
            </a>
            </div>
            <Input id="password" type="password" required />
        </div>
        <Button type="submit" class="w-full">Inicia sessió</Button>
        <Separator class="my-1" />
        <Button variant="outline" class="w-full">Inicia sessió amb Google</Button>
        </div>
        <div class="mt-4 text-sm text-center">
          No tens compte?
          <a href="/crea-compte" class="underline">Registra't</a>
        </div>
    </Card.Content>
    </Card.Root>
</div>