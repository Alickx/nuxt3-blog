<template>
  <div
    class="grid h-screen place-content-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
  >
    <div class="flex flex-col items-center rounded-xl bg-white/30 p-10">
      <div class="mb-2 text-center">
        <span class="text-2xl font-bold">用户登录</span>
      </div>
      <div class="my-5 mb-5 flex flex-col">
        <div class="relative my-3">
          <Icon class="absolute left-3 top-2" name="mdi:account" size="25" />
          <input
            class="input"
            type="text"
            placeholder="用户名"
            v-model="username"
          />
        </div>
        <div class="relative my-3">
          <Icon
            class="absolute left-3 top-2"
            name="material-symbols:lock"
            size="25"
          />
          <input
            class="input"
            type="password"
            placeholder="密码"
            v-model="password"
          />
        </div>
      </div>
      <div class="w-full">
        <a-button type="primary" block @click="submit">登录</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EncryptAES } from "~/utils/cryptoUtils";

const { signIn } = useAuth();

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
  layout: false,
});

useHead({
  title: "后台登录",
});

let username = ref("");
let password = ref("");

const submit = async () => {
  if (!username.value || !password.value) {
    return;
  }

  let encryptPassword = EncryptAES(password.value);
  await signIn({
    username: username.value,
    password: encryptPassword,
  },{
    callbackUrl: "/admin/dashboard",
    redirect: true
  });
};

// 监听enter
onMounted(() => {
  document.onkeydown = function (event) {
    let e = event || arguments.callee.caller.arguments[0];
    if (e && e.key == "Enter") {
      submit();
    }
  };
});
</script>

<style scoped>
.input {
  @apply rounded border border-solid border-gray-300 py-2.5 pl-10 pr-2 text-gray-500 outline-none;
}
</style>
