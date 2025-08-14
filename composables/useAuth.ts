import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const token = useCookie("token", {
    maxAge: 60 * 60 * 2, // 2 ชั่วโมง
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  const isAuthenticated = computed(() => !!token.value);

  // Decode token to get role
  const decodedToken = computed(() => {
    if (!token.value) return null;
    try {
      return jwtDecode(token.value) as any;
    } catch (error) {
      console.error("Token decode error:", error);
      return null;
    }
  });

  const role = computed(() => {
    const decoded = decodedToken.value;
    return decoded?.role || null;
  });

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
    role,
    decodedToken,
    logout,
  };
};
