<template>
  <div class="mx-auto flex max-w-3xl flex-col items-center justify-center">
    <div class="leading-5">
      <h1 class="text-3xl font-bold dark:text-white">{{ title }}</h1>
    </div>
    <div class="flex flex-row flex-wrap gap-3">
      <p class="info-text">
        <Icon name="ic:baseline-access-time" size="18" class="mr-2" />
        {{ formatTime }}
      </p>
      <p class="info-text">
        <Icon name="ic:baseline-visibility" size="18" class="mr-2" />
        {{ wordCountComputed }} 字
      </p>
      <p class="info-text">
        <Icon name="ic:baseline-timer" size="18" class="mr-2" />
        {{ readTimeComputed }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
const { $dayjs } = useNuxtApp();

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
});

const { title, content } = toRefs(props);

const wordCount = ref(0);

const formatTime = computed(() => {
  return $dayjs(props.createdAt).format("YYYY-MM-DD HH:mm:ss");
});

// 字数统计
const wordCountComputed = computed(() => {
  // 去除html标签,换行符
  const contentText = content?.value
    ?.replace(/<[^>]+>/g, "")
    .replace(/[\r\n]/g, "");
  wordCount.value = contentText?.length as number;
  return contentText?.length;
});

// 阅读时间
const readTimeComputed = computed(() => {
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
