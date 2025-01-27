export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("token");
  const { refreshToken } = useAuth();

  if (!token.value) {
    return navigateTo("/");
  }

  try {
    const isValid = await validateToken(token.value);

    if (isValid) {
      const success = await refreshToken();
      if (!success) {
        return navigateTo("/");
      }
    }
  } catch (error) {
    return navigateTo("/");
  }
});
