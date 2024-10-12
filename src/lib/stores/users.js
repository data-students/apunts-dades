import { pb } from "$lib/pocketbase"
import { writable } from "svelte/store";

export const user = writable(pb.authStore.model);

pb.authStore.onChange(() => {
  user.set(pb.authStore.model);
});