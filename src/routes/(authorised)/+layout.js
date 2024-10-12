import { user } from "$lib/stores/users";
import { get } from "svelte/store";
import { redirect } from "@sveltejs/kit";

export async function load() {
  // User is not authenticated, login required
  if (!get(user)) {
    throw redirect(302, "/inicia-sessio");
  }

  return {};
}
