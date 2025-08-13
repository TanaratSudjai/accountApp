export const useTokenDebug = () => {
  const debugToken = () => {
    if (!process.client) return;
    
    const tokenCookie = useCookie("token");
    const backupToken = localStorage.getItem('backup_token');
    
    console.log('🔍 Token Debug Info:');
    console.log('- Cookie token exists:', !!tokenCookie.value);
    console.log('- Backup token exists:', !!backupToken);
    console.log('- Environment:', process.env.NODE_ENV);
    console.log('- Current domain:', window.location.hostname);
    console.log('- API Base URL:', useRuntimeConfig().public.apiBaseUrl);
    console.log('- Document cookies:', document.cookie);
    
    return {
      cookieToken: !!tokenCookie.value,
      backupToken: !!backupToken,
      environment: process.env.NODE_ENV,
      domain: window.location.hostname,
      apiUrl: useRuntimeConfig().public.apiBaseUrl
    };
  };

  const clearAllTokens = () => {
    if (!process.client) return;
    
    const tokenCookie = useCookie("token");
    tokenCookie.value = null;
    
    try {
      localStorage.removeItem('backup_token');
      console.log('✅ All tokens cleared');
    } catch (e) {
      console.warn('Failed to clear backup token:', e);
    }
  };

  return {
    debugToken,
    clearAllTokens
  };
};