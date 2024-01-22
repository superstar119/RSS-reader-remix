/** @type {import('@remix-run/dev').AppConfig} */
export default {
  tailwind: true,
  postcss: true,
  browserNodeBuiltinsPolyfill: {
    modules: {
      stream: true,
      https: true,
      string_decoder: true,
      events: true,
      timers: true,
      url: true,
      http: true,
    },
  },
  appDirectory: "app",
  assetsBuildDirectory: "public",
  publicPath: "/build/",
  serverBuildPath: "build/index.js",
};
