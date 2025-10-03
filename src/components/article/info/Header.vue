<template>
  <div class="mx-auto flex max-w-3xl flex-col items-center justify-center">
    <div class="leading-5">
      <h1 class="my-8 text-3xl font-bold text-[#444] dark:text-white">
        {{ articleData.title }}
      </h1>
    </div>
    <div class="flex flex-row flex-wrap gap-3">
      <p class="info-text">
        <Icon name="ic:baseline-access-time" size="18" class="mr-2" />
        发布时间：{{ formatTime }}
      </p>
      <p class="info-text">
        <Icon name="carbon:book" size="18" class="mr-2" />
        统计字数：{{ articleData.readingTime.words }} 字
      </p>
      <p class="info-text">
        <Icon name="ic:baseline-timer" size="18" class="mr-2" />
        阅读时间：{{ articleData.readingTime.text }}
      </p>
      <p class="info-text">
        <Icon name="ic:baseline-visibility" size="18" class="mr-2" />
        访问次数：<span id="busuanzi_value_page_pv">-</span>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content';


const dayjs = useDayjs();

const props = defineProps({
  articleData: {
    type: Object as PropType<ParsedContent>,
    required: true,
  },
});

const formatTime = computed(() => {
  return dayjs(props.articleData.date).format("YYYY-MM-DD");
});
</script>

<style scoped>
.info-text {
  @apply flex items-center whitespace-nowrap text-sm text-gray-500;
}
</style>
