import { useCookie } from '#app'

export const useApi = () => {
    const config = useRuntimeConfig()
    const tokenCookie = useCookie('token', {
        maxAge: 60 * 60 * 24 * 7, // 7 วัน
        secure: process.env.NODE_ENV === 'production' && process.server ? false : true, // Allow insecure in dev
        sameSite: 'lax', // เปลี่ยนจาก strict เป็น lax
        path: '/',
        httpOnly: false, // ต้องเป็น false เพื่อให้ client-side access ได้
        domain: process.env.NODE_ENV === 'production' ? '.goolnw.com' : undefined, // Set domain for production
    })

    // สร้าง $fetch instance ที่มี interceptor
    const $api = $fetch.create({
        baseURL: config.public.apiBaseUrl,
        credentials: 'include',
        onRequest({ request, options }) {
            // เพิ่ม Authorization header
            if (tokenCookie.value) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${tokenCookie.value}`,
                }
            }
        },
        onResponse({ response, request }) {
            // จัดการ token จาก login response
            if (request.toString().includes('/auth/login') && response._data?.token) {
                tokenCookie.value = response._data.token
                
                // Debug logging for production
                if (process.client) {
                    console.log('🔑 Token set:', !!response._data.token)
                    console.log('🍪 Cookie value after set:', !!tokenCookie.value)
                    
                    // Fallback: Also store in localStorage as backup
                    try {
                        localStorage.setItem('backup_token', response._data.token)
                    } catch (e) {
                        console.warn('Failed to set backup token:', e)
                    }
                }
            }
        },
        onResponseError({ response }) {
            // จัดการ error
            if (response.status === 401) {
                console.warn('⚠️ Unauthorized! Token Expired or Invalid.')
                tokenCookie.value = null
                // อาจจะ redirect ไป login page
                if (process.client) {
                    navigateTo('/')
                }
            }
        },
    })

    return {
        $api,
        tokenCookie,
    }
}