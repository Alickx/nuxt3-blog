<template>
  <div class="flex flex-col justify-center items-center p-5 mb-10 max-w-3xl mx-auto">
    <div class="my-6 leading-5">
      <!-- 标题 -->
      <h1 class="text-3xl font-bold">{{ title }}</h1>
    </div>
    <div class="mb-6">
      <!-- 发布时间等信息 -->
      <p class="text-lg font-medium flex items-center">
        <Icon name="ic:baseline-access-time" size="18" class="mr-2" />
        {{ formatTime }}
      </p>
    </div>
    <div v-if="cover">
      <!-- 封面图 -->
      <img :src="cover" alt="Cover image" class="w-full h-auto" />
    </div>
  </div>
</template>
<script setup lang="ts">

const { $dayjs } = useNuxtApp()

const props = defineProps({
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

const formatTime = computed(() => {
  return $dayjs(props.createdAt).format('YYYY-MM-DD')
})



</script>

<style scoped>
</style>

