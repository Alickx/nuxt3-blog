<template>
  <div class="markdown-body p-7 flex justify-center flex-1">
    <ContentRenderer :value="data!" />
  </div>
</template>

<script setup lang="ts">
import '@/assets/styles/markdown.scss'



const { data } = await useAsyncData("about", async () => {
  return queryContent("/about").where({ title: "README" }).findOne();
});
</script>

<style scoped></style>
