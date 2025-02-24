<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { Label } from "$lib/components/ui/label/index.ts";
  import { Input } from "$lib/components/ui/input/index.ts";
  import { Button } from "$lib/components/ui/button/index.ts";
  import { LoaderCircle } from "lucide-svelte";
  import { pb } from "$lib/pocketbase.ts";

  let title = $state("");
  let files = $state(null);
  let formLoading = $state(false);

  async function upload() {
    formLoading = true;
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("file", files[0]);
      const record = await pb.collection("apunts").create(data);
      // success
    } catch (error) {
      // error
    } finally {
      formLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Penja Apunts - Apunts Dades</title>
</svelte:head>

<header class="flex h-16 shrink-0 items-center gap-2">
	<div class="flex items-center gap-2 px-4">
		<Sidebar.Trigger class="-ml-1" />
		<Separator orientation="vertical" class="mr-2 h-4" />
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item class="hidden md:block">
					<Breadcrumb.Link href="#">Primer</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator class="hidden md:block" />
				<Breadcrumb.Item>
					<Breadcrumb.Page>AP1</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>
</header>
<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
  <h2 class="text-3xl font-semibold">Penja Apunts</h2>
  <p>Penja apunts a Apunts Dades.</p>
  <form class="grid gap-4" onsubmit={upload}>
    <div class="grid gap-2">
      <Label for="title">Títol</Label>
      <Input id="title" type="text" bind:value={title} required />
    </div>
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="file">Arxiu</Label>
      <input type="file" bind:files required>
    </div>
    <Button type="submit" class="w-full" disabled={formLoading}>
      {#if formLoading}
        <LoaderCircle class="h-5 animate-spin" />
      {:else}
        Penja Apunts
      {/if}
    </Button>
</div>
