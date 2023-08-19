<template>
  <Icon
    @click="toggle"
    class="cursor-pointer"
    name="mdi:magnify"
    color="white"
    size="28"
  />
  <div
    v-if="isOpen"
    class="z-999 md:top-10% md:left-50% md:w-xl fixed left-0 top-0 h-full w-full transform bg-[#f5f6f7] dark:bg-[#242424] md:absolute md:h-auto md:-translate-x-1/2 md:rounded"
  >
    <div class="flex flex-col gap-3">
      <!-- 搜索框 -->
      <Icon
        class="absolute left-5 top-6"
        name="mdi:magnify"
        color="#5468ff"
        size="35"
      />
      <div class="flex flex-row items-center">
        <input
          ref="searchInputRef"
          class="indent-lg placeholder-text-lg m-3 mr-0 flex-1 rounded border-2 border-solid border-[#5468ff] px-3 py-3 text-lg placeholder-gray-400 outline-none dark:border-[#42b883] dark:bg-[#2f2f2f] dark:text-white md:m-3"
          placeholder="Search docs"
          v-model="searchContent"
        />
        <span
          class="font-blod block px-3 text-base text-[#5468ff] md:hidden"
          @click="close"
          >Cancel</span
        >
      </div>
      <span
        v-if="searchResult.length === 0"
        class="flex items-center justify-center py-10 text-sm text-gray-400"
        >暂无文章信息</span
      >
      <ul
        class="md:max-h-sm md:overflow-y-overlay flex h-full list-none flex-col gap-2 overflow-auto px-3 pb-10"
      >
        <!-- 搜索结果列表展示 -->
        <nuxt-link
          v-for="item in searchResult"
          :key="item.slug"
          :to="{ name: 'article-slug', params: { slug: item.slug } }"
          class="text-sm font-bold"
        >
          <div
            class="dark:text-gray-4 flex cursor-pointer flex-row gap-3 rounded bg-white px-3 py-4 shadow hover:bg-[#5468ff] hover:text-white dark:bg-[#2f2f2f] dark:hover:bg-[#42b883] dark:hover:text-white"
          >
            <Icon name="ph:article-thin" color="hover:white" size="24" />{{
              item.title
            }}
          </div>
        </nuxt-link>
      </ul>
    </div>
  </div>
  <div
    v-if="isOpen"
    @click="close"
    class="fixed left-0 top-0 z-50 hidden h-full w-full bg-[#84899d] opacity-90 sm:block"
  ></div>
</template>

<script setup lang="ts">
import { SimpleArticle } from "types";
import { useFocus } from "@vueuse/core";

const { searchArticle } = useArticle();

const router = useRouter();

let searchContent = ref("");
const searchResult = ref<SimpleArticle[]>([]);
const isOpen = ref(false);
const searchInputRef = ref<HTMLInputElement | null>(null);

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const { focused: inputFocus } = useFocus(searchInputRef, {
  initialValue: true,
});

const close = () => {
  searchContent.value = "";
  searchResult.value = [];
  isOpen.value = false;
};

let debounced = useDebounce(searchContent, 500);

watch(
  () => router.currentRoute.value,
  () => {
    close();
  },
);

watch(
  () => debounced.value,
  async (val) => {
    searchResult.value = [];
    if (val) {
      if (val.trim() !== "" && val !== null) {
        const { code, data } = await searchArticle(val);
        if (code === 200) {
          searchResult.value = data;
        }
      }
    }
  },
);

watch(
  () => isOpen.value,
  (val) => {
    if (val) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  },
);
</script>

<style scoped></style>
