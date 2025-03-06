import axios from "axios";
import { useCookie } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const $axios = axios.create({
    baseURL: config.public.apiBaseUrl,
    withCredentials: true, // ใช้ cookies กับ request
  });

  // Add request interceptor to include token in headers for all API requests
  $axios.interceptors.request.use((config) => {
    const token = useCookie("token").value;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  });

  // ดึง token จาก localStorage หรือ cookies แล้วเพิ่มเข้า headers
  $axios.interceptors.response.use(
    (response) => {
      if (response.config.url === "/auth/login" && response.data.token) {
        const token = response.data.token;
        const tokenCookie = useCookie("token", {
          maxAge: 60 * 60 * 24, // 1 วัน
          secure: process.env.NODE_ENV === "production",
          sameSite: "none",
          path: "/", // เพิ่ม path ให้ใช้ได้ทุกหน้า
        });

        // Check if token is already set to prevent duplicate cookies
        if (tokenCookie.value !== token) {
          tokenCookie.value = token;
          console.log("✅ Token Saved in Cookie:", tokenCookie.value);
        }
      }
      return response;
    },
    (error) => {
      console.error("Response error:", error);
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      axios: $axios,
    },
  };
});
