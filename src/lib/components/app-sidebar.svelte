<script lang="ts" module>
	import BookOpen from "lucide-svelte/icons/book-open";
	import Bot from "lucide-svelte/icons/bot";
	import ChartPie from "lucide-svelte/icons/chart-pie";
	import Frame from "lucide-svelte/icons/frame";
	import LifeBuoy from "lucide-svelte/icons/life-buoy";
	import Map from "lucide-svelte/icons/map";
	import Send from "lucide-svelte/icons/send";
	import Settings2 from "lucide-svelte/icons/settings-2";
	import SquareTerminal from "lucide-svelte/icons/square-terminal";

	const data = {
		user: {
			name: "Estudiant GECD",
			email: "alumne@estudiantat.upc.edu",
			avatar: "https://upload.wikimedia.org/wikipedia/commons/9/97/Logo_UPC.svg",
		},
		navMain: [
			{
				title: "Primer",
				url: "#",
				icon: SquareTerminal,
				isActive: true,
				items: [
					{
						title: "CAL",
						url: "#",
					},
					{
						title: "ALG",
						url: "#",
					},
					{
						title: "LMD",
						url: "#",
					},
					{
						title: "AP1",
						url: "#",
					},

					{
						title: "AC2",
						url: "#",
					},
					{
						title: "AP2",
						url: "#",
					},
					{
						title: "COM",
						url: "#",
					},
					{
						title: "PIE1",
						url: "#",
					},
				],
			},
			{
				title: "Segon",
				url: "#",
				icon: Bot,
				items: [
					{
						title: "AP3",
						url: "#",
					},
					{
						title: "BD",
						url: "#",
					},
					{
						title: "PIE2",
						url: "#",
					},
					{
						title: "SIS",
						url: "#",
					},
					{
						title: "TEOI",
						url: "#",
					},

					{
						title: "OM",
						url: "#",
					},
					{
						title: "AD",
						url: "#",
					},
					{
						title: "PSD",
						url: "#",
					},
					{
						title: "IPA",
						url: "#",
					},
					{
						title: "AA1",
						url: "#",
					},
				],
			},
			{
				title: "Tercer",
				url: "#",
				icon: BookOpen,
				items: [
					{
						title: "Introduction",
						url: "#",
					},
					{
						title: "Get Started",
						url: "#",
					},
					{
						title: "Tutorials",
						url: "#",
					},
					{
						title: "Changelog",
						url: "#",
					},
				],
			},
			{
				title: "Quart",
				url: "#",
				icon: Settings2,
				items: [
					{
						title: "General",
						url: "#",
					},
					{
						title: "Team",
						url: "#",
					},
					{
						title: "Billing",
						url: "#",
					},
					{
						title: "Limits",
						url: "#",
					},
				],
			},
		],
		navSecondary: [
			{
				title: "Support",
				url: "#",
				icon: LifeBuoy,
			},
			{
				title: "Feedback",
				url: "#",
				icon: Send,
			},
		],
		projects: [
			{
				name: "Design Engineering",
				url: "#",
				icon: Frame,
			},
			{
				name: "Sales & Marketing",
				url: "#",
				icon: ChartPie,
			},
			{
				name: "Travel",
				url: "#",
				icon: Map,
			},
		],
	};
</script>

<script lang="ts">
	import NavMain from "$lib/components/nav-main.svelte";
	import NavProjects from "$lib/components/nav-projects.svelte";
	import NavSecondary from "$lib/components/nav-secondary.svelte";
	import NavUser from "$lib/components/nav-user.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { ComponentProps } from "svelte";

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref variant="inset" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="/" {...props}>
							<div class="size-9 border rounded overflow-hidden">
								<img src="https://avatars.githubusercontent.com/u/91702672" alt="Apunts Dades" />
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
		<NavMain items={data.navMain} />
		<NavProjects projects={data.projects} />
		<NavSecondary items={data.navSecondary} class="mt-auto" />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
</Sidebar.Root>