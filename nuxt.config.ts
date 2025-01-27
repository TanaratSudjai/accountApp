// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"],

  components: true,
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === "Icon",
    },
  },
  css: ["@/assets/main.css"],
  // nitro: {
  //   routeRules: {
  //     "/**": {
  //       proxy: "http://localhost:5000/api/**", // URL ของ API ที่ต้องการ Proxy
  //     },
  //   },
  //   debug: true,
  // },

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || "http://localhost:5000/api",
    },
  },
});
