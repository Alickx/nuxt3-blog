<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <div
      class="min-h-lg grid grid-cols-1 gap-4 space-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <div v-for="item in articles" :key="item.id">
        <ArticleItem :article="item" />
      </div>
    </div>
    <div v-if="articles != null" class="mt-20 flex justify-center">
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
import { SimpleArticle } from "~/composables/useArticle";

const { pageArticle } = useArticle();

const router = useRouter();
const route = useRoute();
const page = ref(1);
const total = ref(0);
const defaultPageSize = ref(5);
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

<style scoped>
@media (min-width: 640px) {
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
