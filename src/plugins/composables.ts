import {
  useSiteConfig,
  useSiteInfo,
  useNavConfig,
  useFooterConfig,
  useSocialLinks,
  useSeoConfig,
  useAlgoliaConfig,
} from "~/composables/useSiteConfig";

export default defineNuxtPlugin((nuxtApp) => {
  // 注册全局组合式函数
  nuxtApp.provide("composables", {
    useSiteConfig,
    useSiteInfo,
    useNavConfig,
    useFooterConfig,
    useSocialLinks,
    useSeoConfig,
    useAlgoliaConfig,
  });
});
