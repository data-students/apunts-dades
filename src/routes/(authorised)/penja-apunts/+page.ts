import { pb } from "$lib/pocketbase.ts";

export async function load({ parent }) {

  await parent();
  const subjects = await pb.collection("subjects").getFullList();

  return {
    subjects,
    title: "Penja Apunts"
  };
}