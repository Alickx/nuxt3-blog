export default defineNuxtConfig({
	modules: ['@unocss/nuxt', 'nuxt-icon', '@vueuse/nuxt', '@ant-design-vue/nuxt', '@nuxt/image'],
	css: ['@/assets/sytles/normalize.css'],
	srcDir: 'src/',
  image: {
    format: ['webp'],
    quality: 50,
  }
});
