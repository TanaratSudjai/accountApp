
export const useAuth = () => {
  const token = useCookie("token_auth", {
    maxAge: 60 * 60 * 2, // 2 ชั่วโมง
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  const isAuthenticated = computed(() => !!token.value);

  

  function logout() {
    token.value = null;
    // Clear localStorage if exists
    if (process.client && typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    navigateTo("/");
  }

  return {
    token,
    isAuthenticated,
    logout,
  };
};
