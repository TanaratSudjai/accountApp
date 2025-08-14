export const useAuth = () => {
  const { $api } = useNuxtApp();
  const token = useCookie<string | null>("token", {
    path: "/",
    maxAge: 60 * 60,
    sameSite: "strict",
    secure: true,
  });

  const user = useState<any | null>("user", () => null);

  const login = async (
    account_user_username: string,
    account_user_password: string
  ) => {
    const response = await $api.post("/auth/login", {
      account_user_username,
      account_user_password,
    });
    user.value = response.data.user;
    token.value = response.data.token;
    return response.data.user;
  };

  const logout = async () => {
    await $api.post("/auth/logout");
    user.value = null;
    token.value = null;
  };

  return {
    user,
    token,
    login,
    logout,
  };
};
