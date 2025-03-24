// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    "/": { middleware: "auth.global" },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "@pinia/nuxt"],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'My Nuxt 3 PWA',
      short_name: 'Nuxt3PWA',
      description: 'Progressive Web App with Nuxt 3',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#000000',
      icons: [
        {
          src: '/icon.png',
          sizes: '192x192',
          type: 'image/png'
        }
      ]
    }
  },
  components: true,
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === "Icon",
    },
  },
  css: ["@/assets/main.css"],

  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.NUXT_PUBLIC_API_BASE_URL,
    },
  },
});
