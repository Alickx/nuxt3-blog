<template>
  <div class="pb-14">
    <div class="relative mx-auto max-w-6xl p-5 md:p-7">
      <div class="mb-8">
        <h1 class="mb-4 text-3xl font-bold text-[#444] dark:text-white">
          互动交流
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          欢迎来到互动交流区，在这里你可以分享你的想法、提出问题或与博主交流。期待看到你的留言！
        </p>
      </div>
      <ClientOnly>
        <WalineComment />
      </ClientOnly>
    </div>
    <BackTop />
  </div>
</template>

<script setup lang="ts">
import WalineComment from "~/components/WalineComment.vue";

useHead({
  title: "互动交流 | Alickx' Blog",
  meta: [
    {
      name: "description",
      content: "Alickx' Blog互动交流区，与博主交流互动的地方。",
    },
    {
      name: "keywords",
      content: "互动,交流,评论,留言",
    },
  ],
});
</script>

<style scoped></style>
