import PocketBase from "pocketbase";
import { PUBLIC_POCKETBASE_ENDPOINT } from '$env/static/public';

export const pb = new PocketBase(PUBLIC_POCKETBASE_ENDPOINT);

export function getFileUrl(element: any) {
    return `${PUBLIC_POCKETBASE_ENDPOINT}/api/files/${element.collectionId}/${element.id}/${element.file}`;
}

export function getUserAvatarUrl(user: any) {
    return `${PUBLIC_POCKETBASE_ENDPOINT}/api/files/_pb_users_auth_/${user.id}/${user.avatar}`;
}