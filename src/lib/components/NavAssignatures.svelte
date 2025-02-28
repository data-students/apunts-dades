<script lang="ts">
	import * as Collapsible from "$lib/components/ui/collapsible/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import ChevronRight from "lucide-svelte/icons/chevron-right";

	let { items } = $props();
</script>

<Sidebar.Group>
	<Sidebar.GroupLabel>Assignatures</Sidebar.GroupLabel>
	<Sidebar.Menu>
		{#each items as mainItem (mainItem.title)}
			<Collapsible.Root open={mainItem.isActive}>
				{#snippet child({ props })}
					<Sidebar.MenuItem {...props}>
						<Sidebar.MenuButton>
							<mainItem.icon />
							{mainItem.title}
						</Sidebar.MenuButton>
						<Collapsible.Trigger>
							{#snippet child({ props })}
								<Sidebar.MenuAction
									{...props}
									class="data-[state=open]:rotate-90"
								>
									<ChevronRight />
									<span class="sr-only">Toggle</span>
								</Sidebar.MenuAction>
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
				{/snippet}
			</Collapsible.Root>
		{/each}
	</Sidebar.Menu>
	
</Sidebar.Group>
