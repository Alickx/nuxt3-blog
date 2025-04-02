import { siteConfig } from "./src/config/site";

export default defineNuxtConfig({
  modules: [
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "dayjs-nuxt",
    "@nuxt/content",
    "@nuxtjs/algolia",
    "@nuxt/icon",
  ],

  css: [
    "@/assets/styles/normalize.css",
    "@/assets/styles/jetBrains-mono.scss",
    "@/assets/styles/markdown.scss",
  ],

  routeRules: {
    "/": { prerender: true },
    "/weekly": { prerender: true },
    "/articles/**": { isr: true },
    "/about": { prerender: true },
    "/interaction": { prerender: true },
  },

  nitro: {
    prerender: {
      routes: ["/sitemap.xml"],
    },
  },

  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
      script: [{ src: "/darkModelVerify.js" }],
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
        {
          name: "keywords",
          content: siteConfig.seo.meta.keywords,
        },
        {
          name: "description",
          content: siteConfig.seo.meta.description,
        },
      ],
      title: siteConfig.title,
    },
  },

  dayjs: {
    locales: ["zh-cn"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "zh-cn",
    defaultTimezone: "Asia/Shanghai",
  },

  srcDir: "src/",

  content: {
    highlight: {
      theme: {
        default: "github-light",
        dark: "github-dark",
        sepia: "monokai",
      },
      preload: [
        "java",
        "vue",
        "vue-html",
        "shell",
        "sql",
        "javascript",
        "typescript",
      ],
    },
    markdown: {
      anchorLinks: false,
      remarkPlugins: ["remark-reading-time"],
    },
  },

  algolia: {
    apiKey: siteConfig.algolia.apiKey,
    applicationId: siteConfig.algolia.applicationId,
    docSearch: {
      indexName: siteConfig.algolia.indexName,
      lang: siteConfig.algolia.lang,
    },
  },

  compatibilityDate: "2024-10-13",
});
