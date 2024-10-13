import { pb } from "$lib/pocketbase.js";
import { redirect } from "@sveltejs/kit";

export async function load() {
  // User is not authenticated, login required
  if (!pb.authStore.isValid) {
    throw redirect(302, "/inicia-sessio");
  }

  return {};
}
