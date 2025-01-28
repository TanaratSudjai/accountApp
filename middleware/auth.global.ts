export default defineNuxtRouteMiddleware(async (to, from) => {
  // ใช้ useState เพื่อกำหนด token แทน
  const tokenCookie = useCookie("token"); // <==ตัวเก่าโดนล้าง cookie ตลอดไม่สามารถนำมาเก็บได้
  const tokenState = useState("token", () => useCookie("token").value);
  //คำอธิบาย useState('token', () => useCookie('token').value)
  // สร้างสถานะถาวรสำหรับโทเค็น โทเค็นถูกดึงข้อมูลโดยใช้ useCookie('token')
  // และจัดเก็บไว้ในสถานะที่คงอยู่ทั้ง SSR และ CSR ซึ่งจะทำให้แน่ใจได้ว่าเมื่อเพจถูกไฮเดรต
  // (หลังจากกระบวนการ SSR) สถานะโทเค็นจะถูกเติมไว้แล้ว และจะไม่มีการกำหนดไว้

  const token = tokenState.value;

  console.log("Token from cookie:", token);

  if (!token && to.path === "/register") {
    console.log("Redirecting due to missing or invalid token");
    return;
  }

  if (!token && to.path !== "/") {
    console.log("Redirecting due to missing or invalid token");
    return navigateTo("/");
  }

  if (token && to.path === "/") {
    console.log("Valid token detected, redirecting to /home");
    return navigateTo("/home");
  }

  if (token) {
    console.log("Valid token detected, continuing");
    return;
  }
});
