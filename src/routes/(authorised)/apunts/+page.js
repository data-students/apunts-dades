import { pb } from "$lib/pocketbase.js";

export async function load({ params }) {
  const apunts = await pb.collection("apunts").getFullList();
  return {
    apunts: apunts,
  };
}