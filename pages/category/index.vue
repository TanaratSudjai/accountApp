<template>
  <BackComponents />
  <div class="flex-1 p-6  min-h-screen max-w-4xl mx-auto">
    <div class="mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-sky-600 mb-2">เมนูหลัก</h1>
        <p class="text-gray-600">เลือกเมนูที่คุณต้องการใช้งาน</p>
      </div>

      <!-- Menu Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <NuxtLink v-for="(item, index) in menuItems" :key="index" :to="item.route"
          class="relative bg-white p-5 rounded-md space-y-2 flex flex-col items-center justify-center transition-all duration-300  overflow-hidden group border border-gray-200">
          <!-- Icon container -->
          <div class="relative z-10  rounded-md  transition-all duration-300">
            <component :is="item.icon" :class="item.color"
              class="w-10 h-10 transition-all duration-300 group-hover:scale-105" />
          </div>

          <!-- Title -->
          <span
            class="relative z-10 text-lg font-semibold text-gray-700 group-hover:text-sky-500 transition-all duration-300 px-4 text-center leading-snug">
            {{ item.title }}
          </span>

          <!-- Subtle bottom accent line -->
          <div
            class="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-sky-400 to-sky-600 group-hover:w-16 transform -translate-x-1/2 transition-all duration-300 rounded-full">
          </div>
        </NuxtLink>
      </div>

      <!-- Optional bottom spacing -->
      <div class="mt-12 text-center">
        <p class="text-gray-500 text-sm">เลือกเมนูเพื่อเริ่มต้นการใช้งาน</p>
      </div>
    </div>
  </div>
</template>

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
  CircleDollarSign,
  Wallet,
  ArrowUpFromLine,
} from "lucide-vue-next";

const categoryData = ref([]);
const { $axios } = useNuxtApp();

const fetchCategory = async () => {
  const response = await $axios.get("/category");
  const data = await response.data;
  categoryData.value = data;
};

onMounted(async () => {
  await fetchCategory();
});

const menuItems = ref([
  {
    icon: Wallet,
    title: "สินทรัพย์",
    color: "text-sky-900",
    route: `/group/1`, // Replace with the appropriate account_category_id
  },
  {
    icon: Landmark,
    title: "ธนาคาร",
    color: "text-sky-900",
    route: "/group/7",
  },
  {
    icon: Users,
    title: "ลูกหนี้",
    color: "text-sky-900",
    route: "/group/6",
  },
  {
    icon: Grid2x2Plus,
    title: "หนี้สิน",
    color: "text-sky-900",
    route: "/group/2",
  },
  {
    icon: HandCoins,
    title: "รายได้",
    color: "text-sky-900",
    route: "/group/4",
  },
  {
    icon: CircleDollarSign,
    title: "ค่าใช้จ่าย",
    color: "text-sky-900",
    route: "/group/5",
  },


]);
</script>
