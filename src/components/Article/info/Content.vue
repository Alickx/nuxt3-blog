<template>
  <div
    class="mx-auto md:max-w-[768px] md:gap-6 lg:max-w-[1024px] xl:max-w-[1280px] sm:max-w-[640px] w-full relative grid grid-flow-row grid-cols-8">
    <div class="lg:col-start-2 lg:col-span-6 col-span-8 mb-10">
      <div class="mx-auto markdown-body" v-html="contentHtml" />
    </div>
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
    required: true
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
  contentHtml.value = marked(content)
}

// 监听content变化
watch(() => props.content, (val) => {
  parseMarkdown(val);
})


</script>

<style scoped>
</style>
