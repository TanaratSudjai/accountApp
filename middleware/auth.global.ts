export default defineNuxtRouteMiddleware((to) => {
  const tokenCookie = useCookie("token");
  let token = useState("token", () => tokenCookie.value).value;

  if (!token) {
    if (to.path === "/register") return;
  }

  if (token && to.path === "/") {
    if (token) return navigateTo("/home");
    return;
  }
});
