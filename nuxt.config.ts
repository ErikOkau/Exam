// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["nuxt-quasar-ui"],
  quasar: {
    config: {
      brand: {
        primary: "#ffffff",
        secondary: "#000000",
        accent: "#958a96",

        dark: "#1d1d1d",
        "dark-page": "#121212",

        positive: "#2269ba",
        negative: "#C10015",
        info: "#363636",
        warning: "#e0bf63",
      },
    },
  },
})