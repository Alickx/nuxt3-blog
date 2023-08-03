export default defineNuxtConfig({
	modules: ['@unocss/nuxt', 'nuxt-icon', '@vueuse/nuxt', '@ant-design-vue/nuxt', '@nuxt/image'],
	css: ['@/assets/sytles/normalize.css'],
	app: {
		head: {
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		},
	},
	srcDir: 'src/',
	image: {
		format: ['webp', 'avif', 'png', 'jpg', 'jpeg'],
		quality: 50,
	},
});
