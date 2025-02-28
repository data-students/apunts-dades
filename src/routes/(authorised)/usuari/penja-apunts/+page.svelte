<script lang="ts">
	import { Label } from "$lib/components/ui/label/index.ts";
	import { Input } from "$lib/components/ui/input/index.ts";
	import { Button } from "$lib/components/ui/button/index.ts";
	import { LoaderCircle } from "lucide-svelte";
	import { Switch } from "$lib/components/ui/switch/index.js";
	import * as Select from "$lib/components/ui/select/index.js";
	
	import { pb } from "$lib/pocketbase.ts";
  
	let { data } = $props();
  
	const noteTypes = ["Teoria", "Lab", "Examen"];
  
	let note = $state({
		title: null,
		subject: null,
		type: null,
		hide_author: false,
		file: null,
		author: data.user.id
	});

	let files = $state(null);
  
	let form = $state({
		loading: false,
		error: false
	});

	async function upload() {
	  form.loading = true;
	  try {
		note.file = files[0];
		const record = await pb.collection("notes").create(note);
		window.location.reload();
		// success
	  } catch (error) {
		form.error = true;
		// error
	  } finally {
		note.title = null;
		note.subject = null;
		note.type = null;
		note.hide_author = false;
		note.file = null;
		form.error = false;
		form.loading = false;
	  }
	}
</script>
  
<form class="grid gap-4 pt-2" onsubmit={upload}>
	<div class="grid gap-2">
		<Label for="title">Títol</Label>
		<Input id="title" type="text" bind:value={note.title} required />
	</div>
	<div class="grid grid-cols-2 gap-4">
	<div class="grid gap-2">
		<Label for="first-name">Assignatura</Label>
		<Select.Root type="single" bind:value={note.subject} required>
			<Select.Trigger>
				{note.subject ? data.subjects.find(s => s.id === note.subject)?.acronym : "Selecciona una assignatura"}
			</Select.Trigger>
			<Select.Content>
				{#each data.subjects as subject}
				<Select.Item value={subject.id}>{subject.acronym}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
	<div class="grid gap-2">
		<Label for="type">Tipus</Label>
		<Select.Root type="single" bind:value={note.type} required>
			<Select.Trigger>
				{note.type ? note.type : "Selecciona un tipus"}
			</Select.Trigger>
			<Select.Content>
				{#each noteTypes as value}
				<Select.Item {value}>{value}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
	</div>
	<div class="grid gap-2">
		<Label for="show-author">Anonimitza l'autor</Label>
		<Switch bind:checked={note.hide_author} />
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
	{#if form.error}
		<span class="text-sm text-red-500">Error al penjar apunts.</span>
	{/if}
	<Button type="submit" class="w-full" disabled={form.loading}>
		{#if form.loading}
			<LoaderCircle class="h-5 animate-spin" />
		{:else}
			Penja Apunts
		{/if}
	</Button>
</form>
