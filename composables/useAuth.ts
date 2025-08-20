
export const useAuth = () => {
  const config = useRuntimeConfig();
  
  const token = useCookie("token", {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 วัน
    secure: true, // ใช้เฉพาะ HTTPS
    sameSite: "none" as const, // สำหรับ cross-domain
    path: "/",
    domain: config.public.cookieDomain as string,
    httpOnly: false, // ต้องเป็น false เพื่อให้ client อ่านได้
  });

  const isAuthenticated = computed(() => !!token.value);

  function logout() {
    token.value = null;
    // Clear localStorage if exists
    if (import.meta.client && typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    navigateTo("/");
  }

  function setToken(newToken: string) {
    token.value = newToken;
  }

  return {
    token,
    isAuthenticated,
    logout,
    setToken,
  };
};
