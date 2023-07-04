<template>
  <div class="z-50 bg-[#1a316b]">
    <div class="flex flex-col px-4">
      <div class="flex justify-center items-center py-10">
        <div class="w-2/3 flex flex-row items-center justify-between">
          <!-- 我的昵称 -->
          <span class="text-2xl font-bold text-white">Alickx</span>
          <div class="flex- flex-row space-x-5">
            <Icon @click="clickSearchHandle" class="cursor-pointer" name="mdi:magnify" color="white" size="28" />
            <Icon class="cursor-pointer" name="material-symbols:dark-mode-outline" color="white" size="28" />
            <nuxt-link to="/admin/dashboard" v-if="showAdminIcon">
              <Icon name="eos-icons:admin" size="28" color="white" />
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="flex flex-row items-center justify-center">
        <!-- 导航栏 -->
        <ul class="nav-link flex flex-row space-x-5 pb-5 text-lg font-bold list-none">
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about">About</NuxtLink>
          </li>
          <li>
            <a href="https://github.com/Alickx" target="_blank">Github</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <ArticleSearch ref="searchRef" v-if="showSearch" @close="clickSearchHandle" />
</template>

<script setup lang="ts">

let showSearch = ref(false);
let searchRef = ref();
const cookies = useCookie('ACCESS_TOKEN');

const clickSearchHandle = () => {
  showSearch.value = !showSearch.value;
}

const showAdminIcon = computed(() => {
  return cookies.value && cookies.value !== '';
});

</script>

<style scoped>
.nav-link .router-link-exact-active {
  color: #fff;
  border-bottom: 2px solid #fff;
  transition: border-bottom-color 0.3s ease;
}

.nav-link a {
  color: #8c8c8c;
  text-decoration: none;
}
</style>
