<template>
  <img
    class="dark:filter-brightness-80 dark:filter-contrast-120 cursor-pointer"
    @click="preview"
    ref="imgRef"
    :src="srcComputed"
    :alt="alt"
    :width="width"
    :height="height"
  />
</template>

<script setup lang="ts">
import { withTrailingSlash, withLeadingSlash, joinURL } from "ufo";
import { useRuntimeConfig, computed } from "#imports";
import loading from "~/assets/svg/loading.svg";

const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
});

const imgRef = ref();
const isVisible = ref(false);

const { stop } = useIntersectionObserver(imgRef, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    stop();
    isVisible.value = true;
  }
});

const refinedSrc = computed(() => {
  if (props.src?.startsWith("/") && !props.src.startsWith("//")) {
    const _base = withLeadingSlash(
      withTrailingSlash(useRuntimeConfig().app.baseURL),
    );
    if (_base !== "/" && !props.src.startsWith(_base)) {
      return joinURL(_base, props.src);
    }
  }
  return props.src;
});

const srcComputed = computed(() => {
  return isVisible.value ? refinedSrc.value : loading;
});

const preview = () => {
  window.open(refinedSrc.value, "_blank");
};
</script>
