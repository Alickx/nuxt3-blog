<template>
  <div class="mx-auto flex max-w-3xl flex-col items-center justify-center">
    <div class="leading-5">
      <h1 class="text-3xl font-bold text-[#444] dark:text-white">
        {{ title }}
      </h1>
    </div>
    <div class="flex flex-row flex-wrap gap-3">
      <p class="info-text">
        <Icon name="ic:baseline-access-time" size="18" class="mr-2" />
        发布时间：{{ formatTime }}
      </p>
      <p class="info-text">
        <Icon name="carbon:book" size="18" class="mr-2" />
        统计字数：{{ wordCount }} 字
      </p>
      <p class="info-text">
        <Icon name="mdi:eye-outline" size="18" class="mr-2" />
        浏览总量：{{ viewCount }}
      </p>
      <p class="info-text">
        <Icon name="ic:baseline-timer" size="18" class="mr-2" />
        阅读时间：{{ readTimeComputed }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
const dayjs = useDayjs();

const props = defineProps({
  title: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  content: {
    type: String,
  },
  wordCount: {
    type: Number,
  },
  viewCount: {
    type: Number,
  },
});

const { title, wordCount } = toRefs(props);

const formatTime = computed(() => {
  return dayjs(props.createdAt).format("YYYY-MM-DD HH:mm:ss");
});

// 阅读时间
const readTimeComputed = computed(() => {
  if (!wordCount?.value) {
    return "0分钟";
  }
  const time = Math.ceil(wordCount.value / 500);
  if (time > 60) {
    return `${Math.floor(time / 60)}小时${time % 60}分钟`;
  }
  return `${time}分钟`;
});
</script>

<style scoped>
.info-text {
  @apply flex items-center whitespace-nowrap text-sm text-gray-500;
}
</style>
