export default defineNuxtPlugin(() => {
  const tokenCookie = useCookie("token", {
    maxAge: 60 * 60 * 2,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    path: "/",
    domain: process.env.NODE_ENV === "production" ? ".goolnw.com" : undefined,
  });

  // ตรวจสอบ backup token เมื่อเริ่มต้น app
  if (process.client && !tokenCookie.value) {
    try {
      const backupToken = localStorage.getItem('backup_token');
      if (backupToken) {
        console.log('🔄 Restoring token from localStorage');
        tokenCookie.value = backupToken;
        localStorage.removeItem('backup_token');
      }
    } catch (e) {
      console.warn('Failed to restore backup token:', e);
    }
  }

  // Debug logging สำหรับ production
  if (process.client) {
    console.log('🔍 Auth Plugin - Token exists:', !!tokenCookie.value);
    console.log('🌍 Environment:', process.env.NODE_ENV);
    console.log('🔗 API Base URL:', useRuntimeConfig().public.apiBaseUrl);
  }
});
