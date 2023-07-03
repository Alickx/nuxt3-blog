<template>
  <div class="h-screen grid place-content-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
    <div class="flex flex-col items-center p-10 rounded-xl  bg-white/30">
      <div class="mb-2 text-center">
        <span class="font-bold text-2xl">用户登录</span>
      </div>
      <div class="flex flex-col mb-5 my-5">
        <div class="my-3 relative">
          <Icon class="absolute top-2 left-3" name="mdi:account" size="25"/>
          <input class="input" type="text" placeholder="用户名" v-model="username"/>
        </div>
        <div class="my-3 relative">
          <Icon class="absolute top-2 left-3" name="material-symbols:lock" size="25"/>
          <input class="input" type="password" placeholder="密码" v-model="password"/>
        </div>
      </div>
      <div class="w-full">
        <button
          class="m-0 py-2 px-10 text-black rounded block w-full cursor-pointer font-bold outline-none border border-solid border-transparent"
          @click="submit">登录
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {EncryptAES} from '~/utils/cryptoUtils'
import * as common from '~/constant/resultConstant'

const {userLogin} = useUser()
const router = useRouter()

definePageMeta({
  title: '后台登录',
  layout: false
})


let username = ref('')
let password = ref('')

const submit = async () => {

  if (!username.value || !password.value) {
    return;
  }

  let encryptPassword = EncryptAES(password.value);

  const cookies = useCookie("ACCESS_TOKEN", {maxAge: 60 * 60 * 24})

  let data = await userLogin({
    username: username.value,
    password: encryptPassword
  });

  if (data.code == common.SUCCESS_CODE) {
    cookies.value = data.data.token
    await router.push('/admin')
  }


}


</script>

<style scoped>

.input {
  @apply py-2.5 pl-10 pr-2 rounded border border-gray-300 border-solid outline-none text-gray-500;
}


</style>
