import { siteConfig, type SiteConfig } from "~/config/site";

/**
 * 获取网站配置
 * @returns 完整的网站配置对象
 */
export const useSiteConfig = (): SiteConfig => {
  return siteConfig;
};

/**
 * 获取网站基本信息
 * @returns 网站基本信息
 */
export const useSiteInfo = () => {
  const { name, title, description, author } = siteConfig;
  return { name, title, description, author };
};

/**
 * 获取导航菜单配置
 * @returns 导航菜单配置
 */
export const useNavConfig = () => {
  return siteConfig.nav;
};

/**
 * 获取底部链接配置
 * @returns 底部链接配置
 */
export const useFooterConfig = () => {
  return siteConfig.footerLinks;
};

/**
 * 获取社交媒体链接
 * @returns 社交媒体链接
 */
export const useSocialLinks = () => {
  return siteConfig.social;
};

/**
 * 获取SEO配置
 * @returns SEO配置
 */
export const useSeoConfig = () => {
  return siteConfig.seo;
};

/**
 * 获取Algolia搜索配置
 * @returns Algolia搜索配置
 */
export const useAlgoliaConfig = () => {
  return siteConfig.algolia;
};
