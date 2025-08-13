import axios from "axios";

export const useApi = () => {
  const config = useRuntimeConfig();
  const tokenCookie = useCookie("token", {
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 1, // 1 วัน
  });

  const api = axios.create({
    baseURL: config.public.apiBase as string,
    withCredentials: true,
    timeout: 10000,
  });

  api.interceptors.request.use(
    (config: any) => {
      if (tokenCookie.value) {
        config.headers.Authorization = `Bearer ${tokenCookie.value}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => {
      if (response.config.url?.includes("/auth/login") && response.data.token) {
        tokenCookie.value = response.data.token;
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return { api };
};
