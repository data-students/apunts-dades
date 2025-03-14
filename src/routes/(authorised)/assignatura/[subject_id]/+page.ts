import { pb } from "$lib/pocketbase";
import type { Subject, Note } from "$lib/types";

export async function load({ params, parent }) {
  const { subject_id } = params;

  // filter subjects by subject_id
  const { subjects } = await parent();
  const subject = subjects.find(s => s.id === subject_id) as Subject;

  const notes = await pb.collection('notes').getFullList({
      filter: `subject = "${subject_id}"`,
      expand: "author,topic",
  }) as Note[];

  // sort numerically, not alphabetically
  notes.sort((a, b) => {
    const topicA = a.expand?.topic?.title || '';
    const topicB = b.expand?.topic?.title || '';
    
    const numA = parseInt(topicA.split('.')[0]) || 0;
    const numB = parseInt(topicB.split('.')[0]) || 0;
    
    return numA - numB;
  });
  
  return { 
    subject,
    notes,
    title: subject.title,
    breadcrumb: subject.acronym
  };
}