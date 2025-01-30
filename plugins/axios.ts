import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const $axios = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  $axios.interceptors.request.use(
    (config) => {
      if (process.client) {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      $axios,
    },
  };
});
