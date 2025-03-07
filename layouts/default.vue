<template>

  <div class="flex flex-col font-noto bg-[#111827]  min-h-screen">
    <!-- Header -->

    <div class="flex flex-col md:flex-row gap-2 justify-center items-center w-full z-50 p-3 bg-[#1f2937] shadow-md">
      <!-- logo stars -->
      <div class="w-full">
        <div class="font-sans pb-2 text-gray-400">
          บัญชีของคุณ {{ nameuser }}
          <button @click="logout" class="text-rose-500 underline-none">
            ออกจากระบบ
          </button>
        </div>
      </div>
      <!-- button remove stars -->
      <div class="w-full">
        <ButtonRemove />
      </div>
    </div>
    <div v-if="loading">
      <div>
        <LoadingPageload />
      </div>
    </div>
    <div v-else class="p-2">
      <slot />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios';
import {useCookie} from "#app";

const router = useRouter();
let nameuser = ref("");
const loading = ref(true);
const tokenCookie = useCookie("token");
definePageMeta({
  middleware: ["auth"],

});

const getSession = async () => {
  try {
    const token = tokenCookie.value;
    if (!token) {
      console.error("❌ Token not found in Cookie");
      return;
    }
    const response = await axios.get("auth/get_session", {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ ส่ง Token ไปกับ Headers
      },
      withCredentials: true, // ✅ ให้แน่ใจว่า Cookies ถูกส่งไป
    });
    console.log("✅ Session Data:", response.data);
    nameuser.value = response.data.user.name;
    loading.value = false;
  } catch (err) {
    console.error("❌ Error Fetching Session:", err);
  }
};

// api call logout
const logout = async () => {
  try {
    await $axios.post("/auth/logout");
    window.location.reload();
  } catch (err) {
    if (err.response?.status === 401) {
      console.error("Unauthorized access. Please login again.");
    } else {
      console.error("Logout failed:", err.message);
    }
  }
};


onMounted(() => {
  getSession();
});
</script>
<style scoped>
.font-noto {
  font-family: "Noto Sans Thai", sans-serif;
}
</style>
