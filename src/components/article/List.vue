<template>
  <div class="mx-auto mt-4 max-w-3xl">
    <div class="min-h-lg flex flex-col">
      <div v-for="article in data" :key="article._path">
        <ArticleItem
          class="border-0"
          :article="article"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData("articleList", () => {
  return queryContent("/articles").limit(10).sort({ date: -1 }).find();
});

const pageChange = (page: number) => {
  // articleList.value = queryContent('/articles').limit(10).skip((page - 1) * 10).find();
};
</script>
