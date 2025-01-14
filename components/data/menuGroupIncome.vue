<template>
  <div class="">
    <div v-if="error" class="p-6 bg-green-50 rounded-lg border border-green-200">
      <div class="flex items-center space-x-3 text-green-700">
        <Icon name="lucide:alert-circle" class="w-5 h-5" />
        <p class="font-medium">{{ error }}</p>
      </div>
    </div>

    <div v-else class="max-w-3xl mx-auto space-y-2 p-4">
      <div class="w-full flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"
          class="size-6" color="green">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
        </svg>
      </div>
      <div class="bg-white rounded-xl p-1">
        <div class="h-[190px] overflow-y-auto space-y-2 shadow-sm p-2 rounded-xl border-1">
          <div v-for="menu in menuGroup" :key="menu.account_type_id">
            <button @click="openUpdateModal(menu)" v-if="selectedCategory === menu.account_category_id"
              class="w-full group flex items-center justify-between p-2 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              :class="{
                'border-gray-300 bg-gray-200 hover:bg-gray-200 cursor-not-allowed': disabledAccountTypeIds.has(menu.account_type_id) //เรียกใช้ฟังก์ชั่น disabledAccountTypeIds เพื่อนำ account_type_id ไปเช็คว่ามีใน array หรือไม่ ถ้ามีก็ให้บล็อก
              }" :disabled="disabledAccountTypeIds.has(menu.account_type_id)">
              <div class="flex items-center justify-between w-[80%] space-x-4">
                <div class="font-medium text-green-700">
                  {{ menu.account_type_name }}
                  {{ menu.account_type_id }}
                </div>
                <div class="font-semibold text-green-700">
                  ฿{{ menu.account_type_value || 0 }}
                </div>
              </div>
              <!-- <button @click="openUpdateModal(menu)"
                class="p-2 rounded-full bg-green-400 hover:bg-green-500 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                :class="{
                  'border-gray-300 bg-gray-200 hover:bg-gray-200 cursor-not-allowed':
                  disabledAccountTypeIds.has(menu.account_type_id),
                }" :disabled="disabledAccountTypeIds.has(menu.account_type_id)">
                ✏️
              </button> -->
            </button>
          </div>
        </div>

        <UpdateAccountTypeModal v-if="showModal" :show="showModal" :account_type_name="selectedMenu?.account_type_name"
          :account_type_value="selectedMenu?.account_type_value" :account_type_id="selectedMenu?.account_type_id"
          :account_type_from_id="selectedMenu?.account_type_from_id"
          :account_category_id="selectedMenu?.account_category_id" @close="closeUpdateModal" @update="handleUpdate" />
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

const menuGroup = ref([]); // เก็บรายการเมนู
const showModal = ref(false); // ควบคุมการแสดง Modal
const selectedMenu = ref(null); // เก็บข้อมูลเมนูที่เลือก
const count = ref(null); // เก็บจำนวนรายการ
const selectedCategory = ref(4); // เก็บประเภทที่เลือก
const error = ref(null); // สำหรับจัดการข้อผิดพลาด

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
    await $fetch("https://api-accountapp.onrender.com/api/transition_select_income", {
      method: "POST",
      body: formData.value,
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
    const menuGroup_result = await $fetch(
      "https://api-accountapp.onrender.com/api/getMenuGroup_income"
    );
    menuGroup.value = menuGroup_result || [];
    // console.log(menuGroup.value);
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
    const data = await $fetch(
      "https://api-accountapp.onrender.com/api/getSelect_countSelect"
    );
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
    transition.value = await $fetch("https://api-accountapp.onrender.com/api/get_income_transition");

    // Extract account_type_id values and add them to the Set
    disabledAccountTypeIds.value = new Set(transition.value.map(item => item.account_type_id));
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
