<template>
  <a-modal
    v-model:open="open"
    :title="type === 'add' ? '新增文章' : '编辑文章'"
    @ok="handleOk"
    @cancel="clear"
  >
    <a-form class="my-10">
      <a-form-item label="标题">
        <a-input v-model:value="title" />
      </a-form-item>
      <a-form-item label="内容">
        <a-textarea
          v-model:value="content"
          :auto-size="{ minRows: 5, maxRows: 10 }"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { marked } from "marked";

const { createArticle, getArticle, updateArticle } = useArticle();

const props = defineProps({
  type: {
    type: String,
  },
  articleId: {
    type: String,
  },
});

const emit = defineEmits(["success"]);

let title = ref<string>("");
let content = ref<string>("");

const open = ref<boolean>(false);

const showModal = async () => {
  await nextTick(() => {
    if (props.type === "edit") {
      getArticleById(props.articleId as string);
    }
    open.value = true;
  });
};

const getArticleById = async (id: string) => {
  let { data } = await getArticle(id);
  if (data) {
    title.value = data.title;
    content.value = data.content as string;
  }
};

const clear = () => {
  title.value = "";
  content.value = "";
};

const wordCountComputed = computed(() => {
  const contentHtml = marked.parse(content.value || "");
  const contentText = contentHtml
    ?.replace(/<[^>]+>/g, "")
    .replace(/[\r\n]/g, "");
  return contentText?.length;
});

const handleOk = async () => {
  try {
    const articleData = {
      title: title.value,
      content: content.value,
      wordCount: wordCountComputed.value,
    };

    if (props.type === "add") {
      const { data } = await createArticle(articleData);
      if (data) {
        emit("success");
      }
    } else if (props.type === "edit") {
      const { data } = await updateArticle({
        id: props.articleId as string,
        ...articleData,
      });
      if (data) {
        emit("success");
      }
    }
  } catch (error) {
    console.error(error);
  }
  clear();
  open.value = false;
};

defineExpose({
  showModal,
});
</script>

<style scoped></style>
