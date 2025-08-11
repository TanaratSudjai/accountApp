export const useAuth = () => {
  const token = useCookie("token");
  const user = useState("user", () => null);

  const setToken = (newToken: string) => {
    token.value = newToken;
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await $fetch("/api/login", {
        method: "POST",
        body: { email, password },
      });

      setToken(response.token);
      user.value = response.user;

      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    console.log("Token cleared on logout");
    navigateTo("/");
  };

  const isAuthenticated = computed(() => !!token.value);

  return {
    login,
    logout,
    isAuthenticated,
    user,
  };
};
