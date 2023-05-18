<template>
  <div>
    <div v-for="item in articles" :key="item.id">
      <h1>{{ item.title }}</h1>
      <p>{{ item.content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { article } from '@prisma/client';

const { pageArticle } = useArticle();

const page = ref(1);
const total = ref(0);

const articles = ref<article[]>()

const getArticles = async () => {
  const { article,total } = await pageArticle(page.value)
  articles.value = article;
  total.value = total;
}

onMounted(() => {
  getArticles();
})
</script>

<style scoped></style>
