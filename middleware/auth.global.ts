export default defineNuxtRouteMiddleware(async (to, from) => {
  // ตรวจสอบว่าเป็น client-side หรือไม่
  if (process.server) return;

  const { token, isAuthenticated } = useAuth();

  // ถ้าไม่มี token และไม่ได้อยู่ในหน้า login หรือ register
  if (!isAuthenticated.value) {
    const publicRoutes = ["/", "/register"];
    if (!publicRoutes.includes(to.path)) {
      return navigateTo("/");
    }
  }
  
  // ถ้ามี token แล้วและพยายามเข้าหน้า login
  if (isAuthenticated.value && (to.path === "/" || to.path === "/register")) {
    return navigateTo("/home");
  }
});
