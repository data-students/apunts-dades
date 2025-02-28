import { pb } from "$lib/pocketbase.ts";
import { redirect } from "@sveltejs/kit";

export async function load() {
  // User is not authenticated, login required
  if (!pb.authStore.isValid) {
    throw redirect(302, "/inicia-sessio");
  }

  const subjects = await pb.collection("subjects").getFullList();
  const user = pb.authStore.model;
  user.initials = user.name[0].toUpperCase();

  const quarters = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"];
  const noteTypes = ["Teoria", "Lab", "Examen"];
  const feedback = "https://github.com/data-students/apunts-dades/issues";

  return {
    subjects,
    user,
    quarters,
    noteTypes,
    feedback
  };
}
