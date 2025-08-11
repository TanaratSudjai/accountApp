import { useCookie } from "#app";

export const useApi = () => {
  const config = useRuntimeConfig();
  const tokenCookie = useCookie("token", {
    maxAge: 60 * 60 * 24 * 1,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    domain: process.env.NODE_ENV === "production" ? ".goolnw.com" : undefined,
    path: "/",
    httpOnly: false,
  });

  // สร้าง $fetch instance ที่มี interceptor
  const $api = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    credentials: "include",
    onRequest({ request, options }) {
      // เพิ่ม Authorization header
      if (tokenCookie.value) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${tokenCookie.value}`,
        };
      }
    },
    onResponse({ response, request }) {
      // จัดการ token จาก login response
      if (request.toString().includes("/auth/login") && response._data?.token) {
        tokenCookie.value = response._data.token;
      }
    },
    onResponseError({ response }) {
      // จัดการ error
      if (response.status === 401) {
        tokenCookie.value = null;
        // อาจจะ redirect ไป login page
        if (process.client) {
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
