export default defineNuxtRouteMiddleware(async (to, from) => {
  // ตรวจสอบว่าเป็น client-side หรือไม่
  if (process.server) {
    return;
  }

  const tokenCookie = useCookie("token");

  // ถ้าไม่มี token และไม่ได้อยู่ที่หน้า login
  if (!tokenCookie.value) {
    if (to.path !== "/") {
      return navigateTo("/");
    }
    return;
  }

  // ถ้ามี token ให้ตรวจสอบ
  if (tokenCookie.value) {
    navigateTo("/home");
    try {
    } catch (error) {
      console.error("Token validation error:", error);
      tokenCookie.value = null;
      if (to.path !== "/") {
        return navigateTo("/");
      }
    }
  }
});
