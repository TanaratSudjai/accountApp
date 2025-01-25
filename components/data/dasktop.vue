<template>
  <div v-if="loadsum">Loading...</div>

  <div v-else class="flex justify-center items-center gap-4 min-h-full w-full mt-4">
    <!-- Box of Account Types -->

    <!-- <div class="grid col-span-2 gap-1 p-2">
      <div class="border-2 p-3 text-center">รายการทั้งหมด</div>
      <div
        v-for="(type_name, index) in datatype_name"
        :key="index"
        class="bg-white border-4 p-2 rounded-xl border-l-pink-400"
      >
        {{ type_name.account_type_name }}
      </div>
    </div> -->

    <!-- Box of Account Type Sums -->
    <div class="flex w-full p-2 max-h-screen overflow-auto">
      <table class="min-w-full bg-gray-200 table-fixed border-collapse rounded-md max-h-full overflow-auto">
        <thead>
          <tr class="bg-gray-200 text-center font-bold">
            <th class="px-4 py-3 border-2">
              <button @click="toggleZeroSumVisibility" class="bg-blue-500 text-white px-4 py-2 rounded">
                {{ showZeroSum ? "ซ่อน" : "แสดง" }}
              </button>
              รายการทั้งหมด
            </th>
            <th class="px-4 py-3 border-2">DR</th>
            <th class="px-4 py-3 border-2">CR</th>
            <th class="px-4 py-3 border-2">DR</th>
            <th class="px-4 py-3 border-2">CR</th>
            <th class="px-4 py-3 border-2">DR</th>
            <th class="px-4 py-3 border-2">CR</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(type_sum, index) in datatype_sum" :key="type_sum.account_type_name" :class="{
            'bg-yellow-100': type_sum.account_category_id == 1 && index % 2 === 0,
            'bg-yellow-200': type_sum.account_category_id == 1 && index % 2 !== 0,

            'bg-purple-300': type_sum.account_category_id == 2 && index % 2 === 0,
            'bg-[#ad46ff]': type_sum.account_category_id == 2 && index % 2 !== 0,

            'bg-blue-300': type_sum.account_category_id == 3 && index % 2 === 0,
            'bg-blue-400': type_sum.account_category_id == 3 && index % 2 !== 0,

            'bg-green-100': type_sum.account_category_id == 4 && index % 2 === 0,
            'bg-green-400': type_sum.account_category_id == 4 && index % 2 !== 0,

            'bg-pink-100': type_sum.account_category_id == 5 && index % 2 === 0,
            'bg-pink-200': type_sum.account_category_id == 5 && index % 2 !== 0
          }">
            <!-- รายการทั้งหมด -->
            <td class="border-r-2 text-center">
              <div class="rounded-xl text-left px-3 mx-2">
                {{ type_sum.account_type_name }}
                {{ type_sum.account_category_id }}
              </div>
            </td>

            <!-- DR Column 1 -->
            <td class="border-r-2 text-right">
              <div v-if="type_sum.account_category_id == 1 || type_sum.account_category_id == 5" class="text-right">
                <p class="text-center">{{ type_sum.account_type_sum }}</p>
              </div>
            </td>

            <!-- CR Column 1 -->
            <td class="border-r-2 text-right">
              <div class="absolute inset-y-0 right-0 w-2 border-r-4 border-gray-400 border-double"></div>
              <div v-if="type_sum.account_category_id >= 2 && type_sum.account_category_id <= 4" class="text-right">
                <p class="text-center">{{ type_sum.account_type_sum }}</p>
              </div>
            </td>

            <!-- DR Column 2 -->
            <td class="border-r-2 text-center">
              <div v-if="type_sum.account_category_id == 1" class="rounded-xl">
                {{ type_sum.account_type_sum }}
              </div>
            </td>

            <!-- CR Column 2 -->
            <td class="border-r-2 text-center relative">
              <div class="absolute inset-y-0 right-0 w-2 border-r-4 border-gray-400 border-double"></div>
              <div v-if="type_sum.account_category_id == 2 || type_sum.account_category_id == 3">
                {{ type_sum.account_type_sum }}
              </div>
            </td>

            <!-- DR Column 3 -->
            <td class="border-r-2 text-center">
              <div v-if="type_sum.account_category_id == 5"
               >
                {{ type_sum.account_type_sum }}
              </div>
            </td>

            <!-- CR Column 3 -->
            <td class="border-r-2 text-center relative">
              <div class="absolute inset-y-0 right-0 w-2 border-r-4 border-gray-400 border-double"></div>
              <div v-if="type_sum.account_category_id == 4">
                {{ type_sum.account_type_sum }}
              </div>
            </td>
          </tr>

          <!-- สรุปผลบัญชี -->
          <tr class="border-2 mt-12 border-b-green-400 text-center font-semibold">
            <td class="p-2 rounded-xl shadow-md">สรุปผลบัญชี</td>
            <td class="border-r-2">{{ sumColumn1 }}</td>
            <td class="border-r-2">{{ sumColumn2 }}</td>
            <td class="border-r-2">{{ sumColumn3 }}</td>
            <td class="border-r-2">{{ sumColumn4 }}</td>
            <td class="border-r-2">{{ sumColumn5 }}</td>
            <td class="border-r-2">{{ sumColumn6 }}</td>
          </tr>

          <!-- ผลต่าง -->
          <tr class="border-2 border-b-green-400 text-center font-semibold">
            <td class="border-r-2"></td>
            <td class="border-r-2">1</td>
            <td class="border-r-2">1</td>
            <td class="border-r-2">
              <div class="p-2" v-if="sumColumn4 - sumColumn3 > 0">
                {{ sumColumn4 - sumColumn3 }}
              </div>
            </td>
            <td class="border-r-2">
              <div class="p-2" v-if="sumColumn3 - sumColumn4 > 0">
                {{ sumColumn3 - sumColumn4 }}
              </div>
            </td>
            <td class="border-r-2">
              <div class="p-2" v-if="sumColumn6 - sumColumn5 > 0">
                {{ sumColumn6 - sumColumn5 }}
              </div>
            </td>
            <td class="border-r-2">
              <div class="p-2" v-if="sumColumn5 - sumColumn6 > 0">
                {{ sumColumn5 - sumColumn6 }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- end -->
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
const datatype_sum = ref([]);
const showZeroSum = ref(true);
const error = ref("");

const fetchType = async () => {
  try {
    if (showZeroSum.value) {
      const response = await $fetch(
        "https://api-accountapp.onrender.com/api/dasktop_data_sumtype"
      );
      console.log("API Response not zero:", response); // Log the response
      datatype_sum.value = response.account_type_sum || [];
    } else {
      const response = await $fetch(
        "https://api-accountapp.onrender.com/api/dasktop_data_sumzero"
      );
      console.log("API Response zero:", response); // Log the response
      datatype_sum.value = response.account_type_sum || [];
    }
  } catch (err) {
    error.value = "Error fetching transitions: " + err.message;
  }
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
        type_sum.account_category_id === 1 || type_sum.account_category_id === 5
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
    .filter((type_sum) => type_sum.account_category_id === 1)
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
</script>
