<template>
  <div class="code-container max-w-[850px] rounded">
    <div
      class="flex h-[30px] flex-row items-center bg-[#ecebe8] dark:bg-[#383d49]"
    >
      <div class="text-gray-4 flex flex-1 flex-row items-center justify-end">
        <small style="font-family: 'Fira Code'">{{ language }}</small>
      </div>
      <div class="w-50% flex flex-row items-center justify-end">
        <Icon
          @click="copy(code)"
          class="mr-3 cursor-pointer rounded p-1 hover:bg-white"
          name="solar:copy-bold-duotone"
          size="18"
        />
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  code?: string;
  language?: string | null;
  filename?: string | null;
  highlights?: Array<number>;
}

const { copy, copied } = useClipboard();

withDefaults(defineProps<Props>(), {
  code: "",
  language: null,
  filename: null,
  highlights: () => [],
});
</script>

<style scoped lang="scss">
.code-container {
  border: 1px solid #e3e3e3;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  margin: 1.3rem 0;

  ::v-deep pre {
    position: relative;
    overflow: auto;
    margin: 0 0;

    code {
      font-family: "JetBrains Mono", monospace;
      display: block;
      font-size: 15.3px;
      font-weight: 400;
      line-height: 1.3rem;
      max-height: 90vh;
      overflow: auto;
      padding: 0.5rem 0.8rem;
      position: relative;
      word-break: normal;
    }
  }
}
</style>
