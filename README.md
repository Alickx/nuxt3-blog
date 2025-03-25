<div align="right">
  <strong>English</strong> | <a href="README_zh-CN.md">简体中文</a>
</div>

<h1 align="center">Nuxt3-Blog</h1>

<div align="center" style="display: flex; justify-content: center; flex-wrap: wrap; gap: 10px;">
  <img src="doc/Snipaste_2023-10-29_15-04-34.png" width="30%" />
  <img src="doc/Snipaste_2023-10-29_15-04-56.png" width="30%" />
  <img src="doc/Snipaste_2023-10-29_15-04-43.png" width="30%" />
</div>

## 📖 Project Introduction

This is a personal blog website built with Nuxt3 + TypeScript + UnoCSS, designed for displaying articles, recording life, and sharing personal moments. The project utilizes a modern front-end technology stack, features responsive layout and dark mode support, focusing on excellent user experience and performance optimization.

## 🛠️ Technology Stack

- **Nuxt3**: Vue's server-side rendering framework, providing excellent SEO support and performance
- **TypeScript**: Enhances code maintainability and type safety
- **UnoCSS**: Atomic CSS engine, improving style development efficiency
- **Vite**: Modern front-end build tool, providing an extremely fast development experience
- **@nuxt/content**: Powerful content management system, making blog article management convenient
- **Waline**: Lightweight commenting system
- **Algolia**: Efficient site-wide search solution
- **Pnpm**: High-performance package manager

## ✨ Key Features

- ✅ **Article Display**: Supports Markdown format, code highlighting, reading time estimation
- ✅ **Article Search**: Integrates Algolia, providing an efficient full-site search experience
- ✅ **Responsive Layout**: Adapts to various devices, from mobile to desktop platforms
- ✅ **Dark Mode**: Supports light/dark theme switching, protecting users' eyesight
- ✅ **Article Comments**: Integrates the Waline comment system, supporting anonymous comments
- ✅ **Website SEO**: Optimized for search engines, improving website visibility
- ✅ **Sitemap**: Automatically generates sitemap.xml, helping with search engine indexing

## 🚀 Quick Start

### Requirements

- Node.js 16.x or higher
- pnpm 7.x or higher

### Installation and Running

```bash
# Clone repository
git clone https://github.com/alickx/nuxt3-blog.git
cd nuxt3-blog

# Install dependencies
pnpm install

# Run in development mode
pnpm dev

# Build project
pnpm build

# Preview build result
pnpm preview
```

## 📝 Content Creation

Blog articles are stored in the `src/content/_articles` directory, written in Markdown format. Each article needs to include frontmatter metadata, for example:

```markdown
---
title: 'Article Title'
description: 'Article Description'
date: '2023-01-01'
tags: ['tag1', 'tag2']
---

Article content...
```

## 🌐 Deployment Strategy

The project uses a Vercel + Cloudflare deployment approach:

1. **Vercel**: Provides continuous integration and deployment services; each time code is pushed or an article is added, deployment is automatically triggered
2. **Cloudflare**: Through setting up CNAME records and Cloudflare's CDN, enables access acceleration for domains without ICP filing in China

### Deployment Steps

1. Import GitHub repository on Vercel
2. Configure build command `pnpm build`
3. Set environment variables (if needed)
4. Set up custom domain
5. Add domain in Cloudflare and set CNAME record pointing to the domain provided by Vercel

## 🤝 Contribution Guidelines

Contributions to this project are welcome! Whether submitting bugs, improving documentation, or adding new features, your participation will make this project better.

1. Fork this repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Submit a Pull Request

## 📄 License

This project is distributed and used under the [LICENSE](LICENSE) open source license.

---

<p align="center">Made with ❤️ by <a href="https://github.com/alickx">alickx</a></p>

