// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    '/': { middleware: 'auth.global' },
  },
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
  //       proxy: "https://api-accountapp.onrender.com/api/**", // URL ของ API ที่ต้องการ Proxy
  //     },
  //   },
  //   debug: true,
  // },

  // runtimeConfig: {
  //   public: {
  //     apiUrl: process.env.API_URL || "https://api-accountapp.onrender.com/api",
  //   },
  // },
});
