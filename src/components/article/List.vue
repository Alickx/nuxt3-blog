<template>
  <div class="mx-auto mt-4 max-w-3xl">
    <div class="min-h-lg flex flex-col">
      <ContentList :query="query" v-slot="{ list }">
        <div v-for="article in list" :key="article._path">
          <ArticleItem class="border-0" :article="article" />
        </div>
      </ContentList>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
import { commentCount } from '@waline/client/dist/comment';

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
    serverURL: 'https://comment.alickx.top'
  });
});
</script>
