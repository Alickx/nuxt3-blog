<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 主要内容区域 -->
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <!-- 文章列表主内容 -->
        <div class="lg:col-span-3">
          <div class="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <ArticleList content-path="_articles" />
          </div>
        </div>

        <!-- 右侧边栏 -->
        <div class="lg:col-span-1">
          <div class="space-y-6">
            <!-- 个人简介卡片 -->
            <div class="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                关于我
              </h2>
              <div class="text-center">
                <div
                  class="mx-auto mb-4 h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-0.5 about-avatar cursor-pointer"
                  @mouseenter="startRotation"
                  @mouseleave="stopRotation"
                  ref="avatarContainer"
                >
                  <div class="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-gray-800 overflow-hidden">
                    <img
                      src="~/assets/images/avatar.png"
                      alt="Alickx头像"
                      class="about-avatar__image h-full w-full rounded-full object-cover"
                      ref="avatarImage"
                    />
                  </div>
                </div>
                <h3 class="mb-2 font-semibold text-gray-900 dark:text-white">Alickx</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  热爱技术，专注于前端开发和全栈技术分享
                </p>
              </div>
            </div>

            <!-- 博客统计 -->
            <div class="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                博客统计
              </h2>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Icon name="i-carbon-document" class="mr-2 h-4 w-4" />
                    文章总数
                  </span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ articleCount }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Icon name="i-carbon-view" class="mr-2 h-4 w-4" />
                    总访问量
                  </span>
                  <span class="font-semibold text-gray-900 dark:text-white">
                    <span id="busuanzi_value_site_pv">--</span>
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Icon name="i-carbon-time" class="mr-2 h-4 w-4" />
                    运行天数
                  </span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ runningDays }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Icon name="i-carbon-user" class="mr-2 h-4 w-4" />
                    访客总数
                  </span>
                  <span class="font-semibold text-gray-900 dark:text-white">
                    <span id="busuanzi_value_site_uv">--</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- 标签云 -->
            <div class="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                热门标签
              </h2>
              <div class="flex flex-wrap gap-2">
                <span class="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Vue.js
                </span>
                <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                  Nuxt.js
                </span>
                <span class="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  TypeScript
                </span>
                <span class="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  JavaScript
                </span>
                <span class="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
                  前端开发
                </span>
                <span class="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                  全栈开发
                </span>
              </div>
            </div>

            <!-- 技术栈 -->
            <div class="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                技术栈
              </h2>
              <div class="grid grid-cols-2 gap-3">
                <div class="flex items-center rounded-lg bg-gray-50 p-2 dark:bg-gray-700">
                  <div class="mr-2 h-6 w-6 rounded bg-green-500 flex items-center justify-center">
                    <span class="text-xs font-bold text-white">N</span>
                  </div>
                  <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Nuxt.js</span>
                </div>
                <div class="flex items-center rounded-lg bg-gray-50 p-2 dark:bg-gray-700">
                  <div class="mr-2 h-6 w-6 rounded bg-blue-500 flex items-center justify-center">
                    <span class="text-xs font-bold text-white">V</span>
                  </div>
                  <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Vue.js</span>
                </div>
                <div class="flex items-center rounded-lg bg-gray-50 p-2 dark:bg-gray-700">
                  <div class="mr-2 h-6 w-6 rounded bg-blue-600 flex items-center justify-center">
                    <span class="text-xs font-bold text-white">TS</span>
                  </div>
                  <span class="text-xs font-medium text-gray-700 dark:text-gray-300">TypeScript</span>
                </div>
                <div class="flex items-center rounded-lg bg-gray-50 p-2 dark:bg-gray-700">
                  <div class="mr-2 h-6 w-6 rounded bg-cyan-500 flex items-center justify-center">
                    <span class="text-xs font-bold text-white">TW</span>
                  </div>
                  <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Tailwind</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BackTop />
  </div>
</template>

<script setup lang="ts">
import { siteConfig } from "~/config/site";

const avatarImage = ref<HTMLElement | null>(null);
let rotationInterval: number | null = null;
let rotationDegree = 0;

const startRotation = () => {
  if (rotationInterval) return;

  rotationInterval = window.setInterval(() => {
    rotationDegree += 30; // 进一步增加旋转速度
    if (avatarImage.value) {
      avatarImage.value.style.transform = `rotate(${rotationDegree}deg)`;
    }
  }, 20); // 减少间隔时间使旋转更流畅
};

const stopRotation = () => {
  if (rotationInterval) {
    clearInterval(rotationInterval);
    rotationInterval = null;

    // 平滑减速到停止
    const startDegree = rotationDegree;
    // 计算到最近的完整圈的位置，避免过度旋转
    const targetDegree = Math.round(startDegree / 360) * 360;
    const startTime = Date.now();
    const duration = 1200; // 1.2秒减速时间，更自然

    const slowDown = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // 使用更自然的缓出效果
      const easeOut = 1 - Math.pow(1 - progress, 3);

      // 计算当前应该旋转的角度
      const currentDegree = startDegree + (targetDegree - startDegree) * easeOut;

      if (avatarImage.value) {
        avatarImage.value.style.transform = `rotate(${currentDegree}deg)`;
      }

      if (progress < 1) {
        requestAnimationFrame(slowDown);
      } else {
        // 停止时保持在目标角度
        rotationDegree = targetDegree;
      }
    };

    requestAnimationFrame(slowDown);
  }
};

useHead({
  title: "Alickx' Blog",
  meta: [
    {
      name: "description",
      content: "欢迎来到Alickx的博客网站,希望在这里能够找到能够帮助你的东西",
    },
  ],
  script: [
    {
      async: true,
      src: "//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js",
    },
  ],
});

// 计算运行天数
const runningDays = computed(() => {
  const createdDate = new Date(siteConfig.createdAt);
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - createdDate.getTime();
  return Math.floor(timeDiff / (1000 * 3600 * 24));
});

// 获取文章总数
const articleCount = ref(0);

onMounted(async () => {
  try {
    const articles = await queryContent("_articles").find();
    articleCount.value = articles.length;
  } catch (error) {
    console.error("获取文章数量失败:", error);
    articleCount.value = 0;
  }
});
</script>

<style scoped>
.about-avatar__image {
  transform: rotate(0deg);
  transition: transform 0.3s ease-out;
  will-change: transform;
}
</style>
