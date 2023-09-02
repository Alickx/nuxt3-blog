<template>
  <div class="flex-1 bg-[#fafafa] dark:bg-[#212526]">
    <ArticleList />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Alickx' Blog",
  meta: [
    {
      name: "keywords",
      content: "Alickx, Blog, Vue, Nuxt, Java",
    },
    {
      name: "description",
      content: "Alickx-Blog, 一个关于前端、后端的技术博客",
    },
  ],
});
</script>

<style scoped></style>
