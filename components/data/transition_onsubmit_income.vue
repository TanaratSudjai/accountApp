<template>
  <div class="p-4">
    <div class="mx-auto">
      <!-- Error/Loading State -->
      <div v-if="error" class="flex justify-center items-center min-h-[500px]">
        <div class="text-center">
          <LoadingPageload />
          <p class="mt-4 text-gray-600 font-medium">กำลังโหลดข้อมูล...</p>
        </div>
      </div>

      <div v-else class="">
        <!-- Header Card -->
        <div class="bg-white">
          <div class="flex flex-col items-center text-center">
            <!-- Icon with animated background -->
            <div class="relative">
              <div
                class="absolute inset-0 bg-emerald-500 rounded-xl blur-xl opacity-30 animate-pulse"
              ></div>
              <div class="relative rounded">
                <HandCoins class="w-10 md:h-12 h-10 md:w-12 text-green-500" />
              </div>
            </div>

            <!-- Title with gradient text -->
            <div class="">
              <h1
                class="text-lg md:text-xl font-bold bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent"
              >
                บันทึกรายการรายได้
              </h1>
              <p class="text-gray-600 font-medium">
                จัดการรายรับและรายจ่ายของคุณ
              </p>
            </div>
          </div>
        </div>

        <!-- Data Input Component -->
        <div class="bg-white rounded-md overflow-hidden">
          <DataIncomeComponent />
        </div>

        <!-- Transactions Section -->
        <div class="bg-white border-gray-200 overflow-hidden space-y-2">
          <!-- Section Header -->
          <div class="border-b border-gray-200 pb-2">
            <div class="flex items-start justify-between space-x-3">
              <div class="flex gap-3 justify-start items-center">
                <div
                  class="w-1 h-10 bg-gradient-to-b from-green-300 to-green-400 rounded-full"
                ></div>
                <div>
                  <h2 class="text-xl font-bold text-gray-800">รายการธุรกรรม</h2>
                  <p class="text-gray-600 text-xs">เลื่อนดูรายการทั้งหมด</p>
                </div>
              </div>
              <!-- Transaction count badge -->
              <div v-if="transition.length > 0" class="flex items-center">
                <span
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  {{ transition.length }} รายการ
                </span>
              </div>
            </div>
          </div>

          <!-- Transactions List -->
          <div v-if="transition.length > 0" class="">
            <div
              class="max-h-40 overflow-y-auto space-y-2 pr-2 custom-scrollbar border-b border-gray-200 py-2"
            >
              <TransitionGroup
                name="list"
                tag="div"
                class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1"
              >
                <div
                  v-for="(transactionData, index) in transition"
                  :key="`${transactionData.account_transition_id}-${index}`"
                  class="group transition-all duration-300 transform"
                >
                  <!-- Income Transaction -->
                  <div
                    v-if="transactionData.account_category_id === 4"
                    class="relative p-1 rounded-lg border-2 border-green-200 bg-gradient-to-r from-green-50 to-green-50 transition-all duration-300 hover:border-green-300"
                  >
                    <div class="relative flex justify-between items-center">
                      <div class="flex items-center">
                        <!-- Income icon -->
                        <div>
                          <span
                            class="font-semibold text-green-800 text-xs md:text-sm lg:text-md"
                          >
                            {{ transactionData.account_type_name }}
                          </span>
                          <div class="text-sm text-green-600">รายได้</div>
                        </div>
                      </div>

                      <div class="flex items-center gap-2">
                        <div class="text-right">
                          <div
                             class="font-bold text-green-700 text-xs md:text-sm lg:text-md"
                          >
                            ฿{{
                              formatNumber(
                                transactionData.account_transition_value
                              ) || 0
                            }}
                          </div>
                          <div class="text-xs text-green-600">THB</div>
                        </div>

                        <!-- Delete button -->
                        <button
                          @click="
                            deleteTransection(
                              transactionData.account_transition_id,
                              transactionData.account_transition_value
                            )
                          "
                          class="group/btn relative w-8 md:h-8 h-8 md:w-8 bg-white hover:bg-green-50 rounded-full transition-all duration-300 border-2 border-transparent hover:border-green-200 focus:outline-none focus:ring-4 focus:ring-green-100"
                        >
                          <svg
                            class="w-5 h-5 text-gray-400 group-hover/btn:text-green-500 transition-colors duration-300 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </TransitionGroup>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="flex flex-col items-center justify-center p-1">
            <div class="relative mb-2">
              <!-- Animated background circles -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full blur-xl opacity-20 animate-ping"
              ></div>
              <div
                class="relative w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-7 h-7 text-gray-400"
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
              </div>
            </div>

            <h3
              class="text-sm md:text-md lg:text-lg font-bold text-gray-600 mb-2"
            >
              ไม่มีรายการธุรกรรม
            </h3>
            <p
              class="text-gray-500 text-center max-w-md text-xs md:text-xs lg:text-sm"
            >
              เริ่มต้นบันทึกรายการรายรับและรายจ่ายของคุณเพื่อติดตามการเงิน
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { HandCoins } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { useIncomeTransitionStore } from "~/stores/incomeTransition";
const store = useIncomeTransitionStore();
const { transition } = storeToRefs(store);
const error = ref(null); // เก็บข้อผิดพลาด (ถ้ามี)
const { $api } = useApi();
const { formatNumber } = useFormatNumber(); // ฟังก์ชันสำหรับการจัดรูปแบบตัวเลข

// ฟังก์ชันลบธุรกรรม
const deleteTransection = async (id, value) => {
  try {
    await $api(`/delete_transition_income/${id}`, {
      method: "PUT",
      body: {
        account_transition_value: value,
      },
    });
    await store.fetchTransitions(); // Refresh the store data
  } catch (error) {
    console.error("Error deleting transaction:", error);
  }
};

</script>
