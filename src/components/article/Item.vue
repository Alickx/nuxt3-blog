<template>
  <div class="overflow-hidden p-4 transition-transform">
    <div class="md:flex md:flex-col">
      <NuxtLink
        class="md:flex-shrink-0"
        :to="{ name: 'article-id', params: { id: props.article.id } }"
      >
      </NuxtLink>
      <div>
        <NuxtLink
          :to="{ name: 'article-id', params: { id: props.article.id } }"
        >
          <b
            class="mt-1 line-clamp-1 break-all text-lg font-light leading-tight text-[#444] no-underline hover:underline dark:text-white"
          >
            {{ article.title }}
          </b>
        </NuxtLink>
        <div class="flex flex-row gap-2">
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {{ formattedDate }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const dayjs = useDayjs();

const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
});

const formattedDate = computed(() => {
  return dayjs(props.article.createdAt).fromNow();
});
</script>
