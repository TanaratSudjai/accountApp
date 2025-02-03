// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    "/": { middleware: "auth.global" },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "@pinia/nuxt" ],

  components: true,
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === "Icon",
    },
  },
  css: ["@/assets/main.css"],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
    },
  },
});
