<template>
  <div class="min-h-screen font-noto">
    <div class="container mx-auto px-4 py-8">
      <!-- Menu Grid -->
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-5xl mx-auto"
      >
        <NuxtLink
          v-for="(item, index) in filteredMenuItems"
          :key="item.id"
          :to="isDisabled(item.title) ? item.path_name || '#' : item.route"
          :class="[
            'relative group backdrop-blur-sm',
            isDisabled(item.title) ? 'opacity-60' : 'hover:scale-105 ',
            'transition-all duration-300 ease-out',
          ]"
          @click="isDisabled(item.title) && $event.preventDefault()"
        >
          <div
            :class="[
              'border border-gray-200 p-6',
              'bg-white ',
              'flex flex-col items-center justify-center',
              'min-h-[140px]',
              !isDisabled(item.title) && 'hover:bg-white',
            ]"
          >
            <div
              :class="[
                'rounded-xl p-3',
                'transition-transform duration-300 group-hover:scale-110',
                item.color || 'text-gray-700',
              ]"
            >
              <component
                :is="
                  isDisabled_icons(item.title)
                    ? item.isDisabled_icons
                    : item.icon
                "
                class="w-8 h-8"
              />
            </div>

            <!-- Title -->
            <span class="mt-4 text-sm font-medium text-gray-700 text-center">
              {{ item.title }}
            </span>
          </div>
        </NuxtLink>
      </div>

      <!-- Quick Stats Section -->
      <!-- <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        <div class="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-600 dark:text-gray-300">
              Today's Balance
            </h3>
            <span class="text-cyan-600 dark:text-cyan-400">
              <component :is="'ChartLineIcon'" class="w-5 h-5" />
            </span>
          </div>
          <p class="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
            $24,685.00
          </p>
          <p class="mt-1 text-sm text-green-600 dark:text-green-400">+2.45%</p>
        </div>

        <div class="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-600 dark:text-gray-300">
              Pending Transactions
            </h3>
            <span class="text-cyan-600 dark:text-cyan-400">
              <component :is="'ClockIcon'" class="w-5 h-5" />
            </span>
          </div>
          <p class="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
            12
          </p>
          <p class="mt-1 text-sm text-yellow-600 dark:text-yellow-400">
            Needs attention
          </p>
        </div>

        <div class="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-600 dark:text-gray-300">
              Monthly Overview
            </h3>
            <span class="text-cyan-600 dark:text-cyan-400">
              <component :is="'CalendarIcon'" class="w-5 h-5" />
            </span>
          </div>
          <p class="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
            +$52,145.00
          </p>
          <p class="mt-1 text-sm text-blue-600 dark:text-blue-400">
            View Report
          </p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  Users,
  Clock,
  FolderOpen,
  Landmark,
  HandCoins,
  ChartNoAxesCombined,
  Grid2x2Plus,
  ArrowUpFromLine,
  Plus,
} from "lucide-vue-next";
import { computed } from "vue";
const checkData = ref([]);
const checkData_depter = ref({ type: "", value: 0 });
const checkData_creditor = ref({ type: "", value: 0 });
const offAccount_menu = ref(true);

const { $axios } = useNuxtApp();

const fetchData = async () => {
  try {
    const response = await $axios.get("/transitions");
    checkData.value = response.data.res_transition;
    checkData_depter.value = response.data.data[0];
    checkData_creditor.value = response.data.data[1];
  } catch (error) {
    console.log(error);
  }
};
onMounted(async () => {
  await fetchData();
});

const menuItems = ref([
  {
    id: 1,
    icon: FolderOpen,
    title: "จัดการหมวดหมู่",
    color: "text-gray-500",
    route: "/category",
    bg: "bg-white",
    text: "text-gray-800",
  },
  {
    id: 2,
    icon: Grid2x2Plus,
    title: "เปิดบัญชี",
    color: "text-green-400",
    route: "/transection",
  },
  // -------
  {
    id: 4,
    icon: ArrowUpFromLine,
    title: "บันทึกรายการค่าใช้จ่าย",
    color: "text-red-500",
    route: "/transection_expense",
  },
  {
    id: 5,
    icon: HandCoins,
    title: "บันทึกรายการรายได้",
    color: "text-green-400",
    route: "/transection_income",
  },
  {
    id: 6,
    icon: Users,
    title: "ลูกหนี้",
    color: "text-yellow-500",
    route: "/debtors",
    isDisabled_icons: Plus,
    path_name: "/group/6",
  },
  {
    id: 7,
    icon: Users,
    title: "เจ้าหนี้",
    color: "text-purple-500",
    route: "/creditors",
    isDisabled_icons: Plus,
    path_name: "/group/2",
  },
  // -------

  {
    id: 8,
    icon: Clock,
    title: "บันทึกรายการทั่วไป",
    color: "text-gray-400",
    route: "/dashboard_submit_transition",
  },
  {
    id: 9,
    icon: ChartNoAxesCombined,
    title: "สรุป",
    color: "text-gray-400",
    route: "/dasktop",
  },
  {
    id: 10,
    icon: Landmark,
    title: "ธนาคาร",
    color: "text-green-500",
    route: "/transitionbank",
  },
]);

const isDisabled = (title) => {
  if (!title) return true;

  const depter = parseFloat(checkData_depter.value.value);
  const creditor = parseFloat(checkData_creditor.value.value);
  const accountSum = parseFloat(checkData.value[0]?.account_type_sum || 0);

  if (title === "ลูกหนี้" && depter <= 0) return true;
  if (title === "เจ้าหนี้" && creditor <= 0) return true;

  const disableTitles = [
    "บันทึกรายการค่าใช้จ่าย",
    "บันทึกรายการรายได้",
    "ลูกหนี้",
    "เจ้าหนี้",
    "ธนาคาร",
  ];

  if (accountSum > 0) {
    const manageCat = menuItems.value.find(
      (item) => item.title === "จัดการหมวดหมู่"
    );
    if (manageCat) manageCat.id = 12;

    const openAcc = menuItems.value.find((item) => item.title === "เปิดบัญชี");
    if (openAcc) {
      openAcc.id = 13;
      offAccount_menu.value = false;
    }

    return false;
  }

  return disableTitles.includes(title);
};

watchEffect(() => {
  if (
    checkData.value.length &&
    checkData.value[0].account_type_sum &&
    parseFloat(checkData.value[0].account_type_sum) > 0
  ) {
    const manageCat = menuItems.value.find(
      (item) => item.title === "จัดการหมวดหมู่"
    );
    if (manageCat) manageCat.id = 10;

    const openAcc = menuItems.value.find((item) => item.title === "เปิดบัญชี");
    if (openAcc) openAcc.id = 11;

    // Resort the menuItems so updated IDs appear last
    menuItems.value.sort((a, b) => a.id - b.id);

    menuItems.value.forEach((item) => {});
  }
});

const filteredMenuItems = computed(() => {
  return menuItems.value.filter((item) => {
    // ถ้า title เป็น "เปิดบัญชี" และ offAccount_menu ถูกปิดอยู่ => ซ่อนไม่แสดง
    if (item.title === "เปิดบัญชี" && offAccount_menu.value === false) {
      return false;
    }
    return true;
  });
});

const isDisabled_icons = (title) => {
  if (!title) return true;
  // แยกการทำงานของลูกหนี้และเจ้าหนี้
  // โดยใช้ checkData_depter และ checkData_creditor
  const depter = parseInt(checkData_depter.value.value);
  const creditor = parseInt(checkData_creditor.value.value);

  if (title === "ลูกหนี้") {
    if (depter == 0 || depter === null || depter === undefined) {
      return true; // เปลี่ยนเป็น false เพื่อให้แสดงไอคอน Plus
    }
  }
  if (title === "เจ้าหนี้") {
    if (creditor == 0 || creditor === null || creditor === undefined) {
      return true; // เปลี่ยนเป็น false เพื่อให้แสดงไอคอน Plus
    }
  }
};
</script>
