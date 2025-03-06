export default defineNuxtPlugin(() => {
  const token = useCookie("token");

  // Add logging to track token changes
  console.log("Current Token Value:", token.value);

  addRouteMiddleware("auth", () => {
    // เพิ่ม token ใน header ทุกครั้งที่เรียก API
    $fetch.create({
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
  });
});
