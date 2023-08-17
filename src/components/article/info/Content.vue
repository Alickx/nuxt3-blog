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
import "highlight.js/styles/atom-one-light.css";
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

const showImage = (e: any, href: string) => {
  e.preventDefault();
  const mask = document.createElement("div");
  mask.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  `;
  const img = document.createElement("img");
  img.src = href;
  img.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 80%;
    max-height: 80%;
  `;
  mask.appendChild(img);
  document.body.appendChild(mask);
  mask.addEventListener("click", () => {
    document.body.removeChild(mask);
  });
};

onMounted(() => {
  //@ts-ignore
  window.showImage = showImage;
});


</script>

<style scoped></style>
