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
      <button @click="handleLogin" :disabled="isDisabled"
        :class="['bg-sky-600 text-white px-2 py-2 rounded-md hover:bg-sky-500 flex justify-center items-center', { 'opacity-50 cursor-not-allowed': isDisabled }]">
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
        <span v-else>{{ isDisabled ? "กรุณากรอกข้อมูล" : "เข้าสู่ระบบ" }}</span>
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
  pageTransition: { name: 'slide-right', mode: 'out-in' }
});

// import 
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAlert } from "~/composables/showAlert";

// resigter state
const { showAlert } = useAlert();
const { $api } = useApi();
const boxRef = ref(null);
const router = useRouter();
const loading = ref(false);


// state form
const formData = reactive({
  account_user_username: "",
  account_user_password: "",
});
// state form isDisabled
const isDisabled = computed(() => {
  return (
    !formData.account_user_username.trim() ||
    !formData.account_user_password.trim()
  )
})

// function method
const handleLogin = async () => {
  if (loading.value) return;
  loading.value = true;
  if (!formData.account_user_username.trim()) {
    loading.value = false;
    showAlert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ", "ไม่สามารถเว้นว่างได้ หรือกรอกข้อมูลไม่ถูกต้อง");
    return;
  }
  if (!formData.account_user_password.trim()) {
    loading.value = false;
    showAlert("กรุณากรอกรหัสผ่าน", "รหัสผ่านไม่สามารถเว้นว่างได้");
    return;
  }
  try {
    const response = await $api("/auth/login", {
      method: "POST",
      body: {
        account_user_username: formData.account_user_username,
        account_user_password: formData.account_user_password,
      },
    });
    if (!response.success) {
      showAlert("เกิดปัญหาในการเข้าสู่ระบบ", "กรุณาลองใหม่ในอีกอีกครั้ง");
    }
    
    // Debug cookie after login
    setTimeout(() => {
      monitorCookie('token', 2000); // Monitor every 2 seconds
    }, 100);
    
    await router.push("/home");
    window.location.reload();
  } catch (err) {
    console.error(err);
    const status = err?.status || err?.response?.status;
    if (status === 409) {
      showAlert("มีการพยายามเข้าสู่ระบบอย่างไม่ปลอดภัย", "กรุณาลองใหม่ในอีก 10 นาที");
    }
    else if (status === 404) {
      showAlert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ", "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
    else {
      const message = err?.data?.message || err?.response?.data?.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ";
      showAlert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ", "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  } finally {
    loading.value = false;
  }
};

// function class
const goRegister = async () => {
  router.push("/register");
};

// Monitor cookies on page load
onMounted(() => {
  if (process.client) {
    console.log('🚀 Login page loaded - starting cookie monitoring');
    monitorCookie('token', 3000); // Monitor every 3 seconds
  }
});
</script>
