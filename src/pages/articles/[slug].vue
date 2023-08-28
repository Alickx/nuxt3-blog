<template>
  <div class="flex-1 bg-[#fafafa] pb-14 dark:bg-[#212526]">
    <div class="relative mx-auto max-w-6xl flex-row items-start gap-5 md:flex">
      <div v-if="data" class="max-w-5xl p-5 md:p-7">
        <ArticleInfoHeader :article-data="data" />
        <ArticleInfoContent :article-data="data" />
        <ArticleInfoFooter />
      </div>
      <div v-if="data" class="sticky top-0 hidden pt-10 md:block">
        <ArticleInfoMarkdownToc :article-data="data" />
      </div>
    </div>
  </div>
  <BackTop />
</template>

<script setup lang="ts">

const route = useRoute();


const { data } = await useAsyncData('article', () => {
  return queryContent('/articles').where({ slug: route.params.slug }).findOne();
})

useHead({
  titleTemplate(title) {
    return `${title} - Alickx'blog`
  },
  title: data.value?.title
})


</script>

<style scoped>
</style>
