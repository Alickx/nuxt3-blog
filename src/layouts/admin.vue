<template>
  <client-only>
    <a-layout class="min-h-screen">
      <a-layout-sider breakpoint="lg" collapsed-width="0" class="!bg-white">
        <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" :items="items"
          @click="handleClick">
        </a-menu>
      </a-layout-sider>
      <a-layout class="ml-4">
        <a-layout-header class="!bg-white mb-3 flex items-center justify-end">
          <admin-user-model />
        </a-layout-header>
        <a-layout-content>
          <div class="p-6 bg-white min-h-[360px]">
            <slot />
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </client-only>
</template>
<script lang="ts" setup>
import { reactive, ref, watch, VueElement, h } from 'vue';
import type { MenuProps, ItemType } from 'ant-design-vue';
import { ReadOutlined, AreaChartOutlined, PieChartOutlined } from '@ant-design/icons-vue';

const router = useRouter();
const route = useRoute();
const selectedKeys = ref<string[]>([route.path]);
const openKeys = ref<string[]>([]);

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group',
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType;
}

const items: ItemType[] = reactive([

  getItem('主面板', '/admin/dashboard', () => h(PieChartOutlined)),

  getItem('内容管理', '/admin/content', () => h(ReadOutlined), [
    getItem('文章管理', '/admin/content/articleManage'),
    getItem('分类管理', '/admin/content/categoryManage'),
    getItem('标签管理', '3'),
    getItem('评论管理', '4')
  ]),

  getItem('流量管理', 'trafficManage', () => h(AreaChartOutlined), [
    getItem('访问统计', '5'),
    getItem('访问记录', '6'),
  ]),
]);

const handleClick: MenuProps['onClick'] = (e) => {
  const key = e.key as string;
  // 跳转
  console.log(key);
  router.push(key);
};

watch(() => route.path, () => {
  selectedKeys.value = [route.path];
});

</script>


<style scoped>
.site-layout .site-layout-background {
  background: #fff;
}
</style>
