import { pb } from '$lib/pocketbase';
import type { Topic } from '$lib/types';

export async function load() {
	const topics = (await pb.collection('topics').getFullList()) as Topic[];

	return {
		topics,
		title: 'Penja Apunts',
		breadcrumb: 'Penja Apunts'
	};
}
