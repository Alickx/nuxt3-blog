import { installNuxtSiteConfig, updateSiteConfig } from "nuxt-site-config-kit";

export default defineNuxtConfig({
  modules: [
    "@unocss/nuxt",
    "nuxt-icon",
    "@vueuse/nuxt",
    "@ant-design-vue/nuxt",
    "@nuxt/image",
    "nuxt-simple-sitemap",
    "@sidebase/nuxt-auth",
    "dayjs-nuxt",
  ],
  css: ["@/assets/styles/normalize.css"],
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
    },
  },
  dayjs: {
    locales: ["zh-cn"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "zh-cn",
    defaultTimezone: "Asia/Shanghai",
  },
  srcDir: "src/",
  image: {
    format: ["webp", "avif", "png", "jpg", "jpeg"],
    quality: 50,
  },
  sitemap: {
    exclude: ["/admin/**", "/login"],
  },
  site: {
    url: "https://www.alickx.top",
  },
  // @ts-ignore
  async setup() {
    await installNuxtSiteConfig();
    updateSiteConfig({
      _context: "my-module",
      url: "https://alickx.top",
    });
  },
  build: {
    transpile: ["jsonwebtoken"],
  },
  auth: {
    provider: {
      type: "local",
      pages: {
        login: "/login",
      },
      endpoints: {
        getSession: { path: "/user", method: "get" },
      },
      token: {
        signInResponseTokenPointer: "/token/accessToken",
      },
    },
    session: {
      enableRefreshOnWindowFocus: true,
      enableRefreshPeriodically: 5000,
    },
  },
});
