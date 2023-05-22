<template>
  <div class="flex flex-col justify-center items-center p-5 mb-10">
    <div class="my-6 leading-5">
      <!-- 标题 -->
      <span class="text-4xl font-black">{{ title }}</span>
    </div>
    <div class="mb-12">
      <!-- 发布时间等信息 -->
      <p class="text-xl font-mono">
        <Icon name="ic:baseline-access-time" size="18" />
        {{ $dayjs(createdAt).format('YYYY-MM-DD HH:MM:ss') }}
      </p>
    </div>
    <div v-if="cover">
      <!-- 封面图 -->
      <NuxtImg width="950" :src="cover" />
    </div>
  </div>
</template>

<script setup lang="ts">

const { $dayjs } = useNuxtApp()

defineProps({
  title: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  cover: {
    type: String,
  },
})



</script>

<style scoped>
</style>
