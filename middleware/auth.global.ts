export default defineNuxtRouteMiddleware((to) => {
  const token = useState("token", () => useCookie("token").value).value;

  if (!token) {
    if (to.path === "/register" || to.path === "/login") return; // ✅ ผ่านได้
    if (to.path !== "/") return navigateTo("/");
    return;
  }

  if (token) {
    if (to.path === "/register" || to.path === "/login") return navigateTo("/home");
    if (to.path === "/") return navigateTo("/home");
    return;
  }
});
