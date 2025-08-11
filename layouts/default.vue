<template>
  <div class="flex flex-col font-noto bg-white min-h-screen">
    <div class="flex flex md:flex-row gap-2 justify-between items-center w-full  p-2 bg-white border border-gray-200">
      <div
        class="font-noto text-black flex justify-between items-center text-xs md:text-sm lg:text-base bg-white w-full">
        <div class="flex justify-center items-center gap-2">
          <NuxtImg src="/logo.png" width="40" height="40" class="" alt="Logo" />
          <div class="">
            บัญชีของคุณ
            <span class="font-bold">{{ loading ? "กําลังโหลด" : nameuser || "ไม่มีชื่อผู้ใช้" }}</span>
          </div>
        </div>
        <button @click="logout"
          class="text-white text-xs md:text-sm lg:text-base underline-none bg-sky-600 px-2 py-1 text-md rounded hover:bg-sky-400 transition-all duration-200">
          <span v-if="loading">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g>
                <circle cx="3" cy="12" r="2" fill="currentColor" />
                <circle cx="21" cy="12" r="2" fill="currentColor" />
                <circle cx="12" cy="21" r="2" fill="currentColor" />
                <circle cx="12" cy="3" r="2" fill="currentColor" />
                <circle cx="5.64" cy="5.64" r="2" fill="currentColor" />
                <circle cx="18.36" cy="18.36" r="2" fill="currentColor" />
                <circle cx="5.64" cy="18.36" r="2" fill="currentColor" />
                <circle cx="18.36" cy="5.64" r="2" fill="currentColor" />
                <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate"
                  values="0 12 12;360 12 12" />
              </g>
            </svg>
          </span>
          <span v-else>ออกจากระบบ</span>
        </button>
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
definePageMeta({
  middleware: ["auth"],
});
// import
import { useSession } from "~/composables/useSession";
// composables state
const { loading, nameuser, getSession } = useSession();
const { $api } = useApi();
// api call logout
const logout = async () => {
  try {
    loading.value = true;
    await $api("/auth/logout", {
      method: "POST",
    });
    setInterval(() => {
      loading.value = false;
    }, 3000)
    localStorage.removeItem("token");
    sessionStorage.clear();
    const tokenCookie = useCookie("token");
    tokenCookie.value = null;
    window.location.reload();
  } catch (err) {
    if (err.status === 401) {
      console.error("Unauthorized access. Please login again.");
    } else {
      console.error("Logout failed:", err.message);
    }
  }
};
// api call getSession
onMounted(() => {
  getSession();
});
</script>
<style scoped>
.font-noto {
  font-family: "Noto Sans Thai", sans-serif;
}
</style>
