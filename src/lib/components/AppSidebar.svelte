<script lang="ts">
    import NavMain from "$lib/components/NavAssignatures.svelte";
    import NavUser from "$lib/components/NavUsuari.svelte";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";

    import Send from "lucide-svelte/icons/send";
    import Upload from "lucide-svelte/icons/upload";
    import File from "lucide-svelte/icons/file";
	import Folder from "lucide-svelte/icons/folder";

    let {
        ref = $bindable(null), 
        data,
        ...restProps
    } = $props();

    const items = $derived(data.quarters.map(quarter => ({
        title: quarter,
        url: "#",
        icon: Folder,
        isActive: false,
        items: data.subjects
            .filter(subject => subject.quarter === quarter)
            .map(subject => ({
                title: subject.acronym,
                url: `/assignatura/${subject.id}`
            }))
    })));
</script>

<Sidebar.Root bind:ref variant="inset" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="/" {...props}>
							<div class="size-9 border rounded overflow-hidden">
								<img src="/icons/icon-192x192.png" alt="Apunts Dades" />
							</div>
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-semibold">Apunts Dades</span>
								<span class="truncate text-xs">GCED - UPC</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={items} />
		<Sidebar.Group class="group-data-[collapsible=icon]:hidden">
			<Sidebar.GroupLabel>Navegació</Sidebar.GroupLabel>
			<Sidebar.Menu>
				<Sidebar.MenuItem>
					<a href="/usuari/penja-apunts">
						<Sidebar.MenuButton>
							<Upload />
							Penja Apunts
						</Sidebar.MenuButton>
					</a>
				</Sidebar.MenuItem>
				<Sidebar.MenuItem>
					<a href="/usuari/apunts-penjats">
						<Sidebar.MenuButton>
							<File />
							Apunts Penjats
						</Sidebar.MenuButton>
					</a>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Group>
		<Sidebar.Group class="group-data-[collapsible=icon]:hidden mt-auto">
			<Sidebar.Menu>
				<Sidebar.MenuItem>
					<a href={data.feedback} target="_blank">
						<Sidebar.MenuButton>
							<Send />
							Feedback
						</Sidebar.MenuButton>
					</a>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
</Sidebar.Root>
