<template>
  <div class="mx-4 my-8">
      <div class="markdown-body max-w-5xl mx-auto rounded-lg shadow-default p-4 md:p-8 lg:p-12 xl:p-16 "
        v-html="contentHtml" />
  </div>
</template>

<script setup lang="ts">
import { marked } from "marked";
import hljs from 'highlight.js'
import 'highlight.js/styles/foundation.css'
import '~/assets/sytles/markdown.css'

const props = defineProps({
  content: {
    type: String,
    required: true,
    default: ''
  }
})

let contentHtml = ref('');

const render = new marked.Renderer()
marked.setOptions({
  renderer: render, // 这是必填项
  gfm: true,	// 启动类似于Github样式的Markdown语法
  pedantic: false, // 只解析符合Markdwon定义的，不修正Markdown的错误
  sanitize: false, // 原始输出，忽略HTML标签（关闭后，可直接渲染HTML标签）
  // 高亮的语法规范
  highlight: (code, lang) => hljs.highlight(code, { language: lang }).value,
})

// 通过marked将markdown转换为html
const parseMarkdown = (content: string) => {
  contentHtml.value = marked(content || '')
}

// 监听content变化
watch(() => props.content, (val) => {
  parseMarkdown(val);
})


</script>

<style scoped>
</style>
