<template>
  <div class="mx-auto mt-18 flex w-full items-center justify-center gap-1">
    <!-- 首页按钮 -->
    <button
      @click="$emit('change', 1)"
      :disabled="currentPage === 1"
      class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-solid border-[#e5e7eb] bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:border-[#1f2937] dark:bg-black dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100"
    >
      <Icon name="heroicons:chevron-double-left" class="h-4 w-4" />
    </button>

    <!-- 上一页 -->
    <button
      @click="$emit('change', currentPage - 1)"
      :disabled="currentPage === 1"
      class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-solid border-[#e5e7eb] bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:border-[#1f2937] dark:bg-black dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100"
    >
      <Icon name="heroicons:chevron-left" class="h-4 w-4" />
    </button>

    <!-- 页码 -->
    <div class="flex gap-1">
      <TransitionGroup name="page-numbers" tag="div" class="flex gap-1">
        <button
          v-for="page in displayedPages"
          :key="page"
          @click="$emit('change', page)"
          :class="[
            'inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors',
            currentPage === page
              ? 'border border-solid border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
              : 'border border-solid border-[#e5e7eb] bg-white text-gray-700 hover:bg-gray-100 dark:border-[#1f2937] dark:bg-black dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100',
          ]"
        >
          {{ page }}
        </button>
      </TransitionGroup>
    </div>

    <!-- "..." 省略符号 -->
    <span
      v-if="
        totalPages > displayedPages.length + 1 &&
        !displayedPages.includes(totalPages)
      "
      class="inline-flex h-9 w-9 items-center justify-center text-sm font-medium text-gray-500 dark:text-gray-400"
    >
      ...
    </span>

    <!-- 末页页码（如果不在显示范围内） -->
    <button
      v-if="
        totalPages > displayedPages.length &&
        !displayedPages.includes(totalPages)
      "
      @click="$emit('change', totalPages)"
      class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-solid border-[#e5e7eb] bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:border-[#1f2937] dark:bg-black dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100"
    >
      {{ totalPages }}
    </button>

    <!-- 下一页 -->
    <button
      @click="$emit('change', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-solid border-[#e5e7eb] bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:border-[#1f2937] dark:bg-black dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100"
    >
      <Icon name="heroicons:chevron-right" class="h-4 w-4" />
    </button>

    <!-- 末页按钮 -->
    <button
      @click="$emit('change', totalPages)"
      :disabled="currentPage === totalPages"
      class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-solid border-[#e5e7eb] bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:border-[#1f2937] dark:bg-black dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100"
    >
      <Icon name="heroicons:chevron-double-right" class="h-4 w-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const displayedPages = computed(() => {
  const pages = [];
  const maxButtons = 5;
  let start = Math.max(1, props.currentPage - Math.floor(maxButtons / 2));
  let end = Math.min(props.totalPages, start + maxButtons - 1);

  if (end - start + 1 < maxButtons) {
    start = Math.max(1, end - maxButtons + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

defineEmits(["change"]);
</script>

<style scoped>
.page-numbers-enter-active,
.page-numbers-leave-active {
  transition: all 0.3s ease;
}
.page-numbers-enter-from,
.page-numbers-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.page-numbers-move {
  transition: transform 0.3s ease;
}

/* 消除边框渲染不一致的问题 */
button {
  border-color: #e5e7eb !important;
}
.dark button {
  border-color: #1f2937 !important;
}

/* 当前页按钮的边框颜色覆盖 */
button.bg-black {
  border-color: black !important;
}
.dark button.dark\:bg-white {
  border-color: white !important;
}
</style>
