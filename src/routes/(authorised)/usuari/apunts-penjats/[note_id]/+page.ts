import { pb } from "$lib/pocketbase";
import type { Note } from "$lib/types";

export async function load({ params }) {
    const { note_id } = params;

    const note = await pb.collection('notes').getOne(note_id) as Note;

    return {
        note,
        title: "Editar " + note.title,
        breadcrumb: "Editar Apunt"
    };
}