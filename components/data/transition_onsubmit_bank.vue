<template>
  <div class="min-h-screen py-8">
    <div class="max-w-5xl mx-auto px-4">
      <!-- Main Card -->
      <div class="bg-white rounded-2xl shadow-lg p-6 space-y-8">
        <h2 class="text-2xl font-semibold text-gray-800 text-center">
          บัญชีธนาคาร
        </h2>

        <!-- Transfer Selection Grid -->
        <div class="grid grid-cols-7 gap-6">
          <!-- Source Account Column -->
          <div class="col-span-3 space-y-3">
            <h3 class="text-sm font-medium text-gray-600 mb-4">ธนาคารต้นทาง</h3>
            <div
              v-for="item in catData"
              :key="item.account_type_id"
              class="transition-all duration-200"
            >
              <button
                v-if="item.account_type_total > 0"
                :class="[
                  'w-full transition-all duration-200 group',
                  columnOneSelected?.account_type_id === item.account_type_id
                    ? 'ring-2 ring-emerald-500'
                    : 'hover:shadow-md',
                ]"
                @click="
                  toggleColumnOne(item);
                  setColumnValue(item);
                "
              >
                <div
                  class="relative overflow-hidden rounded-xl border border-gray-200 p-4"
                >
                  <div
                    :class="[
                      'absolute inset-0 transition-colors duration-200',
                      columnOneSelected?.account_type_id ===
                      item.account_type_id
                        ? 'bg-emerald-50'
                        : 'group-hover:bg-gray-50',
                    ]"
                  />
                  <div class="relative">
                    <p class="font-medium text-gray-900">
                      {{ item.account_type_name }}
                    </p>
                    <p class="text-sm text-gray-600 mt-1">
                      ยอดเงินที่มี {{ formatNumber(item.account_type_total) }}
                    </p>
                  </div>
                </div>
              </button>

              <div
                v-else
                class="rounded-xl border border-gray-200 p-4 bg-gray-50"
              >
                <p class="font-medium text-gray-400">
                  {{ item.account_type_name }}
                </p>
                <p class="text-sm text-gray-400 mt-1">ไม่มียอดเงิน</p>
              </div>
            </div>
          </div>

          <!-- Arrow Column -->
          <div class="flex items-center justify-center">
            <div class="p-3 rounded-full bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-6 h-6 text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>

          <!-- Destination Account Column -->
          <div class="col-span-3 space-y-3">
            <h3 class="text-sm font-medium text-gray-600 mb-4">
              ปลายทางการถ่ายโอน
            </h3>
            <div
              v-for="item in catData"
              :key="item.account_type_id"
              class="transition-all duration-200"
            >
              <button
                :class="[
                  'w-full transition-all duration-200 group',
                  {
                    'pointer-events-none opacity-50':
                      columnOneSelected?.account_type_id ===
                      item.account_type_id,
                  },
                  columnTwoSelected?.account_type_id === item.account_type_id
                    ? 'ring-2 ring-blue-500'
                    : 'hover:shadow-md',
                ]"
                :disabled="
                  columnOneSelected?.account_type_id === item.account_type_id
                "
                @click="toggleColumnTwo(item)"
              >
                <div
                  class="relative overflow-hidden rounded-xl border border-gray-200 p-4"
                >
                  <div
                    :class="[
                      'absolute inset-0 transition-colors duration-200',
                      columnTwoSelected?.account_type_id ===
                      item.account_type_id
                        ? 'bg-blue-50'
                        : 'group-hover:bg-gray-50',
                    ]"
                  />
                  <div class="relative">
                    <p class="font-medium text-gray-900">
                      {{ item.account_type_name }}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Transfer Amount Input -->
        <div class="flex gap-4">
          <div class="relative flex-1">
            <input
              v-model="accountTypeValue"
              type="text"
              placeholder="Enter amount"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          <button
            :class="[
              'px-8 py-3 rounded-xl font-medium transition-all duration-200',
              isButtonDisabled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            ]"
            :disabled="isButtonDisabled"
            @click="handleOkClick"
          >
            ถ่ายโอน
          </button>
        </div>

        <!-- Transaction History -->
        <div class="rounded-xl border border-gray-200 overflow-hidden">
          <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 class="font-medium text-gray-800">การถ่ายโอนเงินล่าสุด</h3>
          </div>
          <div class="divide-y divide-gray-200">
            <div
              v-for="bankDatas in bankData"
              :key="bankDatas.account_transition_id"
              class="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
            >
              <div class="flex items-center space-x-4">
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    {{ bankDatas.account_type_name }} →
                    {{ bankDatas.account_type_from_name }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ bankDatas.account_transition_value }}
                  </p>
                </div>
              </div>
              <button
                v-if="bankDatas.account_transition_id === maxAccountTypeId"
                @click="deleteTransection(bankDatas.account_transition_id)"
                class="p-2 rounded-full hover:bg-red-50 text-red-600 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from "vue";
const columnOneSelected = ref(null); //จากคอลัมน์ที่ 1
const columnTwoSelected = ref(null); //จากคอลัมน์ที่ 2
const accountTypeValue = ref(0);
const bankData = ref([]);
const { $axios } = useNuxtApp();

const { formatNumber } = useFormatNumber();

const maxAccountTypeId = computed(() => {
  return Math.max(...bankData.value.map((item) => item.account_transition_id));
});

const catData = ref([]);

const formData = ref({
  account_type_id: "",
  account_type_from_id: "",
  account_transition_value: "",
});

const value_money = (params_value_type_sum) => {
  console.log(params_value_type_sum);
};

const columnValue = ref([]);

function setColumnValue(value) {
  const test = value.account_type_total;
  columnValue.value = test;
  console.log(columnValue);
}

const isButtonDisabled = computed(() => {
  return (
    (columnOneSelected.value &&
      columnTwoSelected.value &&
      columnOneSelected.value.account_type_id ===
        columnTwoSelected.value.account_type_id) ||
    accountTypeValue.value < 0 ||
    accountTypeValue.value === 0 ||
    accountTypeValue.value === null ||
    accountTypeValue.value === undefined ||
    accountTypeValue.value === "" ||
    accountTypeValue.value > columnValue.value
  );
});

const fetchCat = async () => {
  try {
    const res = await $axios.get("/get_type_from_id");
    if (!res.status === 200 || !res.status === 201)
      throw new Error("Network response was not ok");
    const data = await res.data;
    // console.log(data);
    catData.value = data.result;
  } catch (error) {
    console.error("Error fetching transition:", error);
  }
};

let intervalId;

onMounted(async () => {
  await Promise.all([fetchCat(), bankTransition()]);

  intervalId = setInterval(() => {
    fetchCat();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

const toggleColumnOne = (type) => {
  //เลือกข้อมูลจากคอลัมน์ที่ 1 สามารถยกเลิกได้
  const test = type.account_type_total;
  console.log(test);
  if (
    columnOneSelected.value &&
    columnOneSelected.value.account_type_id === type.account_type_id
  ) {
    columnOneSelected.value = null;
    accountTypeValue.value = 0;
  } else {
    columnOneSelected.value = type;
    accountTypeValue.value = type.account_type_total;
  }
  console.log(
    "จากต้นทาง =" +
      columnOneSelected.value?.account_type_id +
      "ถึงปลายทาง =" +
      columnTwoSelected.value?.account_type_id +
      "จำนวนเงิน = " +
      accountTypeValue.value
  );
};

const toggleColumnTwo = (type) => {
  //เลือกข้อมูลจากคอลัมน์ที่ 2 สามารถยกเลิกได้
  if (
    columnTwoSelected.value &&
    columnTwoSelected.value.account_type_id === type.account_type_id
  ) {
    columnTwoSelected.value = null;
  } else {
    columnTwoSelected.value = type;
  }
  console.log(columnTwoSelected.value.account_type_id);
  console.log(
    "จากต้นทาง =" +
      columnOneSelected.value?.account_type_id +
      "ถึงปลายทาง =" +
      columnTwoSelected.value?.account_type_id +
      "จำนวนเงิน = " +
      accountTypeValue.value
  );
};
// formattedValue
watch(accountTypeValue, (newValue, oldValue) => {
  const numericValue = String(newValue).replace(/,/g, ""); // แปลงให้เป็น string ก่อน
  if (!isNaN(numericValue) && numericValue !== "") {
    accountTypeValue.value = Number(numericValue).toLocaleString("en-US");
  }
});
// -------------------------------------------------------------------------------------

const handleOkClick = async () => {
  const cleanNumericValue = accountTypeValue.value.replace(/,/g, "");
  formData.value = {
    account_type_id: columnOneSelected.value.account_type_id,
    account_type_from_id: columnTwoSelected.value.account_type_id,
    account_transition_value: parseInt(cleanNumericValue), // Access the value directly
    account_category_id: 7,
  };

  console.log("affter : => " + typeof parseInt(cleanNumericValue));

  try {
    // Send data to the API
    const response = await $axios.post("/bank_trantisionInsert", {
      account_type_id: formData.value.account_type_id,
      account_type_from_id: formData.value.account_type_from_id,
      account_category_id: formData.value.account_category_id,
      account_transition_value: formData.value.account_transition_value,
    });

    if (!response.status === 200 || !response.status === 201) {
      throw new Error("Network response was not ok");
    }
    await bankTransition();
    clearcase(); // Fetch new menu data
  } catch (err) {
    err.value = "Error updating data: " + err.message; // Set error
    console.error("Error updating data:", err);
  }
};

// debug get data bank transition
const bankTransition = async () => {
  try {
    const response = await $axios.get(`/transition_bank`);
    const data = await response.data;
    bankData.value = data.data_transition_bank;
  } catch (error) {
    console.error("Error fetching transition group One:", error);
  }
};

const deleteTransection = async (id) => {
  try {
    await $axios.patch(`/return_transition_bank`);
    //console.log(`Transaction ${id} deleted successfully`);
    await bankTransition(); // ดึงข้อมูลใหม่หลังจากลบ
  } catch (error) {
    console.log("Error deleting transaction:", error);
  }
};

const clearcase = () => {
  formData.value = "";
  columnOneSelected.value = null; //จากคอลัมน์ที่ 1
  columnTwoSelected.value = null; //จากคอลัมน์ที่ 2
  accountTypeValue.value = 0;
};
</script>
