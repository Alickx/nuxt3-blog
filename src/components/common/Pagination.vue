<template>
  <div class="mt-8 flex items-center justify-center space-x-4">
    <button
      @click="$emit('change', currentPage - 1)"
      :disabled="currentPage === 1"
      class="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-all duration-300 hover:bg-gray-50 hover:text-[#217c91] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:text-gray-400 dark:hover:bg-[#2a2f3b] dark:hover:text-[#8393ad]"
    >
      <Icon name="heroicons:chevron-left" class="h-5 w-5" />
    </button>

    <div class="flex space-x-2">
      <TransitionGroup name="page-numbers" tag="div" class="flex space-x-2">
        <button
          v-for="page in displayedPages"
          :key="page"
          @click="$emit('change', page)"
          :class="[
            'h-10 min-w-[40px] rounded-lg px-3.5 font-medium transition-all duration-300',
            currentPage === page
              ? 'bg-[#217c91] text-white shadow-sm dark:bg-[#3a4a5a] dark:text-white'
              : 'text-gray-700 hover:bg-gray-50 hover:text-[#217c91] dark:text-gray-300 dark:hover:bg-[#2a2f3b] dark:hover:text-[#8393ad]',
          ]"
        >
          {{ page }}
        </button>
      </TransitionGroup>
    </div>

    <button
      @click="$emit('change', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-all duration-300 hover:bg-gray-50 hover:text-[#217c91] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:text-gray-400 dark:hover:bg-[#2a2f3b] dark:hover:text-[#8393ad]"
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
</style>
