<template>
  <div>
    <div class="flex flex-row gap-5">
        <button class="bg-[#1677ff] handle-button" @click="handleAdd">增加</button>
        <button class="bg-[#ff7875] handle-button" @click="handleDelete">删除</button>
    </div>
  </div>
</template>

<script setup lang="ts">

  const emit = defineEmits(['add', 'delete'])

  const handleAdd = () => {
    emit('add')
  }

  const handleDelete = () => {
    emit('delete')
  }


</script>


<style scoped>

.handle-button {
  @apply px-5 py-2 rounded text-white shadow-default
}



</style>
