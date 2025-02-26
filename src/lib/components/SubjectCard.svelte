<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { BookOpen } from "lucide-svelte";

    let { subject } = $props();
</script>

<a href={`/assignatura/${subject.id}`}>
    <Card.Root class="relative pb-6">
        <Badge variant="outline" class="absolute top-4 right-4">{subject.quarter}</Badge>
        <Card.Header>
            <div class="flex gap-3">
                <BookOpen class="w-6 h-6 mt-1" />
                <div>
                    <Card.Title>{subject.acronym}</Card.Title>
                    <Card.Description>{subject.title}</Card.Description>
                </div>
            </div>
        </Card.Header>
    </Card.Root>
</a>
