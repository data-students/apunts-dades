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
	import Box from "lucide-svelte/icons/box";
	import DataBase from "lucide-svelte/icons/database";
	import Rocket from "lucide-svelte/icons/rocket";
	import BrainCircuit from "lucide-svelte/icons/brain-circuit";
	import Bug from "lucide-svelte/icons/bug";
	import Grip from "lucide-svelte/icons/grip";

	const data = {
		user: {
			name: "Estudiant GECD",
			email: "alumne@estudiantat.upc.edu",
			avatar: "https://upload.wikimedia.org/wikipedia/commons/9/97/Logo_UPC.svg",
		},
		navMain: [
			{
				title: "Q1",
				url: "#",
				icon: Bug,
				isActive: true,
				items: [
					{
						title: "CAL",
						url: "/assignatura/9ni9re8cmmlbj8v",
					},
					{
						title: "ALG",
						url: "/assignatura/hazc47ij4usbrl6",
					},
					{
						title: "LMD",
						url: "/assignatura/6y5j9kkmki0xl28",
					},
					{
						title: "AP1",
						url: "/assignatura/xkuuflio86sx35w",
					},
				],
			},
			{
				title: "Q2",
				url: "#",
				icon: Box,
				isActive: true,
				items: [
					{
						title: "AC2",
						url: "/assignatura/zfc3q8870xorm5f",
					},
					{
						title: "AP2",
						url: "/assignatura/3a5are06zlrwzsd",
					},
					{
						title: "COM",
						url: "/assignatura/o39h1cn8gp1ffe5",
					},
					{
						title: "PIE1",
						url: "/assignatura/wdkmt2svm2jqwod",
					},
				],
			},
			{
				title: "Q3",
				url: "#",
				icon: DataBase,
				items: [
					{
						title: "AP3",
						url: "/assignatura/8nalls2srqunxml",
					},
					{
						title: "BD",
						url: "/assignatura/i0wu3arzheolf7a",
					},
					{
						title: "PIE2",
						url: "/assignatura/zrqfzych1nxt4u3",
					},
					{
						title: "SIS",
						url: "/assignatura/7t6dkcbkfofgtp7",
					},
					{
						title: "TEOI",
						url: "/assignatura/7mdsimcbd5l9pqb",
					},
				],
			},
			{
				title: "Q4",
				url: "#",
				icon: Rocket,
				items: [
					{
						title: "OM",
						url: "/assignatura/a9sbbaggrknk70s",
					},
					{
						title: "AD",
						url: "/assignatura/dmzv8szoobja3hy",
					},
					{
						title: "PSD",
						url: "/assignatura/3nlxmn0kp6125ep",
					},
					{
						title: "IPA",
						url: "/assignatura/q2cqwgunmyq8ut4",
					},
					{
						title: "AA1",
						url: "/assignatura/cpqo2ssax81lat2",
					},
				],
			},
			{
				title: "Q5",
				url: "#",
				icon: BrainCircuit,
				items: [
					{
						title: "AA2",
						url: "/assignatura/djtzi1wuf1izbz6",
					},
					{
						title: "BDA",
						url: "/assignatura/9e3058xrhkcws4o",
					},
					{
						title: "CAI",
						url: "/assignatura/665ak45zbsqjcp3",
					},
					{
						title: "EI",
						url: "/assignatura/6azb2vk50p5keau",
					},
					{
						title: "VI",
						url: "/assignatura/9nnnpry5htxguu0",
					},
				],
			},
			{
				title: "Q6",
				url: "#",
				icon: Grip,
				items: [
					{
						title: "POE",
						url: "/assignatura/1ozmmbxjqoosg6j",
					},
					{
						title: "PE",
						url: "/assignatura/fyfx641vqw9duii",
					},
					{
						title: "PIVA",
						url: "/assignatura/nm7v99kv813biah",
					},
					{
						title: "TAED1",
						url: "/assignatura/tsplh06k1w36gnn",
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