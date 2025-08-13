export default defineNuxtRouteMiddleware((to) => {
  const tokenCookie = useCookie("token");
  const token = tokenCookie.value;

  // หน้าที่ไม่ต้องการ authentication
  const publicRoutes = ["/", "/register"];
  
  // ถ้าไม่มี token และไม่ใช่หน้า public routes
  if (!token && !publicRoutes.includes(to.path)) {
    return navigateTo("/");
  }

  // ถ้ามี token และอยู่ในหน้า login หรือ register ให้ redirect ไป home
  if (token && (to.path === "/" || to.path === "/register")) {
    return navigateTo("/home");
  }
});
