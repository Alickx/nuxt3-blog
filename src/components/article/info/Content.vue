<template>
  <div class="w-full overflow-x-hidden">
    <ContentRenderer
      class="markdown-body dark:text-gray-2"
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

<style scoped></style>
