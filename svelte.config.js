import adapter from "@sveltejs/adapter-node";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    output: {
      bundleStrategy: "single",
    },
  },
};

export default config;
