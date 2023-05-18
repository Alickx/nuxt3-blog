<template>
  <div class="relative z-50 bg-[#1a316b]">
    <div class="mx-32 flex flex-col px-4">
      <div class="flex flex-row items-center justify-between pb-10 pt-10">
        <!-- 我的昵称 -->
        <h1 class="text-2xl font-black text-white">平平凡凡的Alickx</h1>
        <div class="flex- flex-row space-x-5">
          <Icon
            class="cursor-pointer"
            name="mdi:magnify"
            color="white"
            size="28"
          />
          <Icon
            class="cursor-pointer"
            name="material-symbols:dark-mode-outline"
            color="white"
            size="28"
          />
        </div>
      </div>
      <div class="flex flex-row items-center justify-center">
        <!-- 导航栏 -->
        <ul class="nav-link flex flex-row space-x-5 pb-5 text-lg font-bold">
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
</template>

<script setup lang="ts"></script>

<style scoped>
.nav-link .router-link-exact-active {
  color: #fff;
  border-bottom: 2px solid #fff;
  transition: border-bottom-color 0.3s ease;
}

.nav-link {
  color: #8c8c8c;
}
</style>
