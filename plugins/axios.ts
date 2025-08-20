import axios from "axios";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  // Debug: ตรวจสอบ API base URL
  if (process.env.NODE_ENV === 'development') {
    const { logger } = await import('~/utils/logger');
    logger.debug('API Base URL:', config.public.apiBase);
    logger.debug('Cookie Domain:', config.public.cookieDomain);
  }

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
