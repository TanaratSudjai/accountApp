import axios from "axios";
import { useCookie } from "#app";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const $axios = axios.create({
    baseURL: config.public.apiBase, 
    withCredentials: true,          
    timeout: 10000,
  });


  return {
    provide: {
      axios: $axios,
    },
  };
});
