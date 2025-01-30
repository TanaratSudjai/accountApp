<template>
  <div class="flex gap-1 p-2 mx-2">
    <button class="w-full">
      <div
        class="rounded-lg bg-gradient-to-br from-green-50 to-green-100 shadow-md p-2"
      >
        <div class="flex items-center justify-between">
          <div class="space-y-2">
            <div class="text-sm text-green-700 font-medium">รายได้ทั้งหมด</div>
            <div class="text-2xl font-bold text-green-800">
              ฿{{ sumvalue_extend }}
            </div>
          </div>
        </div>
      </div>
    </button>
  </div>
</template>

<script setup>
const error = ref(null); // สำหรับจัดการข้อผิดพลาด
const transition = ref([]);

let interval;
// ฟังก์ชันดึงข้อมูลการเปลี่ยนแปลง
const fetchTransitions = async () => {
  try {
    transition.value = await $fetch(
      "/get_income_transition"
    );
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
