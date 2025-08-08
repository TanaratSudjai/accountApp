<template>
  <div ref="boxRef"
    class="border border-gray-100 p-8 rounded-xl flex flex-col justify-center items-center w-full h-full">
    <div class="my-3 flex flex-col justify-center items-center gap-4">
      <NuxtImg src="./logo.png" alt="" width="80" />
      <text class="text-xl text-sky-600 py-1">เข้าสู่ระบบ</text>
    </div>
    <form @submit.prevent="handleLogin" class="rounded-md w-full flex flex-col justify-center">
      <div class="mb-4">
        <label for="username" class="block text-sky-600 font-medium mb-2">
          ชื่อผู้ใช้
        </label>
        <input v-model="formData.account_user_username" id="username" type="text" placeholder="กรุณากรอกชื่อผู้ใช้"
          class="p-2 border rounded-md w-full border-sky-600 focus:ring-2 focus:ring-sky-600 focus:outline-none" />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sky-600 font-medium mb-2">
          รหัสผ่าน
        </label>
        <input v-model="formData.account_user_password" id="password" type="password" placeholder="กรุณากรอกรหัสผ่าน"
          class="p-2 border rounded-md w-full border-sky-600 focus:ring-2 focus:ring-sky-600 focus:outline-none" />
      </div>
      <!-- <div v-if="error" class="text-red-500 mb-4">
        {{ error }}
      </div> -->
      <button @click="handleLogin" :disabled="loading"
        class="bg-sky-600 text-white px-2 py-2 rounded-md hover:bg-sky-500">
        {{ loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ" }}
      </button>
    </form>
    <button @click="goRegister"
      class="text-black px-4 py-2 rounded flex gap-2 flex-col md:flex-row lg:flex-row xl:flex-row ">
      <span class="text-black ">มีชื่อผู้ใช้หรือยัง ? <span class="text-sky-600">สมัครใช้งาน</span></span>
    </button>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "login",
});
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const { $axios } = useNuxtApp();
const boxRef = ref(null);
const router = useRouter();
const loading = ref(false);
const error = ref("");

const formData = ref({
  account_user_username: "",
  account_user_password: "",
});

const showAlert = (
  title,
  text,
  icon = "error",
  confirmButtonColor = "#0891b2"
) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: "ลองอีกครั้ง",
    confirmButtonColor,
    customClass: {
      popup: "bg-white text-gt-gray-600 rounded-md shadow-md",
      title: "text-lg font-normal",
      content: "text-sm",
      confirmButton: "px-2 py-2 rounded-md",
    },
  });
};

const handleLogin = async () => {
  if (loading.value) return;

  loading.value = true;
  error.value = "";

  // ตรวจสอบว่าผู้ใช้กรอกข้อมูลครบหรือไม่
  if (!formData.value.account_user_username.trim()) {
    showAlert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณากรอกชื่อผู้ใช้", "ไม่สามารถเว้นว่างได้ หรือกรอกข้อมูลไม่ถูกต้อง");
    loading.value = false;
    return;
  }

  if (!formData.value.account_user_password.trim()) {
    showAlert("กรุณากรอกรหัสผ่าน", "รหัสผ่านไม่สามารถเว้นว่างได้");
    loading.value = false;
    return;
  }
  console.log(formData.value);

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
    error.value =
      err.response?.data?.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ";
    showAlert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ", "ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง");
  } finally {
    loading.value = false;
  }
};

const goRegister = async () => {
  router.push("/register");
};
</script>
