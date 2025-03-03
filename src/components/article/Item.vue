<template>
  <div
    class="card-container mb-6 overflow-hidden rounded-lg border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-gray-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
  >
    <div class="flex flex-col">
      <!-- 文章封面图片 -->
      <div v-if="article.cover" class="-mx-6 -mt-6 mb-4 overflow-hidden">
        <img
          :src="article.cover"
          :alt="article.title"
          class="h-48 w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div>
        <NuxtLink :external="true" :to="`/articles/${article.slug}`">
          <h2
            class="break-all py-1 text-xl font-medium leading-tight text-gray-800 no-underline transition-colors duration-300 hover:text-blue-600 hover:underline dark:text-gray-200 dark:hover:text-blue-400"
          >
            {{ article.title }}
          </h2>
        </NuxtLink>

        <!-- 文章概览 -->
        <div
          v-if="articleExcerpt"
          class="mt-3 line-clamp-3 text-gray-600 dark:text-gray-400"
        >
          {{ articleExcerpt }}
        </div>

        <div
          class="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400"
        >
          <span
            class="flex items-center rounded-full bg-gray-100 px-3 py-1 transition-colors duration-300 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <span class="i-carbon-time mr-1.5"></span>
            {{ formattedDate }}
          </span>
          <span
            class="flex items-center rounded-full bg-gray-100 px-3 py-1 transition-colors duration-300 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <span class="i-carbon-document mr-1.5"></span>
            {{ article.readingTime.words }} 字
          </span>
          <span
            class="flex items-center rounded-full bg-gray-100 px-3 py-1 transition-colors duration-300 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <span class="i-carbon-chat mr-1.5"></span>
            <span
              class="waline-comment-count"
              ref="commentCountRef"
              :data-path="`/articles/${article.slug}`"
            ></span>
            评论
          </span>
        </div>
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

// 从文章内容中提取第一段文本作为概览
const articleExcerpt = computed(() => {
  // 首先检查是否有description，如果有则优先使用
  if (props.article.description) {
    return props.article.description;
  }

  // 如果没有body或body结构不完整，直接返回空字符串
  if (!props.article.body || !props.article.body.children) {
    return "";
  }

  try {
    // 尝试从文章内容中提取第一段文本
    const content = props.article.body;

    // 查找第一个段落内容
    if (content.children && content.children.length > 0) {
      // 跳过标题，寻找第一个段落
      for (const child of content.children) {
        // 如果是段落且有文本内容
        if (child.tag === "p" && child.children && child.children.length > 0) {
          // 提取段落中的文本
          const textParts = [];
          for (const textNode of child.children) {
            if (textNode.type === "text" && textNode.value) {
              textParts.push(textNode.value);
            }
          }
          if (textParts.length > 0) {
            return textParts.join("");
          }
        }
      }
    }
  } catch (error) {
    console.error("提取文章摘要时出错:", error);
  }

  // 如果无法从内容中提取，则回退到使用description或空字符串
  return "";
});
</script>
