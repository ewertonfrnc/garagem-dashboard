import Aura from "@primeuix/themes/aura";
import { definePreset } from "@primeuix/themes";

const MyPreset = definePreset(Aura, {
  components: {
    menu: {
      colorScheme: {
        light: {
          background: "transparent",
          border: {
            color: "transparent",
          },
          item: {
            focus: {
              background: "white",
            },
          },
        },
      },
    },
  },
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-03-16",
  devtools: { enabled: true },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@primevue/nuxt-module",
    "@pinia/nuxt",
  ],

  primevue: {
    options: {
      ripple: true,
      theme: { preset: MyPreset },
    },
  },

  css: ["@/assets/styles/main.scss", "primeicons/primeicons.css"],

  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_BASE_URL,
    },
  },
});
