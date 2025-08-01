<template>
  <div ref="boxRegister"
    class="  p-2 px-12  rounded-xl flex flex-col justify-center items-center border border-gray-200">
    <div class="my-3 flex flex-col justify-center items-center gap-4">
      <NuxtImg src="./logo.png" alt="" width="80" />
      <text class="text-xl text-sky-600 py-1">สมัครใช้งานระบบ</text>
    </div>
    <form @submit.prevent="handleLogin" class="rounded w-full flex flex-col gap-2 justify-center ">
      <div class="">
        <label for="username" class="block text-sky-600 font-medium ">
          ชื่อบัญชี
        </label>
        <input v-model="formData.account_user_name" id="name" type="text" placeholder="ชื่อผู้ใช้"
          class="p-2 rounded-lg w-full border-sky-600 focus:ring-2 focus:ring-sky-600 focus:outline-none border" />
      </div>

      <div class="">
        <label for="username" class="block text-sky-600 font-medium ">
          ชื่อผู้ใช้
        </label>
        <input v-model="formData.account_user_username" id="username" type="email" placeholder="ชื่อผู้ใช้"
          class="p-2 rounded-lg w-full border-sky-600 focus:ring-2 focus:ring-sky-600 focus:outline-none border" />
      </div>

      <div class="">
        <label for="password" class="block text-sky-600 font-medium ">
          รหัสผ่าน
        </label>
        <input v-model="formData.account_user_password" id="password" type="password" placeholder="รหัสผ่าน"
          class="p-2 rounded-lg w-full border-sky-600 focus:ring-2 focus:ring-sky-600 focus:outline-none border" />
      </div>
      <div class="">
        <label for="password" class="block text-sky-600 font-medium ">
          ยืนยันรหัสผ่านอีกครั้ง
        </label>
        <input v-model="formData.account_user_confirmpassword" id="password" type="password"
          placeholder="ยืนยันรหัสผ่านอีกครั้ง"
          class="p-2 rounded-lg w-full  border-sky-600 focus:ring-2 focus:ring-sky-600 focus:outline-none border" />
      </div>

      <button :disabled="isDisabled" :class="[
        'bg-sky-600 text-white p-2 rounded-lg hover:bg-sky-600 transition',
        { 'opacity-50 cursor-not-allowed': isDisabled }
      ]" type="submit">
        สมัครใช้งาน
      </button>
    </form>
    <button @click="goLogin" class="text-sky-600 px-3 py-2 rounded ">
      <span class="text-gray-600">มีชื่อผู้ใช้อยู่เเล้ว</span> เข้าสู่ระบบ
    </button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { gsap } from 'gsap'
const boxRegister = ref(null)



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


const isDisabled = computed(() => {
  return (
    !formData.account_user_name ||
    !formData.account_user_username ||
    !formData.account_user_password ||
    !formData.account_user_confirmpassword
  );
});



const showAlert = (title, text, icon = "error", confirmButtonColor = "#0891b2") => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: "เข้าสู่ระบบ",
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

  const { account_user_name, account_user_username, account_user_password, account_user_confirmpassword } = formData;

  try {
    if (account_user_password !== account_user_confirmpassword) {
      showAlert("เกิดข้อผิดพลาดในการสมัครสมาชิก กรุณาลองอีกครั้ง", "รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    await $axios.post("/auth/register", {
      account_user_name,
      account_user_username,
      account_user_password,
    });

    showAlert("สมัครสำเร็จ!", "คุณสามารถเข้าสู่ระบบได้ทันที", "success",);
    await router.push("/");
  } catch (err) {
    if (err.response && err.response.status === 400) {
      showAlert("เกิดข้อผิดพลาดในการสมัครสมาชิก", "ชื่อผู้ใช้หรืออีเมลนี้ถูกใช้งานแล้ว");
      return;
    }
    showAlert("เกิดข้อผิดพลาด!", "ไม่สามารถสมัครใช้งานได้");
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const goLogin = () => {
  router.push("/");
};
</script>
