<template>
  <div class="flex min-h-screen flex-col">
    <Header />
    <div class="flex-1 bg-white dark:bg-[#212526]">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts"></script>
