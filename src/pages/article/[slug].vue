<template>
  <div class="flex-1 bg-[#fafafa] pb-14 dark:bg-[#212526]">
    <div class="relative mx-auto max-w-6xl flex-row items-start gap-5 md:flex">
      <div class="max-w-5xl p-5 md:p-7">
        <ArticleInfoHeader
          v-if="article"
          :title="article?.title"
          :created-at="article?.createdAt"
          :word-count="article?.wordCount"
          :view-count="article?.viewCount"
        />
        <ArticleInfoContent :content-html="contentHtml" />
      </div>
      <div class="sticky top-0 hidden pt-10 md:block">
        <ArticleInfoMarkdownToc v-if="toc.length > 0" :toc="toc" />
      </div>
    </div>
  </div>
  <BackTop />
</template>

<script setup lang="ts">
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { ArticleInfo } from "types";

const { getArticleBySlug } = useArticle();

definePageMeta({
  layout: "default",
});

interface Toc {
  text: string;
  level: number;
}

const route = useRoute();
let article = ref<ArticleInfo>();
let title = ref("");
let contentHtml = ref("");
let toc = ref<Toc[]>([]);

useHead({
  titleTemplate: "%s - alickx's blog",
  title: title,
});

const getArticle = async (slug: string) => {
  const { data } = await getArticleBySlug(slug);
  article.value = data;
  title.value = data.title;
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
  await getArticle(route.params.slug as string);
  parseMarkdown(article.value?.content || "");
});
</script>

<style scoped></style>
