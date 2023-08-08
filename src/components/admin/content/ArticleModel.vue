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
      <a-form-item label="摘要">
        <a-input v-model:value="abstract" placeholder="不填则自动从内容生成" />
      </a-form-item>
      <a-form-item label="封面">
        <a-input
          v-model:value="cover"
          placeholder="不填则自动调用接口获取封面"
        />
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
const { getCover } = useCover();

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
let abstract = ref<string>("");
let cover = ref<string>("");

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
    abstract.value = data.abstract;
    cover.value = data.cover as string;
  }
};

const clear = () => {
  title.value = "";
  content.value = "";
  abstract.value = "";
  cover.value = "";
};

const handleCover = async () => {
  if (cover.value !== "") return;
  let { imgurl, success } = await getCover();
  if (success) {
    cover.value = imgurl;
  } else {
    message.error("获取封面失败");
  }
};

const handleAbstract = () => {
  if (abstract.value === "") {
    // markdown转html
    let html = marked(content.value);
    // 去除html标签
    let str = html.replace(/<[^>]+>/g, "");
    // 去除空格
    let str2 = str.replace(/\s+/g, "");
    // 截取前100个字符
    let str3 = str2.substring(0, 100);
    abstract.value = str3;
  }
};

const handleOk = async () => {
  await handleCover();
  handleAbstract();

  try {
    const articleData = {
      title: title.value,
      content: content.value,
      abstract: abstract.value,
      cover: cover.value,
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
