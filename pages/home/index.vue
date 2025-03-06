<template>
  <div class="min-h-screen font-noto ">
    <div class="container mx-auto px-4 py-8">
      <!-- Dashboard Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white text-center mb-2">Accounting Dashboard</h1>
        <div class="w-20 h-1 bg-white/30 mx-auto rounded-full"></div>
      </div>

      <!-- Menu Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        <NuxtLink
          v-for="(item, index) in menuItems"
          :key="index"
          :to="isDisabled(item.title) ? '#' : item.route"
          :class="[
            'relative group backdrop-blur-sm',
            isDisabled(item.title)
              ? 'opacity-60 cursor-not-allowed'
              : 'hover:scale-105 hover:shadow-2xl hover:shadow-cyan-900/30',
            'transition-all duration-300 ease-out'
          ]"
          @click="isDisabled(item.title) && $event.preventDefault()"
        >
          <div
            :class="[
              'rounded-2xl p-6',
              'bg-white/90 dark:bg-gray-800/90',
              'flex flex-col items-center justify-center',
              'min-h-[140px]',
              'border border-white/20',
              !isDisabled(item.title) && 'hover:bg-white dark:hover:bg-gray-800'
            ]"
          >
            <!-- Icon Container -->
            <div
              :class="[
                'rounded-xl p-3',
                'transition-transform duration-300 group-hover:scale-110',
                item.color || 'text-cyan-600 dark:text-cyan-400',
                'bg-cyan-50 dark:bg-cyan-900/30'
              ]"
            >
              <component :is="item.icon" class="w-8 h-8" />
            </div>

            <!-- Title -->
            <span 
              class="mt-4 text-sm font-medium text-gray-700 dark:text-gray-200 text-center"
            >
              {{ item.title }}
            </span>

            <!-- Status Indicator (if needed) -->
            <div
              v-if="item.status"
              :class="[
                'absolute -top-1 -right-1',
                'w-3 h-3 rounded-full',
                item.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
              ]"
            ></div>
          </div>
        </NuxtLink>
      </div>

      <!-- Quick Stats Section -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        <div class="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-600 dark:text-gray-300">Today's Balance</h3>
            <span class="text-cyan-600 dark:text-cyan-400">
              <component :is="'ChartLineIcon'" class="w-5 h-5" />
            </span>
          </div>
          <p class="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">$24,685.00</p>
          <p class="mt-1 text-sm text-green-600 dark:text-green-400">+2.45%</p>
        </div>

        <div class="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-600 dark:text-gray-300">Pending Transactions</h3>
            <span class="text-cyan-600 dark:text-cyan-400">
              <component :is="'ClockIcon'" class="w-5 h-5" />
            </span>
          </div>
          <p class="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">12</p>
          <p class="mt-1 text-sm text-yellow-600 dark:text-yellow-400">Needs attention</p>
        </div>

        <div class="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-600 dark:text-gray-300">Monthly Overview</h3>
            <span class="text-cyan-600 dark:text-cyan-400">
              <component :is="'CalendarIcon'" class="w-5 h-5" />
            </span>
          </div>
          <p class="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">+$52,145.00</p>
          <p class="mt-1 text-sm text-blue-600 dark:text-blue-400">View Report</p>
        </div>
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

// by of plungins
const { $axios } = useNuxtApp();

const fetchData = async () => {
  try {
    const response = await $axios.get("/transitions");
    checkData.value = response.data.res_transition;
  } catch (error) {
    console.log(error);
  }
};

const fetch_transition = async () => {
  try {
    if (!token) {
      throw new Error("Token missing!");
    }
    const res = await $axios.get("/transitions");
  } catch (err) {
    console.error(
      "Error fetching transitions:",
      err.response?.data || err.message
    );
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
