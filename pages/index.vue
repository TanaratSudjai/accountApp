<template>
  <div class="flex flex-col font-noto bg-cyan-600 min-h-screen">
    <!-- Header -->
    <div
      class="flex flex-wrap justify-center items-center fixed top-0 left-0 w-full z-50 p-3 bg-white shadow-md"
    >
      <!-- logo stars -->
      <div class="w-[38%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      </div>
      <div class="w-[58%] flex justify-end">
        <!-- chat -->
        <div class="w-[18%] flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
            />
          </svg>
        </div>
        <!-- hart -->
        <div class="w-[18%] flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </div>
        <!-- bel -->
        <div class="w-[18%] flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Grid Container -->
    <div class="flex-1 p-6 pt-[70px]">
      <div
        class="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-4xl mx-auto mb-12"
      >
        <NuxtLink
          v-for="(item, index) in menuItems"
          :key="index"
          :to="isDisabled(item.title) ? '#' : item.route"
          :class="[
            'rounded-3xl shadow-lg p-6 flex flex-col items-center justify-center transition-shadow truncate h-[120px] hover:scale-105 duration-300 ease-out',
            isDisabled(item.title)
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:shadow-xl',
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
    const res = await fetch(
      "https://api-accountapp.onrender.com/api/transitions"
    );
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
