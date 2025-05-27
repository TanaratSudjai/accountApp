<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mb-6 shadow-lg"
        >
          <svg
            class="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            ></path>
          </svg>
        </div>
        <h1
          class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4"
        >
          ตรวจสอบความถูกต้อง
        </h1>
        <div
          class="w-24 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mb-4"
        ></div>
        <p class="text-lg text-gray-600 font-medium">รายงานสรุปทางการเงิน</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"
        ></div>
      </div>

      <!-- Financial Summary Table -->
      <div
        v-else
        class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
      >
        <!-- Table Header -->
        <div
          class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200"
        >
          <h2 class="text-xl font-semibold text-gray-800 flex items-center">
            <svg
              class="w-5 h-5 mr-2 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            สรุปรายการทางการเงิน
          </h2>
          <!-- List all transitions -->
          <div
            v-for="(transition, index) in transition_data"
            :key="transition.account_type_id"
          >
            {{ FormatThaiDate(transition.account_transition_datetime) }}
          </div>

          <!-- Show latest transition date -->
          <div v-if="latestTransitionDate">
            วันที่ล่าสุด: {{ latestTransitionDate }}
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr
                class="bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-200"
              >
                <th
                  class="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                >
                  ประเภทรายการ
                </th>
                <th
                  class="px-8 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider"
                >
                  ค่าเงิน
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="(transition, index) in transition_data"
                :key="transition.account_type_id"
                class="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer group"
              >
                <!-- Account Type Column -->
                <td class="px-8 py-6">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <div
                        class="w-4 h-4 rounded-full shadow-sm transition-all duration-300 group-hover:scale-110"
                        :class="
                          transition.account_category_id === 4
                            ? 'bg-gradient-to-r from-green-400 to-green-600'
                            : 'bg-gradient-to-r from-red-400 to-red-600'
                        "
                      ></div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p
                        class="text-base font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors duration-300"
                      >
                        {{ transition.account_type_name }}
                      </p>
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        v-if="
                          transition.account_category_id === 4 ||
                          transition.account_category_id === 5
                        "
                      >
                        {{ transition.account_transition_datetime }}
                      </span>
                      <div class="flex items-center space-x-2 mt-1">
                        <span
                          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {{ transition.account_type_sum }}
                        </span>
                        <svg
                          class="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          ></path>
                        </svg>
                        <span
                          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                          {{ transition.account_type_total }}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Income Column -->
                <td class="px-8 py-6 text-center">
                  <div
                    class="inline-flex items-center justify-center min-w-[120px]"
                  >
                    <div
                      :class="[
                        'px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all duration-300 hover:shadow-md',
                        parseFloat(transition.account_type_total) <
                        parseFloat(transition.account_type_sum)
                          ? 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200'
                          : 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200',
                      ]"
                    >
                      <div class="flex items-center space-x-2">
                        <svg
                          :class="
                            parseFloat(transition.account_type_total) <
                            parseFloat(transition.account_type_sum)
                              ? 'text-red-500'
                              : 'text-green-500'
                          "
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            :d="
                              parseFloat(transition.account_type_total) <
                              parseFloat(transition.account_type_sum)
                                ? 'M19 14l-7 7m0 0l-7-7m7 7V3'
                                : 'M5 10l7-7m0 0l7 7m-7-7v18'
                            "
                          ></path>
                        </svg>
                        <span>{{
                          Math.abs(transition.account_type_difference)
                        }}</span>
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Expense Column -->
                <!-- <td class="px-8 py-6 text-center">
                  <div 
                    v-if="transition.account_category_id === 5"
                    class="inline-flex items-center justify-center min-w-[120px]"
                  >
                    <div class="px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all duration-300 hover:shadow-md bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200">
                      <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                        <span>{{ transition.account_type_difference }}</span>
                      </div>
                    </div>
                  </div>
                  <div v-else class="text-gray-400 text-sm">-</div>
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="transition_data.length === 0" class="text-center py-16">
          <svg
            class="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          <p class="text-gray-500 text-lg">ไม่พบข้อมูลทางการเงิน</p>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="mt-12 flex justify-center">
        <ButtonSubmitToOne
          class="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2 transform hover:-translate-y-1"
        >
          <span class="flex items-center space-x-2">
            <svg
              class="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span>ส่งข้อมูล</span>
          </span>
        </ButtonSubmitToOne>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useFormatThaiDate } from "~/composables/useFormatThaiDate"; // or adjust path

const router = useRouter();
const { FormatThaiDate } = useFormatThaiDate();
const transition_data = ref([]);
const loading = ref(true);
const { $axios } = useNuxtApp();

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await $axios.get("/dashboard");

    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Network response was not ok");
    }

    const data = response.data;
    transition_data.value = data.result;
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
