<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { getFileUrl } from "$lib/pocketbase";
    import { ExternalLink } from "lucide-svelte";

    let { note } = $props();
</script>

<a href={getFileUrl(note)} target="_blank">
    <Card.Root class="relative pb-6">
        <Badge variant="outline" class="absolute top-4 right-4">{note.type}</Badge>
        <ExternalLink class="absolute bottom-6 right-4 h-5" />
        <Card.Header>
            <Card.Title>{note.title}</Card.Title>
            <Card.Description>{note.description}</Card.Description>
            <p class="text-sm">Compartit per {note.author}</p>
        </Card.Header>
    </Card.Root>
</a>
