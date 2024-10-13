import { pb } from "$lib/pocketbase.js";

export async function load() {
  const apunts = await pb.collection("apunts").getFullList();
  return {
    apunts: apunts,
  };
}