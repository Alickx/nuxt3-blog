<template>
  <div class="w-full overflow-x-hidden">
    <ContentRenderer
      class="markdown-body dark:text-gray-2 w-full max-w-full break-words"
      style="word-break: break-word; overflow-wrap: break-word"
      :value="articleData"
    />
  </div>
</template>

<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";

defineProps({
  articleData: {
    type: Object as PropType<ParsedContent>,
  },
});
</script>

<style scoped>
:deep(pre),
:deep(code),
:deep(table) {
  max-width: 100%;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

:deep(img),
:deep(video),
:deep(iframe) {
  max-width: 100%;
  height: auto;
}
</style>
