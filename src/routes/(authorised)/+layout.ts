import { pb } from "$lib/pocketbase.ts";
import { redirect } from "@sveltejs/kit";

export async function load() {
  // User is not authenticated, login required
  if (!pb.authStore.isValid) {
    throw redirect(302, "/inicia-sessio");
  }

  const subjects = await pb.collection("subjects").getFullList();
  const user = pb.authStore.model;

  return {
    subjects,
    user
  };
}
