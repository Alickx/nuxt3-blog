<template>
  <div v-if="isVisible" class="fixed bottom-0 right-0 mb-4 mr-4">
    <button
      @click.prevent="scrollToTop"
      class="hover:bg-gray-3 flex cursor-pointer items-center justify-center rounded-[9999px] border-0 bg-white p-3 shadow-md"
    >
      <Icon name="mdi:arrow-up" size="24" />
    </button>
  </div>
</template>

<script setup lang="ts">
const isVisible = ref(false);

const handleScroll = () => {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  isVisible.value = scrollTop > 100;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped></style>
