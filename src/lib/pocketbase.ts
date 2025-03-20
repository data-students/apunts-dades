import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_ENDPOINT } from '$env/static/public';
import type { Note, User } from '$lib/types';

export const pb = new PocketBase(PUBLIC_POCKETBASE_ENDPOINT);

export function getFileUrl(note: Note) {
	return `${PUBLIC_POCKETBASE_ENDPOINT}/api/files/${note.collectionId}/${note.id}/${note.file}`;
}

export function getUserAvatarUrl(user: User) {
	return `${PUBLIC_POCKETBASE_ENDPOINT}/api/files/_pb_users_auth_/${user.id}/${user.avatar}`;
}
