export default defineNuxtRouteMiddleware((to) => {
  const tokenCookie = useCookie("token");
  let token = useState("token", () => tokenCookie.value).value;

  if (!token && process.client) {
    try {
      const backupToken = localStorage.getItem('backup_token');
      if (backupToken) {
        console.log('🔄 Using backup token from localStorage');
        tokenCookie.value = backupToken;
        token = backupToken;
        // Clean up backup after restoring
        localStorage.removeItem('backup_token');
      }
    } catch (e) {
      console.warn('Failed to check backup token:', e);
    }
  }

  // Debug logging
  if (process.client) {
    console.log('🔍 Auth middleware - Path:', to.path, 'Token exists:', !!token);
  }

  if (!token) {
    if (to.path === "/register" || to.path === "/") return; // ✅ ผ่านได้
    if (to.path !== "/") return navigateTo("/");
    return;
  }

  if (token) {
    if (to.path === "/register" || to.path === "/login") return navigateTo("/home");
    if (to.path === "/") return navigateTo("/home");
    return;
  }
});
