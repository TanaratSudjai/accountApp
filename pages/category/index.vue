<template>
  <client-only>
    <BackComponentsForTypeForm1 />
  </client-only>
  <div class="flex-1 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
    <div class="max-w-6xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">เมนูหลัก</h1>
        <p class="text-gray-600">เลือกเมนูที่คุณต้องการใช้งาน</p>
      </div>

      <!-- Menu Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <NuxtLink
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.route"
          class="relative bg-white rounded-2xl shadow-sm hover:shadow-xl flex flex-col items-center justify-center transition-all duration-300 h-[200px] overflow-hidden group border border-gray-100 hover:border-emerald-200 hover:-translate-y-1"
        >
          <!-- Background gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <!-- Decorative corner accent -->
          <div class="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-emerald-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <!-- Icon container -->
          <div class="relative z-10 p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:from-emerald-50 group-hover:to-emerald-100">
            <component 
              :is="item.icon" 
              :class="item.color"
              class="w-10 h-10 transition-all duration-300 group-hover:scale-105"
            />
          </div>
          
          <!-- Title -->
          <span class="relative z-10 text-lg font-semibold text-gray-700 group-hover:text-emerald-700 transition-all duration-300 px-4 text-center leading-snug">
            {{ item.title }}
          </span>

          <!-- Subtle bottom accent line -->
          <div class="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 group-hover:w-16 transform -translate-x-1/2 transition-all duration-300 rounded-full"></div>
          
          <!-- Hover ripple effect -->
          <div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute top-1/2 left-1/2 w-0 h-0 bg-emerald-400/10 rounded-full group-hover:w-40 group-hover:h-40 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"></div>
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
    color: "text-yellow-400",
    route: `/group/1`, // Replace with the appropriate account_category_id
  },
  {
    icon: Landmark,
    title: "ธนาคาร",
    color: "text-green-500",
    route: "/group/7",
  },
  {
    icon: Users,
    title: "ลูกหนี้",
    color: "text-yellow-500",
    route: "/group/6",
  },
  {
    icon: Grid2x2Plus,
    title: "หนี้สิน",
    color: "text-purple-400",
    route: "/group/2",
  },
  {
    icon: HandCoins,
    title: "รายได้",
    color: "text-green-500",
    route: "/group/4",
  },
  {
    icon: CircleDollarSign,
    title: "ค่าใช้จ่าย",
    color: "text-red-500",
    route: "/group/5",
  },
  
 
  // {
  //   icon: FileMinus,
  //   title: "ส่วนของเจ้าของ",
  //   color: "text-yellow-500",
  //   route: "/group/3",
  // },
]);
</script>
