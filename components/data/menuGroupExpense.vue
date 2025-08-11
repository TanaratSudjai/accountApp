<template>
  <div class="p-4">
    <div class="max-w-6xl mx-auto space-y-2">
      <!-- Error State -->
      <!-- <div v-if="error" class="relative p-6 rounded-2xl border-2 border-sky-200 ">
        <div
          class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-sky-200/30 to-transparent rounded-bl-full">
        </div>
        <div class="relative flex items-center space-x-4">
          <div>
            <h3 class="font-semibold text-sky-800 text-md">แจ้งเตือน</h3>
            <p class="text-sky-700 mt-1 text-xs">
              เกิดข้อผิดพลาด กรุณาลองอีกครั้งในภายหลัง {{ error }}
            </p>
          </div>
        </div>
      </div> -->

      <div class="">
        <!-- Account List Section -->
        <div class="bg-white border-b border-gray-200">
          <!-- Section Header -->
          <div class="p-1 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div
                  class="w-1 h-10 bg-gradient-to-b from-red-300 to-red-400 rounded-full"
                ></div>

                <div>
                  <h2 class="text-xl font-bold text-gray-800">รายการบัญชี</h2>
                  <p class="text-gray-600 text-xs">คลิกเพื่อแก้ไขข้อมูลบัญชี</p>
                </div>
              </div>
              <!-- Account count badge -->
              <div class="flex items-center space-x-2">
                <span
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200"
                >
                  <svg
                    class="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    ></path>
                  </svg>
                  {{
                    menuGroup.flatMap(group => group.items).filter(
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
          <div class="p-2">
            <div
              class="max-h-60 overflow-y-auto space-y-2 sm:space-y-4 pr-2 custom-scrollbar"
            >
              <TransitionGroup
                name="account-list"
                tag="div"
                class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3"
              >
                <div v-for="group in menuGroup" :key="group.account_group_name">
                  <!-- Group title -->
                  <h2 class="text-lg font-bold mt-4 mb-2 text-gray-800">
                    {{ group.account_group_name }}
                  </h2>

                  <!-- Loop inside items -->
                  <div
                    v-for="menu in group.items"
                    :key="menu.account_type_id"
                    class="group"
                  >
                    <button
                      v-if="selectedCategory === menu.account_category_id"
                      @click="openUpdateModal(menu)"
                      :class="{
                        hidden: disabledAccountTypeIds.has(
                          menu.account_type_id
                        ),
                      }"
                      :disabled="
                        disabledAccountTypeIds.has(menu.account_type_id)
                      "
                      class="w-full relative p-3 rounded-lg border-2 border-gray-200 bg-gradient-to-r from-white to-gray-50 hover:from-red-50 hover:to-rose-50 hover:border-red-300 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-100"
                    >
                      <!-- Background decoration -->
                      <div
                        class="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-red-200/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      ></div>

                      <!-- Main content -->
                      <div class="relative flex items-center space-x-3">
                        <!-- Icon -->
                        <div class="flex-shrink-0">
                          <div
                            class="w-10 h-10 p-2 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-red-100 group-hover:to-rose-200 rounded-lg transition-all duration-300 flex items-center justify-center"
                          >
                            <img
                              :src="`/icon_folder/${menu.account_icon_name}`"
                              :alt="menu.account_icon_name"
                              class="w-6 h-6 object-cover rounded group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </div>

                        <!-- Text -->
                        <div class="flex flex-col min-w-0">
                          <h3
                            class="font-semibold text-left text-gray-800 text-xs leading-tight group-hover:text-red-700 transition-colors duration-300 truncate"
                          >
                            {{ menu.account_type_name }}
                          </h3>
                          <span
                            class="inline-flex items-center px-2 py-0.5 bg-gray-100 group-hover:bg-red-100 rounded text-xs font-medium text-gray-700 group-hover:text-red-800 transition-colors duration-300"
                          >
                            ฿{{ formatNumber(menu.account_type_value) }}
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </TransitionGroup>
            </div>

            <!-- Empty state -->
            <div
              v-if="
                menuGroup
                  .flatMap((group) => group.items) // flatten all items
                  .filter(
                    (item) =>
                      selectedCategory === item.account_category_id &&
                      !disabledAccountTypeIds.has(item.account_type_id)
                  ).length === 0
              "
              class="text-center p-8"
            >
              <div
                class="relative inline-flex items-center justify-center mb-6"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full blur-xl opacity-20 animate-ping"
                ></div>
                <div
                  class="relative w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    ></path>
                  </svg>
                </div>
              </div>
              <h3 class="text-lg font-bold text-gray-600 mb-2">ไม่พบบัญชี</h3>
              <p class="text-gray-500 text-sm">
                ไม่มีบัญชีที่สามารถแก้ไขได้ในขณะนี้
              </p>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <UpdateAccountTypeModal
          v-if="showModal"
          :show="showModal"
          :account_type_name="selectedMenu?.account_type_name"
          :account_type_value="parseFloat(selectedMenu?.account_type_value)"
          :account_type_id="selectedMenu?.account_type_id"
          :account_type_from_id="selectedMenu?.account_type_from_id"
          :account_category_id="selectedMenu?.account_category_id"
          @close="closeUpdateModal"
          @update="handleUpdate"
        />
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
import { ref, onMounted } from "vue";
import UpdateAccountTypeModal from "../../components/modal/ModalTransition.vue";
import { useAlert } from "~/composables/showAlert";
import { useRoute } from "vue-router";
const { formatNumber } = useFormatNumber(); // ฟังก์ชันสำหรับการจัดรูปแบบตัวเลข
const menuGroup = ref([]); // เก็บรายการเมนู
const showModal = ref(false); // ควบคุมการแสดง Modal
const selectedMenu = ref(null); // เก็บข้อมูลเมนูที่เลือก
const count = ref(null); // เก็บจำนวนรายการ
const selectedCategory = ref(5); // เก็บประเภทที่เลือก
const error = ref(null); // สำหรับจัดการข้อผิดพลาด
const { api } = useApi();
const { showAlert } = useAlert();
const r = useRouter();

import { storeToRefs } from "pinia";
import { useExpenseTransitionStore } from "~/stores/expenseTransition";

const store = useExpenseTransitionStore();
const { disabledAccountTypeIds } = storeToRefs(store); // 👈 ทำให้ reactive

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
    await api.post("/transition_select_expense", {
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
  await store.fetchTransitions(); // ดึงข้อมูลธุรกรรมใหม่
};

// ฟังก์ชันดึงข้อมูลรายการเมนู
const fetchMenuGroupData = async () => {
  try {
    const response = await api.get("/getMenuGroup_expense");
    menuGroup.value = response.data || [];
  } catch (err) {
    error.value = "Error fetching menu group: " + err.message; // ตั้งค่า error
    showAlert(
      "เซ็สชั่นคุณหมดอายุ",
      "กรุณาออกจากระบบเเล้วเข้าสู่ระบบใหม่อีกครั้ง"
    );
    window.location.href = "/";
  }
};

// ฟังก์ชันดึงข้อมูลจำนวนรายการ
const fetchDataSelect = async () => {
  try {
    const response = await api.get("/getSelect_countSelect");
    count.value = response.data; // เก็บค่าที่ดึงมา
  } catch (err) {
    error.value = "Error fetching count: " + err.message; // ตั้งค่า error
  }
};

// เรียกใช้ฟังก์ชันดึงข้อมูลเมื่อ Component ถูก mounted
onMounted(async () => {
  await fetchMenuGroupData();
  await fetchDataSelect(); // เรียกข้อมูลจำนวนรายการ
  store.fetchTransitions();
});
</script>
