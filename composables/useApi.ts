import axios from 'axios';
export const useApi = () => {
  const config = useRuntimeConfig();
  const token = useCookie<string | null>("token");
  const api = axios.create({
    baseURL: config.public.apiBaseUrl,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  api.interceptors.request.use((req) => {
    if (token.value) {
      req.headers['Authorization'] = `Bearer ${token.value}`;
    }
    return req;
  })
  return api;
}