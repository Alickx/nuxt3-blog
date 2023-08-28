---
title: Nuxt3生成对SEO友好的slug
slug: nuxt3-generate-seo-friendly-slug
description: 使用nodejs中的pinyin包将中文标题转换为slug
date: 2023-08-17 13:48
---

## 想法

首先 slug 和文章是需要有关联的，我的想法是将标题转换为拼音，然后通过 `-` 符号进行连接。

例如标题：`使用Java开发`，那么转换为拼音就是 `shi yong Java kai fa`，那么我再使用横杠符号进行连接那么就会得到一个可读的slug，`shi-yong-Java-kai-fa`。

## 开发

安装 `pinyin` 包

```shell
pnpm install pinyin
```

在utils目录下创建 `slugUtils.ts` 工具类，用于转换标题，获取 slug。

```ts
import pinyin from 'pinyin'

/**
 * 中文转拼音
 * @param cnStr 中文字符串
 * @returns
 */
const toPinyin = (cnStr: string) => {
  return pinyin(cnStr, {style: pinyin.STYLE_NORMAL,});
}

/**
 * 扁平化拼音数组
 * @param pinyinArr 拼音数组
 */
const flattenPinyin = (pinyinArr: string[][]) => {
  return pinyinArr.map((item) => item[0])
}

export function getSlug(cnStr: string) {
  const pinyinArr = toPinyin(cnStr)
  const flattenArr = flattenPinyin(pinyinArr)
  return flattenArr.join('-')
}

```

在发布文章的组件中引入该工具类，并在提交的时候进行 slug 获取。

```ts
import { getSlug } from "~/utils/slugUtils"

const articleData = {
  title: title.value,
  content: content.value,
  slug: getSlug(title.value),
  wordCount: wordCountComputed.value,
};
```

## 效果

发布一篇测试文章，标题为 `测试使用slug`，如果能够正常转换的话，那么得到的 slug 为 `ce-shi-shi-yong-slug`。

![image-20230817111335276](https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230817111335276.png)

那么是可以正常进行转换，得到 slug的。那么通过 slug 为文章链接，对 SEO 会更加友好。

![image-20230817112722493](https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230817112722493.png)
