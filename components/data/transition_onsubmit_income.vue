<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Error/Loading State -->
      <div v-if="error" class="flex justify-center items-center min-h-[500px]">
        <div class="text-center">
          <LoadingPageload />
          <p class="mt-4 text-gray-600 font-medium">กำลังโหลดข้อมูล...</p>
        </div>
      </div>

      <div v-else class="space-y-8">
        <!-- Header Card -->
        <div class="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div class="flex flex-col items-center text-center space-y-4">
            <!-- Icon with animated background -->
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
              <div class="relative bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg">
                <HandCoins class="w-12 h-12 text-white" />
              </div>
            </div>
            
            <!-- Title with gradient text -->
            <div class="space-y-2">
              <h1 class="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                บันทึกรายการรายได้
              </h1>
              <p class="text-gray-600 font-medium">จัดการรายรับและรายจ่ายของคุณ</p>
            </div>
          </div>
        </div>

        <!-- Data Input Component -->
        <div class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <DataIncomeComponent />
        </div>

        <!-- Transactions Section -->
        <div class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <!-- Section Header -->
          <div class="bg-gradient-to-r from-gray-50 to-slate-50 px-8 py-6 border-b border-gray-200">
            <div class="flex items-center space-x-3">
              <div class="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
              <div>
                <h2 class="text-2xl font-bold text-gray-800">รายการธุรกรรม</h2>
                <p class="text-gray-600 text-sm mt-1">เลื่อนดูรายการทั้งหมด</p>
              </div>
              <!-- Transaction count badge -->
              <div v-if="transition.length > 0" class="ml-auto">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {{ transition.length }} รายการ
                </span>
              </div>
            </div>
          </div>

          <!-- Transactions List -->
          <div v-if="transition.length > 0" class="p-6">
            <div class="max-h-96 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              <TransitionGroup name="list" tag="div" class="space-y-4">
                <div
                  v-for="(transactionData, index) in transition"
                  :key="`${transactionData.account_transition_id}-${index}`"
                  class="group transition-all duration-300 hover:scale-[1.02] transform"
                >
                  <!-- Income Transaction -->
                  <div
                    v-if="transactionData.account_category_id === 4"
                    class="relative p-6 rounded-2xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-green-300"
                  >
                    <!-- Background decoration -->
                    <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-200/30 to-transparent rounded-bl-full"></div>
                    
                    <div class="relative flex justify-between items-center">
                      <div class="flex items-center space-x-4">
                        <!-- Income icon -->
                        
                        <div>
                          <span class="font-semibold text-green-800 text-lg">
                            {{ transactionData.account_type_name }}
                          </span>
                          <div class="text-sm text-green-600 mt-1">รายได้</div>
                        </div>
                      </div>
                      
                      <div class="flex items-center space-x-4">
                        <div class="text-right">
                          <div class="font-bold text-green-700 text-xl">
                            ฿{{ formatNumber(transactionData.account_transition_value) || 0 }}
                          </div>
                          <div class="text-xs text-green-600 mt-1">THB</div>
                        </div>
                        
                        <!-- Delete button -->
                        <button
                          @click="deleteTransection(transactionData.account_transition_id, transactionData.account_transition_value)"
                          class="group/btn relative w-10 h-10 bg-white hover:bg-red-50 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-red-200 focus:outline-none focus:ring-4 focus:ring-red-100"
                        >
                          <svg class="w-5 h-5 text-gray-400 group-hover/btn:text-red-500 transition-colors duration-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Expense Transaction -->
                  <div
                    v-if="transactionData.account_category_id === 5"
                    class="relative p-6 rounded-2xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-rose-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-red-300"
                  >
                    <!-- Background decoration -->
                    <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-200/30 to-transparent rounded-bl-full"></div>
                    
                    <div class="relative flex justify-between items-center">
                      <div class="flex items-center space-x-4">
                        <!-- Expense icon -->
                        <div class="w-12 h-12 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                          </svg>
                        </div>
                        <div>
                          <span class="font-semibold text-red-800 text-lg">
                            {{ transactionData.account_type_name }}
                          </span>
                          <div class="text-sm text-red-600 mt-1">รายจ่าย</div>
                        </div>
                      </div>
                      
                      <div class="flex items-center space-x-4">
                        <div class="text-right">
                          <div class="font-bold text-red-700 text-xl">
                            ฿{{ formatNumber(transactionData.account_transition_value) || 0 }}
                          </div>
                          <div class="text-xs text-red-600 mt-1">THB</div>
                        </div>
                        
                        <!-- Delete button -->
                        <button
                          @click="deleteTransection(transactionData.account_transition_value, transactionData.account_transition_id)"
                          class="group/btn relative w-10 h-10 bg-white hover:bg-red-50 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-red-200 focus:outline-none focus:ring-4 focus:ring-red-100"
                        >
                          <svg class="w-5 h-5 text-gray-400 group-hover/btn:text-red-500 transition-colors duration-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
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
          <div v-else class="flex flex-col items-center justify-center py-16 px-8">
            <div class="relative mb-6">
              <!-- Animated background circles -->
              <div class="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full blur-xl opacity-20 animate-ping"></div>
              <div class="relative w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
            </div>
            
            <h3 class="text-2xl font-bold text-gray-600 mb-2">ไม่มีรายการธุรกรรม</h3>
            <p class="text-gray-500 text-center max-w-md">
              เริ่มต้นบันทึกรายการรายรับและรายจ่ายของคุณเพื่อติดตามการเงิน
            </p>
            
            <!-- Call to action -->
            <!-- <div class="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
              <span class="font-medium">เพิ่มรายการแรกของคุณ</span>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref } from "vue";
import {
  ArrowLeft,
  Key,
  Store,
  Book,
  Users,
  User,
  Clock,
  Building,
  FolderOpen,
  FilePlus,
  FileMinus,
  BarChart2,
  Landmark,
  HandCoins,
  ChartNoAxesCombined,
  Grid2x2Plus,
  ArrowUpFromLine,
} from "lucide-vue-next";

const transition = ref([]); // เก็บข้อมูลธุรกรรม
const error = ref(null); // เก็บข้อผิดพลาด (ถ้ามี)
let intervalId; // สำหรับเก็บ ID ของ interval
const { $axios } = useNuxtApp();
// ฟังก์ชันสำหรับจัดรูปแบบตัวเลข
const { formatNumber } = useFormatNumber();
// ฟังก์ชันดึงข้อมูลธุรกรรม
const fetchTransitions = async () => {
  try {
    const response = await $axios.get(
      "/get_income_transition"
    );
    // console.log("Fetched data:", response); // ดูข้อมูลที่ถูกส่งกลับ
    transition.value = response.data || [];
    // console.log(transition.value);
  } catch (err) {
    console.error("Error fetching transitions:", err);
    error.value = err; // เก็บข้อผิดพลาดหากมี
  }
};

// ฟังก์ชันลบธุรกรรม
const deleteTransection = async (id, value) => {
  console.log(value);
  console.log(id);
  try {
    await $axios.put(`/delete_transition_income/${id}`, {
      account_transition_value: value ,
    });
    await fetchTransitions(); // Fetch updated data after deletion
  } catch (error) {
    console.error("Error deleting transaction:", error);
  }
};

// เรียกใช้ฟังก์ชันดึงข้อมูลเมื่อ Component ถูก mounted
onMounted(() => {
  fetchTransitions(); // ดึงข้อมูลเริ่มต้น
  intervalId = setInterval(fetchTransitions, 1000); // เรียก fetchTransitions ทุก ๆ 5 วินาที
});
onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>
