<template>
  <div class="flex flex-row p-2">
    <div class="mr-5 w-3/5 pr-2">
      <NuxtLink :to="{
        name: 'article-id',
        params: { id: props.article.id },
      }" class="flex flex-col space-y-2">
        <!-- 文章信息 -->
        <div class="space-y-3">
          <!-- 标题和时间 -->
          <span class="line-clamp-2 text-4xl font-black text-black">{{
            props.article.title
          }}</span>
          <p class="text-sm text-gray-500">
            <Icon name="ic:baseline-access-time" size="18" />
            {{ $dayjs(props.article.createdAt).format('YYYY-MM-DD') }}
          </p>
        </div>
        <div>
          <!-- 摘要 -->
          <p class="line-clamp-3 text-lg leading-relaxed">
            {{ props.article.abstract }}
          </p>
        </div>
      </NuxtLink>
    </div>
    <div>
      <NuxtLink :to="{
        name: 'article-id',
        params: { id: props.article.id },
      }" class="flex flex-col justify-center">
        <!-- 图片 -->
        <nuxtImg width="400" class="rounded-xl" :src="props.article.cover" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { article } from '@prisma/client'

const { $dayjs } = useNuxtApp()

const props = defineProps({
  article: {
    type: Object as PropType<article>,
    required: true,
  },
})
</script>

<style scoped>
</style>
