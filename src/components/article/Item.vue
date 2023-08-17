<template>
  <div class="overflow-hidden p-4 transition-transform">
    <div class="md:flex md:flex-col">
      <NuxtLink
        class="md:flex-shrink-0"
        :to="{ name: 'article-slug', params: { slug: props.article.slug } }"
      >
      </NuxtLink>
      <div>
        <NuxtLink
          :to="{ name: 'article-slug', params: { slug: props.article.slug } }"
        >
          <b
            class="mt-1 line-clamp-1 break-all text-lg font-normal leading-tight text-[#444] no-underline hover:underline dark:text-white"
          >
            {{ article.title }}
          </b>
        </NuxtLink>
        <div
          class="mt-2 flex flex-row items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
        >
          <span>
            {{ formattedDate }}
          </span>
          |
          <span> {{ article.wordCount }}字 </span>
          <div class="flex flex-1 flex-row items-center justify-end gap-1">
            <Icon name="mdi:eye-outline" size="16" />
            {{ article.viewCount }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SimpleArticle } from "~/types";

const dayjs = useDayjs();

const props = defineProps({
  article: {
    type: Object as PropType<SimpleArticle>,
    required: true,
  },
});

const formattedDate = computed(() => {
  return dayjs(props.article.createdAt).fromNow();
});
</script>
