<template>
  <div class="">
    <div class="flex justify-center w-full p-4 mb-6">
      <div class="w-full max-w-4xl space-y-2">
        <div class="grid grid-cols-7 gap-4">
          <!-- Left Column: Looping Buttons -->
          <div class="flex flex-col col-span-3">
            <div
              v-for="item in catData"
              :key="item.account_type_id"
              class="mb-2"
            >
              <button
                v-if="item.account_type_total > 0"
                :class="[
                  'hover:bg-green-500 focus:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200 ease-in-out rounded-lg shadow-md w-[100%]',
                  columnOneSelected &&
                  columnOneSelected.account_type_id === item.account_type_id
                    ? 'bg-green-500 text-white'
                    : 'text-gray-800',
                ]"
                @click="
                  toggleColumnOne(item);
                  setColumnValue(item);
                "
              >
                <div
                  class="border border-gray-300 rounded-lg p-4 flex items-center justify-center h-full"
                >
                  <p class="font-medium text-lg truncate">
                    {{ item.account_type_name }} <br />
                    {{ item.account_type_total }}
                  </p>
                </div>
              </button>

              <button
                v-else
                :class="[
                  'transition-colors duration-200 ease-in-out rounded-lg shadow-md bg-gray-300 w-[100%]',
                  columnOneSelected &&
                  columnOneSelected.account_type_id === item.account_type_id
                    ? 'bg-green-500 text-white'
                    : 'text-gray-800',
                ]"
              >
                <div
                  class="border border-gray-300 rounded-lg p-4 flex items-center justify-center h-full py-7"
                >
                  <p class="font-medium text-lg truncate">
                    {{ item.account_type_name }}
                  </p>
                </div>
              </button>
            </div>
          </div>

          <!-- Middle Column: SVG -->
          <div class="flex items-center justify-center">
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
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>

          <!-- Right Column: Looping Buttons -->
          <div class="flex flex-col col-span-3">
            <div
              v-for="item in catData"
              :key="item.account_type_id"
              class="mb-2"
            >
              <button
                :class="[
                  'hover:bg-blue-500 focus:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ease-in-out rounded-lg shadow-md w-[100%]',
                  columnTwoSelected &&
                  columnTwoSelected.account_type_id === item.account_type_id
                    ? 'bg-blue-500 text-white'
                    : columnOneSelected &&
                      columnOneSelected.account_type_id === item.account_type_id
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300'
                    : 'text-gray-800',
                ]"
                :disabled="
                  columnOneSelected &&
                  columnOneSelected.account_type_id === item.account_type_id
                "
                @click="toggleColumnTwo(item)"
              >
                <div
                  class="border border-gray-300 rounded-lg p-4 flex items-center justify-center h-full py-7"
                >
                  <p class="font-medium text-lg truncate">
                    {{ item.account_type_name }}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div
          class="flex border-2 border-gray-300 rounded-xl p-2 gap-2 justify-center bg-white shadow-md"
        >
          <input
            type="number"
            placeholder="ตั้งจำนวนเงิน"
            class="w-1/2 text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-xl outline-blue-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ease-in-out"
            v-model="accountTypeValue"
          />
          <button
            :class="[
              'flex w-1/2 bg-blue-400 text-white font-bold border-2 border-blue-400 px-4 py-3 rounded-xl justify-center hover:bg-blue-500 focus:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ease-in-out',
              isButtonDisabled
                ? 'bg-gray-300 border-gray-300 cursor-not-allowed hover:bg-gray-300'
                : '',
            ]"
            :disabled="isButtonDisabled"
            @click="handleOkClick"
          >
            เพิ่ม
          </button>
        </div>
        <div class="bg-white rounded-lg shadow-md p-4">
          <table class="table-auto w-full">
            <thead>
              <tr>
                <th
                  class="border-b border-gray-300 pb-2 text-left text-gray-800 font-medium"
                >
                  ต้นทาง
                </th>
                <th
                  class="border-b border-gray-300 pb-2 text-left text-gray-800 font-medium"
                >
                  ปลายทาง
                </th>
                <th
                  class="border-b border-gray-300 pb-2 text-left text-gray-800 font-medium"
                >
                  จำนวนเงิน
                </th>
                <th
                  class="border-b border-gray-300 pb-2 text-left text-gray-800 font-medium"
                >
                  ลบรายการ
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="bankDatas in bankData"
                :key="bankDatas.account_transition_id"
                class="border-b border-gray-300 hover:bg-gray-100 transition-colors duration-200 ease-in-out"
              >
                <td class="py-3 text-gray-800">
                  {{ bankDatas.account_type_name }}
                </td>
                <td class="py-3 text-gray-800">
                  {{ bankDatas.account_type_from_name }}
                </td>
                <td class="text-gray-800">
                  {{ bankDatas.account_transition_value }}
                </td>
                <td class="flex ml-4 mt-1 items-center p-1">
                  <div
                    class="font-bold text-green-700 flex items-center justify-center  gap-3"
                  >
                    <button
                      v-if="
                        bankDatas.account_transition_id === maxAccountTypeId
                      "
                      class="bg-white w-8 h-8 rounded-full "
                      @click="
                        deleteTransection(bankDatas.account_transition_id)
                      "
                    >
                      ❌
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
    const res = await fetch("https://api-accountapp.onrender.com/api/get_type_from_id");
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
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

const handleOkClick = async () => {
  formData.value = {
    account_type_id: columnOneSelected.value.account_type_id,
    account_type_from_id: columnTwoSelected.value.account_type_id,
    account_transition_value: parseInt(accountTypeValue.value), // Access the value directly
    account_category_id: 1,
  };

  try {
    // Send data to the API
    const response = await fetch(
      "https://api-accountapp.onrender.com/api/bank_trantisionInsert",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure the content type is set
        },
        body: JSON.stringify(formData.value), // Stringify the body
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    await bankTransition();
    clearcase(); // Fetch new menu data
  } catch (err) {
    err.value = "Error updating data: " + err.message; // Set error
    console.error("Error updating data:", err);
  }
};

const bankTransition = async () => {
  try {
    const response = await fetch(`https://api-accountapp.onrender.com/api/transition_bank`);
    const data = await response.json();
    bankData.value = data.data_transition_bank;
  } catch (error) {
    console.error("Error fetching transition group One:", error);
  }
};

const deleteTransection = async (id) => {
  try {
    await $fetch(`https://api-accountapp.onrender.com/api/reuse_transition_bank/${id}`, {
      method: "DELETE",
    });
    //console.log(`Transaction ${id} deleted successfully`);
    await bankTransition(); // ดึงข้อมูลใหม่หลังจากลบ
  } catch (error) {
    console.error("Error deleting transaction:", error);
  }
};

const clearcase = () => {
  formData.value = "";
  columnOneSelected.value = null; //จากคอลัมน์ที่ 1
  columnTwoSelected.value = null; //จากคอลัมน์ที่ 2
  accountTypeValue.value = 0;
};
</script>
