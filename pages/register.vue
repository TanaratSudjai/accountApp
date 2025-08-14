<template>
  <div class="p-2 px-12  rounded-xl flex flex-col justify-center items-center">
    <div class="my-3 flex flex-col justify-center items-center gap-4">
      <NuxtImg src="./logo.png" alt="" width="80" />
      <text class="text-xl text-sky-600 py-1">สมัครใช้งานระบบ</text>
    </div>
    <form @submit.prevent="handleRegister" class="rounded w-full flex flex-col gap-2 justify-center ">
      <div class="">
        <label for="username" class="block text-sky-600 font-medium ">
          ชื่อบัญชี <span class="text-red-400">{{ error }}</span>
        </label>
        <input v-model="formData.account_user_name" id="name" type="text" placeholder="ชื่อบัญชี"
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
        <input v-model="formData.account_user_password" id="account_user_password" type="password"
          placeholder="รหัสผ่าน"
          class="p-2 rounded-lg w-full border-sky-600 focus:ring-2 focus:ring-sky-600 focus:outline-none border" />
      </div>
      <div class="">
        <label for="password" class="block text-sky-600 font-medium ">
          ยืนยันรหัสผ่านอีกครั้ง
        </label>
        <input v-model="formData.account_user_confirmpassword" id="account_user_confirmpassword" type="password"
          placeholder="ยืนยันรหัสผ่านอีกครั้ง"
          class="p-2 rounded-lg w-full  border-sky-600 focus:ring-2 focus:ring-sky-600 focus:outline-none border" />
      </div>

      <button :disabled="isDisabled" :class="[
        'bg-sky-600 text-white p-2 rounded-lg hover:bg-sky-600 transition flex justify-center items-center',
        { 'opacity-50 cursor-not-allowed': isDisabled }
      ]" type="submit">
        <span v-if="loading">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g>
              <circle cx="3" cy="12" r="2" fill="currentColor" />
              <circle cx="21" cy="12" r="2" fill="currentColor" />
              <circle cx="12" cy="21" r="2" fill="currentColor" />
              <circle cx="12" cy="3" r="2" fill="currentColor" />
              <circle cx="5.64" cy="5.64" r="2" fill="currentColor" />
              <circle cx="18.36" cy="18.36" r="2" fill="currentColor" />
              <circle cx="5.64" cy="18.36" r="2" fill="currentColor" />
              <circle cx="18.36" cy="5.64" r="2" fill="currentColor" />
              <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate"
                values="0 12 12;360 12 12" />
            </g>
          </svg>
        </span>
        <span v-else>{{ isDisabled ? "กรุณากรอกข้อมูลให้ครบก่อน" : "สมัครสมาชิก" }}</span>
      </button>
    </form>
    <button @click="goLogin" class="text-sky-600 px-3 py-2 rounded ">
      <span class="text-gray-600">มีชื่อผู้ใช้อยู่เเล้ว</span> เข้าสู่ระบบ
    </button>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "login",
  pageTransition: { name: 'slide-right', mode: 'out-in' }
});

// import
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAlert } from "~/composables/showAlert";


// register state 
const { $api } = useNuxtApp()
const { showAlert } = useAlert();
const loading = ref(false);
const error = ref("");
const router = useRouter();


// state form
import { computed } from "vue";

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
    !formData.account_user_confirmpassword ||
    formData.account_user_name.length <= 2
  );
});

watch(
  () => formData.account_user_name,
  (newVal) => {
    const len = newVal.length;
    if (len > 0 && len < 2) {
      error.value = "ขนาดชื่อบัญชีสั้นเกินไป";
    } else if (len >= 2 && len <= 5) {
      error.value = "ขนาดชื่อบัญชีปานกลาง";
    } else if (len > 5 && len <= 8) {
      error.value = "ขนาดชื่อบัญชีใช้ได้เเนะนำ";
    } else if (len > 12) {
      error.value = "ขนาดชื่อบัญชียาวเกินไป";
    } else {
      error.value = "";
    }
  }
);



// function method
const handleRegister = async () => {
  loading.value = true;
  error.value = "";
  const { account_user_name, account_user_username, account_user_password, account_user_confirmpassword } = formData;
  try {

    if (account_user_password !== account_user_confirmpassword) {
      showAlert("เกิดข้อผิดพลาดในการสมัครสมาชิก", "รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

     await $axios.post("/auth/register", {
        account_user_name,
        account_user_username,
        account_user_password,
      });
    showAlert("สมัครสำเร็จ!", "คุณสามารถเข้าสู่ระบบได้ทันที");
    await router.push("/");
  } catch (err) {
    if (err.response && (err.response.status === 400 || err.response.status === 500)) {
      showAlert("เกิดข้อผิดพลาด", "ชื่อผู้ใช้หรืออีเมลนี้ถูกใช้งานแล้ว");
      return;
    }
    console.error(err);
  } finally {
    loading.value = false;
  }
};


// function class
const goLogin = () => {
  router.push("/");
};
</script>
