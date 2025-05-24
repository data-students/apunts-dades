<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import Folder from '@lucide/svelte/icons/folder';

	let { items } = $props();
</script>

<Sidebar.Group>
	<Sidebar.GroupLabel>Assignatures</Sidebar.GroupLabel>
	<Sidebar.Menu>
		{#each items as mainItem (mainItem.title)}
			<Collapsible.Root open={mainItem.isActive} class="group">
				<Sidebar.MenuItem>
					<Collapsible.Trigger>
						{#snippet child({ props })}
							<Sidebar.MenuButton {...props}>
								<Folder />
								{mainItem.title}
								<ChevronRight
									class="ml-auto transition-transform group-data-[state=open]:rotate-90"
								/>
							</Sidebar.MenuButton>
						{/snippet}
					</Collapsible.Trigger>
					<Collapsible.Content>
						<Sidebar.MenuSub>
							{#each mainItem.items as subItem (subItem.title)}
								<Sidebar.MenuSubItem>
									<Sidebar.MenuSubButton href={subItem.url}>
										<span>{subItem.title}</span>
									</Sidebar.MenuSubButton>
								</Sidebar.MenuSubItem>
							{/each}
						</Sidebar.MenuSub>
					</Collapsible.Content>
				</Sidebar.MenuItem>
			</Collapsible.Root>
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
