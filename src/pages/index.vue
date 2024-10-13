<template>
  <div>
    <ArticleList content-path="_articles" />
  </div>
  <BackTop />
</template>

<script setup lang="ts">
useHead({
  title: "Alickx' Blog",
  meta: [
    {
      name: "description",
      content: "欢迎来到Alickx的博客网站,希望在这里能够找到能够帮助你的东西",
    },
  ],
});
</script>

<style scoped></style>
