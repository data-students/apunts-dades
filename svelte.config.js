import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      fallback: "index.html",
    }),
    output: {
      bundleStrategy: "single",
    },
    appDir: "app",
  },
};

export default config;
