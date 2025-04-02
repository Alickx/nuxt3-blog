<template>
  <footer
    class="mt-14 w-full border-t border-t-[#ddd] bg-white py-6 text-[#444] dark:border-t-gray-700 dark:bg-[#212526] dark:text-gray-300"
  >
    <div class="container mx-auto px-4">
      <!-- 页脚上部 - 链接区域 -->
      <div class="flex justify-center">
        <div
          class="sm:gap-15 grid w-full max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3"
        >
          <div
            v-for="(section, index) in footerLinks"
            :key="index"
            class="flex flex-col text-center"
          >
            <h3
              class="mb-3 border-b border-gray-200 pb-2 text-base font-bold dark:border-gray-700"
            >
              {{ section.title }}
            </h3>
            <div class="flex flex-col space-y-2">
              <a
                v-for="(link, linkIndex) in section.links"
                :key="linkIndex"
                :href="link.url"
                target="_blank"
                class="flex transform items-center justify-center text-base transition-all duration-300 hover:translate-x-1 hover:text-blue-500 dark:hover:text-blue-400"
              >
                <span class="mr-1">›</span> {{ link.name }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- 页脚下部 - 版权信息 -->
      <div
        class="mt-4 border-t border-gray-200 pt-3 text-center dark:border-gray-700"
      >
        <div class="mb-2 flex justify-center space-x-4">
          <a
            href="https://github.com/Alickx"
            target="_blank"
            class="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          © {{ new Date().getFullYear() }} Alickx Blog 保留所有权利。
        </p>
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

<style scoped>
footer {
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

a {
  position: relative;
  display: inline-block;
}

h3 {
  position: relative;
  font-size: 1.1rem;
}

h3::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 30px;
  height: 2px;
  background-color: #3b82f6;
}
</style>
