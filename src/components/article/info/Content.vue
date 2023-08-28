<template>
  <ContentRenderer class="markdown-body dark:text-gray-2" :value="articleData" />
</template>

<script setup lang="ts">
import "assets/styles/fira-code.scss";
import "assets/styles/markdown.scss";
import { ParsedContent } from "@nuxt/content/dist/runtime/types";

defineProps({
  articleData: {
    type: Object as PropType<ParsedContent>,
  },
});

</script>

<style scoped>
</style>
