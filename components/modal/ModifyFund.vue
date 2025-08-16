<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" v-if="show">
    <div class="min-h-screen px-2 py-3 sm:px-6 lg:px-8 text-center">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-black bg-opacity-60 transition-opacity backdrop-blur-sm" aria-hidden="true"
        @click="closeModal" />

      <!-- Modal -->
      <div class="relative inline-block w-full max-w-lg sm:max-w-xl lg:max-w-2xl">
        <!-- Centered modal container -->
        <div class="flex  items-center justify-center p-8">
          <div
            class="relative w-full max-w-md sm:max-w-lg lg:max-w-xl p-3 sm:p-4 text-left align-middle transition-all transform bg-white rounded-lg "
            @click.stop>
            <!-- Header -->
            <div class="flex items-center justify-between mb-2 border-b border-gray-200 pb-2">
              <div>
                <h2 class="text-md sm:text-2xl font-bold text-sky-600">
                  จัดการข้อมูลทุน
                </h2>
                <p class="text-sm text-gray-500 ">
                  ปรับปรุงยอดเงินในแต่ละประเภทบัญชี
                </p>
              </div>
              <button @click="closeModal"
                class="p-1 rounded-full hover:bg-red-50 active:bg-red-100 transition-all duration-200 group">
                <Icon name="lucide:x" class="w-5 h-5 text-sky-400 group-hover:text-red-500 transition-colors" />
              </button>
            </div>

            <!-- Transaction Details -->
            <div class="space-y-6 mb-3 max-h-96 sm:max-h-80 overflow-y-auto border-b border-gray-200 pb-4">
              <div v-for="(fund, index) in fundData.data" :key="fund.account_type_id"
                class="bg-white p-2 rounded-lg border border-sky-200">
                <!-- Category Badge -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <div class="flex items-center space-x-3 mb-2 sm:mb-0">
                    <span :class="getCategoryBadgeClass(fund.account_category_id)"
                      class="px-3 py-1 text-xs font-semibold rounded-full">
                      {{ getCategoryName(fund.account_category_id) }}
                    </span>
                  </div>
                  <!-- <div class="text-sm text-gray-500">
                    C: {{ fund.account_type_id }}
                  </div> -->
                </div>

                <!-- Account Type Name -->
                <label class="block text-sm font-semibold text-gray-800 mb-3">
                  {{ fund.account_type_name }}
                </label>

                <!-- Input Field -->
                <div class="relative">
                  <input type="number" step="0.01" class="block w-full px-2 py-1.5 text-lg bg-white border-2 border-gray-200 rounded-lg 
                  focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all duration-200
                  focus:outline-none focus:ring-offset-2 focus:ring-offset-white text-gray-800 placeholder:text        
                           placeholder-gray-400" v-model="fund.account_type_sum" :placeholder="'ป้อนจำนวนเงิน...'" />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <span class="text-gray-400 text-sm font-medium">฿</span>
                  </div>
                </div>

                <!-- Original Value Display -->
                <div class="mt-2 text-xs text-gray-600">
                  ยอดปัจจุบัน: {{ formatCurrency(fund.account_type_total) }} ฿
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div
              class="flex flex-col sm:flex-row items-stretch sm:items-center justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <button @click="submitAllUpdates" :disabled="isSubmitting" class="bg-sky-600 text-white px-3 py-1.5 text-sm rounded-md
                hover:bg-sky-700 active:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500
                transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                <span v-if="!isSubmitting" class="flex items-center justify-center">

                  ยืนยันการเปลี่ยนแปลง
                </span>
                <span v-else class="flex items-center justify-center">

                  กำลังบันทึก...
                </span>
              </button>
              <button @click="closeModal" class="w-full sm:w-auto px-3 py-1.5 text-sm  text-gray-700 bg-white border-2 border-gray-300 rounded-md 
                       hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 
                       transition-all duration-200">
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed, onMounted, watch } from "vue";

const { $axios } = useNuxtApp();
const emits = defineEmits(["close", "update"]);
const fundData = ref({ data: [] });
const isSubmitting = ref(false);

defineProps({
  show: Boolean,
});

const closeModal = () => {
  emits("close");
};

const getCategoryName = (categoryId) => {
  const categories = {
    1: "สินทรัพย์",
    2: "หนี้สิน",
    6: "ลูกหนี้",
    7: "ธนาคาร"
  };
  return categories[categoryId] || "ไม่ระบุ";
};

const getCategoryBadgeClass = (categoryId) => {
  const classes = {
    1: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    2: "bg-purple-100 text-purple-800 border border-purple-200",
    6: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    7: "bg-yellow-100 text-yellow-800 border border-yellow-200"
  };
  return classes[categoryId] || "bg-gray-100 text-gray-800 border border-gray-200";
};

const formatCurrency = (value) => {
  if (!value) return "0.00";
  return parseFloat(value).toLocaleString('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const fetchFundData = async () => {
  try {
    const response = await $axios.get("/getLastedFund");
    fundData.value = response.data;
  } catch (error) {
    console.error("Error fetching fund data:", error);
  }
};

onMounted(() => {
  fetchFundData();
});

const updateFundValue = async (
  newValue,
  account_type_id,
  account_category_id
) => {
  try {
    await $axios.post("/updateLastedFund", {
      account_type_id,
      new_value: newValue,
      account_category_id,
    });
    console.log("Updated fund:", account_type_id, "=>", newValue);
  } catch (error) {
    console.error("Error updating fund:", error);
    throw error;
  }
};

const submitAllUpdates = async () => {
  isSubmitting.value = true;
  try {
    for (const fund of fundData.value.data) {
      const original = parseFloat(fund.account_type_total || 0);
      const updated = parseFloat(fund.account_type_sum || 0);

      if (original !== updated) {
        await updateFundValue(
          updated,
          fund.account_type_id,
          fund.account_category_id
        );
      }
    }

    emits("update");
    emits("close");
    fetchFundData();
  } catch (err) {

  } finally {
    isSubmitting.value = false;
  }
};
</script>