import { ref } from "vue";
import { useCookie } from "#app";

const token = ref("");
const session = ref<any>(null);

export const useAuth = () => {
  const tokenCookie = useCookie("token", { path: "/" });

  const setToken = (newToken: string) => {
    token.value = newToken;
    tokenCookie.value = newToken;
  };

  const clearToken = () => {
    token.value = "";
    tokenCookie.value = "";
    session.value = null;
  };

  return { token, setToken, clearToken };
};
