<template>
  <ul
    class="mt-2 flex list-disc list-none flex-col gap-1 pl-4 text-sm no-underline"
  >
    <li v-for="(child, index) in item.children" :key="index">
      <a
        class="line-clamp-1"
        :class="{ 'text-blue-500': child.active }"
        :href="`#${child.anchor}`"
        >{{ child.text }}</a
      >
      <TocItem v-if="child.children.length > 0" :item="child" />
    </li>
  </ul>
</template>

<script setup lang="ts">
interface TocItem {
  text: string;
  level: number;
  anchor: string;
  children: TocItem[];
  active: boolean;
}

defineProps({
  item: {
    type: Object as () => TocItem,
    required: true,
  },
});
</script>

<style scoped></style>
