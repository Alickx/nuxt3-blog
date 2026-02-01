# Nuxt3-Blog 项目配置

## 项目概述

基于 Nuxt3 + TypeScript + UnoCSS 构建的个人博客网站，支持文章展示、评论、搜索、暗黑模式等功能。

## 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 框架 | Nuxt 3 | ^3.19.2 |
| 语言 | TypeScript | ^5.9.3 |
| 样式 | UnoCSS | ^66.5.2 |
| 构建工具 | Vite | - |
| 内容管理 | @nuxt/content | ^2.13.4 |
| UI 组件库 | 自研 + 原生 |

## 目录结构

```
├── content/                  # Markdown 文章内容
│   └── _articles/           # 文章目录
├── src/
│   ├── components/          # Vue 组件
│   ├── config/              # 站点配置
│   │   └── site.ts         # 博客配置
│   ├── content/             # 内容相关组件
│   ├── layouts/             # Nuxt 布局
│   ├── pages/               # 页面路由
│   ├── plugins/             # Nuxt 插件
│   ├── public/              # 静态资源
│   ├── server/              # 服务端逻辑
│   ├── styles/              # 样式文件
│   └── utils/               # 工具函数
├── app.vue                   # 根组件
├── nuxt.config.ts            # Nuxt 配置
├── package.json              # 依赖
├── uno.config.ts             # UnoCSS 配置
└── README.md
```

## 项目定制

### 开发约定

| 约定 | 说明 |
|------|------|
| 启动方式 | `pnpm dev` 或 `npm run dev` |
| 构建命令 | `pnpm build` |
| 预览构建 | `pnpm preview` |
| 包管理器 | pnpm |
| 内容目录 | `src/content/_articles/` |
| 文章格式 | Markdown + Frontmatter |

### Frontmatter 规范

每篇文章必须包含：

```yaml
---
title: '文章标题'
description: '文章描述'
date: '2024-01-01'
tags: ['tag1', 'tag2']
---
```

### 组件规范

- 使用 `<script setup lang="ts">`
- 组件名使用 PascalCase
- Props 定义使用 TypeScript interface
- 样式使用 UnoCSS 原子类

### 样式规范

- 优先使用 UnoCSS 原子类（如 `flex`, `gap-4`, `text-xl`）
- 复杂样式使用 `& {}` 嵌套在 style 标签中
- 颜色变量使用 CSS 变量

### 路由约定

- 页面放在 `src/pages/` 下
- 动态路由使用 `[slug].vue`
- 嵌套路由使用文件夹组织

## 与 Claude Code 协作

### 期望你主动做的

- 发现代码中的类型错误和潜在 Bug
- 提示更优雅的写法（Vue/Nuxt 最佳实践）
- 补充缺失的异常处理
- 优化 Markdown 内容渲染

### 不希望你做的

- 不要过度重构已经工作的代码
- 不要添加未要求的功能
- 不要主动创建文档文件（如非必要）
- 不要修改 package.json 添加不必要的依赖

### 特殊注意事项

1. **内容管理**：文章在 `content/` 目录，修改时注意 Frontmatter 格式
2. **SEO 优化**：Nuxt 3 的 useHead 和 useSeoMeta 用于 SEO
3. **性能优化**：图片使用 NuxtImage，组件按需加载
4. **服务端渲染**：注意只在 client 使用的 API 要放到 `<ClientOnly>` 或 `onMounted` 中
