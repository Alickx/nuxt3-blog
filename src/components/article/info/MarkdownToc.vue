<template>
  <a-affix :offset-top="105">
    <div class="w-[20rem] rounded bg-white px-4 py-2 dark:bg-[#111111]">
      <h3
        class="border-0 border-b border-solid border-b-gray-200 pb-2 text-lg dark:text-white"
      >
        目录
      </h3>
      <ul
        class="flex list-disc list-none flex-col gap-1 text-sm no-underline dark:text-white"
      >
        <li v-for="(item, index) in tocItemData" :key="index">
          <a
            class="line-clamp-1"
            :class="{ 'text-blue-500': item.active }"
            :href="`#${item.anchor}`"
            >{{ item.text }}</a
          >
          <article-info-toc-item :item="item" />
        </li>
      </ul>
    </div>
  </a-affix>
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
  children: TocItem[];
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

// 根据toc中的level组成tocItem
const generateToc = () => {
  // 定义一个 tocItemStack 数组，用来存储正在处理的目录项
  const tocItemStack: TocItem[] = [];
  // 清空 tocItemData 数组，以便重新生成目录
  tocItemData.value = [];

  // 如果 props.toc 不存在，直接返回
  if (!props.toc) {
    return;
  }

  // 遍历 props.toc 数组中的每一个目录项
  for (const tocItem of props.toc) {
    // 为每一个目录项创建一个新的 TocItem 对象
    const newTocItem: TocItem = {
      text: tocItem.text,
      level: tocItem.level,
      children: [],
      anchor: getAnchorIndex(tocItem.text),
      active: tocItem.text === currentAnchor.value,
    };

    // 锚点
    const anchor = getAnchorIndex(tocItem.text);
    // 如果当前目录项的锚点与 currentAnchor 的值相同，将 active 属性设置为 true
    if (anchor === currentAnchor.value) {
      newTocItem.active = true;
    }

    // 使用一个 while 循环来弹出 tocItemStack 数组中所有比当前目录项的级别高的目录项
    while (
      tocItemStack.length > 0 &&
      tocItem.level <= tocItemStack[tocItemStack.length - 1].level
    ) {
      tocItemStack.pop();
    }

    // 将新的目录项添加到 tocItemStack 数组中，并将其推入 tocItemData 数组中或者作为其父目录项的子目录项
    if (tocItemStack.length > 0) {
      tocItemStack[tocItemStack.length - 1].children.push(newTocItem);
    } else {
      tocItemData.value.push(newTocItem);
    }

    tocItemStack.push(newTocItem);
  }
};

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

watch(() => props.toc, generateToc);

watch(
  () => currentAnchor.value,
  () => {
    // 将当前锚点设置为active,tocItemData
    if (!props.toc) {
      return;
    }
    // 重新生成目录
    generateToc();
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

<style scoped>
li.text-blue-500::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 10px;
  background-color: #3182ce;
  margin-right: 8px;
}
</style>
