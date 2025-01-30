import axios from "axios";
import { useCookie } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const $axios = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true, // ใช้ cookies กับ request
  });

  // ดึง token จาก localStorage หรือ cookies แล้วเพิ่มเข้า headers
  $axios.interceptors.request.use(
    (config) => {
      if (process.client) {
        let token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // ดัก response และบันทึก token ลง localStorage และ cookies
  $axios.interceptors.response.use(
    (response) => {
      if (response.config.url === "/auth/login" && response.data.token) {
        const token = response.data.token;

        // บันทึก token ลง localStorage
        localStorage.setItem("token", token);

        // บันทึก token ลง cookies
        const tokenCookie = useCookie("token", {
          maxAge: 1 * 24 * 60 * 60,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        tokenCookie.value = token;
      }
      return response;
    },
    (error) => Promise.reject(error)
  );

  return {
    provide: {
      axios: $axios,
    },
  };
});
