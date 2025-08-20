import { ref } from "vue";
export function useSession() {
  const { $axios } = useNuxtApp();
  const loading = ref(false);
  const nameuser = ref("ไม่พบชื่อผู้ใช้");

  const getSession = async () => {
    loading.value = true;
    try {
      const response = await $axios.get("/auth/get_session");
      if (response.data) {
        nameuser.value =
          response.data.data_user.account_user_name || "ไม่พบชื่อผู้ใช้";
      } else {
        nameuser.value = "ไม่พบชื่อผู้ใช้";
      }
    } catch (err: any) {
      const { error, warn } = useLogger();
      if (err.status === 401) {
        warn("Unauthorized access. Please login again.");
      } else {
        error("Failed to fetch session data", err);
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    nameuser,
    getSession,
  };
}
