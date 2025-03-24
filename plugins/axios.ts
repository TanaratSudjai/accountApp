import axios from "axios";
import { useCookie } from "#app";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const tokenCookie = useCookie("token", {
    maxAge: 60 * 60 * 24, // 1 วัน
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/", // ใช้ได้ทุกหน้า
  });

  const $axios = axios.create({
    baseURL: config.public.apiBaseUrl,
    withCredentials: true,
  });

  // ✅ Interceptor สำหรับ Request (เพิ่ม Token ใน Headers)
  $axios.interceptors.request.use(
    (config) => {
      if (tokenCookie.value) {
        config.headers.Authorization = `Bearer ${tokenCookie.value}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // ✅ Interceptor สำหรับ Response (จัดการ Token และ Error)
  $axios.interceptors.response.use(
    (response) => {
      if (response.config.url === "/auth/login" && response.data.token) {
        tokenCookie.value = response.data.token;
        console.log("✅ Token Saved:", tokenCookie.value);
      }
      return response;
    },
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          console.warn("⚠️ Unauthorized! Token Expired or Invalid.");
          tokenCookie.value = null; // ล้าง Token
        }
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
