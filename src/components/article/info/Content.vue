<template>
  <div class="mx-4">
    <div
      class="markdown-body shadow-default mx-auto max-w-4xl rounded-lg bg-white p-4 md:p-8 lg:p-12 xl:p-16"
      v-html="contentHtml"
    />
  </div>
</template>

<script setup lang="ts">
import "highlight.js/styles/foundation.css";
import "~/assets/sytles/markdown.scss";

const props = defineProps({
  contentHtml: {
    type: String,
    default: "",
  },
});

</script>

<style scoped></style>
