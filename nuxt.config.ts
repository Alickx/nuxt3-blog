export default defineNuxtConfig({
  modules: [
    "@unocss/nuxt",
    "nuxt-icon",
    "@vueuse/nuxt",
    "dayjs-nuxt",
    "@nuxt/content",
    "@nuxtjs/algolia",
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
  },
  nitro: {
    prerender: {
      routes: ["/sitemap.xml"],
    },
  },
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
      meta: [
        {
          name: "keywords",
          content: "alickx,alickx.top,alickx blog,alickx's blog",
        },
        {
          name: "description",
          content: "alickx's blog,记录代码，生活的博客",
        },
      ],
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
    apiKey: "c9fa4df5a01399fadc7b839a73e52a08",
    applicationId: "S761Z3RFQ3",
    docSearch: {
      indexName: "alickx",
      lang: " ",
    },
  },
});
