<template>
  <div class="flex flex-col font-noto bg-cyan-600 min-h-screen">
    <!-- Header -->
    <div
      class="flex flex-wrap justify-center items-center fixed top-0 left-0 w-full z-50 p-3 bg-white shadow-md"
    >
      <!-- logo stars -->
      <div class="w-[98%] md:w-[28%] lg:w-[28%]">
        <div class="font-sans pb-2 text-gray-400">
          ACCOUNT APPLICATION
          <button @click="logout" class="text-blue-600 underline">
            ออกจากระบบ
          </button>
        </div>
      </div>
      <div class="w-[98%] md:w-[28%] lg:w-[28%]">
        <ButtonRemove />
      </div>
    </div>

    <div class="p-2 pt-[65px]">
      <slot />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
const router = useRouter();
const error = ref("");

definePageMeta({
  middleware: ['auth']
})


const logout = async () => {
  try {
    // ดึง token จาก localStorage
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (!token) {
      throw new Error("No token found");
    }
    // ส่ง request พร้อม token ใน header
    await axios.post(
      "http://localhost:5000/api/auth/logout",
      {}, // request body
      {
        headers: {
          Authorization: `Bearer ${token}`, // ส่ง token ใน header
        },
        withCredentials: true,
      }
    );
    // เคลียร์ข้อมูล authentication
    localStorage.removeItem("token");
    // เคลียร์ cookies (ถ้ามี)
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });
    await router.push("/");
  } catch (err) {
    console.error("Logout error:", err);
    error.value = err.response?.data?.message || "Logout failed. Try again.";
    // ถ้าเป็น error 401 อาจจะ force logout
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      await router.push("/login");
    }
  }
};
</script>
<style scoped>
.font-noto {
  font-family: "Noto Sans Thai", sans-serif;
}
</style>
