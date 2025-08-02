<template>
  <div class="flex gap-1 p-1 ">
    <button class="w-full">
      <div class="">
        <div class="flex flex-col items-end justify-start">
          <div class="text-sm text-green-500 font-medium">รายได้ทั้งหมด</div>
          <div class="text-sm md:text-lg lg:text-xl font-bold text-green-500">
            ฿{{ formatNumber(sumvalue_extend) }}
          </div>
        </div>
      </div>
    </button>
  </div>
</template>

<script setup>
const { formatNumber } = useFormatNumber(); // นำเข้า composable สำหรับการจัดรูปแบบตัวเลข
const error = ref(null); // สำหรับจัดการข้อผิดพลาด
const transition = ref([]);
const { $axios } = useNuxtApp();

let interval;
// ฟังก์ชันดึงข้อมูลการเปลี่ยนแปลง
const fetchTransitions = async () => {
  try {
    const data = await $axios.get("/get_income_transition");
    transition.value = data.data;
  } catch (err) {
    error.value = "Error fetching transitions: " + err.message; // ตั้งค่า error
  }
};
onMounted(() => {
  interval = setInterval(fetchTransitions, 1000);
  fetchTransitions(); // เรียกครั้งแรกทันทีที่โหลด
});

// ล้าง interval เมื่อ Component ถูกทำลาย
onBeforeUnmount(() => {
  clearInterval(interval);
});

// คำนวณรายจ่ายทั้งหมด
const sumvalue_extend = computed(() => {
  return transition.value
    .filter((item) => item.account_category_id === 4)
    .reduce((total, item) => {
      const value = parseFloat(item.account_transition_value);
      return total + (isNaN(value) ? 0 : value);
    }, 0)
    .toFixed(2);
});
</script>
