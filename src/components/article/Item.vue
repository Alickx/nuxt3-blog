<template>
  <div class="overflow-hidden p-4 transition-transform">
    <div class="md:flex md:flex-col">
      <div>
        <NuxtLink :to="`/articles/${article.slug}`">
          <span
            class="py-1 mt-1 break-all text-lg font-normal leading-tight text-[#444] no-underline hover:underline dark:text-[#CCCCCC]"
          >
            {{ article.title }}
        </span>
        </NuxtLink>
        <div
          class="mt-2 flex flex-row items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
        >
          <span>
            {{ formattedDate }}
          </span>
          |
          <span>{{ article.readingTime.words }} 字</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ParsedContent } from "@nuxt/content/dist/runtime/types";

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
