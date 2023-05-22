<template>
  <div class="relative bg-[#1a316b] p-6">
    <div class="w-5/6 mx-auto flex flex-row justify-between">
      <div class="flex flex-row space-x-5">
        <Icon class="cursor-pointer" @click="$router.go(-1)" name="material-symbols:chevron-left-rounded" color="white" size="28" />
        <Icon name="material-symbols:menu" color="white" size="28" />
        <span class="text-white font-black text-xl">平平凡凡的Alick</span>
      </div>
      <div class="flex flex-row space-x-5">
        <Icon
          class="cursor-pointer"
          name="mdi:magnify"
          color="white"
          size="28"
        />
        <Icon
          class="cursor-pointer"
          name="material-symbols:dark-mode-outline"
          color="white"
          size="28"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
