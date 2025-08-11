<template>
  <div class="min-h-screen  py-2">
    <div class="max-w-md md:max-w-7xl  mx-auto flex flex-col gap-2">
      <!-- Header Controls -->
      <div class="flex justify-between items-center">
        <div class="flex gap-1">
          <button @click="toggleZeroSumVisibility"
            class="inline-flex text-xs md:text-md lg:text-lg text-nowrap items-center px-2 py-1 border-b-2 border-sky-600 text-gray-700 hover:bg-sky-20 hover:text-sky-700 transition-colors duration-200">
            {{ showZeroSum ? "ซ่อน" : "แสดง" }}
            <span class="ml-2">รายการ</span>
          </button>
          <button @click="gotoGrap"
            class="inline-flex text-xs md:text-md lg:text-lg text-nowrap items-center px-2 py-1 border-b-2 border-sky-600 text-gray-700 hover:bg-sky-20 hover:text-sky-700 transition-colors duration-200">
            ดูกราฟ
          </button>
          <button @click="gotoReport"
            class="inline-flex text-xs md:text-md lg:text-lg text-nowrap items-center px-2 py-1 border-b-2 border-sky-600 text-gray-700 hover:bg-sky-20 hover:text-sky-700 transition-colors duration-200">
            ดูตารางเเละปริ้นรายเดือน
          </button>
        </div>
        <div class="flex gap-3 items-center justify-center">
          <span class="text-xs hidden sm:block">(สามารถปิดบัญชีรายเดือนได้ที่นี้)</span>
          <button @click="closeAccount()" class="px-2 py-1 bg-sky-600 text-white rounded text-sm">
            ปิดบัญชี
          </button>
        </div>
      </div>

      <!-- Main Table -->
      <div class="bg-white rounded  overflow-hidden mb-20 container mx-auto">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse table-fixed">
            <!-- Table Header -->
            <thead>
              <tr class="">
                <th class="p-0.5 md:p-2 lg:p-3 text-xs text-center font-normal text-gray-900 border-b w-1/3 md:w-auto">
                  รายการ
                </th>
                <th
                  class="p-0.5 md:p-2 lg:p-3 text-xs text-center font-normal text-gray-900 border-b text-nowrap w-1/3 md:w-auto">
                  DR
                </th>
                <th
                  class="p-0.5 md:p-2 lg:p-3 text-xs text-center font-normal text-gray-900 border-b text-nowrap w-1/3 md:w-auto">
                  CR
                </th>
                <th
                  class="hidden md:table-cell p-0.5 md:p-2 lg:p-3 text-xs text-center font-normal text-gray-900 border-b whitespace-nowrap w-auto">
                  DR (เฉพาะสินทรัพย์)
                </th>
                <th
                  class="hidden md:table-cell p-0.5 md:p-2 lg:p-3 text-xs text-center font-normal text-gray-900 border-b text-nowrap w-auto">
                  CR (เฉพาะหนี้สิน/ทุน)
                </th>
                <th
                  class="hidden md:table-cell p-0.5 md:p-2 lg:p-3 text-xs text-center font-normal text-gray-900 border-b text-nowrap w-auto">
                  DR (เฉพาะรายจ่าย)
                </th>
                <th
                  class="hidden md:table-cell p-0.5 md:p-2 lg:p-3 text-xs text-center font-normal text-gray-900 border-b text-nowrap w-auto">
                  CR (เฉพาะรายได้)
                </th>
              </tr>
            </thead>

            <!-- Table Body -->
            <tbody>
              <tr v-for="(type_sum, index) in datatype_sum" :key="type_sum.account_type_name" :class="[
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
              ]">
                <!-- Account Name Column -->
                <td class="p-0.5 md:p-1.5 border-r text-nowrap text-xs">
                  <div class="flex items-center">
                    <span class="font-medium">{{
                      type_sum.account_type_name
                    }}</span>
                    <span class="ml-1 text-xs text-gray-500">({{ type_sum.account_category_id }})</span>
                  </div>
                </td>

                <!-- DR Column 1 -->
                <td class="p-0.5 md:p-1.5 border-r text-nowrap text-center md:text-right text-xs">
                  <div v-if="
                    type_sum.account_category_id == 1 ||
                    type_sum.account_category_id == 5 ||
                    type_sum.account_category_id == 6 ||
                    type_sum.account_category_id == 7
                  " class="font-medium">
                    {{ formatNumber(type_sum.account_type_sum) }}
                  </div>
                </td>

                <!-- CR Column 1 -->
                <td class="p-0.5 md:p-1.5 border-r text-nowrap text-center md:text-right text-xs">
                  <div v-if="
                    type_sum.account_category_id >= 2 &&
                    type_sum.account_category_id <= 4
                  " class="font-medium">
                    {{ formatNumber(type_sum.account_type_sum) }}
                  </div>
                </td>

                <!-- DR Column 2 -->
                <td class="p-0.5 md:p-1.5 border-r text-nowrap text-center md:text-right text-xs hidden md:table-cell">
                  <div v-if="
                    type_sum.account_category_id == 1 ||
                    type_sum.account_category_id == 6 ||
                    type_sum.account_category_id == 7
                  " class="font-medium">
                    {{ formatNumber(type_sum.account_type_sum) }}
                  </div>
                </td>

                <!-- CR Column 2 -->
                <td class="p-0.5 md:p-1.5 border-r text-nowrap text-center md:text-right text-xs hidden md:table-cell">
                  <div v-if="
                    type_sum.account_category_id == 2 ||
                    type_sum.account_category_id == 3
                  " class="font-medium">
                    {{ formatNumber(type_sum.account_type_sum) }}
                  </div>
                </td>

                <!-- DR Column 3 -->
                <td class="p-0.5 md:p-1.5 border-r text-nowrap text-center md:text-right text-xs hidden md:table-cell">
                  <div v-if="type_sum.account_category_id == 5" class="font-medium">
                    {{ formatNumber(type_sum.account_type_sum) }}
                  </div>
                </td>

                <!-- CR Column 3 -->
                <td class="p-0.5 md:p-1.5 border-r text-nowrap text-center md:text-right text-xs hidden md:table-cell">
                  <div v-if="type_sum.account_category_id == 4" class="font-medium">
                    {{ formatNumber(type_sum.account_type_sum) }}
                  </div>
                </td>
              </tr>

              <!-- Summary Row -->
              <tr class="bg-gray-50 border-t-2 border-gray-200">
                <td class="p-0.5 md:p-1.5 font-normal text-sm">สรุปผลบัญชี</td>

                <!-- Column 1: DR สินทรัพย์/รายจ่าย -->
                <td class="p-0.5 md:p-1.5 text-center md:text-right text-xs font-normal text-nowrap">
                  {{ formatNumber(sumColumn1) }}
                  <div class="hidden md:text-xs  md:flex md:flex md:justify-end md:justify-end  text-gray-500">
                    รวมสินทรัพย์ + รายจ่าย
                  </div>
                </td>

                <!-- Column 2: CR หนี้สิน/ทุน/รายได้ -->
                <td class="p-0.5 md:p-1.5 text-center md:text-right text-xs font-normal text-nowrap">
                  {{ formatNumber(sumColumn2) }}
                  <div class="hidden md:text-xs  md:flex md:flex md:justify-end  text-gray-500 text-nowrap">
                    รวม หนี้สิน + ทุน + รายได้
                  </div>
                </td>

                <!-- Column 3: DR เฉพาะสินทรัพย์ -->
                <td
                  class="p-0.5 md:p-1.5 text-center md:text-right text-xs font-normal text-nowrap hidden md:table-cell">
                  {{ formatNumber(sumColumn3) }}
                  <div class="text-xs text-gray-500">เฉพาะสินทรัพย์</div>
                </td>

                <!-- Column 4: CR หนี้สิน/ทุน -->
                <td
                  class="p-0.5 md:p-1.5 text-center md:text-right text-xs font-normal text-nowrap hidden md:table-cell">
                  {{ formatNumber(sumColumn4) }}
                  <div class="text-xs text-gray-500">เฉพาะหนี้สิน + ทุน</div>
                </td>

                <!-- Column 5: DR เฉพาะรายจ่าย -->
                <td
                  class="p-0.5 md:p-1.5 text-center md:text-right text-xs font-normal text-nowrap hidden md:table-cell">
                  {{ formatNumber(sumColumn5) }}
                  <div class="text-xs text-gray-500">เฉพาะรายจ่าย</div>
                </td>

                <!-- Column 6: CR เฉพาะรายได้ -->
                <td
                  class="p-0.5 md:p-1.5 text-center md:text-right text-xs font-normal text-nowrap hidden md:table-cell">
                  {{ formatNumber(sumColumn6) }}
                  <div class="text-xs text-gray-500">เฉพาะรายได้</div>
                </td>
              </tr>

              <!-- Difference Row -->
              <tr class="bg-gray-50">
                <template v-if="sumColumn4 - sumColumn3 < 0">
                  <td class="p-0.5 md:p-1.5 font-normal text-green-600">
                    ได้กำไร
                  </td>
                </template>
                <template v-else-if="sumColumn4 - sumColumn3 > 0">
                  <td class="p-0.5 md:p-1.5 font-normal text-red-600 text-sm text-nowrap">ขาดทุน</td>
                </template>
                <template v-else>
                  <td class="p-0.5 md:p-1.5 font-normal text-sm text-nowrap">กำไร-ขาดทุน</td>
                </template>

                <!-- ผลต่าง Column 1 -->
                <td class="p-0.5 md:p-1.5 text-center md:text-right text-xs text-nowrap">
                  <div class="font-medium text-red-600">
                    {{ formatNumber(sumColumn1 - sumColumn2) }}
                  </div>
                  <div class="hidden md:text-xs  md:flex md:flex md:justify-end  text-gray-500">
                    สินทรัพย์ - หนี้สิน/ทุน/รายได้
                  </div>
                </td>

                <!-- ผลต่าง Column 2 -->
                <td class="p-0.5 md:p-1.5 text-center md:text-right text-xs text-nowrap">
                  <div class="font-medium text-red-600">
                    {{ formatNumber(sumColumn2 - sumColumn1) }}
                  </div>
                  <div class="hidden md:text-xs  md:flex md:flex md:justify-end  text-gray-500">
                    หนี้สิน/ทุน/รายได้ - สินทรัพย์
                  </div>
                </td>

                <!-- ผลต่าง Column 3 vs 4 -->
                <td class="p-0.5 md:p-1.5 text-center md:text-right text-xs text-nowrap">
                  <div v-if="sumColumn3 - sumColumn4 < 0" class="font-medium text-red-600">
                    {{ formatNumber(Math.abs(sumColumn3 - sumColumn4)) }}
                  </div>

                  <div v-if="sumColumn3 - sumColumn4 < 0" class="text-xs text-gray-500">
                    สินทรัพย์ - หนี้สิน/ทุน
                  </div>
                </td>

                <td class="p-0.5 md:p-1.5 text-center md:text-right text-xs text-nowrap">
                  <div v-if="sumColumn4 - sumColumn3 < 0" class="font-medium text-green-600">
                    {{ formatNumber(Math.abs(sumColumn4 - sumColumn3)) }}
                  </div>
                  <div v-if="sumColumn4 - sumColumn3 < 0" class="text-xs text-gray-500">
                    หนี้สิน/ทุน - สินทรัพย์
                  </div>
                </td>

                <!-- ผลต่าง Column 5 vs 6 -->
                <td class="p-0.5 md:p-1.5 text-center md:text-right text-xs text-nowrap">
                  <div v-if="sumColumn5 - sumColumn6 < 0" class="font-medium text-green-600">
                    {{ formatNumber(Math.abs(sumColumn5 - sumColumn6)) }}
                  </div>
                  <div v-if="sumColumn5 - sumColumn6 < 0" class="text-xs text-gray-500">
                    รายจ่าย - รายได้
                  </div>
                </td>

                <td class="p-0.5 md:p-1.5 text-center md:text-right text-xs text-nowrap">
                  <div v-if="sumColumn6 - sumColumn5 < 0" class="font-medium text-red-600">
                    {{ formatNumber(Math.abs(sumColumn6 - sumColumn5)) }}
                  </div>
                  <div v-if="sumColumn6 - sumColumn5 < 0" class="text-xs text-gray-500">
                    รายได้ - รายจ่าย
                  </div>
                </td>
              </tr>
              <!-- Total Row (Sum of Summary + Difference) -->
              <tr class="bg-gray-100 border-t-2 border-gray-300">
                <td class="p-0.5 md:p-1.5 font-normal text-xs">รวมสุทธิ</td>

                <!-- Column 1 -->
                <td class="p-0.5 md:p-1.5 text-center md:text-right text-xs font-bold text-blue-700">
                  {{ formatNumber(sumColumn1 + (sumColumn1 - sumColumn2)) }}
                </td>

                <!-- Column 2 -->
                <td class="p-0.5 md:p-1.5 text-center md:text-right text-xs font-bold text-blue-700">
                  {{ formatNumber(sumColumn2 + (sumColumn2 - sumColumn1)) }}
                </td>

                <!-- Column 3 -->
                <td
                  class="p-0.5 md:p-1.5 text-center md:text-right text-xs font-bold text-blue-700 hidden md:table-cell">
                  {{
                    formatNumber(
                      sumColumn3 +
                      (sumColumn3 - sumColumn4 < 0 ? Math.abs(sumColumn3 - sumColumn4) : 0)) }} </td>

                    <!-- Column 4 -->
                <td
                  class="p-0.5 md:p-1.5 text-center md:text-right text-xs font-bold text-blue-700 hidden md:table-cell">
                  {{
                    formatNumber(
                      sumColumn4 +
                      (sumColumn4 - sumColumn3 < 0 ? Math.abs(sumColumn4 - sumColumn3) : 0)) }} </td>

                    <!-- Column 5 -->
                <td
                  class="p-0.5 md:p-1.5 text-center md:text-right text-xs font-bold text-blue-700 hidden md:table-cell">
                  {{
                    formatNumber(
                      sumColumn5 +
                      (sumColumn5 - sumColumn6 < 0 ? Math.abs(sumColumn5 - sumColumn6) : 0)) }} </td>

                    <!-- Column 6 -->
                <td
                  class="p-0.5 md:p-1.5 text-center md:text-right text-xs font-bold text-blue-700 hidden md:table-cell">
                  {{
                    formatNumber(
                      sumColumn6 +
                      (sumColumn6 - sumColumn5 < 0 ? Math.abs(sumColumn6 - sumColumn5) : 0)) }} </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAlert } from "~/composables/showAlert";
const { showAlert } = useAlert();
const { formatNumber } = useFormatNumber();
const router = useRouter();
const datatype_sum = ref([]);
const showZeroSum = ref(true);
const error = ref("");
const { api } = useApi();
const loading = ref(true);

const fetchType = async () => {
  try {
    if (showZeroSum.value) {
      const response = await api.get("/dasktop_data_sumtype");
      datatype_sum.value = response.data.account_type_sum || [];
      loading.value = false;
    } else {
      const response = await api.get("/dasktop_data_sumzero");
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
    await api.post("/ExportAccount");
    showAlert("ปิดบัญชีสำเร็จแล้ว", "ปิดบัญชีสำเร็จแล้ว");
  } catch (err) {
    if (err.response.status == 400) {
      showAlert("คุณได้ปิดบัญชีเดือนนี้ไปแล้ว", "กรุณาปิดอีกทีเดือนถัดไป");
    }
    else {
      showAlert("เกิดข้อผิดพลาดในการปิดบัญชี", "เกิดข้อผิดพลาดในการปิดบัญชี");
    }
  }
};
</script>
