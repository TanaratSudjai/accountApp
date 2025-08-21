<template>
  <div class="min-h-screen p-2 max-w-4xl mx-auto">
    <div class=" mx-auto">
      <!-- Header Section -->
      <div class="text-center">
        <h1 class="text-xl font-bold mb-2 text-sky-600">
          ตรวจสอบความถูกต้อง
        </h1>
        <p class="text-xm md:text-md text-sky-600 font-medium py-2">
          รายงานสรุปทางการเงิน
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="#6d9bda" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity="0.25" />
          <path fill="#6d9bda"
            d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
            <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate"
              values="0 12 12;360 12 12" />
          </path>
        </svg>
      </div>

      <div v-else class="bg-white rounded-md overflow-hidden border border-gray-200">
        <div class="p-2 border-b border-gray-200 flex justify-between flex-col md:flex-row">
          <h2 class="text-sm md:text-md font-semibold text-gray-800 flex items-center">
            สรุปรายการทางการเงิน
          </h2>
          <div v-if="latestTransitionDate" class="text-xs md:text-md">
            วันที่ล่าสุด: {{ latestTransitionDate }}
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-200">
                <th class="p-1 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  ประเภทรายการ
                </th>
                <th class="p-1 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  ค่าเงิน
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="(transition, index) in transition_data" :key="transition.account_type_id"
                class="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer group">
                <!-- Account Type Column -->
                <td class="px-4 py-3">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <div
                        class="w-2 md:w-4 h-2 md:w-4 rounded-full shadow-sm transition-all duration-300 group-hover:scale-110"
                        :class="{
                          'bg-green-300': transition.account_category_id === 4,
                          'bg-red-300': transition.account_category_id === 5,
                          'bg-yellow-300': [1, 6, 7].includes(
                            transition.account_category_id
                          ),
                          'bg-purple-300': transition.account_category_id === 2,
                        }"></div>
                    </div>

                    <div class="flex-1 min-w-0">
                      <p
                        class="text-xs  md:text-md font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors duration-300">
                        {{ transition.account_type_name }}
                      </p>
                      <span class="inline-flex items-center rounded-md text-xs  bg-gray-100 text-gray-800 text-nowrap"
                        v-if="
                          transition.account_category_id === 4 ||
                          transition.account_category_id === 5
                        ">
                        {{
                          FormatThaiDate(transition.last_transition_datetime)
                        }}
                      </span>
                      <div class="flex items-center space-x-2 mt-1">
                        <span class="inline-flex items-center rounded-md text-xs  bg-gray-100 text-gray-800">
                          {{ formatNumber(transition.account_type_sum) }}
                        </span>
                        <svg class="w-2 md:w-3 h-2 md:h-3 text-gray-400" fill="none" stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                        <span class="inline-flex items-center rounded-md text-xs  bg-indigo-100 text-indigo-800">
                          {{ formatNumber(transition.account_type_total) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <!-- Income Column -->
                <td class="p-1 text-center">
                  <div class="inline-flex items-center justify-center">
                    <div :class="[
                      'p-1 text-xs md:text-sm font-semibold rounded transition-all duration-300 hover:shadow-md min-w-[70px]',
                      parseFloat(transition.account_type_total) <
                        parseFloat(transition.account_type_sum)
                        ? 'bg-red-100 border border-red-200 '
                        : 'bg-green-100 border border-green-200 ',
                    ]">
                      <div class="flex items-center justify-center space-x-2">
                        <svg :class="parseFloat(transition.account_type_total) <
                          parseFloat(transition.account_type_sum)
                          ? 'text-red-500'
                          : 'text-green-500'
                          " class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="parseFloat(transition.account_type_total) <
                            parseFloat(transition.account_type_sum)
                            ? 'M19 14l-7 7m0 0l-7-7m7 7V3'
                            : 'M5 10l7-7m0 0l7 7m-7-7v18'
                            "></path>
                        </svg>
                        <span>{{
                          Math.abs(transition.account_type_difference)
                        }}</span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="transition_data.length === 0" class="text-center py-16">
          <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
            </path>
          </svg>
          <p class="text-sky-500 text-lg">ไม่พบข้อมูลทางการเงิน</p>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="mt-6 flex justify-center">
        <ButtonSubmitToOne />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useFormatThaiDate } from "~/composables/useFormatThaiDate";

const router = useRouter();
const { FormatThaiDate } = useFormatThaiDate();
const transition_data = ref([]);
const loading = ref(true);
const { $axios } = useNuxtApp();
const { formatNumber } = useFormatNumber();

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await $axios.get("/dashboard");
    transition_data.value = response.data.result;
    console.log(transition_data.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  loading.value = false;
};

const latestTransitionDate = computed(() => {
  if (!transition_data.value.length) return null;

  const sorted = [...transition_data.value].sort(
    (a, b) =>
      new Date(b.last_transition_datetime).getTime() -
      new Date(a.last_transition_datetime).getTime()
  );

  return FormatThaiDate(sorted[0].last_transition_datetime);
});

onMounted(() => {
  fetchData();
});
</script>
