<template>
  <div class="min-h-screen py-8 px-4">
    <div
      class="mx-auto rounded-md bg-white border border-gray-200 overflow-hidden"
    >
      <h2 class="text-2xl font-semibold p-3 rounded-sm">คืนเงินให้เจ้าหนี้</h2>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-7 gap-6 mb-8">
          <div class="md:col-span-3 space-y-3">
            <h3
              class="text-lg font-medium text-gray-700 mb-3 flex items-center"
            >
              <span
                class="inline-flex items-center justify-center bg-green-100 w-6 h-6 rounded-full mr-2 text-green-600 text-sm"
                >1</span
              >
              เลือกบัญชี
            </h3>
            <div class="space-y-3">
              <div
                v-for="item in catData"
                :key="item.account_type_id"
                class="transition-all duration-200"
              >
                <button
                  :class="[
                    'w-full transition-all duration-200 border rounded-xl overflow-hidden shadow-sm hover:shadow focus:outline-none',
                    columnOneSelected &&
                    columnOneSelected.account_type_id === item.account_type_id
                      ? 'border-green-500 ring-2 ring-green-200'
                      : 'border-gray-200 hover:border-green-300',
                  ]"
                  @click="
                    toggleColumnOne(item);
                    setColumnValue(item);
                  "
                >
                  <div class="flex items-center p-4">
                    <div class="flex-shrink-0 mr-4">
                      <div
                        :class="[
                          'w-12 h-12 rounded-full flex items-center justify-center',
                          columnOneSelected &&
                          columnOneSelected.account_type_id ===
                            item.account_type_id
                            ? 'bg-green-500 text-white'
                            : 'bg-green-100 text-green-600',
                        ]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="flex-1">
                      <p class="font-medium">{{ item.account_type_name }}</p>
                      <p
                        :class="[
                          'text-lg font-semibold',
                          columnOneSelected &&
                          columnOneSelected.account_type_id ===
                            item.account_type_id
                            ? 'text-green-600'
                            : 'text-gray-700',
                        ]"
                      >
                        {{ item.account_type_total }}
                      </p>
                    </div>
                    <div class="flex-shrink-0 ml-2">
                      <div
                        v-if="
                          columnOneSelected &&
                          columnOneSelected.account_type_id ===
                            item.account_type_id
                        "
                        class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!-- Middle Column: Arrow -->
          <div class="hidden md:flex items-center justify-center">
            <div class="p-3 bg-gray-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>

          <!-- Right Column: To Accounts -->
          <div class="md:col-span-3 space-y-3">
            <h3
              class="text-lg font-medium text-gray-700 mb-3 flex items-center"
            >
              <span
                class="inline-flex items-center justify-center bg-blue-100 w-6 h-6 rounded-full mr-2 text-blue-600 text-sm"
                >2</span
              >
              คืนไปยังเจ้าหนี้ที่ต้องการ
            </h3>
            <div class="space-y-3">
              <div
                v-for="item in creditor"
                :key="item.account_type_id"
                class="transition-all duration-200"
              >
                <button
                  :class="[
                    'w-full transition-all duration-200 border rounded-xl overflow-hidden shadow-sm focus:outline-none',
                    columnTwoSelected &&
                    columnTwoSelected.account_type_id === item.account_type_id
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : columnOneSelected &&
                        columnOneSelected.account_type_id ===
                          item.account_type_id
                      ? 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-60'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow',
                  ]"
                  @click="toggleColumnTwo(item)"
                  :disabled="
                    columnOneSelected &&
                    columnOneSelected.account_type_id === item.account_type_id
                  "
                >
                  <div class="flex items-center p-4">
                    <div class="flex-shrink-0 mr-4">
                      <div
                        :class="[
                          'w-12 h-12 rounded-full flex items-center justify-center',
                          columnTwoSelected &&
                          columnTwoSelected.account_type_id ===
                            item.account_type_id
                            ? 'bg-blue-500 text-white'
                            : columnOneSelected &&
                              columnOneSelected.account_type_id ===
                                item.account_type_id
                            ? 'bg-gray-200 text-gray-400'
                            : 'bg-blue-100 text-blue-600',
                        ]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="flex-1">
                      <p class="font-medium">{{ item.account_type_name }}</p>
                      <p
                        :class="[
                          'text-lg font-semibold',
                          columnTwoSelected &&
                          columnTwoSelected.account_type_id ===
                            item.account_type_id
                            ? 'text-blue-600'
                            : columnOneSelected &&
                              columnOneSelected.account_type_id ===
                                item.account_type_id
                            ? 'text-gray-400'
                            : 'text-gray-700',
                        ]"
                      >
                        {{ item.account_type_total }}
                      </p>
                    </div>
                    <div class="flex-shrink-0 ml-2">
                      <div
                        v-if="
                          columnTwoSelected &&
                          columnTwoSelected.account_type_id ===
                            item.account_type_id
                        "
                        class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Amount Entry & Submit -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-700 mb-3 flex items-center">
            <span
              class="inline-flex items-center justify-center bg-purple-100 w-6 h-6 rounded-full mr-2 text-purple-600 text-sm"
              >3</span
            >
            ใส่จำนวนเงิน
          </h3>
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="relative flex-1">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
              >
                <span class="text-gray-500">฿</span>
              </div>
              <input
                type="number"
                placeholder="ใส่จำนวนเงิน..."
                class="w-full pl-10 pr-4 py-3 text-gray-800 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                v-model="accountTypeValue"
              />
            </div>
            <button
              :class="[
                'py-3 px-6 rounded-xl font-medium text-white shadow-sm transition-all duration-200 flex items-center justify-center min-w-32',
                isButtonDisabled
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              ]"
              :disabled="isButtonDisabled"
              @click="handleOkClick"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              คืนเลย
            </button>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div
          class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow"
        >
          <div
            class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between"
          >
            <h3 class="font-medium text-gray-800 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 mr-2 text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                />
              </svg>
              ประวัติการทำรายการ
            </h3>
            <span
              class="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full"
            >
              {{ bankData?.length || 0 }} จำนวนการทำรายการ
            </span>
          </div>
          <div class="divide-y divide-gray-100">
            <div
              v-for="bankDatas in bankData"
              :key="bankDatas.account_transition_id"
              class="px-6 py-4 flex items-center justify-between transition-colors duration-200 hover:bg-gray-50"
            >
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <div
                    class="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"
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
                        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <p
                    class="text-sm font-medium text-gray-900 flex items-center"
                  >
                    <span class="font-semibold">{{
                      bankDatas.account_type_name
                    }}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="w-4 h-4 mx-1 text-gray-400"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="font-semibold">{{
                      bankDatas.account_type_from_name
                    }}</span>
                  </p>
                  <div class="flex items-center mt-1">
                    <span
                      class="inline-flex items-center text-sm font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded"
                    >
                      ฿{{ bankDatas.account_transition_value }}
                    </span>
                    <span class="text-xs text-gray-500 ml-2">
                      Transaction #{{ bankDatas.account_transition_id }}
                    </span>
                  </div>
                </div>
              </div>
              <button
                v-if="bankDatas.account_transition_id === maxAccountTypeId"
                @click="deleteTransection(bankDatas.account_transition_id)"
                class="p-2 rounded-full hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-200"
                title="Delete transaction"
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
              <div v-else class="w-9"></div>
            </div>

            <!-- Empty state -->
            <div
              v-if="!bankData || bankData.length === 0"
              class="px-6 py-12 text-center"
            >
              <div
                class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-8 h-8 text-gray-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              </div>
              <p class="text-gray-600 mb-1">ไม่มีการทำรายการ</p>
              <p class="text-sm text-gray-500">รายการธุรกรรมจะแสดงที่ตรงนี้</p>
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

const maxAccountTypeId = computed(() => {
  return Math.max(...bankData.value.map((item) => item.account_transition_id));
});

const catData = ref([]);

const formData = ref({
  account_type_id: "",
  account_type_from_id: "",
  account_transition_value: "",
});

const columnValue = ref([]);

function setColumnValue(value) {
  const test = value.account_type_total;
  columnValue.value = test;
}

const creditor = ref([]);

let intervalId;
const startInterval = () => {
  intervalId = setInterval(() => {
    fetchCat();
    fetchCreditor();
  }, 3000);
};

const stopInterval = () => {
  clearInterval(intervalId);
};

const toggleColumnOne = (type) => {
  const test = type.account_type_total;
  if (
    columnOneSelected.value &&
    columnOneSelected.value.account_type_id === type.account_type_id
  ) {
    columnOneSelected.value = null;
    accountTypeValue.value = 0;
  } else {
    columnOneSelected.value = type;
  }
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
    accountTypeValue.value = parseInt(
      columnTwoSelected.value.account_type_total
    );
  }
};

const handleOkClick = async () => {
  formData.value = {
    account_type_id: columnOneSelected.value.account_type_id,
    account_type_from_id: columnTwoSelected.value.account_type_id,
    account_transition_value: parseFloat(accountTypeValue.value), // Access the value directly
    account_category_id: 1,
  };

  try {
    // Send data to the API
    const response = await $axios.post("/bank_return", {
      account_type_id: columnOneSelected.value.account_type_id,
      account_type_from_id: columnTwoSelected.value.account_type_id,
      account_transition_value: parseFloat(accountTypeValue.value), // Access the value directly
      account_category_id: 1,
    });

    if (!response.status === 200 || !response.status === 201) {
      throw new Error("Network response was not ok");
    }
    await bankTransition(); // ดึงข้อมูลใหม่หลังจากลบ
    await fetchCreditor(); // ดึงข้อมูลใหม่หลังจากลบ
    await fetchCat(); // ดึงข้อมูลใหม่หลังจากลบ
    clearcase(); // Fetch new menu data
  } catch (err) {
    err.value = "Error updating data: " + err.message; // Set error
    console.error("Error updating data:", err);
  }
};

const bankTransition = async () => {
  try {
    const response = await $axios.get(`/creditor_transition`);
    const data = await response.data;
    bankData.value = data.data_transition_bank;
  } catch (error) {
    console.error("Error fetching transition group One:", error);
  }
};

const clearcase = () => {
  formData.value = "";
  columnOneSelected.value = null; //จากคอลัมน์ที่ 1
  columnTwoSelected.value = null; //จากคอลัมน์ที่ 2
  accountTypeValue.value = 0;
};

const isButtonDisabled = computed(() => {
  return (
    (columnOneSelected.value &&
      columnTwoSelected.value &&
      columnOneSelected.value.account_type_id ===
        columnTwoSelected.value.account_type_id) ||
    (columnOneSelected.value &&
      columnTwoSelected.value &&
      columnOneSelected.value.account_type_total < accountTypeValue.value) ||
    (columnOneSelected.value &&
      columnTwoSelected.value &&
      columnTwoSelected.value.account_type_total < accountTypeValue.value) ||
    accountTypeValue.value < 0 ||
    accountTypeValue.value === 0 ||
    accountTypeValue.value === 0.0 ||
    accountTypeValue.value === null ||
    accountTypeValue.value === undefined ||
    accountTypeValue.value === ""
  );
});

const fetchCreditor = async () => {
  try {
    const res = await $axios.get("/get_creditor");
    if (res.status !== 200 && res.status !== 201)
      throw new Error("Network response was not ok");
    const data = await res.data;
    creditor.value = data.result;
  } catch (error) {
    console.error("Error fetching transition:", error);
  }
};
const deleteTransection = async (id) => {
  try {
    await $axios.put(`/return_creditor/${id}`);
    await bankTransition();
    await fetchCreditor();
    await fetchCat();
  } catch (error) {
    console.error("Error deleting transaction:", error);
  }
};
const fetchCat = async () => {
  try {
    const res = await $axios.get("/get_type_from_id");
    if (res.status !== 200 && res.status !== 201)
      throw new Error("Network response was not ok");
    const data = await res.data;
    catData.value = data.result;
  } catch (error) {
    console.error("Error fetching transition:", error);
  }
};
onMounted(async () => {
  await Promise.all([fetchCat(), bankTransition(), fetchCreditor()]);

  intervalId = setInterval(() => {
    fetchCat();
    fetchCreditor();
  }, 3000);
});

onMounted(() => {
  fetchCat();
  bankTransition();
  fetchCreditor();
  startInterval();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopInterval();
    } else {
      startInterval();
    }
  });
});

onBeforeUnmount(() => {
  stopInterval();
});
</script>
