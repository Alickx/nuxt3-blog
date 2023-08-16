<template>
  <div class="min-w-[180px] max-w-[180px] rounded bg-transparent px-4 py-2 dark:bg-[#111111]">
    <ul
      class="flex list-decimal list-none flex-col gap-2 text-base no-underline dark:text-white"
    >
      <li
        class="rounded p-1"
        :class="{
          'text-blue-500': item.active,
          'bg-[#e3efff]': item.active,
          'toc-item-active': item.active,
        }"
        v-for="(item, index) in tocItemData"
        :key="index"
      >
        <a class="line-clamp-1 break-all rounded" :href="`#${item.anchor}`">{{
          item.text
        }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Toc {
  text: string;
  level: number;
}

interface TocItem {
  text: string;
  level: number;
  anchor: string;
  active: boolean;
}

const route = useRoute();
const tocItemData = ref<TocItem[]>([]);
const currentAnchor = ref("");

const props = defineProps({
  toc: {
    type: Array as () => Toc[],
  },
});

const getAnchorIndex = (text: string): string => {
  // 返回在toc中的索引
  if (!props.toc) {
    return "";
  }
  const index = props.toc.findIndex((item) => item.text === text);
  return `heading-${index + 1}`;
};

const getAnchorText = (anchor: string): string => {
  if (!props.toc) {
    return "";
  }
  const index = anchor.split("-")[1];
  return props.toc[Number(index) - 1].text;
};

const listenScrollAnchor = () => {
  window.addEventListener("scroll", () => {
    if (!props.toc) {
      return;
    }
    const toc = props.toc;
    const tocLength = toc.length;
    for (let i = 1; i <= tocLength; i++) {
      const element = document.getElementById(`heading-${i}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 200) {
          currentAnchor.value = toc[i - 1].text;
          break;
        }
      }
    }
  });
};

const generateToc = () => {
  // 将toc转换为tocItemData
  if (!props.toc) {
    return;
  }
  const toc = props.toc;
  tocItemData.value = toc.map((item) => {
    return {
      text: item.text,
      level: item.level,
      anchor: getAnchorIndex(item.text),
      active: false,
    };
  });
};

watch(
  () => currentAnchor.value,
  (val) => {
    // 将当前锚点设置为active,tocItemData
    if (!props.toc) {
      return;
    }
    // 将所在的锚点设置为active
    const index = props.toc.findIndex((item) => item.text === val);
    tocItemData.value.forEach((item) => {
      item.active = false;
    });
    tocItemData.value[index].active = true;
  },
);

// 监听url上的锚点
watch(
  () => route.hash,
  (val) => {
    currentAnchor.value = getAnchorText(val);
  },
);

onMounted(() => {
  generateToc();
  // 监听滚动事件获取当前窗口的锚点
  listenScrollAnchor();
});

onUnmounted(() => {
  window.removeEventListener("scroll", () => {});
});
</script>

<style scoped></style>
