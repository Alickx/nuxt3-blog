<template>
  <div
    class="bg-white rounded-lg card-shadow overflow-hidden transition-transform duration-200 ease-in-out hover:scale-105">
    <div class="md:flex">
      <NuxtLink class="md:flex-shrink-0" :to="{ name: 'article-id', params: { id: props.article.id } }">
        <nuxt-picture :src="article.cover" :alt="article.title"
          :imgAttrs="{ class: 'h-full w-full object-cover md:w-56 ' }" />
      </NuxtLink>
      <div class="px-4 py-4">
        <NuxtLink :to="{ name: 'article-id', params: { id: props.article.id } }"
          class="block mt-1 text-xl leading-tight font-bold text-black hover:underline no-underline">
          {{ article.title }}
        </NuxtLink>
        <p class="mt-3 text-gray-500">{{ formattedDate }}</p>
        <p class="mt-3 text-gray-600 leading-6 line-clamp-2">{{ article.abstract }}...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
.card-shadow {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
}
</style>
