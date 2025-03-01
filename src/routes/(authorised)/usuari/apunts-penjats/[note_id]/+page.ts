export async function load({ params, parent }) {
    const { note_id } = params;

    const { notes } = await parent();
    const note = notes.find(n => n.id === note_id);

    return {
        note,
        title: "Editar " + note.title,
        breadcrumb: "Editar Apunt"
    };
}