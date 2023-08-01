<template>
  <div class="bg-[#1a316b] p-6">
    <div class="flex flex-row justify-between">
      <div class="flex flex-row space-x-5">
        <Icon class="cursor-pointer" @click="$router.go(-1)" name="material-symbols:chevron-left-rounded" color="white"
          size="28" />
        <span class="text-white font-bold text-xl">Alickx</span>
      </div>
      <div class="flex flex-row space-x-5">
        <Icon @click="clickSearchHandle" class="cursor-pointer" name="mdi:magnify" color="white" size="28" />
        <Icon class="cursor-pointer" name="material-symbols:dark-mode-outline" color="white" size="28" />
      </div>
    </div>
  </div>
  <ArticleSearch v-if="showSearch" />
</template>

<script setup lang="ts">

let showSearch = ref(false);

const clickSearchHandle = () => {
  console.log('clickSearchHandle');
  showSearch.value = !showSearch.value;
}

</script>

<style scoped>
</style>
