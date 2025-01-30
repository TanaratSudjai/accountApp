<template>
  <client-only>
    <BackComponents />
  </client-only>
  <div class="flex-1 p-6">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-4xl mx-auto">
      <NuxtLink
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.route"
        class="bg-white/85 rounded-2xl shadow-md flex flex-col items-center justify-center transition-shadow truncate h-[180px] hover:shadow-lg"
      >
        <div :class="item.color">
          <component :is="item.icon" class="w-12 h-12" />
        </div>
        <span class="mt-2 text-md font-medium text-gray-700">{{
          item.title
        }}</span>
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
    icon: Grid2x2Plus,
    title: "หนี้สิน",
    color: "text-purple-400",
    route: "/group/2",
  },
  {
    icon: FileMinus,
    title: "ส่วนของเจ้าของ",
    color: "text-yellow-500",
    route: "/group/3",
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
]);
</script>
