<template>
  <div
    class="z-50 h-[4rem] bg-black"
    :class="{
      fixed: isOpen,
      'w-full': isOpen,
      'overflow-hidden': isOpen,
    }"
  >
    <div class="flex h-full w-full flex-col justify-center">
      <div class="flex items-center justify-center">
        <div
          class="sm:w-xl md:w-2xl lg:w-4xl flex w-[22rem] flex-row items-center justify-between xl:w-[88rem]"
        >
          <div>
            <Icon
              v-if="!isOpen"
              @click="toggle"
              class="md:!hidden"
              name="mdi:menu"
              color="white"
              size="28"
            />
            <Icon
              v-else
              @click="close"
              name="mdi:close"
              color="white"
              size="28"
            />
          </div>
          <div
            class="flex items-center justify-center gap-2 text-2xl font-bold text-white"
          >
            <NuxtLink to="/">Alickx</NuxtLink>
          </div>
          <ul
            class="mx-30 hidden flex-1 list-none flex-row items-center text-white md:flex"
          >
            <li v-for="item in headerList" :key="item.path">
              <NuxtLink
                :to="item.path"
                class="flex items-center justify-center gap-1"
              >
                <Icon
                  class="cursor-pointer"
                  :name="item.icon"
                  color="white"
                  size="24"
                />
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
          <div class="flex flex-row gap-5">
            <ArticleSearch />
            <Icon
              v-if="mode === 'light'"
              @click="toggleDark"
              class="cursor-pointer"
              name="material-symbols:dark-mode-outline"
              color="white"
              size="28"
            />
            <Icon
              v-else
              @click="toggleDark"
              class="cursor-pointer"
              name="material-symbols:light-mode-outline"
              color="white"
              size="28"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-show="isOpen"
    class="z-150 fixed bottom-0 left-0 right-0 top-[4rem] block bg-white px-8 dark:bg-[#0d1117]"
  >
    <ul
      class="dark:text-gray mt-10 flex list-none flex-col gap-1 text-sm text-gray-500"
    >
      <li v-for="item in headerList" :key="item.path" class="relative">
        <NuxtLink
          :to="item.path"
          class="drak:border-[#30363d] flex items-center gap-1 border-0 border-b border-solid border-gray-200 py-3"
        >
          <Icon :name="item.icon" size="20" />
          {{ item.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

const mode = useColorMode();
const router = useRouter();

const { isOpen, toggle, close } = useVisible();

const headerList = [
  {
    name: "首页",
    icon: "mdi:home",
    path: "/",
  },
];

watch(
  () => isOpen.value,
  (newVal) => {
    if (newVal) {
      // 给body添加样式
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  },
);

const toggleDark = () => {
  mode.value = mode.value === "light" ? "dark" : "light";
};

onMounted(() => {
  // 监听路由变化，关闭菜单
  router.afterEach(() => {
    close();
  });
});
</script>
