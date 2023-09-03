---
title: 使用Uniapp开发旅游罗盘小程序
slug: use-uniapp-to-develop-travel-compass-mini-program
description: 使用Uniapp开发旅游罗盘小程序
keywords: uniapp,miniprogram,wechat
date: 2023-08-24 01:30
---

## 想法

之前在抖音刷到过一个视频，就是视频主使用一款 App，这个 App 可以随机获取国内的城市，并且可以进行筛选。然后博主就通过这个 App，去拍旅游视频。

<img src="https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/7fa5e520f3e0b2b76bfadeea982c1bf.jpg" alt="7fa5e520f3e0b2b76bfadeea982c1bf" style="zoom:25%;" />

然后我想着好像还蛮有意思，想做一个出来玩一下。那么安卓应用我虽然说还不太了解开发，然后微信小程序我还是懂一点的嘛。然后我就打算以微信小程序为平台做一个出来耍耍。

## 选择

要做微信小程序的话，可以选择使用官方的开发方式来做，也可以使用 Uniapp 来做，那么为了后续有可能会使用到数据库等处理，我选择使用 Uniapp 来写，毕竟它提供了一个免费云函数和云数据库。而且只要你学会 Vue3，那么无论是微信小程序还是 Uniapp 其实都一样。

Uniapp 的优点有以下：

1. 可以白嫖云函数和数据库。
2. 可以使用Vue3以及相关的库，例如 Pinia，Unocss等，生态做得好，可以无缝切换。
3. 多端开发，如果后续有 app 需求，可以随时进行转换。

所以我选择了使用 Uniapp 来进行开发。

## 过程

我这里是直接使用官方的 Cli 来进行开发，这里既可以直接使用官方的 Hbuilder 来创建项目，也可以使用命令行来，使用 Cli 的话，项目的目录结构更符合我们平时 Node 开发的项目结构。

创建项目的命令这里我就直接贴官方的链接了。[创建命令](https://zh.uniapp.dcloud.io/quickstart-cli.html)

接着就是安装 Unocss，这里是安装配置。 [安装配置](https://github.com/MellowCo/unocss-preset-weapp/tree/main/examples/uniapp_vue3)

通过视频可以得知操作逻辑是点击转盘中间的按钮，转盘则会开始转动，同时上方的城市名称会不停变化，最终停留在随机获取的城市上。

首先是如何开发这个转盘，最重要的是这个城市数据，这个数据必须要有省，二级城市的相关数据，然后在 Github 搜索一番就可以获得。[省份数据](https://xiangyuecn.gitee.io/areacity-jsspider-statsgov/)

![image-20230824003225727](https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230824003225727.png)

获取到的省份数据还不能够使用，必须先把省和二级城市单独区分出来，这个使用 Python 可以很简单地做到。最终数据呈现这样子。

<img src="https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230824003358440.png" alt="image-20230824003358440" style="zoom: 33%;" />

上面是城市数据，而省份数据则是这样。

<img src="https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230824003455420.png" alt="image-20230824003455420" style="zoom:33%;" />

既然有了数据，那么就可以开发转盘了。一开始想的是这个转盘其实就是城市的名字，围着一个圆而已，但是网上大多都是围着一个边来。

<img src="https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230824003652987.png" alt="image-20230824003652987" style="zoom:33%;" />

这样子并不能满足需求，然后我就接着搜，最后找到了一个相似的 demo。[文字绕圆demo链接](https://blog.csdn.net/qq_33769914/article/details/120240867)

<img src="https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230824003809477.png" alt="image-20230824003809477" style="zoom:33%;" />

但是这样子还不行，可以看到视频上文字自身也是带角度的，每个文字都是指向外边，而不是横着来，那么问题就来到了如何让文本竖着来。结果刚好有一个 css 属性可以做到这样子。

```css
writing-mode:vertical-lr;
```

顺便放上 MDN 的链接 [MDN属性说明](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode)

ok，这样子就可以做出来了。
<img src="https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230824004105245.png" alt="image-20230824004105245" style="zoom: 33%;" />

**其实如果不是小程序的话，还有一种方式更简单实现，那就是使用 SVG 的 textpath，但是很可惜，在小程序中 svg标签并不能使用。**

那好，盘是做出来了，但是怎么转呢？这个问题刚好官方就有一个 api 可以解决。

```js
const animation = wx.createAnimation({
  duration: 6000,
  timingFunction: 'ease',
  delay: 0
})
```

具体的属性这里放上链接。[微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/animation/wx.createAnimation.html)

duration 设置为6000，也就是6秒，然后动画的效果是 ease，也就是官方所说的 ` 动画以低速开始，然后加快，在结束前变慢`。

然后这里我让它旋转360度。

```js
animationData.value = animation.rotate(360).step().export()
```

这里是实现的效果

<img src="https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/20230824_004833.gif" alt="20230824_004833" style="zoom:50%;" />

然后接下来就是上方的城市展示，这里我做了一个工具类来获取所有的城市。

```js
import areaJson from "@/constant/city.json";
import province from "@/constant/province.json";

/**
 * 随机获取旅游城市
 * @param {Array} exclude - 要排除的城市 ID 数组
 * @returns 返回城市信息
 */
export const randomGetArea = (exclude = []) => {
  // 读取 constant 中的 json
  const area = areaJson;
  // 随机获取城市
  const city = area[Math.floor(Math.random() * area.length)];
  // 如果城市在排除列表中，则重新获取
  if (exclude.includes(city.cityId)) {
    return randomGetArea(exclude);
  }
  return city;
};

export const randomGetAreaExclude = (
  excludeCityId = [],
  excludeProvinceId = [],
) => {
  const area = areaJson;
  const citys = area.filter(
    (item) =>
      !excludeProvinceId.includes(String(item.pid)) &&
      !excludeCityId.includes(item.id),
  );
  // 随机获取城市
  const city = citys[Math.floor(Math.random() * citys.length)];
  return city;
};
```

读取城市数据的 JSON 文件，然后随机获取。在动画执行的时候通过不断随机获取来达到视频的那种效果。下面是这个随机展示城市的方法。

```js
const animationHandle = () => {
  if (city.value !== '点击转盘开始') {
    return;
  }
  // 旋转360度
  animationData.value = animation.rotate(360).step().export()
  // 获取城市集合
  const list = listCityExclude([], excludeProvinceId.value || []);
  let index = 0;
  // 定时器获取
  animationHandleInterval.value = setInterval(() => {
    if (index >= 60) {
      clearInterval(animationHandleInterval.value);
      return;
    }
    city.value = list[Math.floor(Math.random() * list.length)].name;
    index++;
  }, 100);
  animationHandleTimeOut.value = setTimeout(() => {
    clearInterval(animationHandleInterval.value);
  }, 6000);
};
```

这样子就实现了转盘上随机展示城市的功能了，那么不管是随机展示，还是转盘动画转动，都需要一个最终确认的城市，同时这个城市还得在动画结束后最终展示。其实这个可以利用 刚才微信的动画 api 来解决。

![image-20230824005933510](https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230824005933510.png)

官方有一个事件，那么只要通过这个事件回调，就能做到确定最终城市了。

那么核心功能都已完成，现在就剩下样式和一些布局了。这部分就没啥好说了。在后续迭代中我还加上了省份筛选功能，这部分就运用到了 `Pinia` 这个状态处理库，还有这个状态持久化的库 `pinia-plugin-unistorage`。

```js
import { defineStore } from "pinia";

export const useAreaStore = defineStore(
  "area",
  () => {
    const excludeCityId = ref([]);
    const excludeProvinceId = ref([]);

    const setExcludeCityId = (id) => {
      excludeCityId.value.push(id);
    };

    const setExcludeProvinceId = (id) => {
      excludeProvinceId.value.push(id);
    };

    const removeExcludeCityId = (id) => {
      excludeCityId.value = excludeCityId.value.filter((item) => item !== id);
    };

    const removeExcludeProvinceId = (id) => {
      excludeProvinceId.value = excludeProvinceId.value.filter(
        (item) => item !== id,
      );
    };

    return {
      excludeCityId,
      excludeProvinceId,
      setExcludeCityId,
      setExcludeProvinceId,
      removeExcludeCityId,
      removeExcludeProvinceId,
    };
  },
  {
    unistorage: true,
  },
);
```

通过记录用户的筛选，并持久化，来达到目标功能。

<img src="https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230824010336524.png" alt="image-20230824010336524" style="zoom:50%;" />

这里的界面做得潦草一点，不过还有搜索功能，也算是麻雀虽小，五脏俱全了。

## 总结

后续还有很大的迭代空间，例如用户功能，用户转盘结果记录，通过AI来进行旅游地推荐等等。最终成为一个合格的小程序。

同时我也通过这次开发得到了许多关于 css 的知识，以及关于 Uniapp 的开发经验。后续迭代的功能，我将会记录在博客上。
