<template>
  <div
    class="card-shadow overflow-hidden rounded-lg bg-white transition-transform md:max-w-xs lg:max-w-sm"
  >
    <div class="md:flex md:flex-col">
      <NuxtLink
        class="md:flex-shrink-0"
        :to="{ name: 'article-id', params: { id: props.article.id } }"
      >
        <nuxt-picture
          :src="article.cover"
          :alt="article.title"
          :imgAttrs="{
            class:
              'h-full w-full object-cover transition-all duration-300 transform hover:scale-110',
          }"
        />
      </NuxtLink>
      <div class="px-4 py-4">
        <NuxtLink
          :to="{ name: 'article-id', params: { id: props.article.id } }"
        >
          <h1
            class="mt-1 line-clamp-1 break-all text-xl font-bold leading-tight text-black no-underline hover:underline"
          >
            {{ article.title }}
          </h1>
        </NuxtLink>
        <p class="mt-3 text-gray-500">{{ formattedDate }}</p>
        <p class="mt-3 line-clamp-2 break-all leading-6 text-gray-600">
          {{ article.abstract }}...
        </p>
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
  return $dayjs(props.article.createdAt).format("YYYY-MM-DD ");
});
</script>

<style scoped>
.card-shadow {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
}
</style>
