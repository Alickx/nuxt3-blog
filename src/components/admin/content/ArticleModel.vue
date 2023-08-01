<template>
  <a-modal v-model:open="open" :title="type === 'add' ? '新增文章' : '编辑文章'" @ok="handleOk" @cancel="clear">
    <a-form class="my-10">
      <a-form-item label="标题">
        <a-input v-model:value="title" />
      </a-form-item>
      <a-form-item label="摘要">
        <a-input v-model:value="abstract" placeholder="不填则自动从内容生成" />
      </a-form-item>
      <a-form-item label="封面">
        <a-input v-model:value="cover" placeholder="不填则自动调用接口获取封面" />
      </a-form-item>
      <a-form-item label="内容">
        <a-textarea v-model:value="content" :auto-size="{ minRows: 5, maxRows: 10 }" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">

const { createArticle, getArticle, updateArticle } = useArticle();


const props = defineProps({
  type: {
    type: String,
  },
  articleId: {
    type: String
  }
})

const emit = defineEmits(['success'])

let title = ref<string>('')
let content = ref<string>('')
let abstract = ref<string>('')
let cover = ref<string>('')


const open = ref<boolean>(false);

const showModal = async () => {
  await nextTick(() => {
    if (props.type === 'edit') {
      getArticleById(props.articleId as string)
      console.log("props.articleId", props.articleId);
    }
    open.value = true;
  })
};


const getArticleById = async (id: string) => {
  let { data } = await getArticle(id);
  if (data) {
    title.value = data.title
    content.value = data.content
    abstract.value = data.abstract
    cover.value = data.cover
  }
}

const clear = () => {
  title.value = ''
  content.value = ''
  abstract.value = ''
  cover.value = ''
}


const handleOk = async (e: MouseEvent) => {

  if (props.type === 'add') {
    let { data } = await createArticle({
      title: title.value,
      content: content.value,
      abstract: abstract.value,
      cover: cover.value
    });
    if (data) {
      emit('success')
    }
  } else if (props.type === 'edit') {
    let { data } = await updateArticle({
      id: props.articleId as string,
      title: title.value,
      content: content.value,
      abstract: abstract.value,
      cover: cover.value
    });
    if (data) {
      emit('success')
    }
  }
  open.value = false;
};

defineExpose({
  showModal,
})


</script>

<style scoped>
</style>
