<script>
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Separator } from "$lib/components/ui/separator";
  import Google from "$lib/components/icons/Google.svelte";

  let name;
  let surname;
  let email;
  let password;

  async function register() {
    const user = await pb.collection('users').authWithPassword(email, password);
    if (user) {
      goto('/');
    } else {
      alert('Error al iniciar sessió');
    }
  }
</script>

<svelte:head>
  <title>Crea un Compte - Apunts Dades</title>
</svelte:head>

<div class="flex items-center justify-center h-screen">
    <Card.Root class="max-w-sm mx-auto">
    <Card.Header>
        <Card.Title class="text-2xl">Crea un Compte</Card.Title>
        <Card.Description>Registra't a Apunts Dades per poder accedir i contribuir al repositori d'apunts del Grau en Ciència i Enginyeria de Dades de la UPC.</Card.Description>
    </Card.Header>
    <Card.Content>
        <div class="grid gap-4">
        <div class="grid gap-2">
            <Label for="email">Correu electrònic</Label>
            <Input id="email" type="email" placeholder="alumne@estudiantat.upc.edu" required />
        </div>
        <div class="grid gap-2">
            <Label for="password">Contrasenya</Label>
            <Input id="password" type="password" required />
        </div>
        <div class="grid gap-2">
            <Label for="password">Repeteix Contrasenya</Label>
            <Input id="password" type="password" required />
        </div>
        <Button type="submit" class="w-full">Registra't</Button>
        <Separator class="my-1" />
        <Button variant="outline" class="w-full space-x-1.5">
            <Google />
            <span>Registra't amb Google</span>
        </Button>
        </div>
        <div class="mt-4 text-sm text-center">
          Ja tens compte?
          <a href="/inicia-sessio" class="underline">Inicia sessió</a>
        </div>
    </Card.Content>
    </Card.Root>
</div>