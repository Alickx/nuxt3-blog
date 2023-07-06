<template>
  <div
    class="bg-white border rounded-lg shadow-lg overflow-hidden transition-transform duration-200 ease-in-out hover:scale-105">
    <div class="md:flex">
      <NuxtLink class="md:flex-shrink-0" :to="{ name: 'article-id', params: { id: props.article.id } }">
        <img class="h-full w-full object-cover md:w-56 " :src="article.cover" alt="">
      </NuxtLink>
      <div class="px-4 py-4 w-full">
        <NuxtLink :to="{ name: 'article-id', params: { id: props.article.id } }"
                  class="block mt-1 text-xl leading-tight font-bold text-black hover:underline no-underline">
          {{ article.title }}
        </NuxtLink>
        <p class="mt-3 text-gray-500">{{ formattedDate }}</p>
        <p class="mt-3 text-gray-600 leading-6 line-clamp-2">{{ article.abstract.substring(0, 100) }}...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, computed} from '@vue/runtime-core';

const {$dayjs} = useNuxtApp();

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
