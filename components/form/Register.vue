<template>
  <div ref="boxRegister"
    class="  p-2 px-4  rounded flex flex-col justify-center items-center border border-gray-200">
    <text class="text-xl text-cyan-600 py-1">สมัครใช้งานระบบ</text>
    <form @submit.prevent="handleLogin" class="rounded w-full flex flex-col gap-2 justify-center ">
      <div class="">
        <label for="username" class="block text-white font-medium ">
          ชื่อบัญชี
        </label>
        <input v-model="formData.account_user_name" id="name" type="text" placeholder="ชื่อผู้ใช้"
          class="p-2 rounded-md w-full border-2 focus:ring-2 focus:ring-cyan-600 focus:outline-none" />
      </div>

      <div class="">
        <label for="username" class="block text-white font-medium ">
          ชื่อผู้ใช้
        </label>
        <input v-model="formData.account_user_username" id="username" type="email" placeholder="ชื่อผู้ใช้"
          class="p-2 rounded-md w-full border-2 focus:ring-2 focus:ring-cyan-600 focus:outline-none" />
      </div>

      <div class="">
        <label for="password" class="block text-white font-medium ">
          รหัสผ่าน
        </label>
        <input v-model="formData.account_user_password" id="password" type="password" placeholder="รหัสผ่าน"
          class="p-2 rounded-md w-full border-2 focus:ring-2 focus:ring-cyan-600 focus:outline-none" />
      </div>
      <div class="">
        <label for="password" class="block text-white font-medium ">
          ยืนยันรหัสผ่านอีกครั้ง
        </label>
        <input v-model="formData.account_user_confirmpassword" id="password" type="password"
          placeholder="ยืนยันรหัสผ่านอีกครั้ง" class="p-2 rounded-md w-full border-2 focus:ring-2 focus:ring-cyan-600 focus:outline-none" />
      </div>

      <button type="submit" class="bg-cyan-600 text-white p-2 rounded-md hover:bg-cyan-700">
        สมัครใช้งาน
      </button>
    </form>
    <button @click="goLogin" class="text-cyan-600 px-4 py-2 rounded ">
      เข้าสู่ระบบ
    </button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { gsap } from 'gsap'
const boxRegister = ref(null)
onMounted(() => {
  gsap.fromTo(
    boxRegister.value,
    {
      y: 200,  // Start from below
      opacity: 0,
      scale: 0.5  // Start smaller
    },
    {
      y: 0,  // Animate to original position
      opacity: 1,
      scale: 1,  // Return to full size
      duration: 1,
      ease: 'elastic.out(1, 0.8)',  // Bouncy easing
      delay: 0.2  // Slight delay for anticipation
    }
  )
})



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
  } finally {
    loading.value = false;
  }
};

const goLogin = () => {
  router.push("/");
};
</script>
