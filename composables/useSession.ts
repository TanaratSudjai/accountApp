import { ref } from "vue";
export function useSession() {
  const loading = ref(false);
  const nameuser = ref("ไม่พบชื่อผู้ใช้");
  const { api } = useApi();
  const router = useRouter();

  const getSession = async () => {
    loading.value = true;
    try {
      const response = await api.get("/auth/get_session");
      if (response.data) {
        nameuser.value =
          response.data.data_user.account_user_name || "ไม่พบชื่อผู้ใช้";
      } else {
        nameuser.value = "ไม่พบชื่อผู้ใช้";
      }
    } catch (err: any) {
      console.error(err);
      if (err.status === 401) {
        console.error("Unauthorized access. Please login again.");
        await logout(); // Auto logout เมื่อ token หมดอายุ
      } else {
        console.error("Failed to fetch session data:", err.message);
      }
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      // เรียก API logout (ถ้ามี)
      await api.post("/auth/logout").catch(() => {
        // ไม่ต้องแสดง error ถ้า logout API ล้มเหลว
      });
    } finally {
      // ลบ token cookie
      const tokenCookie = useCookie("token");
      tokenCookie.value = null;

      // Redirect ไปหน้า login
      await router.push("/");
    }
  };

  return {
    loading,
    nameuser,
    getSession,
    logout,
  };
}
