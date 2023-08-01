<template>
  <a-dropdown>
    <a-avatar class="cursor-pointer" size="large" @click="handleVisibleChange(true)">
      <template #icon>
        <UserOutlined />
      </template>
    </a-avatar>
    <template #overlay>
      <a-menu slot="overlay" @click="logout">
        <a-menu-item key="logout" :icon="() => h(LogoutOutlined)">
          <nuxt-link to="/">退出登录</nuxt-link>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">

import { LogoutOutlined} from '@ant-design/icons-vue';


const dropdownVisible = ref(false);

const handleVisibleChange = (flag: boolean) => {
  dropdownVisible.value = flag;
};

const logout = () => {
  const cookies = useCookie('ACCESS_TOKEN');
  cookies.value = null;
}


</script>

<style scoped>
</style>
