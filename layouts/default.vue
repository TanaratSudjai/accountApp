<template>

  <div class="flex flex-col font-noto bg-cyan-600 min-h-screen">
    <!-- Header -->

    <div class="flex flex-col md:flex-row gap-2 justify-center items-center w-full z-50 p-3 bg-white shadow-md">
      <!-- logo stars -->
      <div class="w-full">
        <div class="font-sans pb-2 text-gray-400">
          บัญชีของคุณ {{ nameuser }}
          <button @click="logout" class="text-blue-600 underline">
            ออกจากระบบ
          </button>
        </div>
      </div>
      <div class="w-full">
        <ButtonRemove />
      </div>
    </div>
    <div v-if="loading">
      <div>
        <LoadingPageload />
      </div>
    </div>
    <div v-else class="p-2">
      <slot />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const { $axios } = useNuxtApp();
const router = useRouter();
let nameuser = ref("");
const loading = ref(true);
definePageMeta({
  middleware: ["auth"],

});

const getSession = async () => {

  try {

    const response = await $axios.get(
      "auth/get_session",
    );
    nameuser.value = response.data.data_user.account_user_name;
    loading.value = false;
  } catch (err) {
    console.log(err);

  }
};

// api call logout
const logout = async () => {
  try {
    if (!token) {
      throw new Error("No token found");
    }
    await $axios.post("/auth/logout");
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    await router.push("/");
    window.location.reload();
  } catch (err) {
    if (err.response?.status === 401) {
      console.error("Unauthorized access. Please login again.");
    } else {
      console.error("Logout failed:", err.message);
    }
  }
};


onMounted(() => {
  getSession();
});
</script>
<style scoped>
.font-noto {
  font-family: "Noto Sans Thai", sans-serif;
}
</style>
