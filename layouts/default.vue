<template>
  <div class="flex flex-col font-noto bg-cyan-600 min-h-screen">
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row gap-2 justify-center items-center w-full z-50 p-3 bg-white shadow-md"
    >
      <!-- logo stars -->
      <div class="w-full">
        <div class="font-sans pb-2 text-gray-400">
          บัญชีของคุณ {{ nameuser }}
          <button @click="logout" class="text-blue-600 underline">
            ออกจากระบบ
          </button>
        </div>
      </div>
      <div class="w-full">
        <ButtonRemove />
      </div>
    </div>
    <div class="p-2">
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
let nameuser = ref("");
definePageMeta({
  middleware: ["auth"],
});

const getSession = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    "http://localhost:5000/api/auth/get_session",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  nameuser.value = response.data.data_user.account_user_name;
};

// api call logout
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
      // request body
      {
        headers: {
          Authorization: `Bearer ${token}`, // ส่ง token ใน header
        },
        withCredentials: true,
      }
    );
    // เคลียร์ข้อมูล authentication
    localStorage.removeItem("token");
    // เคลียร์ cookies (ถ้ามี) csr
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });
    await router.push("/");
    window.location.reload();
  } catch (err) {
    if (error.response?.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      console.error("Unauthorized access. Please login again.");
      // Optionally clear token
      localStorage.removeItem("token");
    }
    throw error;
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
