export default defineNuxtConfig({
  modules: [
    "@unocss/nuxt",
    "nuxt-icon",
    "@vueuse/nuxt",
    "dayjs-nuxt",
    "@nuxt/content",
  ],
  css: ["@/assets/styles/normalize.css", "@/assets/styles/hyzy.scss", "@/assets/styles/jetBrains-mono.scss"],
  routeRules: {
    "/": { prerender: true },
    "/articles/**": { isr: true },
    "/about": { isr: true },
  },
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.0.11/400.min.css",
        },
      ],
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
});
