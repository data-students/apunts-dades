<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";

    let { subject } = $props();
</script>

<a href={`/assignatura/${subject.id}`}>
    <Card.Root class="relative pb-6">
        <Badge variant="outline" class="absolute top-4 right-[60px]">{subject.type}</Badge>
        <Badge variant="outline" class="absolute top-4 right-4">{subject.quarter}</Badge>
        <Card.Header>
            <Card.Title>{subject.acronym}</Card.Title>
            <Card.Description>{subject.title}</Card.Description>
        </Card.Header>
    </Card.Root>
</a>
