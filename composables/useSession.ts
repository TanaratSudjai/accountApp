import { ref } from "vue";
export function useSession() {
  const loading = ref(false);
  const nameuser = ref("ไม่พบชื่อผู้ใช้");
  const { $api } = useApi();
  const getSession = async () => {
    loading.value = true;
    try {
      const response = await $api("/auth/get_session");
      if (response) {
        nameuser.value =
          response.data_user.account_user_name || "ไม่พบชื่อผู้ใช้";
      } else {
        nameuser.value = "ไม่พบชื่อผู้ใช้";
      }
    } catch (err: any) {
      console.error(err);
      if (err.status === 401) {
        console.error("Unauthorized access. Please login again.");
      } else {
        console.error("Failed to fetch session data:", err.message);
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
