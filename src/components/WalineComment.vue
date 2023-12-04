<template>
  <Waline :serverURL="serverURL" :path="path" />
</template>
<script setup>
import { Waline } from "@waline/client/component";
import "@waline/client/dist/waline.css";

const serverURL = "https://comment.alickx.top";
const path = computed(() => useRoute().path);
</script>
