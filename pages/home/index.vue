<template>
  <div class="min-h-screen font-noto">
    <div class="container mx-auto px-4 py-8">
      <div
        class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2 max-w-4xl mx-auto"
      >
        <div class="bg-gradient-to-br p-6 text-white mb-6 border">
          <div class="flex items-center mb-[20px] text-black">
            <div
              class="w-[60px] h-[60px] rounded-full bg-[#fff] mr-[15px] flex items-center justify-center"
            >
              <div class="text-3xl text-black">
                <UserRound class="w-10 h-10 text-black" />
              </div>
            </div>
            <div class="flex-1">
              <h1 class="text-xl md:text-2xl mb-[5px]">
                สวัสดี, คุณ {{ nameuser || "กำลังโหลด" }}
              </h1>
              <p class="opacity-90 text-sm">ข้อมูลการเงินของคุณ</p>
            </div>
            <div @click="openModifyFundModal()" class="cursor-pointer">
              <h1 class="text-xl md:text-2xl mb-[5px] flex items-center gap-2">
                <Settings />
              </h1>
            </div>
          </div>
          <div class="flex flex-col items-center m-[20px] text-black">
            <h2 class="opacity-90 text-base">ยอดเงินรวมทั้งหมด</h2>
            <div class="text-3xl md:text-4xl font-bold m-[10px]">
              {{ formatNumber(checkCheck_open.value) }} บาท
            </div>
          </div>
        </div>
      </div>
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-4xl mx-auto"
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
              'border border-gray-200 p-2',
              'bg-white ',
              'flex flex-col items-center justify-center',
              'min-h-[140px]',
              !isDisabled(item.title) && 'hover:bg-white',
            ]"
          >
            <div
              :class="[
                'rounded-xl ',
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
            <span
              class="mt-4 text-xs md:text-sm font-medium text-gray-700 text-center"
            >
              {{ item.title }}
            </span>
          </div>
        </NuxtLink>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2 max-w-4xl mx-auto"
      >
        <div class="bg-white rounded-[20px] p-4 md:p-6 mt-[25px] shadow-md">
          <h2 class="mb-[20px] text-xl md:text-2xl font-bold">รายการล่าสุด</h2>

          <div v-if="checkData && checkData.length > 0">
            <div
              v-for="(transaction, index) in displayedTransactions"
              :key="transaction.account_transition_id"
              class="flex p-[15px] items-center border-b-2 last:border-b-0"
            >
              <div
                :class="[
                  'w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center mr-[15px]',
                  transaction.account_category_id === 4
                    ? 'bg-green-100'
                    : transaction.account_category_id === 5
                    ? 'bg-red-100'
                    : transaction.account_category_from_id === null
                    ? 'bg-blue-100'
                    : transaction.account_category_from_id === 6
                    ? 'bg-yellow-100'
                    : transaction.account_category_id === 6
                    ? 'bg-yellow-100'
                    : transaction.account_category_from_id === 2
                    ? 'bg-purple-100'
                    : transaction.account_category_id === 2
                    ? 'bg-purple-100'
                    : 'bg-blue-100',
                ]"
              >
                <Plus
                  v-if="transaction.account_category_id === 4"
                  class="object-cover text-green-500 w-5 h-5 md:w-6 md:h-6"
                />

                <Minus
                  v-else-if="transaction.account_category_id === 5"
                  class="object-cover text-red-500 w-5 h-5 md:w-6 md:h-6"
                />
                <Settings
                  v-else-if="transaction.account_category_from_id === null"
                  class="object-cover text-blue-500 w-5 h-5 md:w-6 md:h-6"
                />
                <Users
                  v-else-if="transaction.account_category_from_id === 6"
                  class="object-cover text-yellow-500 w-5 h-5 md:w-6 md:h-6"
                />
                <Users
                  v-else-if="transaction.account_category_id === 6"
                  class="object-cover text-yellow-500 w-5 h-5 md:w-6 md:h-6"
                />
                <Users
                  v-else-if="transaction.account_category_from_id === 2"
                  class="object-cover text-purple-500 w-5 h-5 md:w-6 md:h-6"
                />
                <Users
                  v-else-if="transaction.account_category_id === 2"
                  class="object-cover text-purple-500 w-5 h-5 md:w-6 md:h-6"
                />
                <ArrowLeftRight
                  v-else-if="
                    (transaction.account_category_id === 1 &&
                      transaction.account_category_from_id === 1) ||
                    (transaction.account_category_id === 7 &&
                      transaction.account_category_from_id === 1)
                  "
                  class="object-cover text-blue-500 w-5 h-5 md:w-6 md:h-6"
                />
              </div>

              <div class="flex-1">
                <h3 class="text-sm md:text-base">
                  {{
                    transaction.account_category_id === 4
                      ? transaction.account_type_name
                      : transaction.account_category_id === 5
                      ? transaction.account_type_name
                      : transaction.account_category_from_id === null
                      ? transaction.account_type_name
                      : transaction.account_category_id === 6
                      ? transaction.account_type_name
                      : transaction.account_category_from_id === 6
                      ? transaction.account_type_name
                      : transaction.account_category_id === 2
                      ? transaction.account_type_name
                      : transaction.account_category_from_id === 2
                      ? transaction.account_type_name
                      : (transaction.account_category_id === 1 &&
                          transaction.account_category_from_id === 1) ||
                        (transaction.account_category_id === 7 &&
                          transaction.account_category_from_id === 1)
                      ? transaction.account_type_name
                      : "เปิดบัญชี"
                  }}

                  <span class="text-xs text-gray-500">
                    {{
                      transaction.account_category_id === 4
                        ? "รายได้"
                        : transaction.account_category_id === 5
                        ? "รายจ่าย"
                        : transaction.account_category_from_id === 6
                        ? "ให้ยืม"
                        : transaction.account_category_from_id === 2
                        ? "คืนไป"
                        : transaction.account_category_from_id === null
                        ? "เปิดบัญชี"
                        : transaction.account_category_id === 6
                        ? "ให้คืน"
                        : transaction.account_category_id === 2
                        ? "ยืมมา"
                        : (transaction.account_category_id === 1 &&
                            transaction.account_category_from_id === 1) ||
                          (transaction.account_category_id === 7 &&
                            transaction.account_category_from_id === 1)
                        ? "สลับบัญชี"
                        : "เปิดบัญชี"
                    }}
                  </span>
                </h3>

                <p class="text-xs md:text-sm text-gray-600">
                  {{ formatDateTime(transaction.account_transition_datetime) }}
                </p>
                <p
                  v-if="transaction.account_type_description"
                  class="text-xs text-gray-500"
                >
                  {{ transaction.account_type_description }}
                </p>
              </div>
              <div
                :class="[
                  'font-bold text-base md:text-lg',
                  transaction.account_category_id === 4
                    ? 'text-green-500'
                    : transaction.account_category_from_id === null
                    ? 'text-blue-500'
                    : transaction.account_category_id === 5
                    ? 'text-red-500'
                    : transaction.account_category_id === 6
                    ? 'text-green-500'
                    : transaction.account_category_id === 2
                    ? 'text-green-500'
                    : (transaction.account_category_id === 1 &&
                        transaction.account_category_from_id === 1) ||
                      (transaction.account_category_id === 7 &&
                        transaction.account_category_from_id === 1)
                    ? 'text-blue-500'
                    : 'text-red-500',
                ]"
              >
                {{
                  transaction.account_category_id === 4
                    ? "+"
                    : transaction.account_category_from_id === null
                    ? ""
                    : transaction.account_category_id === 5
                    ? "-"
                    : transaction.account_category_id === 6
                    ? "+"
                    : transaction.account_category_id === 2
                    ? "+"
                    : (transaction.account_category_id === 1 &&
                        transaction.account_category_from_id === 1) ||
                      (transaction.account_category_id === 7 &&
                        transaction.account_category_from_id === 1)
                    ? ""
                    : "-"
                }}
                {{ formatCurrency(transaction.account_transition_value) }}
              </div>
            </div>
            <div v-if="checkData.length > 5" class="text-center mt-4">
              <button
                @click="showAllTransactions = !showAllTransactions"
                class="px-4 py-2 bg-gray-100 text-sm rounded hover:bg-gray-200 transition"
              >
                {{ showAllTransactions ? "แสดงน้อยลง" : "แสดงทั้งหมด" }}
              </button>
            </div>
          </div>

          <div v-else class="text-center py-8 text-gray-500">
            <p>ไม่มีรายการ</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ModifyFund
    :show="showModifyFund"
    @close="showModifyFund = false"
    @update="fetchData()"
  />
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
  Minus,
  UserRound,
  Settings,
  ArrowLeftRight,
} from "lucide-vue-next";
import { computed } from "vue";
import ModifyFund from "@/components/modal/ModifyFund.vue";

const checkData = ref([]);
const checkCheck_open = ref({ type: "", value: 0 });
const checkData_depter = ref({ type: "", value: 0 });
const checkData_creditor = ref({ type: "", value: 0 });
const offAccount_menu = ref(true);
let nameuser = ref("");
const { formatNumber } = useFormatNumber();
const { $axios } = useNuxtApp();
const showAllTransactions = ref(false);

const showModifyFund = ref(false);
const openModifyFundModal = () => {
  showModifyFund.value = true;
};

const fetchData = async () => {
  try {
    const response = await $axios.get("/transitions");
    checkData.value = response.data.res_transition;
    checkData_depter.value = response.data.data[0];
    checkData_creditor.value = response.data.data[1];
    checkCheck_open.value = response.data.data[2];
  } catch (error) {
    console.log(error);
  }
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(value));
};

const displayedTransactions = computed(() => {
  return showAllTransactions.value
    ? checkData.value
    : checkData.value.slice(0, 5);
});
// Helper function to format datetime
const formatDateTime = (datetime) => {
  const date = new Date(datetime);
  const now = new Date();
  const diffInMinutes = Math.floor((now + date) / (1000 * 60));

  if (diffInMinutes < 1) {
    return "เมื่อสักครู่";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} นาทีที่แล้ว`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} ชั่วโมงที่แล้ว`;
  } else {
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
};

const getSession = async () => {
  try {
    const response = await $axios.get("auth/get_session");
    nameuser.value = response.data.data_user.account_user_name;
  } catch (err) {
    console.log(err);
  }
};

onMounted(async () => {
  await fetchData();
  await getSession();
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
  const accountSum = parseFloat(checkCheck_open.value.value);

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
