<template>
  <div
    v-if="hasToc"
    class="min-w-[220px] max-w-[220px] rounded bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm dark:bg-zinc-800/80"
  >
    <div
      class="mb-4 flex items-center justify-between border-b pb-2 dark:border-gray-700"
    >
      <span class="text-sm font-medium dark:text-gray-200">目录</span>
      <Icon
        @click="isShowToc = !isShowToc"
        :name="isShowToc ? 'carbon:chevron-up' : 'carbon:chevron-down'"
        size="20"
        class="cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      />
    </div>
    <transition name="fade">
      <ul
        v-if="isShowToc"
        class="flex max-h-[70vh] flex-col space-y-1 overflow-y-auto text-sm no-underline"
      >
        <li
          v-for="(item, index) in tocItemData"
          :key="index"
          class="cursor-pointer rounded transition-colors hover:bg-gray-100 dark:hover:bg-zinc-700"
          :style="{ paddingLeft: `${(item.depth - 1) * 12}px` }"
          :class="{
            'text-primary-500 font-medium': item.active,
            'bg-primary-50 dark:bg-primary-900/20': item.active,
          }"
        >
          <span
            class="line-clamp-1 block break-all rounded px-3 py-1.5"
            @click="scrollToAnchor(item.id)"
            >{{ item.text }}</span
          >
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { TocLink, type ParsedContent } from "@nuxt/content/dist/runtime/types";

interface Toc {
  id: string;
  text: string;
  depth: number;
  active: boolean;
  children?: Toc[];
}

const props = defineProps<{
  articleData: ParsedContent;
}>();

const { articleData } = toRefs(props);
const tocItemData = ref<Toc[]>(articleData.value.body.toc.links);
let currentAnchor = ref("");

let isShowToc = ref(true);

const scrollToAnchor = (anchor: string) => {
  const anchorElement = document.getElementById(anchor);
  if (anchorElement) {
    anchorElement.scrollIntoView({ behavior: "smooth" });
  }
};

const hasToc = computed(() => {
  return props.articleData.body.toc.links.length > 0;
});

onMounted(() => {
  if (tocItemData.value) {
    window.addEventListener("scroll", () => {
      tocItemData.value.forEach((item, index) => {
        const ele = document.getElementById(item.id);
        if (ele) {
          const rect = ele.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 200) {
            currentAnchor.value = item.id;
          }
        }
      });
    });
  }
});

watch(
  () => currentAnchor.value,
  (val) => {
    tocItemData.value.forEach((item, index) => {
      if (item.id === val) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
  },
);

onUnmounted(() => {
  window.removeEventListener("scroll", () => {});
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
