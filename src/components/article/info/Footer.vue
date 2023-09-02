<template>
  <div class="mt-20">
    <div
      class="border-b-1 border-b-solid border-b-gray-3 dark:border-b-gray-4 mb-10 border-0 pb-2"
    />
    <ul class="flex list-none flex-row justify-between">
      <NuxtLink :to="`/articles/${surround[0].slug}`" v-if="surround[0]">
        <li class="flex flex-row items-center gap-3">
          <Icon name="ic:baseline-arrow-back" />
          <span>{{ surround[0].title }}</span>
        </li>
      </NuxtLink>
      <NuxtLink :to="`/articles/${surround[1].slug}`" v-if="surround[1]">
        <li class="flex flex-row items-center gap-3">
          <span>{{ surround[1].title }}</span>
          <Icon name="ic:baseline-arrow-forward" />
        </li>
      </NuxtLink>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["surround"]);
</script>

<style scoped></style>
