<template>
  <ul class="flex flex-row gap-1 justify-center sm:justify-start">
    <li v-if="page > 1" @click="pageChange(page - 1)"
      class="bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1 cursor-pointer">上一页</li>
    <li v-for="item in pages" :key="item"
      :class="{ 'bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1 cursor-pointer': true, 'text-white !bg-blue-500': item === page }"
      @click="item !== page && pageChange(item)">
      <button>{{ item }}</button>
    </li>
    <li v-if="page < totalPage" @click="pageChange(page + 1)"
      class="bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1 cursor-pointer">下一页</li>
  </ul>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
  total: number,
  size: number
}>(), {
  total: 0,
  size: 10
})

const emit = defineEmits(['pageChange'])

const page = ref(1);

const pageChange = (clickPage: number) => {
  page.value = clickPage
  emit('pageChange', page.value)
}

const totalPage = computed(() => {
  return Math.ceil(props.total / props.size)
})

const pages = computed(() => {
  const arr = []
  for (let i = 1; i <= totalPage.value; i++) {
    arr.push(i)
  }
  return arr
})




</script>


<style scoped>
</style>
