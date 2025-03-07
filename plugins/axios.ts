import axios from "axios";
import { useCookie } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const tokenCookie = useCookie("token"); // ใช้ useCookie เพื่อเข้าถึง token ที่ถูกบันทึกไว้ก่อนหน้า

  const $axios = axios.create({
    baseURL: config.public.apiBaseUrl,
    withCredentials: true, // ให้ Axios ส่ง Cookies ไปกับทุก Request
  });

  // ✅ Interceptor สำหรับ Response -> บันทึก Token เมื่อ Login สำเร็จ
  $axios.interceptors.response.use(
    (response) => {
      if (response.config.url === "/auth/login" && response.data.token) {
        tokenCookie.value = response.data.token; // บันทึก Token ลง Cookie
        console.log("✅ Token Saved in Cookie:", tokenCookie.value);
      }
      return response;
    },
    (error) => Promise.reject(error)
  );

  // ✅ Interceptor สำหรับ Request -> เพิ่ม Token เข้า Headers
  $axios.interceptors.request.use(
    (config) => {
      const token = tokenCookie.value;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return {
    provide: {
      axios: $axios,
    },
  };
});
