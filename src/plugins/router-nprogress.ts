import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  easing: 'ease-out-in',
  speed: 700,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hooks.hook("page:start", () => {
    NProgress.start();
  });
  nuxtApp.hooks.hook("page:finish", () => {
    NProgress.done();
  });
});
