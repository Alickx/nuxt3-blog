<template>
  <div class="flex flex-col justify-center items-center p-5 mb-5 max-w-3xl mx-auto">
    <div class="leading-5">
      <!-- 标题 -->
      <h1 class="text-3xl font-bold">{{ title }}</h1>
    </div>
    <div>
      <!-- 发布时间等信息 -->
      <p class="text-lg font-medium flex items-center">
        <Icon name="ic:baseline-access-time" size="18" class="mr-2" />
        {{ formatTime }}
      </p>
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

