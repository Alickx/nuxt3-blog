<template>
  <div class="mx-auto mt-6 max-w-3xl px-4 sm:px-6 md:px-0">
    <div class="min-h-lg flex flex-col">
      <ContentList :query="query">
        <template #default="{ list: articles }">
          <div class="space-y-6">
            <ArticleItem
              v-for="article in paginatedArticles(articles)"
              :key="article._path"
              :article="article"
            />
          </div>
          <CommonPagination
            :current-page="currentPage"
            :total-pages="getTotalPages(articles)"
            @change="handlePageChange"
          />
        </template>
        <template #not-found>
          <div class="mt-10 text-center text-gray-500 dark:text-gray-400">
            <div class="i-carbon-document-unknown mx-auto mb-4 h-16 w-16"></div>
            <p>文章未找到。</p>
          </div>
        </template>
      </ContentList>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content";
import { commentCount } from "@waline/client/dist/comment";

const props = defineProps({
  contentPath: {
    type: String,
  },
});

const currentPage = ref(1);
const pageSize = 10;
const query: QueryBuilderParams = {
  path: props.contentPath,
  sort: [{ date: -1 }],
};

// 将分页逻辑修改为接受文章列表参数
const paginatedArticles = (articles: any[]) => {
  const start = (currentPage.value - 1) * pageSize;
  return articles?.slice(start, start + pageSize) || [];
};

// 计算总页数的方法也需要接受文章列表参数
const getTotalPages = (articles: any[]) => {
  return Math.ceil((articles?.length || 0) / pageSize);
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const updateCommentCount = () => {
  // 添加短暂延迟确保 DOM 已更新
  setTimeout(() => {
    commentCount({
      serverURL: "https://comment.alickx.top",
    });
  }, 100);
};

// 监听分页变化
watchEffect(() => {
  // 当 currentPage 变化时触发更新
  if (currentPage.value) {
    updateCommentCount();
  }
});

// 初始化时也需要获取评论数
onMounted(() => {
  updateCommentCount();
});
</script>
