<template>
  <div class="mx-auto mt-4 max-w-3xl">
    <div class="min-h-lg flex flex-col">
      <ContentList :query="query">
        <template #default="{ list }">
          <div v-for="article in list" :key="article._path">
            <ArticleItem class="border-0" :article="article" />
          </div>
        </template>
        <template #not-found>
          <p>No articles found.</p>
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
