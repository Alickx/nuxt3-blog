<template>
  <div>
    <ArticleInfoHeader :title="article?.title" :created-at="article?.createdAt" :cover="article?.cover" />
    <ArticleInfoContent :content="article?.content" />
  </div>
</template>

<script setup lang="ts">

const { getArticle } = useArticle()

definePageMeta({
  layout: 'article'
})

const route = useRoute()
const router = useRouter()
let article = ref()

const getArticleById = async (id: string) => {
  try {
    const resp = await getArticle(id)
    article.value = resp
  } catch (err) {
    router.push('/404')
  }
}

onMounted(() => {
  getArticleById(route.params.id as string)
})
</script>

<style scoped></style>
