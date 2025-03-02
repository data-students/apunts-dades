import posthog from 'posthog-js'
import { browser } from '$app/environment';

const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

export const load = async () => {
    if (browser) {
        posthog.init(
            posthogKey,
            { api_host: posthogHost }
        )
    }
    return
};

export const ssr = false;
export const csr = true;
export const prerender = false;
