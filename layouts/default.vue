<template>
  <div class="flex flex-col font-noto bg-white min-h-screen">
    <div class="flex flex md:flex-row gap-2 justify-between items-center w-full  p-2 bg-white border border-gray-200">
      <div
        class="font-noto text-black flex justify-between items-center text-xs md:text-sm lg:text-base bg-white w-full">
        <div class="flex justify-center items-center gap-2">
          <NuxtImg src="/logo.png" width="40" height="40" class="" alt="Logo" />
          <div class="">
            บัญชีของคุณ
            <span class="font-bold">{{ loading ? "กําลังโหลด" : nameuser || "ไม่มีชื่อผู้ใช้" }}</span>
          </div>
        </div>
        <button @click="logout"
          class="text-white text-xs md:text-sm lg:text-base underline-none bg-sky-600 px-2 py-1 text-md rounded hover:bg-sky-400 transition-all duration-200">
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
          <span v-else>ออกจากระบบ</span>
        </button>
      </div>
    </div>
    <div v-if="loading">
      <div class="min-h-screen flex items-center justify-center">
        <LoadingPageload />
      </div>
    </div>
    <div v-else class="p-2 mb-12">
      <slot />
      <NavbarComponents />
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: ["auth"],
});
// import
import { useSession } from "~/composables/useSession";
import { useAlert } from "#imports";
// composables state
const { loading, nameuser, getSession } = useSession();
const { $axios } = useNuxtApp();
const { showAlert } = useAlert();

// api call logout
const logout = async () => {
  try {
    loading.value = true;
    await $axios.post("/auth/logout");
    showAlert("ออกจากระบบเรียบร้อยแล้ว", "คุณได้ออกจากระบบเรียบร้อยแล้ว", "success");
    navigateTo("/");
  } catch (err) {
    if (err.status === 401) {
      console.error("Unauthorized access. Please login again.");
    } else {
      console.error("Logout failed:", err.message);
    }
  }
};
// api call getSession
onMounted(() => {
  getSession();
});
</script>
<style>
.font-noto {
  font-family: "Noto Sans Thai", sans-serif;
}

/* Page Transition Styles - Optimized for data loading */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(15px) scale(0.98);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-15px) scale(1.02);
}

/* Ensure content is visible during transition */
.page-enter-active *,
.page-leave-active * {
  pointer-events: none;
}

.page-enter-to * {
  pointer-events: auto;
}

/* Slide Right Transition - Optimized */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.25s ease-in-out;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Slide Left Transition */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Fade Scale Transition */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.5s ease;
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

/* Zoom Transition */
.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.zoom-enter-from {
  opacity: 0;
  transform: scale(0.8) rotate(-5deg);
}

.zoom-leave-to {
  opacity: 0;
  transform: scale(1.2) rotate(5deg);
}

/* Bounce Transition */
.bounce-enter-active {
  animation: bounce-in 0.6s;
}

.bounce-leave-active {
  animation: bounce-out 0.4s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }

  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }

  70% {
    transform: scale(0.9);
    opacity: 0.9;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    transform: scale(0.3);
    opacity: 0;
  }
}

/* Flip Transition */
.flip-enter-active,
.flip-leave-active {
  transition: all 0.5s ease;
}

.flip-enter-from {
  opacity: 0;
  transform: rotateY(-90deg) scale(0.9);
}

.flip-leave-to {
  opacity: 0;
  transform: rotateY(90deg) scale(0.9);
}
</style>