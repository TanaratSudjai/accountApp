<template>
  <div class="p-20  rounded-2xl shadow-lg  flex flex-col justify-center items-center bg-gray-800">
    <text class="text-4xl text-cyan-600 py-5">เข้าสู่ระบบ</text>
    <form @submit.prevent="handleLogin" class="rounded-md w-full flex flex-col justify-center ">
      <div class="mb-4">
        <label for="username" class="block text-white font-medium mb-2">
          ชื่อผู้ใช้
        </label>
        <input v-model="formData.account_user_username" id="username" type="text" placeholder="กรุณากรอกชื่อผู้ใช้"
          class="p-3 rounded-full w-full border-cyan-600 focus:border-cyan-600" />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-white font-medium mb-2">
          รหัสผ่าน
        </label>
        <input v-model="formData.account_user_password" id="password" type="password" placeholder="กรุณากรอกรหัสผ่าน"
          class="p-3 rounded-full w-full border-2" />
      </div>

      <!-- <div v-if="error" class="text-red-500 mb-4">
        {{ error }}
      </div> -->

      <button @click="handleLogin" :disabled="loading"
        class="bg-cyan-700 text-white px-4 py-3 rounded-full hover:bg-cyan-600">
        {{ loading ? "Logging in..." : "Login" }}
      </button>
    </form>
    <button @click="goRegister" class="text-white px-4 py-2 rounded">
      <span class="text-cyan-600">มีชื่อผู้ใช้หรือยัง</span>
      สมัครใช้งาน
    </button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const { $axios } = useNuxtApp();

const router = useRouter();
const loading = ref(false);
const error = ref("");

const formData = ref({
  account_user_username: "",
  account_user_password: "",
});
const showAlert = (title, text, icon = "error", confirmButtonColor = "#0891b2") => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: "ลองอีกครั้ง",
    confirmButtonColor,
  });
};

const handleLogin = async () => {
  if (loading.value) return;

  loading.value = true;
  error.value = "";

  // ตรวจสอบว่าผู้ใช้กรอกข้อมูลครบหรือไม่
  if (!formData.value.account_user_username.trim()) {
    showAlert("กรุณากรอกชื่อผู้ใช้", "ชื่อผู้ใช้ไม่สามารถเว้นว่างได้");
    loading.value = false;
    return;
  }

  if (!formData.value.account_user_password.trim()) {
    showAlert("กรุณากรอกรหัสผ่าน", "รหัสผ่านไม่สามารถเว้นว่างได้");
    loading.value = false;
    return;
  }

  try {
    const response = await $axios.post("/auth/login", {
      account_user_username: formData.value.account_user_username,
      account_user_password: formData.value.account_user_password,
    });

    const token = response.data.token;
    localStorage.setItem("token", token);
    await router.push("/home");
    window.location.reload();
  } catch (err) {
    error.value = err.response?.data?.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ";
    showAlert("เข้าสู่ระบบล้มเหลว", "รหัสผ่านไม่ถูกต้อง");
  } finally {
    loading.value = false;
  }
};


const goRegister = async () => {
  router.push("/register");
};
</script>
