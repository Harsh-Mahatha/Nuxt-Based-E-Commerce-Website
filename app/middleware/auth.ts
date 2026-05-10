export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useAuthStore();

  if (!userStore.isLoggedIn && to.path !== "/login") {
    return navigateTo({
      path: "/login",
      query: {
        redirect: to.fullPath,
      },
    });
  }
});
