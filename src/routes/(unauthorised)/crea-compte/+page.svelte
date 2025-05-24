<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.ts';
	import { Label } from '$lib/components/ui/label/index.ts';
	import { Input } from '$lib/components/ui/input/index.ts';
	import { Button } from '$lib/components/ui/button/index.ts';
	import { Separator } from '$lib/components/ui/separator';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	import { pb } from '$lib/pocketbase';
	import posthog from 'posthog-js';

	let firstName = $state('');
	let lastName = $state('');

	let user = $state({
		name: '',
		email: '',
		emailVisibility: true,
		password: '',
		passwordConfirm: ''
	});

	let loading = $state(false);

	let emailUPC = $derived(
		!(user.email && user.email.includes('@')) || user.email.endsWith('estudiantat.upc.edu')
	);
	let passwordMatch = $derived(
		!(user.password && user.passwordConfirm) || user.password === user.passwordConfirm
	);
	let passwordLength = $derived(user.password === '' || user.password.length >= 8);

	async function register() {
		loading = true;
		try {
			user.name = firstName + ' ' + lastName;
			await pb.collection('users').create(user);
			await pb.collection('users').requestVerification(user.email);
			posthog.capture('register_user');
			toast.success('Compte creat correctament. Verifica el correu electrònic');
			goto('/inicia-sessio');
		} catch (error) {
			toast.error('Error al crear el compte. Credencials invàlides');
		} finally {
			loading = false;
		}
	}

	async function registerWithGoogle() {
		try {
			const response = await pb.collection('users').authWithOAuth2({ provider: 'google' });
			if (pb.authStore.isValid) {
				if (response.meta.isNew) {
					await pb.collection('users').update(response.record.id, {
						name: response.meta.name
						// "avatar": response.meta.avatarUrl
					});
					posthog.capture('register_user_google');
					toast.success('Compte creat correctament');
				} else {
					toast.success('Sessió iniciada correctament');
				}
				goto('/');
			}
		} catch (error) {
			toast.error('Error al crear compte amb Google');
		}
	}
</script>

<svelte:head>
	<title>Crea un Compte - Apunts Dades</title>
</svelte:head>

<div class="flex items-center justify-center h-screen">
	<div>
		<Card.Root class="max-w-sm mx-auto border-0 shadow-none sm:border sm:shadow-sm">
			<Card.Header>
				<Card.Title class="text-2xl">Crea un Compte</Card.Title>
				<Card.Description
					>Registra't a Apunts Dades per poder accedir i contribuir al repositori d'apunts del Grau
					en Ciència i Enginyeria de Dades de la UPC.</Card.Description
				>
			</Card.Header>
			<Card.Content>
				<form class="grid gap-4" onsubmit={register}>
					<div class="grid grid-cols-2 gap-4">
						<div class="grid gap-2">
							<Label for="first-name">Nom</Label>
							<Input id="first-name" placeholder="Rosa" bind:value={firstName} required />
						</div>
						<div class="grid gap-2">
							<Label for="last-name">Cognoms</Label>
							<Input id="last-name" placeholder="Melano" bind:value={lastName} required />
						</div>
					</div>
					<div class="grid gap-2">
						<Label for="email">Correu electrònic</Label>
						<Input
							id="email"
							type="email"
							autocomplete="email"
							placeholder="alumne@estudiantat.upc.edu"
							bind:value={user.email}
							required
						/>
						{#if !emailUPC}
							<span class="text-sm text-red-500"
								>Només s'accepten adreçes pertanyents a la UPC.</span
							>
						{/if}
					</div>
					<div class="grid gap-2">
						<Label for="password">Contrasenya</Label>
						<Input id="password" type="password" required bind:value={user.password} />
					</div>
					<div class="grid gap-2">
						<Label for="confirm-password">Confirma la Contrasenya</Label>
						<Input
							id="confirm-password"
							type="password"
							required
							bind:value={user.passwordConfirm}
						/>
						{#if !passwordMatch}
							<span class="text-sm text-red-500">Les contrasenyes han de coincidir.</span>
						{/if}
						{#if !passwordLength}
							<span class="text-sm text-red-500"
								>La contrasenya ha de tenir almenys 8 caracters.</span
							>
						{/if}
					</div>
					<Button
						type="submit"
						class="w-full"
						disabled={!passwordMatch || !emailUPC || !passwordLength || loading}
					>
						{#if loading}
							<LoaderCircle class="h-5 animate-spin" />
						{:else}
							Registra't
						{/if}
					</Button>
				</form>
				<Separator class="my-5" />
				<Button variant="outline" class="w-full space-x-1.5" onclick={registerWithGoogle}>
					<img src="/icons/google.svg" alt="Google Logo" />
					<span>Registra't amb Google</span>
				</Button>
				<div class="mt-4 text-sm text-center">
					Ja tens compte?
					<a href="/inicia-sessio" class="underline">Inicia sessió</a>
				</div>
			</Card.Content>
		</Card.Root>
		<div class="sm:mt-3 text-xs text-center text-muted-foreground">
			Al registrar-te, acceptes els
			<a href="/termes-i-condicions" class="underline">Termes i Condicions</a>
		</div>
	</div>
</div>
