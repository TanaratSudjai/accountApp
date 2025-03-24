<template>
  <div
    class="p-12 sm:p-12 md:p-20 lg:p-20  rounded-2xl shadow-lg  flex flex-col justify-center items-center bg-gray-800">
    <text class="text-4xl text-cyan-600 py-1">สมัครใช้งานระบบ</text>
    <form @submit.prevent="handleLogin" class="rounded-md w-full flex flex-col justify-center bg">
      <div class="mb-4">
        <label for="username" class="block text-white font-medium mb-2">
          ชื่อบัญชี
        </label>
        <input v-model="formData.account_user_name" id="name" type="text" placeholder="ชื่อผู้ใช้"
          class="p-3 rounded-full w-full border-2" />
      </div>

      <div class="mb-4">
        <label for="username" class="block text-white font-medium mb-2">
          ชื่อผู้ใช้
        </label>
        <input v-model="formData.account_user_username" id="username" type="email" placeholder="ชื่อผู้ใช้"
          class="p-3 rounded-full w-full border-2" />
      </div>

      <div class="mb-4">
        <label for="password" class="block text-white font-medium mb-2">
          รหัสผ่าน
        </label>
        <input v-model="formData.account_user_password" id="password" type="password" placeholder="รหัสผ่าน"
          class="p-3 rounded-full w-full border-2" />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-white font-medium mb-2">
          ยืนยันรหัสผ่านอีกครั้ง
        </label>
        <input v-model="formData.account_user_confirmpassword" id="password" type="password"
          placeholder="ยืนยันรหัสผ่านอีกครั้ง" class="p-3 rounded-full w-full border-2" />
      </div>

      <div v-if="error" class="text-red-500 mb-4">
        {{ error }}
      </div>

      <button type="submit" class="bg-cyan-600 text-white p-3 rounded-full hover:bg-cyan-700">
        สมัครใช้งาน
      </button>
      <button @click="goLogin" class="text-cyan-600 px-4 py-2 rounded ">
        เข้าสู่ระบบ
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const { $axios } = useNuxtApp();
const loading = ref(false);
const error = ref("");
const router = useRouter();
const formData = reactive({
  account_user_name: "",
  account_user_username: "",
  account_user_password: "",
  account_user_confirmpassword: "",
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

  try {
    if (
      formData.account_user_password === formData.account_user_confirmpassword
    ) {
      const response = await $axios.post("/auth/register", {
        account_user_name: formData.account_user_name,
        account_user_username: formData.account_user_username,
        account_user_password: formData.account_user_password,
      });
      showAlert("สมัครสำเร็จ!", "คุณสามารถเข้าสู่ระบบได้ทันที", "success");

      await router.push("/");
    } else {
      // ❌ แจ้งเตือนเมื่อรหัสผ่านไม่ตรงกัน
      showAlert("เกิดข้อผิดพลาด!", "รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
    }
  } catch (err) {
    // ❌ แจ้งเตือนเมื่อเกิดข้อผิดพลาด
    showAlert("สมัครไม่สำเร็จ!", "กรุณาลองใหม่อีกครั้ง");
  } finally {
    loading.value = false;
  }
};

const goLogin = () => {
  router.push("/");
};
</script>
