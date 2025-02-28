<script lang="ts">
	import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
	import LogOut from "lucide-svelte/icons/log-out";
	import Settings from "lucide-svelte/icons/settings";
	import Upload from "lucide-svelte/icons/upload";
	import File from "lucide-svelte/icons/file";

	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { useSidebar } from "$lib/components/ui/sidebar/index.js";

	const sidebar = useSidebar();

	import { goto } from "$app/navigation";
    import { pb, getUserAvatarUrl } from "$lib/pocketbase.ts";

	let { user } = $props();

	async function logout() {
		pb.authStore.clear();
		goto("/inicia-sessio");
	}
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						{...props}
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						<Avatar.Root class="h-8 w-8 rounded-lg">
							<Avatar.Image class="rounded-full" src={getUserAvatarUrl(user)} alt={user.name} />
							<Avatar.Fallback class="rounded-full">{user.initials}</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">{user.name}</span>
							<span class="truncate text-xs">{user.email}</span>
						</div>
						<ChevronsUpDown class="ml-auto size-4" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-[--bits-dropdown-menu-anchor-width] min-w-56 rounded-lg"
				side={sidebar.isMobile ? "bottom" : "right"}
				align="end"
				sideOffset={4}
			>
				<DropdownMenu.Label class="p-0 font-normal">
					<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar.Root class="h-8 w-8 rounded-lg">
							<Avatar.Image class="rounded-full" src={getUserAvatarUrl(user)} alt={user.name} />
							<Avatar.Fallback class="rounded-full">{user.initials}</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">{user.name}</span>
							<span class="truncate text-xs">{user.email}</span>
						</div>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<a href="/usuari/configuracio">
						<DropdownMenu.Item>
							<Settings />
							Configuració
						</DropdownMenu.Item>
					</a>
					<a href="/usuari/penja-apunts">
						<DropdownMenu.Item>
							<Upload />
							Penja apunts
						</DropdownMenu.Item>
					</a>
					<a href="/usuari/apunts-penjats">
						<DropdownMenu.Item>
							<File />
							Apunts penjats
						</DropdownMenu.Item>
					</a>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item onclick={logout}>
					<LogOut />
					Tanca Sessió
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
