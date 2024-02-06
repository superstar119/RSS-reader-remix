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
      path: true,
      os: true,
      crypto: true,
      fs: true,
    },
  },
};
