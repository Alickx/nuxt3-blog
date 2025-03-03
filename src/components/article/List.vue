<template>
  <div class="mx-auto mt-6 max-w-3xl px-4 sm:px-6 md:px-0">
    <div class="min-h-lg flex flex-col">
      <ContentList :query="query">
        <template #default="{ list }">
          <div class="space-y-6">
            <ArticleItem
              v-for="article in list"
              :key="article._path"
              :article="article"
            />
          </div>
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

const query: QueryBuilderParams = {
  path: props.contentPath,
  sort: [{ date: -1 }],
};

onMounted(() => {
  commentCount({
    serverURL: "https://comment.alickx.top",
  });
});
</script>
