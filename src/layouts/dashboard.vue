<template>
  <div class="flex h-screen bg-gray-200 font-roboto">
    <admin-sidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <admin-header />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-white">
        <div class="container mx-auto px-6 py-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>


<script setup lang="ts">

</script>


<style scoped>

</style>
