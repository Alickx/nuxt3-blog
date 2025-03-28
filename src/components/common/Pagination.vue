<template>
  <div class="mt-8 flex items-center justify-center space-x-3">
    <button
      @click="$emit('change', currentPage - 1)"
      :disabled="currentPage === 1"
      class="rounded-lg p-2 text-gray-500 transition-all duration-200 hover:bg-gray-100/80 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent dark:text-gray-400 dark:hover:bg-gray-800/80 dark:hover:text-gray-200"
    >
      <Icon name="heroicons:chevron-left" class="h-5 w-5" />
    </button>

    <div class="flex space-x-1">
      <button
        v-for="page in displayedPages"
        :key="page"
        @click="$emit('change', page)"
        :class="[
          'min-w-[40px] rounded-lg px-3.5 py-2 transition-all duration-200',
          currentPage === page
            ? 'bg-gray-900 font-medium text-white dark:bg-white dark:text-gray-900'
            : 'text-gray-600 hover:bg-gray-100/80 dark:text-gray-400 dark:hover:bg-gray-800/80',
        ]"
      >
        {{ page }}
      </button>
    </div>

    <button
      @click="$emit('change', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="rounded-lg p-2 text-gray-500 transition-all duration-200 hover:bg-gray-100/80 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent dark:text-gray-400 dark:hover:bg-gray-800/80 dark:hover:text-gray-200"
    >
      <Icon name="heroicons:chevron-right" class="h-5 w-5" />
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
