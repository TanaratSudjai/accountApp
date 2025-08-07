<template>
  <div class="flex gap-1">
    <button class="w-full">
      <div class="rounded-md p-2">
        <div class="flex flex-col items-end justify-start">
          <div class="text-sm text-red-500 font-medium">รายจ่ายทั้งหมด</div>
          <div class="text-sm md:text-lg lg:text-xl font-bold text-red-500">
            ฿{{ formatNumber(sumvalue_extend) }}
          </div>
        </div>
      </div>
    </button>
  </div>
</template>

<script setup>
const { formatNumber } = useFormatNumber(); // นำเข้า composable สำหรับการจัดรูปแบบตัวเลข
import { storeToRefs } from "pinia";
import { useExpenseTransitionStore } from "~/stores/expenseTransition";
const store = useExpenseTransitionStore();
const { transition } = storeToRefs(store);

// คำนวณรายจ่ายทั้งหมด
const sumvalue_extend = computed(() => {
  return transition.value
    .filter((item) => item.account_category_id === 5)
    .reduce((total, item) => {
      const value = parseFloat(item.account_transition_value);
      return total + (isNaN(value) ? 0 : value);
    }, 0)
    .toFixed(2);
});

</script>
