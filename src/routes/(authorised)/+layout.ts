import { pb } from '$lib/pocketbase';
import { redirect } from '@sveltejs/kit';
import type { Subject, User } from '$lib/types';
import posthog from 'posthog-js';

export async function load({ depends }) {
	// User is not authenticated, login required
	if (!pb.authStore.isValid) {
		throw redirect(302, '/inicia-sessio');
	}

	depends('app:root');

	const subjects = (await pb.collection('subjects').getFullList({
		sort: 'acronym'
	})) as Subject[];

	const user = pb.authStore.model as User;
	user.initials = user.name[0].toUpperCase();

	posthog.identify(user.id, { email: user.email, name: user.name });

	const quarters = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'];
	const noteTypes = ['Teoria', 'Problemes', 'Lab', 'Examen'];
	const courses = [
		'2018-2019',
		'2019-2020',
		'2020-2021',
		'2021-2022',
		'2022-2023',
		'2023-2024',
		'2024-2025',
		'2025-2026',
		'2026-2027'
	];
	const feedback = 'https://github.com/data-students/apunts-dades/issues';

	return {
		subjects,
		user,
		quarters,
		noteTypes,
		courses,
		feedback
	};
}
