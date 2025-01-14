<template>
  <div class="flex flex-col bg-gray-50 font-noto">
    <!-- Header -->
    <div class="w-full p-6 bg-white/80 backdrop-blur">
      <h1 class="text-3xl font-bold text-center text-gray-800">Welcome!</h1>
    </div>

    <!-- Grid Container -->
    <div class="flex-1 p-6">
      <div
        class="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-4xl mx-auto mb-12"
      >
        <NuxtLink
          v-for="(item, index) in menuItems"
          :key="index"
          :to="isDisabled(item.title) ? '#' : item.route"
          :class="[
            'rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition-shadow truncate h-[160px]',
            isDisabled(item.title)
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:shadow-lg',
            item.bg || 'bg-white',
            item.text || 'text-gray-800',
          ]"
          @click="isDisabled(item.title) && $event.preventDefault()"
        >
          <div :class="item.color">
            <component :is="item.icon" class="w-12 h-12" />
          </div>
          <span class="mt-2 text-md font-medium">{{ item.title }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-noto {
  font-family: "Noto Sans Thai", sans-serif;
}
</style>

<script setup>
import { ref, onMounted } from "vue";
import {
  ArrowLeft,
  Key,
  Store,
  Book,
  Users,
  User,
  Clock,
  Building,
  FolderOpen,
  FilePlus,
  FileMinus,
  BarChart2,
  Landmark,
  HandCoins,
  ChartNoAxesCombined,
  Grid2x2Plus,
  ArrowUpFromLine,
} from "lucide-vue-next";

const checkData = ref([]);
const fetchData = async () => {
  try {
    const res = await fetch("https://api-accountapp.onrender.com/api/transitions");
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    checkData.value = data.res_transition;
  } catch (error) {
    console.error("Error fetching transition:", error);
  }
};

onMounted(async () => {
  await fetchData();
});

const menuItems = [
  {
    icon: FolderOpen,
    title: "จัดการหมวดหมู่",
    color: "text-gray-500",
    route: "/category",
    bg: "bg-white",
    text: "text-gray-800",
  },
  {
    icon: Grid2x2Plus,
    title: "เปิดบัญชี",
    color: "text-green-400",
    route: "/transection",
  },
  {
    icon: ArrowUpFromLine,
    title: "บันทึกรายการค่าใช้จ่าย",
    color: "text-red-500",
    route: "/transection_expense",
  },
  {
    icon: HandCoins,
    title: "บันทึกรายการรายได้",
    color: "text-green-400",
    route: "/transection_income",
  },
  {
    icon: Landmark,
    title: "ธนาคาร",
    color: "text-green-500",
    route: "/transitionbank",
  },
  {
    icon: Users,
    title: "ลูกหนี้",
    color: "text-yellow-500",
    route: "/debtors",
  },

  {
    icon: ChartNoAxesCombined,
    title: "สรุป",
    color: "text-gray-400",
    route: "/dasktop",
  },
  {
    icon: Clock,
    title: "บันทึกรายการทั่วไป",
    color: "text-gray-400",
    route: "/dashboard_submit_transition",
  },
  {
    icon: Users,
    title: "เจ้าหนี้",
    color: "text-purple-500",
    route: "/creditors",
  },
];

// Function to check if certain items should be disabled
const isDisabled = (title) => {
  if (!title) return true;

  const disableTitles = [
    "บันทึกรายการค่าใช้จ่าย",
    "บันทึกรายการรายได้",
    "ลูกหนี้",
    "เจ้าหนี้",
    "ธนาคาร",
  ];
  return (
    disableTitles.includes(title) &&
    (!checkData.value.length ||
      !checkData.value[0].account_type_sum ||
      parseFloat(checkData.value[0].account_type_sum) <= 0)
  );
};
</script>
