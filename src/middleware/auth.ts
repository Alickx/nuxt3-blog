export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = useCookie('ACCESS_TOKEN')
  if (to.path !== '/login' && !accessToken.value) {
    return '/login'
  }
})
