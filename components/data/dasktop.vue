<template>
  <div v-if="loadsum">Loading...</div>
  
  <div
    v-else class="flex justify-center items-center gap-4 max-h-full w-4xl mt-4"
  >
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
    <div class="flex w-4xl max-h-[900px] overflow-auto">
      <table class="min-w-full table-auto border-collapse rounded-md max-h-full overflow-auto">
        <thead>
          <tr class="bg-gray-100 text-center font-bold">
            <th class="px-4 py-3 border-2">รายการทั้งหมด</th>
            <th class="px-4 py-3 border-2">DR</th>
            <th class="px-4 py-3 border-2">CR</th>
            <th class="px-4 py-3 border-2">DR</th>
            <th class="px-4 py-3 border-2">CR</th>
            <th class="px-4 py-3 border-2">DR</th>
            <th class="px-4 py-3 border-2">CR</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="type_sum in datatype_sum"
            :key="type_sum.account_type_name"
            class="even:bg-gray-50 odd:bg-white"
          >
            <!-- รายการทั้งหมด -->
            <td class="border-r-2 px-4 py-2 text-center">
              <div
                class="border-4 border-l-yellow-300 border-r-yellow-300 rounded-xl px-4 py-2"
              >
                {{ type_sum.account_type_name }}
              </div>
            </td>

            <!-- DR Column 1 -->
            <td class="border-r-2 px-4 py-2 text-center">
              <div
                v-if="
                  type_sum.account_category_id == 1 ||
                  type_sum.account_category_id == 5
                "
                :class="{
                  'border-l-yellow-300 border-r-yellow-300':
                    type_sum.account_category_id == 1,
                  'border-l-pink-300 border-r-pink-300':
                    type_sum.account_category_id == 5,
                }"
                class="border-4 rounded-xl px-4 py-2"
              >
                {{ type_sum.account_type_sum }}
              </div>
            </td>

            <!-- CR Column 1 -->
            <td class="border-r-2 px-4 py-2 text-center relative">
              <div
                class="absolute inset-y-0 right-0 w-2 border-r-4 border-gray-400 border-double"
              ></div>
              <div
                v-if="
                  type_sum.account_category_id >= 2 &&
                  type_sum.account_category_id <= 4
                "
                :class="{
                  'border-l-purple-300 border-r-purple-300':
                    type_sum.account_category_id == 2,
                  'border-l-blue-300 border-r-blue-300':
                    type_sum.account_category_id == 3,
                  'border-l-green-300 border-r-green-300':
                    type_sum.account_category_id == 4,
                }"
                class="border-4 rounded-xl px-4 py-2"
              >
                {{ type_sum.account_type_sum }}
              </div>
            </td>

            <!-- DR Column 2 -->
            <td class="border-r-2 px-4 py-2 text-center">
              <div
                v-if="type_sum.account_category_id == 1"
                class="border-4 border-l-yellow-300 border-r-yellow-300 rounded-xl px-4 py-2"
              >
                {{ type_sum.account_type_sum }}
              </div>
            </td>

            <!-- CR Column 2 -->
            <td class="border-r-2 px-4 py-2 text-center relative">
              <div
                class="absolute inset-y-0 right-0 w-2 border-r-4 border-gray-400 border-double"
              ></div>
              <div
                v-if="
                  type_sum.account_category_id == 2 ||
                  type_sum.account_category_id == 3
                "
                :class="{
                  'border-l-purple-300 border-r-purple-300':
                    type_sum.account_category_id == 2,
                  'border-l-blue-300 border-r-blue-300':
                    type_sum.account_category_id == 3,
                }"
                class="border-4 rounded-xl px-4 py-2"
              >
                {{ type_sum.account_type_sum }}
              </div>
            </td>

            <!-- DR Column 3 -->
            <td class="border-r-2 px-4 py-2 text-center">
              <div
                v-if="type_sum.account_category_id == 5"
                class="border-4 border-l-pink-300 border-r-pink-300 rounded-xl px-4 py-2"
              >
                {{ type_sum.account_type_sum }}
              </div>
            </td>

            <!-- CR Column 3 -->
            <td class="border-r-2 px-4 py-2 text-center relative">
              <div
                class="absolute inset-y-0 right-0 w-2 border-r-4 border-gray-400 border-double"
              ></div>
              <div
                v-if="type_sum.account_category_id == 4"
                class="border-4 border-l-green-300 border-r-green-300 rounded-xl px-4 py-2"
              >
                {{ type_sum.account_type_sum }}
              </div>
            </td>
          </tr>

          <!-- สรุปผลบัญชี -->
          <tr
            class="border-2 mt-12 border-b-green-400 text-center font-semibold"
          >
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

// const datatype_name = ref([]);
const datatype_sum = ref([]);

//ดึงชื่อประเภทมาเเสดงช่องที่ 1
// const { pendings, error } = await useAsyncData("fetchData", async () => {
//   const datatypename = await $fetch("https://api-accountapp.onrender.com/api/dasktop_data");

//   datatype_name.value = datatypename;
// });

const { loadsum, err } = await useAsyncData("fecthDataSumType", async () => {
  const sumtype = await $fetch(
    "https://api-accountapp.onrender.com/api/dasktop_data_sumtype"
  );
  datatype_sum.value = sumtype.account_type_sum || [];
});

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
    .filter((type_sum) => type_sum.account_category_id === 2 || type_sum.account_category_id === 3)
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
