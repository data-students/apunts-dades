import { pb } from "$lib/pocketbase.ts";

export async function load({ params, parent }) {
  const { subject_id } = params;

  await parent();
  const subject = await pb.collection("subjects").getOne(subject_id)
  const notes = await pb.collection('notes').getFullList({
      filter: `subject = "${subject_id}"`
  });

  return { 
    subject,
    notes,
    title: subject.title
  };
}