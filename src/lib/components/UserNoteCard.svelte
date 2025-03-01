<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import Button from "$lib/components/ui/button/button.svelte";
    import Edit from "lucide-svelte/icons/pencil";

    let { note } = $props();
</script>

<Card.Root class="relative group">
    <div class="absolute right-4 top-4">
        <Button>
            <Edit />
            Edit
        </Button>
    </div>
    <Card.Header class="pb-6">
        <Card.Title>{note.title}</Card.Title>
        <Card.Description>{note.subject}</Card.Description>
    </Card.Header>
</Card.Root>
