<template>
  <client-only>
    <BackComponentsForTypeForm1 />
  </client-only>
  <div class="flex-1 p-6 bg-[#111827] min-h-screen">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
      <NuxtLink
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.route"
        class="relative bg-[#1f2937] rounded-2xl shadow-lg flex flex-col items-center justify-center transition-all duration-300 h-[180px] overflow-hidden group border border-gray-700/50 hover:border-[#46cb79]/40"
      >
        <!-- Background glow effect on hover -->
        <div class="absolute inset-0 bg-gradient-to-br from-[#46cb79]/0 to-[#46cb79]/0 group-hover:from-[#46cb79]/5 group-hover:to-[#46cb79]/10 transition-all duration-500"></div>
        
        <!-- Icon container -->
        <div class="relative z-10 p-4 rounded-xl p-3 bg-cyan-50 dark:bg-cyan-900/30 shadow-lg mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[#46cb79]/20">
          <component 
            :is="item.icon" 
             :class="item.color"
            class="w-8 h-8 transition-colors duration-300"
          />
        </div>
        
        <!-- Title -->
        <span class="relative z-10 text-base font-medium text-gray-200 group-hover:text-[#46cb79] transition-colors duration-300 px-4 text-center">
          {{ item.title }}
        </span>
      </NuxtLink>
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
