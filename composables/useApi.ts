import { useCookie } from "#app";

export const useApi = () => {
  const config = useRuntimeConfig();
  
  const tokenCookie = useCookie("token", {
    maxAge: 60 * 60 * 2,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // เปลี่ยนเป็น none สำหรับ cross-domain
    path: "/",
    domain: process.env.NODE_ENV === "production" ? ".goolnw.com" : undefined, // ตั้ง domain สำหรับ production
  });

  // สร้าง $fetch instance ที่มี interceptor
  const $api = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    credentials: "include",
    onRequest({ request, options }) {
      // Debug logging
      if (process.client && process.env.NODE_ENV === "development") {
        console.log(
          "🚀 API Request:",
          request,
          "Token exists:",
          !!tokenCookie.value
        );
      }
      // เพิ่ม Authorization header
      if (tokenCookie.value) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${tokenCookie.value}`,
        };
      }
      // เพิ่ม headers สำหรับ CORS
      options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
      };
    },
    onResponse({ response, request }) {
      // Debug logging
      if (process.client && process.env.NODE_ENV === "development") {
        console.log("✅ API Response:", response.status, request);
      }

      // จัดการ token จาก login response
      if (request.toString().includes("/auth/login") && response._data?.token) {
        tokenCookie.value = response._data.token;

        // เก็บ backup token
        if (process.client) {
          try {
            localStorage.setItem("backup_token", response._data.token);
          } catch (e) {
            console.warn("Failed to save backup token:", e);
          }
        }
      }
    },
    onResponseError({ response, request }) {
      // Debug logging
      if (process.client) {
        console.error(
          "❌ API Error:",
          response.status,
          request,
          response._data
        );
      }

      // จัดการ error
      if (response.status === 401) {
        tokenCookie.value = null;
        if (process.client) {
          localStorage.removeItem("backup_token");
          navigateTo("/");
        }
      }
    },
  });

  return {
    $api,
    tokenCookie,
  };
};
