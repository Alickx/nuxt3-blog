<template>
  <div
    class="z-50 h-[4rem] bg-white shadow-md dark:bg-[#212526] transition-transform duration-300 sticky top-0 w-full"
    :class="{
      'overflow-hidden': isOpen,
      '-translate-y-full': isHidden,
      'translate-y-0': !isHidden
    }"
  >
    <div class="flex h-full w-full flex-col justify-center">
      <div class="flex items-center justify-center">
        <div
          class="sm:w-xl md:w-2xl lg:w-4xl flex w-[21rem] flex-row items-center justify-between xl:w-[calc(100%-100px)]"
        >
          <div class="text-[#444] dark:text-white">
            <Icon
              v-if="!isOpen"
              @click="toggle"
              class="lg:!hidden"
              name="mdi:menu"
              size="28"
            />
            <Icon v-else @click="close" name="mdi:close" size="28" />
          </div>
          <div
            class="flex items-center justify-center text-2xl font-bold text-[#444] dark:text-white"
          >
            <NuxtLink to="/">
              <h1 v-if="!IsArticlePageComputed()" class="m-0 p-0 text-2xl">
                Alickx' Blog
              </h1>
              <span v-else class="m-0 p-0 text-2xl">Alickx' Blog</span>
            </NuxtLink>
          </div>
          <ul
            class="mx-30 gap-15 hidden flex-1 list-none flex-row items-center text-[#444] dark:text-white lg:flex"
          >
            <li v-for="item in headerList" :key="item.path">
              <NuxtLink :to="item.path">
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
          <div
            class="flex flex-row items-center gap-5 text-[#444] dark:text-white"
          >
            <AlgoliaDocSearch />
            <Icon
              v-if="mode === 'light'"
              @click="toggleDark"
              class="cursor-pointer"
              name="material-symbols:dark-mode-outline"
              size="28"
            />
            <Icon
              v-else
              @click="toggleDark"
              class="cursor-pointer"
              name="material-symbols:light-mode-outline"
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
          class="drak:border-[#30363d] flex items-center border-0 border-b border-solid border-gray-200 py-3 dark:text-white"
        >
          {{ item.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const mode = useColorMode();
const router = useRouter();
const route = useRoute();
let isOpen = ref(false);
let isHidden = ref(false);
let lastScrollPosition = ref(0);

const headerList = [
  {
    name: "首页",
    path: "/",
  },
  {
    name: "关于",
    path: "/about",
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

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const close = () => {
  isOpen.value = false;
};

watch(
  () => mode.value,
  () => {
    document.documentElement.setAttribute("data-theme", mode.value);
  },
);

const IsArticlePageComputed = () => {
  return route.name === "articles-slug";
};

const handleScroll = () => {
  const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;
  if (currentScrollPosition < 0) {
    return;
  }
  // 向下滚动
  if (currentScrollPosition > lastScrollPosition.value) {
    isHidden.value = true;
  } else {
    // 向上滚动
    isHidden.value = false;
  }
  lastScrollPosition.value = currentScrollPosition;
};

onMounted(() => {
  document.documentElement.setAttribute("data-theme", mode.value);
  // 监听路由变化，关闭菜单
  router.afterEach(() => {
    close();
  });
  // 添加滚动事件监听
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  // 移除滚动事件监听
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped></style>
