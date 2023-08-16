<template>
  <div class="markdown-body dark:text-white" v-html="contentHtml" />
</template>

<script setup lang="ts">
import "highlight.js/styles/foundation.css";
import "assets/styles/fira-code.scss";
import "assets/styles/markdown.scss";

defineProps({
  contentHtml: {
    type: String,
    default: "",
  },
});
</script>

<style scoped></style>
