import axios from "axios";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const token = useCookie<string | null>("token");

  const api = axios.create({
    baseURL: config.public.apiBaseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use((req) => {
    if (token.value) {
      req.headers["Authorization"] = `Bearer ${token.value}`;
    }
    return req;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        token.value = null;
        navigateTo("/");
      }
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      api,
    },
  };
});
