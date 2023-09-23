<template>
  <div class="bg-white pb-14 dark:bg-[#212526]">
    <div class="relative mx-auto max-w-6xl flex-row items-start gap-5 xl:flex">
      <div v-if="data" class="max-w-5xl p-5 md:p-7">
        <ArticleInfoHeader :article-data="data" />
        <ArticleInfoContent :article-data="data" />
        <ArticleInfoFooter />
      </div>
      <div v-if="data" class="sticky top-0 hidden pt-10 xl:block">
        <ArticleInfoMarkdownToc :article-data="data" />
      </div>
    </div>
    <BackTop />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const { data } = await useAsyncData("article", () => {
  return queryContent("/").where({ slug: route.params.slug }).findOne();
});

useHead({
  title: data.value?.title,
  meta: [
    {
      name: "description",
      content: data.value?.description,
    },
    {
      name: "keywords",
      content: data.value?.keywords,
    },
  ],
});
</script>

<style scoped></style>
