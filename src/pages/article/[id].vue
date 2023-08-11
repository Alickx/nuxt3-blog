<template>
  <div
    class="overflow-hidden bg-[#f2f3f5] pb-14 pt-5 dark:bg-[#212526] md:pt-10"
  >
    <div
      class="mx-auto max-w-5xl flex-row gap-2 rounded-lg md:flex md:px-4 md:px-8 lg:px-12 xl:px-16"
    >
      <div class="max-w-3xl flex-1 bg-white p-5 dark:bg-[#111111] md:p-10">
        <ArticleInfoHeader
          v-if="article"
          :title="article?.title"
          :created-at="article?.createdAt"
          :content="contentHtml"
        />
        <ArticleInfoContent :content-html="contentHtml" />
      </div>
      <ArticleInfoMarkdownToc
        class="hidden lg:block"
        v-if="toc.length > 0"
        :toc="toc"
      />
    </div>
    <ClientOnly>
      <a-back-top />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { Article } from "composables/useArticle";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

const { getArticle } = useArticle();

definePageMeta({
  layout: "default",
});

interface Toc {
  text: string;
  level: number;
}

const route = useRoute();
let article = ref<Article>();
let title = ref("");
let desc = ref("");
let contentHtml = ref("");
let toc = ref<Toc[]>([]);

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

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
);

const renderer = new marked.Renderer();
renderer.heading = (text, level, raw, slugger) => {
  toc.value.push({
    level: level,
    text: raw,
  });
  // id按顺序生成，heading-1  heading-2
  const id = `heading-${toc.value.length}`;
  return `<h${level} id="${id}">${text}</h${level}>`;
};
marked.use({
  renderer: renderer, // 这是必填项
  gfm: true, // 启动类似于Github样式的Markdown语法
  pedantic: false, // 只解析符合Markdwon定义的，不修正Markdown的错误
  smartLists: true,
  headerIds: false,
  mangle: false,
});

// 通过marked将markdown转换为html
const parseMarkdown = (content: string) => {
  contentHtml.value = marked.parse(content || "") as string;
};

useAsyncData(async () => {
  await getArticleById(route.params.id as string);
  parseMarkdown(article.value?.content || "");
});
</script>

<style scoped></style>
