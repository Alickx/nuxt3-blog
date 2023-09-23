<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <div class="flex-1">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts"></script>
