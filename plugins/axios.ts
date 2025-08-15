import axios from "axios";
import { useCookie } from "#app";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const tokenCookie = useCookie("token", {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 2 ชั่วโมง
    secure: true, // ใช้เฉพาะ HTTPS
    sameSite: "None",
    path: "/",
    httpOnly: true,
    domain: config.public.cookieDomain,
  });

  const $axios = axios.create({
    baseURL: config.public.apiBase,
    withCredentials: true,
    timeout: 10000,
  });

  $axios.interceptors.request.use(
    (config: any) => {
      if (tokenCookie.value) {
        config.headers.Authorization = `Bearer ${tokenCookie.value}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  $axios.interceptors.response.use(
    (response) => {
      if (response.config.url?.includes("/") && response.data.token) {
        tokenCookie.value = response.data.token;
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      axios: $axios,
    },
  };
});
