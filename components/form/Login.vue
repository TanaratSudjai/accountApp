<template>
  <div
    ref="boxRef"
    class="box p-10 md:p-15 lg:p-20 xl:p-20 rounded-2xl  border-2 flex flex-col justify-center items-center bg-gray-800 bg-white"
  >
    <text class="text-4xl text-cyan-600 py-5">เข้าสู่ระบบ</text>
    <form
      @submit.prevent="handleLogin"
      class="rounded-md w-full flex flex-col justify-center"
    >
      <div class="mb-4">
        <label for="username" class="block text-black font-medium mb-2">
          ชื่อผู้ใช้
        </label>
        <input
          v-model="formData.account_user_username"
          id="username"
          type="text"
          placeholder="กรุณากรอกชื่อผู้ใช้"
          class="p-3 border rounded-md w-full border-cyan-600 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-black font-medium mb-2">
          รหัสผ่าน
        </label>
        <input
          v-model="formData.account_user_password"
          id="password"
          type="password"
          placeholder="กรุณากรอกรหัสผ่าน"
          class="p-3 border rounded-md w-full border-cyan-600 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
        />
      </div>

      <!-- <div v-if="error" class="text-red-500 mb-4">
        {{ error }}
      </div> -->

      <button
        @click="handleLogin"
        :disabled="loading"
        class="bg-cyan-700 text-white px-4 py-3 rounded-md hover:bg-cyan-600"
      >
        {{ loading ? "Logging in..." : "Login" }}
      </button>
    </form>
    <button
      @click="goRegister"
      class="text-white px-4 py-2 rounded flex gap-2 flex-col md:flex-row lg:flex-row xl:flex-row"
    >
      <span class="text-cyan-600">มีชื่อผู้ใช้หรือยัง</span>
      สมัครใช้งาน
    </button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { gsap } from "gsap";
const { $axios } = useNuxtApp();
const boxRef = ref(null);
const router = useRouter();
const loading = ref(false);
const error = ref("");

onMounted(() => {
  gsap.fromTo(
    boxRef.value,
    {
      y: 200, // Start from below
      opacity: 0,
      scale: 0.5, // Start smaller
    },
    {
      y: 0, // Animate to original position
      opacity: 1,
      scale: 1, // Return to full size
      duration: 1,
      ease: "elastic.out(1, 0.8)", // Bouncy easing
      delay: 0.2, // Slight delay for anticipation
    }
  );
});

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
    error.value =
      err.response?.data?.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ";
    showAlert("เข้าสู่ระบบล้มเหลว", "รหัสผ่านไม่ถูกต้อง");
  } finally {
    loading.value = false;
  }
};

const goRegister = async () => {
  router.push("/register");
};
</script>
