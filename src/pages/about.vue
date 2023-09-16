<template>
  <div class="markdown-body flex flex-1 justify-center p-7 dark:bg-[#212526]">
    <ContentRenderer :value="data!" />
  </div>
</template>

<script setup lang="ts">
import "@/assets/styles/markdown.scss";

const { data } = await useAsyncData("/_about", async () => {
  return queryContent("/_about").where({ slug: "about-me" }).findOne();
});
</script>

<style scoped></style>
