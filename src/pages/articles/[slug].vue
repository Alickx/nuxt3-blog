<template>
  <div class="w-full pb-14">
    <div
      class="relative mx-auto max-w-6xl xl:grid xl:grid-cols-[1fr_auto] xl:gap-5"
    >
      <div v-if="data" class="w-full overflow-hidden p-3 sm:p-5 md:p-7">
        <ArticleInfoHeader :article-data="data" />
        <ArticleInfoContent :article-data="data" />
        <ArticleInfoFooter />
        <ClientOnly>
          <WalineComment />
        </ClientOnly>
      </div>
      <div v-if="data" class="relative hidden w-[260px] xl:block">
        <div
          ref="tocWrapper"
          :style="tocStyle"
          class="min-w-[260px] max-w-[260px] rounded bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm dark:bg-zinc-800/80"
        >
          <ArticleInfoMarkdownToc :article-data="data" />
        </div>
      </div>
    </div>
    <BackTop />
  </div>
</template>

<script setup lang="ts">
import WalineComment from "~/components/WalineComment.vue";
import type { CSSProperties } from "vue";

const route = useRoute();
const tocWrapper = ref<HTMLElement | null>(null);
const tocStyle = ref<CSSProperties>({
  position: "fixed",
  top: "120px",
  width: "260px",
  maxHeight: "calc(100vh - 120px)",
  overflowY: "auto",
  zIndex: 10,
});

const { data } = await useAsyncData("article", () => {
  return queryContent("/").where({ slug: route.params.slug }).findOne();
});

// 节流函数，避免频繁更新
const throttle = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastTime = 0;

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = delay - (now - lastTime);

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      lastTime = now;
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        lastTime = Date.now();
        timer = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
};

// 监听滚动事件，调整TOC位置
const updateTocPosition = () => {
  if (!tocWrapper.value) return;

  const headerHeight = 120; // 头部高度

  tocStyle.value = {
    position: "fixed",
    top: `${headerHeight}px`,
    width: "260px",
    maxHeight: "calc(100vh - 120px)",
    overflowY: "auto",
    zIndex: 10,
  };
};

// 节流处理，避免频繁计算
const throttledUpdateTocPosition = throttle(updateTocPosition, 100);

onMounted(() => {
  window.addEventListener("scroll", throttledUpdateTocPosition);
  window.addEventListener("resize", throttledUpdateTocPosition);
  updateTocPosition(); // 初始化位置
});

onUnmounted(() => {
  window.removeEventListener("scroll", throttledUpdateTocPosition);
  window.removeEventListener("resize", throttledUpdateTocPosition);
});

useHead({
  title: data.value?.title,
  meta: [
    {
      name: "description",
      content: data.value?.description,
    },
    {
      name: "keywords",
      content: data.value?.keywords,
    },
  ],
});
</script>

<style scoped></style>
