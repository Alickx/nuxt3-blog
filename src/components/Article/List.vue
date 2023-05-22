<template>
  <div class="mx-auto w-2/3 p-10">
    <div v-for="item in articles" :key="item.id">
      <ArticleItem :article="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { article } from '@prisma/client'

const { pageArticle } = useArticle()

const page = ref(1)
const total = ref(0)

const articles = ref<article[]>()

const getArticles = async () => {
  const data = await pageArticle(page.value)
  articles.value = data.articles
  total.value = data.total
}

onMounted(() => {
  getArticles()
})
</script>

<style scoped>
</style>
