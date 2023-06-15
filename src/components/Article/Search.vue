<template>
  <div class="fixed inset-0 bg-gray-700 bg-opacity-80 flex justify-center z-50">
    <div ref="searchModel" class="relative z-100">
      <div class="absolute top-44 -left-44 bg-gray-300 p-8 rounded-lg w-80">
        <input ref="inputRef" placeholder="搜索文章" class="w-full p-2 rounded-lg" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

// 抛出关闭事件

let searchModel = ref()
let inputRef = ref()


const emits = defineEmits(['close'])

onClickOutside(searchModel, () => {
  emits('close')
})

onMounted(() => {
  inputRef.value.focus()
})


</script>

<style scoped>
</style>
