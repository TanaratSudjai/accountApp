import axios from "axios";

export const useApi = () => {
  const config = useRuntimeConfig();
  const tokenCookie = useCookie("token", {
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    httpOnly: false, // เปลี่ยนเป็น false เพื่อให้ client-side สามารถเข้าถึงได้
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // เพิ่มเป็น 7 วัน
    // ตั้งค่า domain สำหรับ production
    ...(process.env.NODE_ENV === "production" && {
      domain: "accounting.goolnw.com",
    }),
  });

  // Debug API base URL
  const apiBaseUrl = config.public.apiBase;
  console.log("API Base URL:", apiBaseUrl);

  const api = axios.create({
    baseURL: apiBaseUrl,
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
      // เก็บ token เมื่อ login สำเร็จ
      if (response.config.url?.includes("/auth/login") && response.data.token) {
        tokenCookie.value = response.data.token;
      }
      return response;
    },
    (error) => {
      // จัดการ error เมื่อ token หมดอายุ
      if (error.response?.status === 401) {
        // ลบ token ที่หมดอายุ
        tokenCookie.value = null;

        // ถ้าไม่ใช่หน้า login ให้ redirect ไป login
        if (
          import.meta.client &&
          window.location.pathname !== "/" &&
          window.location.pathname !== "/register"
        ) {
          window.location.href = "/";
        }
      }
      return Promise.reject(error);
    }
  );

  return { api };
};
