<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Controls -->
      <div class="mb-6 flex justify-between items-center">
        <div class="flex gap-4">
          <button
            @click="toggleZeroSumVisibility"
            class="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-20 hover:text-black rounded-sm transition-colors duration-200"
          >
            {{ showZeroSum ? "ซ่อน" : "แสดง" }}
            <span class="ml-2">รายการ</span>
          </button>
          <button
            @click="gotoGrap"
            class="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-20 hover:text-black rounded-sm transition-colors duration-200"
          >
            Graph
          </button>
          <button
            @click="gotoReport"
            class="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-20 hover:text-black rounded-sm transition-colors duration-200"
          >
            Report
          </button>
        </div>
      </div>

      <!-- Main Table -->
      <div
        class="bg-white rounded-sm border border-gray-200 overflow-hidden mb-20"
      >
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <!-- Table Header -->
            <!-- Table Header -->
            <thead>
              <tr class="">
                <th
                  class="px-6 py-4 text-sm font-semibold text-gray-900 border-b"
                >
                  รายการทั้งหมด
                </th>
                <th
                  class="px-6 py-4 text-sm font-semibold text-gray-900 border-b text-center"
                >
                  DR (สินทรัพย์, รายจ่าย)
                </th>
                <th
                  class="px-6 py-4 text-sm font-semibold text-gray-900 border-b text-center"
                >
                  CR (หนี้สิน, ทุน, รายได้)
                </th>
                <th
                  class="px-6 py-4 text-sm font-semibold text-gray-900 border-b text-center"
                >
                  DR (เฉพาะสินทรัพย์)
                </th>
                <th
                  class="px-6 py-4 text-sm font-semibold text-gray-900 border-b text-center"
                >
                  CR (เฉพาะหนี้สิน/ทุน)
                </th>
                <th
                  class="px-6 py-4 text-sm font-semibold text-gray-900 border-b text-center"
                >
                  DR (เฉพาะรายจ่าย)
                </th>
                <th
                  class="px-6 py-4 text-sm font-semibold text-gray-900 border-b text-center"
                >
                  CR (เฉพาะรายได้)
                </th>
              </tr>
            </thead>

            <!-- Table Body -->
            <tbody>
              <tr
                v-for="(type_sum, index) in datatype_sum"
                :key="type_sum.account_type_name"
                :class="[
                  'transition-colors duration-200',
                  {
                    'bg-yellow-50 hover:bg-yellow-100':
                      [1, 6, 7].includes(type_sum.account_category_id) &&
                      index % 2 === 0,
                    'bg-yellow-100 hover:bg-yellow-200':
                      [1, 6, 7].includes(type_sum.account_category_id) &&
                      index % 2 !== 0,
                    'bg-purple-50 hover:bg-purple-100':
                      type_sum.account_category_id == 2 && index % 2 === 0,
                    'bg-purple-100 hover:bg-purple-200':
                      type_sum.account_category_id == 2 && index % 2 !== 0,
                    'bg-blue-50 hover:bg-blue-100':
                      type_sum.account_category_id == 3 && index % 2 === 0,
                    'bg-blue-100 hover:bg-blue-200':
                      type_sum.account_category_id == 3 && index % 2 !== 0,
                    'bg-green-50 hover:bg-green-100':
                      type_sum.account_category_id == 4 && index % 2 === 0,
                    'bg-green-100 hover:bg-green-200':
                      type_sum.account_category_id == 4 && index % 2 !== 0,
                    'bg-pink-50 hover:bg-pink-100':
                      type_sum.account_category_id == 5 && index % 2 === 0,
                    'bg-pink-100 hover:bg-pink-200':
                      type_sum.account_category_id == 5 && index % 2 !== 0,
                  },
                ]"
              >
                <!-- Account Name Column -->
                <td class="px-6 py-4 border-r">
                  <div class="flex items-center">
                    <span class="font-medium">{{
                      type_sum.account_type_name
                    }}</span>
                    <span class="ml-2 text-sm text-gray-500"
                      >({{ type_sum.account_category_id }})</span
                    >
                  </div>
                </td>

                <!-- DR Column 1 -->
                <td class="px-6 py-4 border-r text-right">
                  <div
                    v-if="
                      type_sum.account_category_id == 1 ||
                      type_sum.account_category_id == 5 ||
                      type_sum.account_category_id == 6 ||
                      type_sum.account_category_id == 7
                    "
                    class="font-medium"
                  >
                    {{ formatNumber(type_sum.account_type_sum) }}
                  </div>
                </td>

                <!-- CR Column 1 -->
                <td class="px-6 py-4 border-r text-right">
                  <div
                    v-if="
                      type_sum.account_category_id >= 2 &&
                      type_sum.account_category_id <= 4
                    "
                    class="font-medium"
                  >
                    {{ formatNumber(type_sum.account_type_sum) }}
                  </div>
                </td>

                <!-- DR Column 2 -->
                <td class="px-6 py-4 border-r text-right">
                  <div
                    v-if="
                      type_sum.account_category_id == 1 ||
                      type_sum.account_category_id == 6 ||
                      type_sum.account_category_id == 7
                    "
                    class="font-medium"
                  >
                    {{ formatNumber(type_sum.account_type_sum) }}
                  </div>
                </td>

                <!-- CR Column 2 -->
                <td class="px-6 py-4 border-r text-right">
                  <div
                    v-if="
                      type_sum.account_category_id == 2 ||
                      type_sum.account_category_id == 3
                    "
                    class="font-medium"
                  >
                    {{ formatNumber(type_sum.account_type_sum) }}
                  </div>
                </td>

                <!-- DR Column 3 -->
                <td class="px-6 py-4 border-r text-right">
                  <div
                    v-if="type_sum.account_category_id == 5"
                    class="font-medium"
                  >
                    {{ formatNumber(type_sum.account_type_sum) }}
                  </div>
                </td>

                <!-- CR Column 3 -->
                <td class="px-6 py-4 border-r text-right">
                  <div
                    v-if="type_sum.account_category_id == 4"
                    class="font-medium"
                  >
                    {{ formatNumber(type_sum.account_type_sum) }}
                  </div>
                </td>
              </tr>

              <!-- Summary Row -->
              <tr class="bg-gray-50 border-t-2 border-gray-200">
                <td class="px-6 py-4 font-semibold">สรุปผลบัญชี</td>

                <!-- Column 1: DR สินทรัพย์/รายจ่าย -->
                <td class="px-6 py-4 text-right font-semibold">
                  {{ formatNumber(sumColumn1) }}
                  <div class="text-xs text-gray-500">
                    รวมสินทรัพย์ + รายจ่าย
                  </div>
                </td>

                <!-- Column 2: CR หนี้สิน/ทุน/รายได้ -->
                <td class="px-6 py-4 text-right font-semibold">
                  {{ formatNumber(sumColumn2) }}
                  <div class="text-xs text-gray-500">
                    รวม หนี้สิน + ทุน + รายได้
                  </div>
                </td>

                <!-- Column 3: DR เฉพาะสินทรัพย์ -->
                <td class="px-6 py-4 text-right font-semibold">
                  {{ formatNumber(sumColumn3) }}
                  <div class="text-xs text-gray-500">เฉพาะสินทรัพย์</div>
                </td>

                <!-- Column 4: CR หนี้สิน/ทุน -->
                <td class="px-6 py-4 text-right font-semibold">
                  {{ formatNumber(sumColumn4) }}
                  <div class="text-xs text-gray-500">เฉพาะหนี้สิน + ทุน</div>
                </td>

                <!-- Column 5: DR เฉพาะรายจ่าย -->
                <td class="px-6 py-4 text-right font-semibold">
                  {{ formatNumber(sumColumn5) }}
                  <div class="text-xs text-gray-500">เฉพาะรายจ่าย</div>
                </td>

                <!-- Column 6: CR เฉพาะรายได้ -->
                <td class="px-6 py-4 text-right font-semibold">
                  {{ formatNumber(sumColumn6) }}
                  <div class="text-xs text-gray-500">เฉพาะรายได้</div>
                </td>
              </tr>

              <!-- Difference Row -->
              <!-- Difference Row -->
              <tr class="bg-gray-50">
                <template v-if="sumColumn4 - sumColumn3 < 0">
                  <td class="px-6 py-4 font-semibold text-green-600">
                    ได้กำไร
                  </td>
                </template>
                <template v-else-if="sumColumn4 - sumColumn3 > 0">
                  <td class="px-6 py-4 font-semibold text-red-600">ขาดทุน</td>
                </template>
                <template v-else>
                  <td class="px-6 py-4 font-semibold">กำไร-ขาดทุน</td>
                </template>

                <!-- ผลต่าง Column 1 -->
                <td class="px-6 py-4 text-right">
                  <div class="font-medium text-red-600">
                    {{ formatNumber(sumColumn1 - sumColumn2) }}
                  </div>
                  <div class="text-xs text-gray-500">
                    สินทรัพย์ - หนี้สิน/ทุน/รายได้
                  </div>
                </td>

                <!-- ผลต่าง Column 2 -->
                <td class="px-6 py-4 text-right">
                  <div class="font-medium text-red-600">
                    {{ formatNumber(sumColumn2 - sumColumn1) }}
                  </div>
                  <div class="text-xs text-gray-500">
                    หนี้สิน/ทุน/รายได้ - สินทรัพย์
                  </div>
                </td>

                <!-- ผลต่าง Column 3 vs 4 -->
                <td class="px-6 py-4 text-right">
                  <div
                    v-if="sumColumn3 - sumColumn4 < 0"
                    class="font-medium text-red-600"
                  >
                    {{ formatNumber(Math.abs(sumColumn3 - sumColumn4)) }}
                  </div>

                  <div
                    v-if="sumColumn3 - sumColumn4 < 0"
                    class="text-xs text-gray-500"
                  >
                    สินทรัพย์ - หนี้สิน/ทุน
                  </div>
                </td>

                <td class="px-6 py-4 text-right">
                  <div
                    v-if="sumColumn4 - sumColumn3 < 0"
                    class="font-medium text-green-600"
                  >
                    {{ formatNumber(Math.abs(sumColumn4 - sumColumn3)) }}
                  </div>
                  <div
                    v-if="sumColumn4 - sumColumn3 < 0"
                    class="text-xs text-gray-500"
                  >
                    หนี้สิน/ทุน - สินทรัพย์
                  </div>
                </td>

                <!-- ผลต่าง Column 5 vs 6 -->
                <td class="px-6 py-4 text-right">
                  <div
                    v-if="sumColumn5 - sumColumn6 < 0"
                    class="font-medium text-green-600"
                  >
                    {{ formatNumber(Math.abs(sumColumn5 - sumColumn6)) }}
                  </div>
                  <div
                    v-if="sumColumn5 - sumColumn6 < 0"
                    class="text-xs text-gray-500"
                  >
                    รายจ่าย - รายได้
                  </div>
                </td>

                <td class="px-6 py-4 text-right">
                  <div
                    v-if="sumColumn6 - sumColumn5 < 0"
                    class="font-medium text-red-600"
                  >
                    {{ formatNumber(Math.abs(sumColumn6 - sumColumn5)) }}
                  </div>
                  <div
                    v-if="sumColumn6 - sumColumn5 < 0"
                    class="text-xs text-gray-500"
                  >
                    รายได้ - รายจ่าย
                  </div>
                </td>
              </tr>
              <!-- Total Row (Sum of Summary + Difference) -->
              <tr class="bg-gray-100 border-t-2 border-gray-300">
                <td class="px-6 py-4 font-semibold">รวมสุทธิ</td>

                <!-- Column 1 -->
                <td class="px-6 py-4 text-right font-bold text-blue-700">
                  {{ formatNumber(sumColumn1 + (sumColumn1 - sumColumn2)) }}
                </td>

                <!-- Column 2 -->
                <td class="px-6 py-4 text-right font-bold text-blue-700">
                  {{ formatNumber(sumColumn2 + (sumColumn2 - sumColumn1)) }}
                </td>

                <!-- Column 3 -->
                <td class="px-6 py-4 text-right font-bold text-blue-700">
                  {{
                    formatNumber(
                      sumColumn3 +
                        (sumColumn3 - sumColumn4 < 0
                          ? Math.abs(sumColumn3 - sumColumn4)
                          : 0)
                    )
                  }}
                </td>

                <!-- Column 4 -->
                <td class="px-6 py-4 text-right font-bold text-blue-700">
                  {{
                    formatNumber(
                      sumColumn4 +
                        (sumColumn4 - sumColumn3 < 0
                          ? Math.abs(sumColumn4 - sumColumn3)
                          : 0)
                    )
                  }}
                </td>

                <!-- Column 5 -->
                <td class="px-6 py-4 text-right font-bold text-blue-700">
                  {{
                    formatNumber(
                      sumColumn5 +
                        (sumColumn5 - sumColumn6 < 0
                          ? Math.abs(sumColumn5 - sumColumn6)
                          : 0)
                    )
                  }}
                </td>

                <!-- Column 6 -->
                <td class="px-6 py-4 text-right font-bold text-blue-700">
                  {{
                    formatNumber(
                      sumColumn6 +
                        (sumColumn6 - sumColumn5 < 0
                          ? Math.abs(sumColumn6 - sumColumn5)
                          : 0)
                    )
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <button @click="closeAccount()">click me</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const { formatNumber } = useFormatNumber();
const router = useRouter();
const datatype_sum = ref([]);
const showZeroSum = ref(true);
const error = ref("");
const { $axios } = useNuxtApp();
const loading = ref(true);

const fetchType = async () => {
  try {
    if (showZeroSum.value) {
      const response = await $axios.get("/dasktop_data_sumtype");
      datatype_sum.value = response.data.account_type_sum || [];
      loading.value = false;
    } else {
      const response = await $axios.get("/dasktop_data_sumzero");
      datatype_sum.value = response.data.account_type_sum || [];
    }
  } catch (err) {
    error.value = "Error fetching transitions: " + err.message;
  }
};

const gotoGrap = async () => {
  router.push("/graph");
};
const gotoReport = async () => {
  router.push("/report");
};

onMounted(() => {
  fetchType();
});

const toggleZeroSumVisibility = () => {
  showZeroSum.value = !showZeroSum.value;
  fetchType();
};

const sumColumn1 = computed(() =>
  datatype_sum.value
    .filter(
      (type_sum) =>
        type_sum.account_category_id === 1 ||
        type_sum.account_category_id === 5 ||
        type_sum.account_category_id === 6 ||
        type_sum.account_category_id === 7
    )
    .reduce((acc, curr) => acc + parseFloat(curr.account_type_sum || 0), 0)
);

const sumColumn2 = computed(() =>
  datatype_sum.value
    .filter(
      (type_sum) =>
        type_sum.account_category_id === 2 ||
        type_sum.account_category_id === 3 ||
        type_sum.account_category_id === 4
    )
    .reduce((acc, curr) => acc + parseFloat(curr.account_type_sum || 0), 0)
);

const sumColumn3 = computed(() =>
  datatype_sum.value
    .filter(
      (type_sum) =>
        type_sum.account_category_id === 1 ||
        type_sum.account_category_id === 6 ||
        type_sum.account_category_id === 7
    )
    .reduce((acc, curr) => acc + parseFloat(curr.account_type_sum || 0), 0)
);

const sumColumn4 = computed(() =>
  datatype_sum.value
    .filter(
      (type_sum) =>
        type_sum.account_category_id === 2 || type_sum.account_category_id === 3
    )
    .reduce((acc, curr) => acc + parseFloat(curr.account_type_sum || 0), 0)
);

const sumColumn5 = computed(() =>
  datatype_sum.value
    .filter((type_sum) => type_sum.account_category_id === 5)
    .reduce((acc, curr) => acc + parseFloat(curr.account_type_sum || 0), 0)
);

const sumColumn6 = computed(() =>
  datatype_sum.value
    .filter((type_sum) => type_sum.account_category_id === 4)
    .reduce((acc, curr) => acc + parseFloat(curr.account_type_sum || 0), 0)
);

const closeAccount = async () => {
  try {
    console.log("Close account function called");

    const response = await $axios.post("/ExportAccount");

    if (response.status === 200) {
      alert("ปิดบัญชีสำเร็จแล้ว");
    } else {
      alert("เกิดข้อผิดพลาดในการปิดบัญชี");
    }
  } catch (err) {
    console.error("Error closing account:", err);
    alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
  }
};
</script>

