export default defineNuxtRouteMiddleware(async () => {
  const token = useCookie("token").value;

  if (!token) {
    return navigateTo("/");
  }
});
