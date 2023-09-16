---
title: 给博客加上Algolia搜索能力
date: 2023-09-16 08:41
slug: blog-add-algolia
description: 通过申请algolia为博客增加搜索能力
---

## 优化目的

今天来给博客增加文章搜索能力，首先博客没有部署任何的数据库软件，博文是以本地存储的形式保存在代码中的，那么如果想要实现搜索效果的话，我们可以使用 Nuxt/Content 去进行搜索，但是这种方法受限于服务器的响应速度。  

大家可能在很多博客和一些文档网站上看到过这个搜索框

![vueuse官网的搜索框](https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230916084712921.webp)

![nuxt文档的搜索框](https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230916084813090.webp)

我们点击搜索框会发现搜索框底部有这么一个栏目。

![搜索框栏目](https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230916085021282.webp)

也就是这些文档网站是由 algolia 提供搜索能力的，那咱们博客网站也能用上。

下面附上 chatgpt 的解释。

![chatgpt关于algolia的解释](https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230916085359221.webp)



## 申请algolia

首先咱们先申请这个 algolia 的 `Doc search` ，申请成功后它将会帮助我们爬取你博客的文章的。申请的规则如下：

![image-20230916085806406](https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230916085806406.webp)

申请的网站地址是：https://docsearch.algolia.com/apply/

申请成功后它将会在邮件上回复你的。

![申请过程邮件](https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230916090207519.webp)



## 开始实施

当你申请成功后 algolia 会发送邮件邀请你申请加入他们网站，当我们注册登录成功后，可以查看我们博客数据的仪表盘。

![algolia仪表盘](https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230916090410803.webp)

得益于 Nuxt 强大的模块生态，我们可以很轻松地找到可以与 algolia 集成的 Nuxt module。

这是该模块的地址：https://algolia.nuxtjs.org/getting-started/quick-start

**以下内容为该模块文档上的内容**

那么我们开始进行集成，首先安装该模块的依赖

```shell
pnpm install @nuxtjs/algolia --save
```

然后配置 nuxt.config.ts

在 modules 上增加 `"@nuxtjs/algolia"`，同时我们也要安装 docsearch 的依赖

```shell
pnpm install @docsearch/js @docsearch/css
```

然后配置该组件依赖

```ts
{
  algolia: {
    apiKey: 'apiKey',
    applicationId: 'applicationId',
    // DocSearch key is used to configure DocSearch extension.
    docSearch: {
      indexName: 'indexName',
    }
  }  
}
```

那么就填上我们在 algolia 邮件上获取的这些配置信息。

同时在博客的导航栏组件上添加上模块已经集成好的组件，

```vue
<div
     class="flex flex-row items-center gap-5 text-[#444] dark:text-white"
     >
  <AlgoliaDocSearch />
  ....
</div>
```

出来的效果：

![搜索框](https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230917002948272.webp)



## 出现问题并解决

可是当我想测试的时候，却发现无论输入什么都没有数据展示，在查看了请求的数据后，发现 algolia 的响应是没有结果。按理说是已经有数据了，但是却没有数据返回。

没办法，先按邮件上的方式，单独创建一个静态的 HTML 文件来测试一下，结果是静态的 HTML 文件搜索是正常的。

![正常的搜索结果](https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230917003407190.webp)、

这样子就证明我们的配置是正确的，那么我们就对比一下两者的请求到底有什么差异，然后我发现在博客项目的 algolia 请求中多携带了一个参数。

![多携带的参数](https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230917003616789.webp)

在查看了该模块的官方文档中，我发现这个参数是由这个设置产生的。

![模块组件的设置](https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230917003714066.webp)

尽管我尝试过将他设置为 `zh` ，也就是中文语言，但是没有任何作用，依然返回不了任何数据，那我就将他设置为空字符串来。

```ts
algolia: {
  apiKey: "*",
  applicationId: "*",
  docSearch: {
    indexName: "alickx",
    lang: " ",
  },
},
```

最终可以成功返回结果。

![成功返回结果](https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230917004033816.webp)



## 深色模式的问题

在集成了该组件后，我发现当选择了深色模式后，该搜索组件并不会切换深色模式，在查看了 `@docsearch/css` 这个包后我发现该 css 切换成深色模式是使用 html 中的 data-theme 属性，也就是只有当 data-theme 为 dark 的时候，他才会切换。

由于项目中切换颜色模式是使用 vueuse 来进行切换，在看了文档后发现，的确是有设置属性的配置。

```ts
import { useColorMode } from '@vueuse/core'

const mode = useColorMode({
  attribute: 'theme',
  modes: {
    // custom colors
    dim: 'dim',
    cafe: 'cafe',
  },
}) // Ref<'dark' | 'light' | 'dim' | 'cafe'>
```

也就是这个 attribute 属性，但是他有一个问题，那就是当我配置成 data-theme 后，其他组件的深色模式就不管用了，这是因为 unocss 深色模式是以 .dark 来切换的，也就是必须 HTML 的 class 为 dark。

同时 useColorMode 中这个 attribute 还只能配置一个，没有多属性配置。

那没办法，只能手动来进行添加了，首先是使用 watch 来监听 mode 的切换，然后给 HTML 的节点添加属性，同时由于 watch 是只有触发了 mode 的变化它才会执行的，所以得在 onMount 生命周期上添加一次触发，代码如下。

```ts
watch(
  () => mode.value,
  () => {
    document.documentElement.setAttribute("data-theme", mode.value);
  },
);

onMounted(() => {
  document.documentElement.setAttribute("data-theme", mode.value);
  // ...
});
```

最终的效果

![深色模式下的效果](https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230917013842388.webp)



## 总结

给博客添加搜索功能可谓是踩了不少坑，先是模块发送请求时添加了语言限制导致没有搜索结果，然后便是深色模式的坑。同时 algolia 的 api key 不知道为什么有很多个，分别对应不同的功能，导致我对于 apikey 的理解比较混乱。

不过最终还是达成了目的，可谓是没白费功夫。
