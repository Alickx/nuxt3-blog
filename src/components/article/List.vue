<template>
  <div class="mx-auto mt-6 max-w-3xl px-4 sm:px-6 md:px-0">
    <div class="min-h-lg flex flex-col">
      <ContentQuery :path="contentPath" :sort="[{ date: -1 }]">
        <template #default="{ data: articles }">
          <div class="relative space-y-6">
            <div
              v-if="isLoading"
              class="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50"
            >
              <div class="page-loading-spinner"></div>
            </div>

            <TransitionGroup
              :key="currentPage"
              name="article-list"
              tag="div"
              class="space-y-6"
              :css="false"
              @before-enter="beforeEnter"
              @enter="enter"
              @leave="leave"
            >
              <ArticleItem
                v-for="article in paginatedArticles(articles)"
                :key="article._path"
                :article="article"
                :data-index="article._animIndex"
              />
            </TransitionGroup>
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
      </ContentQuery>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content";
import gsap from "gsap";
// 使用动态导入防止服务器端执行
const { commentCount } = process.client
  ? await import("@waline/client/dist/comment")
  : { commentCount: () => {} };

const props = defineProps({
  contentPath: {
    type: String,
  },
});

const currentPage = ref(1);
const pageSize = 10;
const isLoading = ref(false);

// Animation functions
const beforeEnter = (el: Element) => {
  (el as HTMLElement).style.opacity = "0";
  (el as HTMLElement).style.transform = "translateY(30px)";
};

const enter = (el: Element, done: () => void) => {
  gsap.to(el, {
    duration: 0.6,
    opacity: 1,
    y: 0,
    delay: (el as HTMLElement).dataset.index
      ? parseInt((el as HTMLElement).dataset.index || "0") * 0.1
      : 0,
    onComplete: done,
    ease: "power2.out",
  });
};

const leave = (el: Element, done: () => void) => {
  gsap.to(el, {
    duration: 0.4,
    opacity: 0,
    y: -30,
    onComplete: done,
    ease: "power2.in",
  });
};

// 将分页逻辑修改为接受文章列表参数
const paginatedArticles = (articles: any[]) => {
  const start = (currentPage.value - 1) * pageSize;
  const paginatedItems = articles?.slice(start, start + pageSize) || [];

  // Add index for staggered animations
  paginatedItems.forEach((item, index) => {
    if (item) {
      item._animIndex = index;
    }
  });

  return paginatedItems;
};

// 计算总页数的方法也需要接受文章列表参数
const getTotalPages = (articles: any[]) => {
  return Math.ceil((articles?.length || 0) / pageSize);
};

const handlePageChange = async (page: number) => {
  isLoading.value = true;

  // Animate current page out
  await new Promise((resolve) => setTimeout(resolve, 300));

  currentPage.value = page;
  isLoading.value = false;

  // 只在客户端环境中执行window操作
  if (process.client) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

const updateCommentCount = () => {
  // 确保只在客户端执行
  if (!process.client) return;

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

<style scoped>
.page-loading-spinner {
  border: 3px solid rgba(33, 124, 145, 0.1);
  border-radius: 50%;
  border-top: 3px solid #217c91;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.dark .page-loading-spinner {
  border: 3px solid rgba(58, 74, 90, 0.1);
  border-top: 3px solid #3a4a5a;
}
</style>
