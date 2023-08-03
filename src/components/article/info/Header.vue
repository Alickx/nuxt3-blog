<template>
  <div
    class="mx-auto mb-5 flex max-w-3xl flex-col items-center justify-center p-5"
  >
    <div class="leading-5">
      <h1 class="text-3xl font-bold">{{ title }}</h1>
    </div>
    <div>
      <p class="flex items-center text-lg font-medium">
        <Icon name="ic:baseline-access-time" size="18" class="mr-2" />
        {{ formatTime }}
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
  cover: {
    type: String,
  },
});

const formatTime = computed(() => {
  return $dayjs(props.createdAt).format("YYYY-MM-DD HH:mm:ss");
});
</script>

<style scoped></style>
