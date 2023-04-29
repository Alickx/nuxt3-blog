<template>
  <div>
    <div>
      <nav>
        <ul class="p-2 shadow flex flex-row justify-center items-center space-x-5">
          <li>
            <nuxt-link to="home" class="text-lg">首页</nuxt-link>
          </li>
          <li>
            <nuxt-link to="about" class="text-lg">关于我</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts"></script>
