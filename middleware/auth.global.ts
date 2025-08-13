export default defineNuxtRouteMiddleware((to, from) => {
  // // ทำงานเฉพาะใน client-side เท่านั้น
  // if (process.server) return;

  // const tokenCookie = useCookie("token");
  // const token = tokenCookie.value;

  // // หน้าที่ไม่ต้องการ authentication (public routes)
  // const publicRoutes = ["/", "/register"];

  // // ตรวจสอบว่าเป็น public route หรือไม่
  // const isPublicRoute = publicRoutes.includes(to.path);

  // // ถ้าไม่มี token
  // if (!token) {
  //   // ถ้าไม่ใช่ public route ให้ redirect ไป login
  //   if (!isPublicRoute) {
  //     return navigateTo("/");
  //   }
  //   // ถ้าเป็น public route ให้ผ่านได้
  //   return;
  // }

  // // ถ้ามี token
  // if (token) {
  //   // ถ้าอยู่ในหน้า login หรือ register ให้ redirect ไป home
  //   if (isPublicRoute) {
  //     return navigateTo("/home");
  //   }
  //   // ถ้าไม่ใช่ public route ให้ผ่านได้ (มี token แล้ว)
  //   return;
  // }
});
