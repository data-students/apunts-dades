<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.ts';
	import { Label } from '$lib/components/ui/label/index.ts';
	import { Input } from '$lib/components/ui/input/index.ts';
	import { Button } from '$lib/components/ui/button/index.ts';
	import { Separator } from '$lib/components/ui/separator';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { toast } from 'svelte-sonner';

	import { goto } from '$app/navigation';

	import { pb } from '$lib/pocketbase';

	let credentials = $state({
		email: '',
		password: ''
	});

	let loading = $state(false);

	async function login() {
		loading = true;
		try {
			const response = await pb
				.collection('users')
				.authWithPassword(credentials.email, credentials.password);
			if (pb.authStore.isValid) {
				if (!response.record.verified) {
					toast.error("Verifica el correu electrònic abans d'iniciar sessió");
					pb.authStore.clear();
				} else {
					toast.success('Sessió iniciada correctament');
					goto('/');
				}
			}
		} catch (error) {
			toast.error('Error al iniciar sessió. Verifica les credencials');
		} finally {
			loading = false;
		}
	}

	async function loginWithGoogle() {
		try {
			const response = await pb.collection('users').authWithOAuth2({ provider: 'google' });
			if (pb.authStore.isValid) {
				if (response.meta.isNew) {
					await pb.collection('users').update(response.record.id, {
						name: response.meta.name
						// "avatar": response.meta.avatarUrl
					});
					toast.success('Compte creat correctament');
				} else {
					toast.success('Sessió iniciada correctament');
				}
				goto('/');
			}
		} catch (error) {
			toast.error('Error al iniciar sessió amb Google');
		}
	}
</script>

<svelte:head>
	<title>Inicia Sessió - Apunts Dades</title>
</svelte:head>

<div class="flex items-center justify-center h-screen">
	<Card.Root class="max-w-sm mx-auto border-0 shadow-none sm:border sm:shadow-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Inicia Sessió</Card.Title>
			<Card.Description
				>Introdueix el teu correu electrònic i contrasenya per iniciar sessió al teu compte.</Card.Description
			>
		</Card.Header>
		<Card.Content>
			<form class="grid gap-4" onsubmit={login}>
				<div class="grid gap-2">
					<Label for="email">Correu electrònic</Label>
					<Input
						id="email"
						type="email"
						autocomplete="email"
						placeholder="alumne@estudiantat.upc.edu"
						bind:value={credentials.email}
						required
					/>
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Contrasenya</Label>
						<a href="/recupera-contrasenya" class="inline-block ml-auto text-sm underline">
							Has oblidat la contrasenya?
						</a>
					</div>
					<Input id="password" type="password" required bind:value={credentials.password} />
				</div>
				<Button type="submit" class="w-full" disabled={loading}>
					{#if loading}
						<LoaderCircle class="h-5 animate-spin" />
					{:else}
						Inicia sessió
					{/if}
				</Button>
			</form>
			<Separator class="my-5" />
			<Button variant="outline" class="w-full space-x-1.5" onclick={loginWithGoogle}>
				<img src="/icons/google.svg" alt="Google Logo" />
				<span>Inicia sessió amb Google</span>
			</Button>
			<div class="mt-4 text-sm text-center">
				No tens compte?
				<a href="/crea-compte" class="underline">Registra't</a>
			</div>
		</Card.Content>
	</Card.Root>
</div>
