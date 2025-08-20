<template>
  <div class="container mx-auto max-w-7xl" v-if="$route.path !== '/home'">
    <div class="flex items-center justify-between gap-2">
      <NuxtImg @click="$router.go(-1)" src="./back.svg" class="w-5 h-5 cursor-pointer text-black" />
      <span :class="['text-xs md:text-md lg:text-lg font-semibold ', countdown > 5 ? 'text-sky-600' : 'text-red-600']">(
        {{ countdown }} วัน เเจ้งปิดบัญชี )</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const countdown = ref(0);
function calculateDaysLeftInMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // หาวันแรกของเดือนถัดไป
  const firstDayNextMonth = new Date(year, month + 1, 1);

  // หาวันสุดท้ายของเดือนนี้ (ลบ 1 วันจากวันแรกของเดือนถัดไป)
  const lastDayThisMonth = new Date(firstDayNextMonth - 1);

  // หาวันที่ปัจจุบัน
  const currentDate = new Date();

  // คำนวนจำนวนวันที่เหลือ (ลบวันปัจจุบันออกจากวันสุดท้าย)
  const diffTime = lastDayThisMonth - currentDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  countdown.value = diffDays >= 0 ? diffDays : 0; // ป้องกันค่าติดลบ
}
onMounted(() => {
  calculateDaysLeftInMonth();
});
</script>
