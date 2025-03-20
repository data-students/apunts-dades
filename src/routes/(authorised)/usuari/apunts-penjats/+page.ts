import { pb } from '$lib/pocketbase';
import type { Note } from '$lib/types';

export async function load({ parent, depends }) {
	depends('app:user');

	const { user } = await parent();

	const notes = (await pb.collection('notes').getFullList({
		filter: `author = "${user.id}"`,
		expand: 'subject'
	})) as Note[];

	return {
		notes,
		title: 'Apunts Penjats',
		breadcrumb: 'Apunts Penjats'
	};
}
