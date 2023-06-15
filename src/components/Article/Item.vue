<template>
  <div
    class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-200 ease-in-out hover:scale-105">
    <div class="md:flex">
      <NuxtLink :to="{ name: 'article-id', params: { id: props.article.id } }">
        <div class="md:flex-shrink-0 h-full">
          <img class="h-full w-full object-cover md:w-48" :src="article.cover" alt="">
        </div>
      </NuxtLink>
      <div class="px-8 py-4">
        <NuxtLink :to="{ name: 'article-id', params: { id: props.article.id } }"
          class="block mt-1 text-lg leading-tight font-bold font-sans text-black hover:underline no-underline">
          {{ article.title }}
        </NuxtLink>
        <p class="mt-2 text-gray-500">{{ formattedDate }}</p>
        <p class="mt-2 text-gray-600 leading-6 line-clamp-2">{{ article.abstract.substring(0, 100) }}...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from '@vue/runtime-core';
const { $dayjs } = useNuxtApp();

const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
});

const formattedDate = computed(() => {
  return $dayjs(props.article.createdAt).format('YYYY-MM-DD ');
});
</script>

<style scoped>
</style>
