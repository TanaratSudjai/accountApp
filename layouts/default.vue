<template>
  <div class="flex flex-col font-noto bg-white min-h-screen">
    <!-- Header -->
    <div class="flex flex md:flex-row gap-2 justify-center items-center w-full  p-2 bg-white border border-gray-200">
      <!-- logo stars -->
      <NuxtImg src="/logo.png" width="40" height="40" class="mx-auto" alt="Logo" />
      <div class="container mx-auto">

        <div class="font-noto text-black flex justify-between items-center text-xs md:text-sm lg:text-base">
          <div class="">
            บัญชีของคุณ
            <span class="font-bold">{{ nameuser || "กำลังโหลด" }}</span>
          </div>
          <button @click="logout"
            class="text-white text-xs md:text-sm lg:text-base underline-none bg-sky-600 px-2 py-1 text-md rounded hover:bg-red-600 transition-all duration-200">
            ออกจากระบบ
            <Icon v-if="loading" name="svg-spinners:180-ring-with-bg" />
          </button>
        </div>
      </div>
    </div>
    <div v-if="loading">
      <div class="min-h-screen flex items-center justify-center">
        <LoadingPageload />
      </div>
    </div>
    <div v-else class="p-2 mb-12">
      <slot />
      <NavbarComponents />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { checkSession } from '../composables/session';
const { $axios } = useNuxtApp();
let nameuser = ref("");
const loading = ref(false);
definePageMeta({
  middleware: ["auth"],
});

const getSession = async () => {
  loading.value = true;
  try {
    const response = await $axios.get("auth/get_session");
    // console.log("status", response.status);

    if (response.data) {
      nameuser.value = response.data.data_user.account_user_name || "ไม่พบชื่อผู้ใช้";
      loading.value = false;
    } else {
      nameuser.value = "ไม่พบชื่อผู้ใช้";
    }
  } catch (err) {
    console.log(err);
    if (err.response?.status === 401) {
      console.error("Unauthorized access. Please login again.");
    } else {
      console.error("Failed to fetch session data:", err.message);
    }
  }
};

// api call logout
const logout = async () => {
  loading.value = true;
  try {
    await $axios.post("/auth/logout");
    localStorage.removeItem("token");
    sessionStorage.clear();
    const tokenCookie = useCookie("token");
    tokenCookie.value = null;
    window.location.reload();
    loading.value = false;
  } catch (err) {
    if (err.response?.status === 401) {
      console.error("Unauthorized access. Please login again.");
    } else {
      console.error("Logout failed:", err.message);
    }
  }
};

onMounted(() => {
  if (checkSession()) {
    getSession();
  } else {
    window.location.href = "/";
  }
});
</script>
<style scoped>
.font-noto {
  font-family: "Noto Sans Thai", sans-serif;
}
</style>
