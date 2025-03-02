import posthog from 'posthog-js'
import { browser } from '$app/environment';
import { PUBLIC_POSTHOG_KEY, PUBLIC_POSTHOG_HOST } from '$env/static/public';

export const load = async () => {
    if (browser) {
        posthog.init(
            PUBLIC_POSTHOG_KEY,
            { api_host: PUBLIC_POSTHOG_HOST }
        )
    }
    return
};

export const ssr = false;
export const csr = true;
export const prerender = false;
