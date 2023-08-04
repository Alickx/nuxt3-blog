<template>
  <div class="bg-[#f2f3f5] pb-14 pt-10">
    <div
      class="shadow-default mx-4 mx-auto max-w-4xl rounded-lg bg-white px-4 md:px-8 lg:px-12 xl:px-16"
    >
      <ArticleInfoHeader
        :title="article?.title"
        :created-at="article?.createdAt"
        :content="contentHtml"
      />
      <ArticleInfoContent :content-html="contentHtml" />
    </div>
    <ClientOnly>
      <a-back-top />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { Article } from "composables/useArticle";
import { marked } from "marked";
import hljs from "highlight.js";

const { getArticle } = useArticle();

definePageMeta({
  layout: "default",
});

const route = useRoute();
let article = ref<Article>();
let title = ref("");
let desc = ref("");
let contentHtml = ref("");

useHead({
  titleTemplate: "%s - alickx's blog",
  title: title,
  meta: [{ name: "description", content: desc }],
});

const getArticleById = async (id: string) => {
  const { data } = await getArticle(id);
  article.value = data;
  title.value = data.title;
  desc.value = data.abstract;
};

const render = new marked.Renderer();
marked.setOptions({
  renderer: render, // 这是必填项
  gfm: true, // 启动类似于Github样式的Markdown语法
  pedantic: false, // 只解析符合Markdwon定义的，不修正Markdown的错误
  sanitize: false, // 原始输出，忽略HTML标签（关闭后，可直接渲染HTML标签）
  // 高亮的语法规范
  highlight: (code, lang) => hljs.highlight(code, { language: lang }).value,
});

// 通过marked将markdown转换为html
const parseMarkdown = (content: string) => {
  contentHtml.value = marked(content || "");
};

useAsyncData(async () => {
  await getArticleById(route.params.id as string);
  parseMarkdown(article.value?.content || "");
});
</script>

<style scoped></style>
