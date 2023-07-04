<template>
  <div class="flex">
    <div
      :class="isOpen ? 'block' : 'hidden'"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
      @click="isOpen = false"
    />

    <div
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0"
    >
      <nav class="py-5">
        <nuxt-link
          v-for="item in options" :key="item.route"
          class="flex items-center px-6 py-4 duration-200 border-l-4"
          :class="[route.name === item.name ? activeClass : inactiveClass]"
          :to="item.route"
          @click="isOpen = false"
        >
          <Icon :name="item.icon" size="20"/>
          <span class="mx-4">{{ item.label }}</span>
        </nuxt-link>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">

const route = useRoute()

const {isOpen} = useSidebar()

const activeClass = ref(
  'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100',
)
const inactiveClass = ref(
  'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100',
)


const options = ref([
  {
    label: '主面板',
    icon: 'material-symbols:dashboard',
    route: '/admin/dashboard',
    name: 'admin-dashboard',
  },
  {
    label: '文章管理',
    icon: 'material-symbols:article',
    route: '/admin/content',
    name: 'admin-content'
  }
])


</script>

<style scoped>


</style>
