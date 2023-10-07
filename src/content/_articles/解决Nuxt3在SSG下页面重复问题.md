---
title: 解决Nuxt3在SSG下页面重复问题
slug: resolve-nuxt-ssg-link-repeat
date: 2023-10-07
description: 通过 NuxtLink 的 external 属性解决 SSG 渲染模式下的重复问题
---



## 问题描述

这个问题我实在找不到名词去形容，姑且叫做 `页面重复问题`，具体表现为**当使用SSG，也就是静态渲染模式下，点击博客文章链接，虽然 URL 会发生改变，但是页面会一直重复展示第一次所访问的文章**，在控制台网络下，没有任何的加载行为。

![20231007_102927](https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/20231007_102927.gif)

可以看到我第一次访问的文章为 "jdk21虚拟现场体验"，然后在我访问其他文章的时候，他依旧会重复这个页面内容。



## 原因

具体的原因暂不清楚，根据解决办法逆向推断估计是跟缓存，或者是跟 NuxtLink 有关。



## 解决办法

解决办法就是在跳转的 NuxtLink 标签上添加 `external` 属性，并赋值为true

```vue
<NuxtLink :external="true" :to="`/articles/${article.slug}`">
  <h2
      class="break-all py-1 text-lg font-normal leading-tight text-[#444] no-underline hover:underline dark:text-[#CCCCCC]"
      >
    {{ article.title }}
  </h2>
</NuxtLink>
```

这样子就解决此问题了。

贴一下 Nuxt 官方文档对于该属性的解释

> **external**：强制链接被视为外部 ( `true`) 或内部 ( `false`)。这有助于处理边缘情况