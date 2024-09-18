<template>
  <div
    v-if="hasToc"
    class="min-w-[180px] max-w-[180px] rounded bg-transparent px-4 py-2"
  >
    <div class="flex justify-end mb-2">
      <Icon
        @click="isShowToc = !isShowToc"
        :name="isShowToc ? 'icons8:down-round' : 'icons8:right-round'"
        size="25"
        class="cursor-pointer dark:text-white transition-transform duration-300"
        :class="{ 'rotate-180': isShowToc }"
      />
    </div>
    <transition name="fade">
      <ul
        v-if="isShowToc"
        class="flex flex-col text-base no-underline dark:text-white overflow-hidden"
      >
        <li
          class="cursor-pointer rounded px-3 py-1 dark:text-white"
          :class="{
            'text-blue-500': item.active,
            'bg-[#e3efff]': item.active,
            'dark:bg-black': item.active,
          }"
          v-for="(item, index) in tocItemData"
          :key="index"
        >
          <span
            class="line-clamp-1 break-all rounded"
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
