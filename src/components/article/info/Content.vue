<template>
  <ContentRenderer
    class="markdown-body dark:text-gray-2"
    :value="articleData"
  />
</template>

<script setup lang="ts">
import { type ParsedContent } from "@nuxt/content/dist/runtime/types";

defineProps({
  articleData: {
    type: Object as PropType<ParsedContent>,
  },
});
</script>

<style scoped></style>
