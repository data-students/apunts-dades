<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { getFileUrl } from "$lib/pocketbase";

    let { note } = $props();
</script>

<a href={getFileUrl(note)} target="_blank">
    <Card.Root class="relative pb-6">
        <Badge variant="outline" class="absolute top-4 right-4">{note.type}</Badge>
        <Card.Header>
            <Card.Title>{note.title}</Card.Title>
            <Card.Description>{note.title}</Card.Description>
        </Card.Header>
    </Card.Root>
</a>
