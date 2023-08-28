export default defineNuxtConfig({
  modules: [
    "@unocss/nuxt",
    "nuxt-icon",
    "@vueuse/nuxt",
    "@nuxt/image",
    "dayjs-nuxt",
    "@nuxt/content"
  ],
  css: ["@/assets/styles/normalize.css"],
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
        default: 'github-light',
        dark: 'github-dark',
        sepia: 'monokai'
      },
      preload: ['java','vue','vue-html','shell','sql','javascript','typescript']
    },
    markdown: {
      anchorLinks: false,
      remarkPlugins: ['remark-reading-time'],
    }
  }
});
