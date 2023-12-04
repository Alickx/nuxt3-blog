<template>
  <Waline :serverURL="serverURL" :path="path" data='html[data-theme="dark"]' />
</template>
<script setup>
import { Waline } from "@waline/client/component";
import "@waline/client/dist/waline.css";
import '@waline/client/waline-meta.css';

const serverURL = "https://comment.alickx.top";
const path = computed(() => useRoute().path);
</script>
