<template>
  <div class="bg-[#1a316b] p-6">
    <div class="flex flex-row justify-between">
      <div class="flex flex-row space-x-5">
        <Icon class="cursor-pointer" @click="$router.go(-1)" name="material-symbols:chevron-left-rounded" color="white" size="28" />
        <span class="text-white font-black text-xl">Alickx</span>
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
