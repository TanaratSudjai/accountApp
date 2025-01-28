<template>
  <div
    class="p-10 rounded-lg shadow-md w-[80%] flex justify-center items-center"
  >
    <form
      @submit.prevent="handleLogin"
      class="rounded-md w-full flex flex-col justify-center p-5"
    >
      <h2>สมัครใช้งาน</h2>

      <div class="mb-4">
        <label for="username" class="block text-gray-700 font-medium mb-2">
          ชื่อผู้ใช้
        </label>
        <input
          v-model="formData.account_user_username"
          id="username"
          type="text"
          placeholder="ชื่อผู้ใช้"
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
          placeholder="รหัสผ่าน"
          class="p-4 rounded-sm w-full border-2"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700 font-medium mb-2">
          ยืนยันรหัสผ่านอีกครั้ง
        </label>
        <input
          v-model="formData.account_user_confirmpassword"
          id="password"
          type="password"
          placeholder="ยืนยันรหัสผ่านอีกครั้ง"
          class="p-4 rounded-sm w-full border-2"
        />
      </div>

      <div v-if="error" class="text-red-500 mb-4">
        {{ error }}
      </div>

      <button
        type="submit"
        class="bg-cyan-600 text-white p-4 rounded hover:bg-cyan-700"
      >
        สมัครใช้งาน
      </button>
      <button
        @click="goLogin"
        class="text-cyan-600 px-4 py-2 rounded underline"
      >
        เข้าสู่ระบบ
      </button>
    </form>
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
  account_user_confirmpassword: "",
});

const handleLogin = async () => {
  if (loading.value) return;

  loading.value = true;
  error.value = "";

  try {
    if (
      formData.account_user_password === formData.account_user_confirmpassword
    ) {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          account_user_username: formData.account_user_username,
          account_user_password: formData.account_user_password,
        }
      );
      console.log(response.data.token);
      const token = response.data.token;
      localStorage.setItem("token", token);
      await router.push("/");
      
    } else {
      error.value = err.response?.data?.message || "Password is not confirm !";
    }
  } catch (err) {
    error.value = err.response?.data?.message || "Login failed. Try again.";
  } finally {
    loading.value = false;
  }
};

const goLogin = async () => {
  router.push("/");
};
</script>
