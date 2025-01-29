<template>
  <div
    class="p-10 rounded-lg shadow-md w-[80%] flex flex-col justify-center items-center"
  >
    <form
      @submit.prevent="handleLogin"
      class="rounded-md w-full flex flex-col justify-center p-5"
    >
      <h2>เข้าสู่ระบบ</h2>

      <div class="mb-4">
        <label for="username" class="block text-gray-700 font-medium mb-2">
          ชื่อผู้ใช้
        </label>
        <input
          v-model="formData.account_user_username"
          id="username"
          type="text"
          placeholder="กรุณากรอกชื่อผู้ใช้"
          class="p-4 rounded-sm w-full border-2"
        />
      </div>

      <div class="mb-4">
        <label for="password" class="block text-gray-700 font-medium mb-2">
          รหัสผ่าน
        </label>
        <input
          v-model="formData.account_user_password"
          id="password"
          type="password"
          placeholder="กรุณากรอกรหัสผ่าน"
          class="p-4 rounded-sm w-full border-2"
        />
      </div>

      <div v-if="error" class="text-red-500 mb-4">
        {{ error }}
      </div>

      <button type="submit" class="bg-cyan-600 text-white px-4 py-2 rounded">
        เข้าสู่ระบบ
      </button>
    </form>
    <button
      @click="goRegister"
      class="text-cyan-600 px-4 py-2 rounded underline"
    >
      สมัครใช้งาน
    </button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const loading = ref(false);
const error = ref("");

const formData = reactive({
  account_user_username: "",
  account_user_password: "",
});
const handleLogin = async () => {
  if (loading.value) return;

  loading.value = true;
  error.value = "";

  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        account_user_username: formData.account_user_username,
        account_user_password: formData.account_user_password,
      },
      {
        withCredentials: true, // สำคัญ: backend ต้องรองรับ cookies
      }
    );

    const token = response.data.token;

    // เก็บ token ทั้งใน localStorage และ cookie
    localStorage.setItem("token", token);

    const tokenCookie = useCookie("token", {
      maxAge: 7 * 24 * 60 * 60, // อายุ 7 วัน
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    tokenCookie.value = token;

    // Redirect หลังจาก login สำเร็จ
    await router.push("/home");
    window.location.reload();
  } catch (err) {
    error.value = err.response?.data?.message || "Login failed. Try again.";
  } finally {
    loading.value = false;
  }
};

const goRegister = async () => {
  router.push("/register");
};
</script>
