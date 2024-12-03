<template>
  <footer
    class="dark:text-gray-3 w-full border-0 border-solid bg-white pb-10 pt-10 text-base text-[#444] dark:bg-[#212526]"
  >
    <div class="mx-auto flex max-w-6xl flex-col">
      <div class="flex flex-col justify-center gap-2 gap-5 md:flex-row">
        <div
          v-for="(section, index) in footerLinks"
          :key="index"
          class="mx-4 flex flex-1 flex-col space-y-2"
        >
          <span class="mb-2 font-bold">{{ section.title }}</span>
          <a
            v-for="(link, linkIndex) in section.links"
            :key="linkIndex"
            :href="link.url"
            target="_blank"
            class="transition-colors hover:text-blue-500"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const footerLinks = [
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
    links: [{ name: "aliveseven", url: "https://aliveseven.github.io/" }],
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
];
</script>

<style scoped></style>
