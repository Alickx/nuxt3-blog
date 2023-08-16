<template>
  <div class="mx-auto max-w-3xl mt-4">
    <div class="min-h-lg flex flex-col">
      <div v-for="item in articles" :key="item.id">
        <ArticleItem class="border-b-1 border-0 border-solid border-b-gray-1" :article="item" />
      </div>
    </div>
    <div v-if="articles != null" class="mt-15 mb-5 flex justify-center">
      <a-pagination
        v-model:current="page"
        :defaultPageSize="defaultPageSize"
        :total="total"
        show-less-items
        @change="pageChange"
      >
        <template #itemRender="{ type, originalElement }">
          <a v-if="type === 'prev'">上一页</a>
          <a v-else-if="type === 'next'">下一页</a>
          <component :is="originalElement" v-else></component>
        </template>
      </a-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SimpleArticle } from "~/types";
const { pageArticle } = useArticle();

const router = useRouter();
const route = useRoute();
const page = ref(1);
const total = ref(0);
const defaultPageSize = ref(9);
const articles = ref<SimpleArticle[]>();

const getArticles = async () => {
  const { data } = await pageArticle(page.value, defaultPageSize.value);
  articles.value = data.records;
  total.value = data.total;
};

const pageChange = (page: number) => {
  router.push({ query: { page } });
  getArticles();
  window.scrollTo(0, 0);
};

watch(
  () => route.query.page,
  () => {
    const queryPage = Number(route.query.page);
    if (queryPage) {
      page.value = queryPage;
    }
    getArticles();
  },
);

useAsyncData(async () => {
  await getArticles();
});
</script>

<style scoped></style>
