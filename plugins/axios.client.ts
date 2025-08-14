import axios from 'axios'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const token = useCookie<string | null>('token')

    const api = axios.create({
        baseURL: config.public.apiBaseUrl,
        headers: {
            'Content-Type': 'application/json',
        })

    // Request interceptor to add auth token
    api.interceptors.request.use((req) => {
        if (token.value) {
            req.headers['Authorization'] = `Bearer ${token.value}`
        }
        return req
    })

    // Response interceptor for error handling
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            // Handle common errors here if needed
            if (error.response?.status === 401) {
                // Token expired or invalid
                token.value = null
                navigateTo('/')
            }
            return Promise.reject(error)
        }
    )

    return {
        provide: {
            api
        }
    }
})