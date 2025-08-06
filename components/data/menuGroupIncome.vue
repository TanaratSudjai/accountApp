<template>
  <div class="p-4">
    <div class="max-w-4xl mx-auto space-y-2">

      <!-- error -->
      <div v-if="error"
        class="relative p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
        <div
          class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-200/30 to-transparent rounded-bl-full">
        </div>
        <div class="relative flex items-center space-x-4">
          <div
            class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <Icon name="lucide:alert-circle" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 class="font-semibold text-green-800 text-lg">แจ้งเตือน</h3>
            <p class="text-green-700 mt-1">เกิดข้อผิดพลาด กรุณาลองอีกครั้งในภายหลัง</p>
          </div>
        </div>
      </div>



      <div v-else class="border-b border-gray-200">
        <div class="bg-white overflow-hidden">
          <div class="p-1 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="w-1 h-10 bg-gradient-to-b from-green-300 to-green-400 rounded-full"></div>

                <div>
                  <h2 class="text-xl font-bold text-gray-800">รายการบัญชี</h2>
                  <p class="text-gray-600 text-xs">
                    คลิกเพื่อแก้ไขข้อมูลบัญชี
                  </p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <span
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs md:text-sm font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                    </path>
                  </svg>
                  {{
                    menuGroup.filter(
                      (menu) =>
                        selectedCategory === menu.account_category_id &&
                        !disabledAccountTypeIds.has(menu.account_type_id)
                    ).length
                  }}
                  บัญชี
                </span>
              </div>
            </div>
          </div>

          <!-- Account Cards -->
          <div class="p-1">
            <div class="max-h-60 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              <TransitionGroup name="account-list" tag="div"
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                <div v-for="menu in menuGroup" :key="menu.account_type_id" class="group">
                  <button v-if="selectedCategory === menu.account_category_id" @click="openUpdateModal(menu)" :class="{
                    hidden: disabledAccountTypeIds.has(menu.account_type_id),
                  }" :disabled="disabledAccountTypeIds.has(menu.account_type_id)"
                    class="w-full relative p-1 rounded-lg border-2 border-gray-200 bg-gradient-to-r from-white to-gray-50 hover:from-green-50 hover:to-emerald-50 hover:border-green-300 transition-all duration-300 hover:shadow-sm transform focus:outline-none focus:ring-4 focus:ring-green-100">
                    <div class="relative flex items-center justify-between">
                      <!-- Left section with icon and name -->
                      <div class="flex items-center space-x-2">
                        <div class="text-left">
                          <h3
                            class="font-bold text-gray-800 text-md group-hover:text-green-700 transition-colors duration-300">
                            {{ menu.account_type_name }}
                          </h3>
                          <div class="flex items-center space-x-2">
                            <!-- <span
                              class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                              ID: {{ menu.account_type_id }}
                            </span> -->
                            <span class="text-xs text-gray-500">คลิกเพื่อเพิ่ม</span>
                          </div>
                        </div>
                      </div>

                      <!-- Right section with value -->
                      <div class="text-right ">
                        <div
                          class="text-md font-bold text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                          ฿{{ formatNumber(menu.account_type_value) }}
                        </div>
                        <div class="text-xs text-gray-500">ค่าเริ่มต้น</div>
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
            <div v-if="
              menuGroup.filter(
                (menu) =>
                  selectedCategory === menu.account_category_id &&
                  !disabledAccountTypeIds.has(menu.account_type_id)
              ).length === 0
            " class="text-center p-2">
              <div class="relative inline-flex items-center justify-center mb-6">
                <div
                  class="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full blur-xl opacity-20 animate-ping">
                </div>
                <div
                  class="relative w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center ">
                  <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                    </path>
                  </svg>
                </div>
              </div>
              <h3 class="text-lg font-bold text-gray-600 mb-2">ไม่พบบัญชี</h3>
              <p class="text-gray-500 text-xs">ไม่มีบัญชีที่สามารถแก้ไขได้ในขณะนี้</p>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <UpdateAccountTypeModal v-if="showModal" :show="showModal" :account_type_name="selectedMenu?.account_type_name"
          :account_type_value="parseFloat(selectedMenu?.account_type_value)"
          :account_type_id="selectedMenu?.account_type_id" :account_type_from_id="selectedMenu?.account_type_from_id"
          :account_category_id="selectedMenu?.account_category_id" @close="closeUpdateModal" @update="handleUpdate" />

      </div>
    </div>
    <div class="p-4 mb-4 flex justify-center">
      <ButtonDashboard />
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar {
  display: hidden;
}

/* ปรับที่เลื่อนรายการธุรกรรม */
.overflow-y-auto {
  display: hidden;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
  display: hidden;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
  display: hidden;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 3px;
  display: hidden;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import UpdateAccountTypeModal from "../../components/modal/ModalTransition.vue";

// ฟังก์ชันสำหรับจัดรูปแบบตัวเลข
const { formatNumber } = useFormatNumber();
const menuGroup = ref([]); // เก็บรายการเมนู
const showModal = ref(false); // ควบคุมการแสดง Modal
const selectedMenu = ref(null); // เก็บข้อมูลเมนูที่เลือก
const count = ref(null); // เก็บจำนวนรายการ
const selectedCategory = ref(4); // เก็บประเภทที่เลือก
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
  const valueAsFloat = parseFloat(account_type_value);
  formData.value = {
    account_type_id,
    account_transition_value: valueAsFloat,
    account_type_from_id,
    account_category_id,
  };

  try {
    // ส่งข้อมูลไปยัง API
    await $axios.post("/transition_select_income", {
      account_type_id: formData.value.account_type_id,
      account_transition_value: formData.value.account_transition_value,
      account_type_from_id: formData.value.account_type_from_id,
      account_category_id: formData.value.account_category_id,
    });
    await fetchMenuGroupData(); // ดึงข้อมูลเมนูใหม่
  } catch (err) {
    error.value = "Error updating data: " + err.message; // ตั้งค่า error
    console.error("Error updating data:", err);
  }
  showModal.value = false; // ปิด Modal หลังจากอัปเดต
};

// ฟังก์ชันดึงข้อมูลรายการเมนู
const fetchMenuGroupData = async () => {
  try {
    const menuGroup_result = await $axios.get("/getMenuGroup_income");
    menuGroup.value = menuGroup_result.data || [];
  } catch (err) {
    error.value = "Error fetching menu group: " + err.message; // ตั้งค่า error
  }
};

// เรียกใช้ฟังก์ชันดึงข้อมูลเมื่อ Component ถูก mounted
onMounted(async () => {
  await fetchMenuGroupData();
  await fetchDataSelect(); // เรียกข้อมูลจำนวนรายการ
  await fetchTransitions();
});

// ฟังก์ชันดึงข้อมูลจำนวนรายการ
const fetchDataSelect = async () => {
  try {
    const data = await $axios.get("/getSelect_countSelect");
    count.value = data.data; // เก็บค่าที่ดึงมา
  } catch (err) {
    error.value = "Error fetching count: " + err.message; // ตั้งค่า error
  }
};

let interval;
const transition = ref([]); // Original transition data
const disabledAccountTypeIds = ref(new Set()); // A Set to store disabled account_type_ids

const fetchTransitions = async () => {
  try {
    const response = await $axios.get("/get_income_transition");

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
