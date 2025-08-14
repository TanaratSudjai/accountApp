export default defineNuxtRouteMiddleware(async (to, from) => {
  // ตรวจสอบว่าเป็น client-side หรือไม่
  if (process.server) return;

  const tokenCookie = useCookie("token");

  if (!tokenCookie.value) {
    if (to.path !== "/") {
      return navigateTo("/");
    }
  }
});
