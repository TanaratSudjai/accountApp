// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    "/": { middleware: "auth.global" },
  },
  ssr: true,
  build: {
    transpile: ["gsap"],
  },

  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@pinia/nuxt",
    "@nuxt/icon",
    "nuxt-charts",
  ],

  components: true,
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === "Icon",
    },
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/@fullcalendar/core@6.1.8/index.global.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/@fullcalendar/daygrid@6.1.8/index.global.min.css",
        },
      ],
    },
  },
  css: ["@/assets/main.css"],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE_URL,
      cookieDomain: process.env.COOKIE_DOMAIN,
    },
  },
});
