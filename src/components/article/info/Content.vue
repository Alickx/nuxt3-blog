<template>
  <div
    ref="markdownBodyRef"
    class="markdown-body dark:text-gray-400"
    v-html="contentHtml"
  />
</template>

<script setup lang="ts">
import "assets/styles/hljs.scss";
import "assets/styles/fira-code.scss";
import "assets/styles/markdown.scss";
import ClipboardJS from "clipboard";

const props = defineProps({
  contentHtml: {
    type: String,
    default: "",
  },
});

const markdownBodyRef = ref();

const handleCopyButton = () => {
  const markdownBody = markdownBodyRef.value;
  const codeBlocks = markdownBody.querySelectorAll("pre code");
  codeBlocks.forEach((codeBlock: any) => {
    const button = document.createElement("button");
    button.className = "copy-button";
    button.textContent = "Copy";
    codeBlock.parentNode.insertBefore(button, codeBlock);
    const clipboard = new ClipboardJS(button, {
      target: () => codeBlock,
    });
    clipboard.on("success", (e) => {
      e.clearSelection();
      button.textContent = "Copied!";
      setTimeout(() => {
        button.textContent = "Copy";
      }, 2000);
    });
  });
};

watch(
  () => props.contentHtml,
  () => {
    nextTick(() => {
      handleCopyButton();
    });
  },
);
</script>

<style scoped></style>
