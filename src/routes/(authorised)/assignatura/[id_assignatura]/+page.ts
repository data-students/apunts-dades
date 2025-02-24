import { pb } from "$lib/pocketbase.ts";

export async function load({ params, parent }) {
  const { id_assignatura } = params;

  await parent();
  const assignatura = await pb.collection("assignatures").getOne(id_assignatura)

  return { 
    assignatura,
    title: assignatura.titol
  };
}