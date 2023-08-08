<template>
  <div>
    <nuxt-page />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "admin",
});
</script>

<style scoped></style>
