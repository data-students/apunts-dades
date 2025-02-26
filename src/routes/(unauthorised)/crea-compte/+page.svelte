<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.ts";
  import { Label } from "$lib/components/ui/label/index.ts";
  import { Input } from "$lib/components/ui/input/index.ts";
  import { Button } from "$lib/components/ui/button/index.ts";
  import { Separator } from "$lib/components/ui/separator";
  import { LoaderCircle } from "lucide-svelte";
  import { goto } from "$app/navigation";
  import { pb } from "$lib/pocketbase.ts";

  let firstName = $state("");
  let lastName = $state("");
  let email = $state("");
  let password = $state("");
  let confirmPassword = $state("");
  let formError = $state(false);
  let formLoading = $state(false);
  let passwordMatch = $derived(!(password && confirmPassword) || password === confirmPassword);
  let emailUPC = $derived(!(email && email.includes("@")) || email.endsWith("estudiantat.upc.edu"));
  
  async function register() {
    formError = false;
    formLoading = true;
    try {
      const data = {
        name: `${firstName} ${lastName}`,
        email: email,
        emailVisibility: true,
        password: password,
        passwordConfirm: confirmPassword,
      };
      const record = await pb.collection('users').create(data);
      const response = await pb.collection("users").authWithPassword(email, password);
      if (pb.authStore.isValid) {
        goto("/");
      }
    } catch (error) {
      formError = true;
    } finally {
      formLoading = false;
    }
  }

  async function registerWithGoogle() {
    try {
      const response = await pb.collection('users').authWithOAuth2({ provider: 'google' });
      if (pb.authStore.isValid) {
        goto("/");
      }
    } catch (error) {}
  }
</script>

<svelte:head>
  <title>Crea un Compte - Apunts Dades</title>
</svelte:head>

<div class="flex items-center justify-center h-screen">
  <Card.Root class="max-w-sm mx-auto border-0 shadow-none sm:border sm:shadow-sm">
    <Card.Header>
      <Card.Title class="text-2xl">Crea un Compte</Card.Title>
      <Card.Description>Registra't a Apunts Dades per poder accedir i contribuir al repositori d'apunts del Grau en Ciència i Enginyeria de Dades de la UPC.</Card.Description>
    </Card.Header>
    <Card.Content>
      <form class="grid gap-4" onsubmit={register}>
        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <Label for="first-name">Nom</Label>
            <Input id="first-name" autocomplete="first-name" placeholder="Rosa" bind:value={firstName} required />
          </div>
          <div class="grid gap-2">
            <Label for="last-name">Cognom</Label>
            <Input id="last-name" autocomplete="last-name" placeholder="Melano" bind:value={lastName} required />
          </div>
        </div>
        <div class="grid gap-2">
          <Label for="email">Correu electrònic</Label>
          <Input id="email" type="email" autocomplete="email" placeholder="alumne@estudiantat.upc.edu" bind:value={email} required />
          {#if !emailUPC}
            <span class="text-sm text-red-500">Només s'accepten adreçes pertanyents a la UPC.</span>
          {/if}
        </div>
        <div class="grid gap-2">
          <Label for="password">Contrasenya</Label>
          <Input id="password" type="password" autocomplete="password" required bind:value={password} />
        </div>
        <div class="grid gap-2">
          <Label for="confirm-password">Confirma la Contrasenya</Label>
          <Input id="confirm-password" type="password" autocomplete="password" required bind:value={confirmPassword} />
          {#if !passwordMatch}
            <span class="text-sm text-red-500">Les contrasenyes han de coincidir.</span>
          {/if}
        </div>
        {#if formError}
          <span class="text-sm text-red-500">Error al crear el compte. Credencials invàlides.</span>
        {/if}
        <Button type="submit" class="w-full" disabled={!passwordMatch || !emailUPC || formLoading}>
          {#if formLoading}
            <LoaderCircle class="h-5 animate-spin" />
          {:else}
            Registra't
          {/if}
        </Button>
      </form>
      <Separator class="my-5" />
      <Button variant="outline" class="w-full space-x-1.5" onclick={registerWithGoogle}>
        <img src="/icons/google.svg" alt="Google Logo">
        <span>Registra't amb Google</span>
      </Button>
      <div class="mt-4 text-sm text-center">
        No tens compte?
        <a href="/inicia-sessio" class="underline">Inicia sessió</a>
      </div>
    </Card.Content>
  </Card.Root>
</div>