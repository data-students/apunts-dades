import { pb } from "$lib/pocketbase";
import type { Note, Topic } from "$lib/types";

export async function load({ params }) {
    const { note_id } = params;

    const note = await pb.collection('notes').getOne(note_id) as Note;
    const topics = await pb.collection('topics').getFullList() as Topic[];

    return {
        note,
        topics,
        title: "Editar " + note.title,
        breadcrumb: "Editar Apunt"
    };
}