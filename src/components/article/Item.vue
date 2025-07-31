<template>
  <div
    class="group border-b border-gray-100 py-5 transition-all duration-200 hover:bg-gray-50/50 dark:border-gray-800 dark:hover:bg-gray-800/30"
  >
    <div class="flex flex-col space-y-3">
      <!-- 文章标题 -->
      <NuxtLink :external="true" :to="`/articles/${article.slug}`">
        <h2
          class="text-lg font-normal text-gray-800 transition-colors duration-200 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 leading-relaxed line-clamp-2"
        >
          {{ article.title }}
        </h2>
      </NuxtLink>

      <!-- 文章信息 -->
      <div class="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        <span class="flex items-center">
          <Icon name="i-carbon-time" class="mr-1 h-4 w-4"></Icon>
          {{ formattedDate }}
        </span>
        <span class="flex items-center">
          <Icon name="i-carbon-document" class="mr-1 h-4 w-4"></Icon>
          {{ article.readingTime.words }} 字
        </span>
        <span class="flex items-center">
          <Icon name="i-carbon-chat" class="mr-1 h-4 w-4"></Icon>
          <span
            class="waline-comment-count"
            ref="commentCountRef"
            :data-path="`/articles/${article.slug}`"
          ></span>
          &nbsp;评论
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";

const commentCountRef = ref(null);

const dayjs = useDayjs();

const props = defineProps({
  article: {
    type: Object as PropType<ParsedContent>,
    required: true,
  },
});

const formattedDate = computed(() => {
  return dayjs(props.article.date).fromNow();
});
</script>
