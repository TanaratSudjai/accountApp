<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
    <div class="max-w-5xl mx-auto space-y-8">
      <!-- Error State -->
      <div
        v-if="error"
        class="relative p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 shadow-lg"
      >
        <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-200/30 to-transparent rounded-bl-full"></div>
        <div class="relative flex items-center space-x-4">
          <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <Icon name="lucide:alert-circle" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 class="font-semibold text-green-800 text-lg">แจ้งเตือน</h3>
            <p class="text-green-700 mt-1">{{ error }}</p>
          </div>
        </div>
      </div>

      <div v-else class="space-y-8">
        <!-- Header Section -->
        <div class="text-center space-y-6">
          <!-- Animated Icon Container -->
          <!-- <div class="relative inline-flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur-2xl opacity-30 animate-pulse scale-110"></div>
            <div class="relative bg-white p-6 rounded-3xl shadow-2xl border border-gray-100">
              <div class="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="currentColor"
                  class="w-12 h-12 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                  />
                </svg>
              </div>
            </div>
          </div> -->

          <!-- Title -->
          <!-- <div class="space-y-3">
            <h1 class="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              จัดการบัญชี
            </h1>
            <p class="text-lg text-gray-600 font-medium">เลือกบัญชีที่ต้องการแก้ไข</p>
          </div> -->
        </div>

        <!-- Account List Section -->
        <div class="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <!-- Section Header -->
          <div class="bg-gradient-to-r from-gray-50 to-slate-50 px-8 py-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="w-2 h-8 bg-gradient-to-b from-red-500 to-rose-600 rounded-full"></div>
                <div>
                  <h2 class="text-2xl font-bold text-gray-800">รายการบัญชี</h2>
                  <p class="text-gray-600 text-sm mt-1">คลิกเพื่อแก้ไขข้อมูลบัญชี</p>
                </div>
              </div>
              <!-- Account count badge -->
              <div class="flex items-center space-x-2">
                <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-green-200">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                  {{ menuGroup.filter(menu => selectedCategory === menu.account_category_id && !disabledAccountTypeIds.has(menu.account_type_id)).length }} บัญชี
                </span>
              </div>
            </div>
          </div>

          <!-- Account Cards -->
          <div class="p-8">
            <div class="max-h-96 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              <TransitionGroup name="account-list" tag="div" class="space-y-4">
                <div
                  v-for="menu in menuGroup"
                  :key="menu.account_type_id"
                  class="group"
                >
                  <button
                    v-if="selectedCategory === menu.account_category_id"
                    @click="openUpdateModal(menu)"
                    :class="{
                      'hidden': disabledAccountTypeIds.has(menu.account_type_id),
                    }"
                    :disabled="disabledAccountTypeIds.has(menu.account_type_id)"
                    class="w-full relative p-6 rounded-2xl border-2 border-gray-200 bg-gradient-to-r from-white to-gray-50 hover:from-red-50 hover:to-rose-50 hover:border-red-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-red-100"
                  >
                    <!-- Background decoration -->
                    <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-200/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div class="relative flex items-center justify-between">
                      <!-- Left section with icon and name -->
                      <div class="flex items-center space-x-4">
                        <!-- Account icon -->
                        <!-- <div class="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                          </svg>
                        </div> -->
                        
                        <!-- Account details -->
                        <div class="text-left">
                          <h3 class="font-bold text-gray-800 text-lg group-hover:text-red-700 transition-colors duration-300">
                            {{ menu.account_type_name }}
                          </h3>
                          <div class="flex items-center space-x-2 mt-1">
                            <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                              ID: {{ menu.account_type_id }}
                            </span>
                            <span class="text-xs text-gray-500">• คลิกเพื่อแก้ไข</span>
                          </div>
                        </div>
                      </div>

                      <!-- Right section with value -->
                      <div class="text-right space-y-2">
                        <div class="text-2xl font-bold text-gray-800 group-hover:text-red-700 transition-colors duration-300">
                          ฿{{ formatNumber(menu.account_type_value) }}
                        </div>
                        <div class="text-sm text-gray-500">ค่าเริ่มต้น</div>
                      </div>

                      <!-- Edit indicator -->
                      <!-- <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </div>
                      </div> -->
                    </div>
                  </button>
                </div>
              </TransitionGroup>
            </div>

            <!-- Empty state -->
            <div v-if="menuGroup.filter(menu => selectedCategory === menu.account_category_id && !disabledAccountTypeIds.has(menu.account_type_id)).length === 0" class="text-center py-16">
              <div class="relative inline-flex items-center justify-center mb-6">
                <div class="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full blur-xl opacity-20 animate-ping"></div>
                <div class="relative w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg">
                  <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                </div>
              </div>
              <h3 class="text-2xl font-bold text-gray-600 mb-2">ไม่พบบัญชี</h3>
              <p class="text-gray-500">ไม่มีบัญชีที่สามารถแก้ไขได้ในขณะนี้</p>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <UpdateAccountTypeModal
          v-if="showModal"
          :show="showModal"
          :account_type_name="selectedMenu?.account_type_name"
          :account_type_value="selectedMenu?.account_type_value"
          :account_type_id="selectedMenu?.account_type_id"
          :account_type_from_id="selectedMenu?.account_type_from_id"
          :account_category_id="selectedMenu?.account_category_id"
          @close="closeUpdateModal"
          @update="handleUpdate"
        />
      </div>

      <!-- Dashboard Button -->
      <div class="flex justify-center">
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
          <ButtonDashboard class="relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ปรับที่เลื่อนรายการธุรกรรม */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 3px;
}
</style>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import UpdateAccountTypeModal from "../../components/modal/ModalTransition.vue";
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
const { formatNumber } = useFormatNumber(); // ฟังก์ชันสำหรับการจัดรูปแบบตัวเลข
const menuGroup = ref([]); // เก็บรายการเมนู
const showModal = ref(false); // ควบคุมการแสดง Modal
const selectedMenu = ref(null); // เก็บข้อมูลเมนูที่เลือก
const count = ref(null); // เก็บจำนวนรายการ
const selectedCategory = ref(5); // เก็บประเภทที่เลือก
const error = ref(null); // สำหรับจัดการข้อผิดพลาด
const { $axios } = useNuxtApp();

// ฟังก์ชันสำหรับแสดงประเภท
function showCategory(categoryId) {
  selectedCategory.value = categoryId;
}

// ฟังก์ชันเปิด Modal สำหรับการอัปเดต
const openUpdateModal = (menu) => {
  selectedMenu.value = menu;
  showModal.value = true;
};

// ฟังก์ชันปิด Modal
const closeUpdateModal = () => {
  showModal.value = false;
};

const formData = ref({
  account_type_id: "",
  account_transition_value: "",
  account_type_from_id: "",
  account_category_id: "",
});

// ฟังก์ชันสำหรับการอัปเดตข้อมูล
const handleUpdate = async ({
  account_type_id,
  account_type_value,
  account_type_from_id,
  account_category_id,
}) => {
  // เตรียมข้อมูลสำหรับการอัปเดต
  formData.value = {
    account_type_id,
    account_transition_value: account_type_value,
    account_type_from_id,
    account_category_id,
  };

  try {
    // ส่งข้อมูลไปยัง API
    const response = await $axios.post("/transition_select_expense", {
      account_type_id: formData.value.account_type_id,
      account_transition_value: formData.value.account_transition_value,
      account_type_from_id: formData.value.account_type_from_id,
      account_category_id: formData.value.account_category_id,
    });
    await fetchMenuGroupData(); // ดึงข้อมูลเมนูใหม่
    // console.log("Response from API:", response);
  } catch (err) {
    error.value = "Error updating data: " + err.message; // ตั้งค่า error
    console.error("Error updating data:", err);
  }
  showModal.value = false; // ปิด Modal หลังจากอัปเดต
};

// ฟังก์ชันดึงข้อมูลรายการเมนู
const fetchMenuGroupData = async () => {
  try {
    const menuGroup_result = await $axios.get("/getMenuGroup_expense");
    menuGroup.value = menuGroup_result.data || [];
    console.log(menuGroup_result);
  } catch (err) {
    error.value = "Error fetching menu group: " + err.message; // ตั้งค่า error
  }
};

// เรียกใช้ฟังก์ชันดึงข้อมูลเมื่อ Component ถูก mounted
onMounted(async () => {
  await fetchMenuGroupData();
  await fetchDataSelect(); // เรียกข้อมูลจำนวนรายการ
});

// ฟังก์ชันดึงข้อมูลจำนวนรายการ
const fetchDataSelect = async () => {
  try {
    const data = await $axios.get("/getSelect_countSelect");
    count.value = data; // เก็บค่าที่ดึงมา
  } catch (err) {
    error.value = "Error fetching count: " + err.message; // ตั้งค่า error
  }
};

let interval;
const transition = ref([]); // Original transition data
const disabledAccountTypeIds = ref(new Set()); // A Set to store disabled account_type_ids

const fetchTransitions = async () => {
  try {
    const response = await $axios.get("/get_expense_transition");

    // Ensure response.data exists and is an array
    if (Array.isArray(response.data)) {
      transition.value = response.data;
      disabledAccountTypeIds.value = new Set(
        transition.value.map((item) => item.account_type_id)
      );
    } else {
      throw new Error("Invalid data format: Expected an array");
    }
  } catch (err) {
    error.value = "Error fetching transitions: " + err.message;
  }
};

// เรียกใช้ fetchTransitions ทุกๆ 1 วินาที
onMounted(() => {
  interval = setInterval(fetchTransitions, 1000);
  fetchTransitions(); // เรียกครั้งแรกทันทีที่โหลด
});

// ล้าง interval เมื่อ Component ถูกทำลาย
onBeforeUnmount(() => {
  clearInterval(interval);
});

// // คำนวณรายได้ทั้งหมด
// const sumvalue_income = computed(() => {
//   return transition.value
//     .filter((item) => item.account_category_id === 4)
//     .reduce((total, item) => {
//       const value = parseFloat(item.account_transition_value);
//       return total + (isNaN(value) ? 0 : value);
//     }, 0)
//     .toFixed(2);
// });

// // คำนวณรายจ่ายทั้งหมด
// const sumvalue_extend = computed(() => {
//   return transition.value
//     .filter((item) => item.account_category_id === 5)
//     .reduce((total, item) => {
//       const value = parseFloat(item.account_transition_value);
//       return total + (isNaN(value) ? 0 : value);
//     }, 0)
//     .toFixed(2);
// });
</script>
