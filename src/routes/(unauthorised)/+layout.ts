import { pb } from "$lib/pocketbase.ts";
import { redirect } from "@sveltejs/kit";

export async function load() {
  // User is authenticated, skip login
  if (pb.authStore.isValid) {
    throw redirect(302, "/");
  }

  return {};
}
