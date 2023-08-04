<template>
  <div class="markdown-body" v-html="contentHtml" />
</template>

<script setup lang="ts">
import "highlight.js/styles/foundation.css";
import "~/assets/sytles/markdown.scss";

defineProps({
  contentHtml: {
    type: String,
    default: "",
  },
});
</script>

<style scoped></style>
