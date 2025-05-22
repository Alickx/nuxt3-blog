export interface SiteConfig {
  // 网站基本信息
  name: string;
  title: string;
  description: string;
  author: string;

  // 社交媒体链接
  social: {
    github?: string;
    bilibili?: string;
    music163?: string;
    steam?: string;
    [key: string]: string | undefined;
  };

  // 头部导航配置
  nav: {
    name: string;
    path: string;
  }[];

  // 底部链接配置
  footerLinks: {
    title: string;
    links: {
      name: string;
      url: string;
    }[];
  }[];

  // SEO配置
  seo: {
    // Meta标签配置
    meta: {
      keywords: string;
      description: string;
    };
  };

  // Algolia搜索配置
  algolia: {
    apiKey: string;
    applicationId: string;
    indexName: string;
    lang: string;
  };
}

// 默认网站配置
export const siteConfig: SiteConfig = {
  name: "Alickx' Blog",
  title: "Alickx' Blog - 个人技术博客",
  description: "一个基于Nuxt3的技术博客",
  author: "Alickx",

  social: {
    github: "https://github.com/Alickx",
    bilibili: "https://space.bilibili.com/302185707",
    music163: "https://music.163.com/#/user/home?id=115930869",
    steam: "https://steamcommunity.com/id/11923/",
  },

  nav: [
    {
      name: "首页",
      path: "/",
    },
    {
      name: "日常",
      path: "/daily",
    },
    {
      name: "互动交流",
      path: "/interaction",
    },
    {
      name: "关于",
      path: "/about",
    },
  ],

  footerLinks: [
    {
      title: "社交媒体",
      links: [
        { name: "Github", url: "https://github.com/Alickx" },
        { name: "BiliBili", url: "https://space.bilibili.com/302185707" },
        {
          name: "网易云音乐",
          url: "https://music.163.com/#/user/home?id=115930869",
        },
        { name: "Steam", url: "https://steamcommunity.com/id/11923/" },
      ],
    },
    {
      title: "友情链接",
      links: [{ name: "aliveseven", url: "https://www.aliveseven.top/" }],
    },
    {
      title: "学习论坛",
      links: [
        { name: "B站大学", url: "https://www.bilibili.com/" },
        { name: "开源中国", url: "https://www.oschina.net/" },
        { name: "掘金论坛", url: "https://juejin.cn/" },
        { name: "思否", url: "https://segmentfault.com/" },
      ],
    },
  ],

  // SEO配置
  seo: {
    meta: {
      keywords: "alickx,alickx.top,alickx blog,alickx's blog",
      description: "alickx's blog,记录代码，生活的博客",
    },
  },

  // Algolia搜索配置
  algolia: {
    apiKey: "c9fa4df5a01399fadc7b839a73e52a08",
    applicationId: "S761Z3RFQ3",
    indexName: "alickx",
    lang: " ",
  },
};
