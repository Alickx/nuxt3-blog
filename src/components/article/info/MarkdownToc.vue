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
          class="relative cursor-pointer rounded transition-all duration-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
          :style="{ paddingLeft: `${(item.depth - 1) * 12}px` }"
          :class="{
            'text-primary-500 font-medium shadow-md': item.active,
            'bg-primary-50/80 dark:bg-primary-900/30': item.active,
          }"
        >
          <div
            v-if="item.active"
            class="bg-primary-500 absolute bottom-0 left-0 top-0 w-1 rounded-l"
          ></div>
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
import type { ParsedContent } from "@nuxt/content";

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

const convertToToc = (links: any[]): Toc[] => {
  return links.map((link) => ({
    ...link,
    active: false,
    children: link.children ? convertToToc(link.children) : undefined,
  }));
};

const tocItemData = ref<Toc[]>(
  convertToToc(articleData.value?.body?.toc?.links || []),
);
let currentAnchor = ref("");

let isShowToc = ref(true);

// 获取所有目录项（扁平化数组）
const getAllItems = (items: Toc[]): Toc[] => {
  return items.reduce((acc: Toc[], item) => {
    acc.push(item);
    if (item.children && item.children.length > 0) {
      acc.push(...getAllItems(item.children));
    }
    return acc;
  }, []);
};

// 检查每个标题的可见性
const checkVisibility = () => {
  const allItems = getAllItems(tocItemData.value);

  // 检查每个标题的可见性
  for (const item of allItems) {
    const ele = document.getElementById(item.id);
    if (ele) {
      const rect = ele.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= 200) {
        currentAnchor.value = item.id;
        break; // 找到第一个可见标题后停止
      }
    }
  }
};

const scrollToAnchor = (anchor: string) => {
  const anchorElement = document.getElementById(anchor);
  if (anchorElement) {
    anchorElement.scrollIntoView({ behavior: "smooth" });
  }
};

const hasToc = computed(() => {
  const linksLength = articleData.value?.body?.toc?.links?.length;
  return linksLength !== undefined && linksLength > 0;
});

onMounted(() => {
  if (tocItemData.value.length > 0) {
    window.addEventListener("scroll", checkVisibility);
  }
});

watch(
  () => currentAnchor.value,
  (val) => {
    // 递归更新所有目录项的激活状态
    const updateActiveState = (items: Toc[], targetId: string) => {
      for (const item of items) {
        item.active = item.id === targetId;

        if (item.children && item.children.length > 0) {
          updateActiveState(item.children, targetId);
        }
      }
    };

    updateActiveState(tocItemData.value, val);
  },
);

onUnmounted(() => {
  window.removeEventListener("scroll", checkVisibility);
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

/* 添加选中项的动画效果 */
li {
  position: relative;
  overflow: hidden;
}

li.text-primary-500::before {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--primary-100, #e0f2fe) 0%,
    transparent 100%
  );
  opacity: 0.3;
  z-index: -1;
}

@media (prefers-color-scheme: dark) {
  li.text-primary-500::before {
    background: linear-gradient(
      90deg,
      var(--primary-900, #0c4a6e) 0%,
      transparent 100%
    );
    opacity: 0.2;
  }
}
</style>
