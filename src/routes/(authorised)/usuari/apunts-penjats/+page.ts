import { pb } from "$lib/pocketbase.ts";

export async function load({ parent, depends }) {

  depends('app:user');

  const { user } = await parent();
  
  const notes = await pb.collection('notes').getFullList({
      filter: `author = "${user.id}"`,
      expand: "subject"
  });

  return {
    notes,
    title: "Apunts Penjats",
    breadcrumb: "Apunts Penjats"
  };
}