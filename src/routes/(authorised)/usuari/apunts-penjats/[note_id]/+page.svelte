<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.ts';
	import { Input } from '$lib/components/ui/input/index.ts';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Button } from '$lib/components/ui/button/index.ts';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { toast } from 'svelte-sonner';

	import { pb } from '$lib/pocketbase';

	let { data } = $props();

	let note = $state(data.note);
	let files = $state(null) as FileList | null;

	let loading = $state(false);

	async function updateNote() {
		loading = true;
		try {
			if (files) {
				// Delete the old file
				await pb.collection('notes').update(data.note.id, {
					file: []
				});

				// Update with the new file
				note.file = files[0];
			}

			await pb.collection('notes').update(data.note.id, note);
			toast.success('Apunts actualitzats correctament');
		} catch (error) {
			toast.error('Error al actualitzar els apunts');
			console.error(error);
		} finally {
			loading = false;
		}
	}
</script>

<form class="grid gap-4 pt-2" onsubmit={updateNote}>
	<div class="grid gap-2">
		<Label for="title">Títol</Label>
		<Input id="title" type="text" bind:value={note.title} required />
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<div class="grid gap-2">
			<Label for="first-name">Assignatura</Label>
			<Select.Root
				type="single"
				bind:value={note.subject}
				required
				onValueChange={() => (note.topic = '')}
			>
				<Select.Trigger>
					{note.subject
						? data.subjects.find((s) => s.id === note.subject)?.acronym
						: 'Selecciona una assignatura'}
				</Select.Trigger>
				<Select.Content>
					{#each data.subjects as subject (subject.id)}
						<Select.Item value={subject.id}>{subject.acronym}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
		<div class="grid gap-2">
			<Label for="topic">Tema</Label>
			<Select.Root type="single" bind:value={note.topic} required disabled={!note.subject}>
				<Select.Trigger>
					{#if note.topic && note.subject}
						{data.topics.find((t) => t.id === note.topic)?.title || 'Selecciona un tema'}
					{:else if note.subject}
						Selecciona un tema
					{:else}
						Primer selecciona una assignatura
					{/if}
				</Select.Trigger>
				<Select.Content>
					{#if note.subject}
						{#each data.topics.filter((t) => t.subject === note.subject) as topic (topic.id)}
							<Select.Item value={topic.id}>{topic.title}</Select.Item>
						{/each}
					{:else}
						<Select.Item value="" disabled>Primer selecciona una assignatura</Select.Item>
					{/if}
				</Select.Content>
			</Select.Root>
		</div>
		<div class="grid gap-2">
			<Label for="type">Tipus</Label>
			<Select.Root type="single" bind:value={note.type} required>
				<Select.Trigger>
					{note.type ? note.type : 'Selecciona un tipus'}
				</Select.Trigger>
				<Select.Content>
					{#each data.noteTypes as value (value)}
						<Select.Item {value}>{value}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
		<div class="grid gap-2">
			<Label for="course">Curs Acadèmic</Label>
			<Select.Root type="single" bind:value={note.course} required>
				<Select.Trigger>
					{note.course ? note.course : 'Selecciona un curs acadèmic'}
				</Select.Trigger>
				<Select.Content>
					{#each data.courses as value (value)}
						<Select.Item {value}>{value}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
	</div>
	<div class="grid gap-2">
		<Label for="hideAuthor">Anonimitza l'autor</Label>
		<Switch id="hideAuthor" bind:checked={note.hideAuthor} />
	</div>
	<div class="grid gap-2">
		<Label for="title">Fitxer</Label>
		<div
			class="relative h-60 w-full border-2 border-dashed rounded-lg hover:border-neutral-400 transition-colors flex items-center justify-center"
		>
			<input type="file" bind:files class="absolute w-full h-full opacity-0 cursor-pointer" />
			{#if files}
				<p class="text-sm font-medium">{files[0]?.name}</p>
			{:else}
				<p class="text-sm font-medium">{note.file}</p>
			{/if}
		</div>
	</div>
	<Button type="submit" class="w-full">
		{#if loading}
			<LoaderCircle class="h-5 animate-spin" />
		{:else}
			Guardar canvis
		{/if}
	</Button>
</form>
