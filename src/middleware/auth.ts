export default defineNuxtRouteMiddleware((to, from) => {
  const cookies = useCookie('ACCESS_TOKEN')
  if (to.path !== '/login' && !cookies.value) {
    return '/login'
  }
})
