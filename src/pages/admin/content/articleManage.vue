<template>
  <div class="flex flex-col">
    <div class="flex flex-row justify-end lg:justify-start items-center mb-10">
      <a-space wrap>
        <a-button type="primary" @click="addArticle">新增文章</a-button>
      </a-space>
    </div>
    <a-table bordered :data-source="tableData" :columns="columns" :scroll="{ x: 'max-content' }">
      <template #bodyCell="{ column, record, text }">
        <template v-if="column.dataIndex === 'title'">
          <nuxt-link class="font-bold" :href="`/article/${record.id}`" target="_blank">{{ text }}</nuxt-link>
        </template>
        <template v-else-if="column.dataIndex === 'createdAt' || column.dataIndex === 'updatedAt'">
          {{ formatTime(text) }}
        </template>
        <template v-else-if="column.key === 'action'">
          <a-space>
            <a-button @click="editArticle(record.id)">编辑</a-button>
            <a-popconfirm title="删除文章" @confirm="delArticle(record.id)" cancel-text="取消">
              <a-button type="primary" danger>删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
    <admin-content-article-model ref="articleModelRef" :type="type" :article-id="actionArticleId" @success="onSuccess" />
  </div>
</template>

<script setup lang="ts">
import { SimpleArticle } from '~/composables/useArticle';

const { pageArticle, deleteArticle } = useArticle()
const { $dayjs } = useNuxtApp()


let page = ref(1)
let size = ref(10)
let tableData = ref<SimpleArticle[]>([])
let type = ref('')
let articleModelRef = ref();
let actionArticleId = ref('')

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: '操作',
    key: 'action',
  }
]

const refresh = () => {
  tableData.value = []
  pageQueryArticle(page.value, size.value)
}


async function pageQueryArticle(page: number, size: number) {
  const data = await pageArticle(page, size);
  tableData.value.push(...data.data.records)
}

const formatTime = (date: string) => {
  return $dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}


const addArticle = () => {
  type.value = 'add'
  actionArticleId.value = '';
  articleModelRef.value.showModal()
}

const editArticle = (id: string) => {
  type.value = 'edit'
  actionArticleId.value = id;
  articleModelRef.value.showModal()
}

const delArticle = async (id: string) => {
  let { data } = await deleteArticle(id);
  if (data) {
    message.success('删除成功');
    refresh();
  }
}


const onSuccess = () => {
  message.success('操作成功');
  refresh();
}


onMounted(() => {
  pageQueryArticle(page.value, size.value)
})




</script>


<style scoped>
</style>
