import axios from "axios";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const $axios = axios.create({
    baseURL: config.public.apiBase as string,
    withCredentials: true,
    timeout: 10000,
  });

  // Request interceptor เพื่อส่ง token ไปกับทุก request
  $axios.interceptors.request.use(
    (config) => {
      const { token } = useAuth();
      if (token.value) {
        config.headers.Authorization = `Bearer ${token.value}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor เพื่อจัดการ token หมดอายุ
  $axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token หมดอายุ หรือไม่ valid
        const { logout } = useAuth();
        logout();
      }
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      axios: $axios,
    },
  };
});
