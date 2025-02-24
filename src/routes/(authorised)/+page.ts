import { pb } from "$lib/pocketbase.ts";

export async function load({ parent }) {

  await parent();
  const assignatures = await pb.collection("assignatures").getFullList();

  return { 
    assignatures,
    title: "Inici"
  };
}