export default defineNuxtPlugin(() => {
  const token = useCookie("token");

  addRouteMiddleware("auth", () => {
    // เพิ่ม token ใน header ทุกครั้งที่เรียก API
    $fetch.create({
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
  });
});
