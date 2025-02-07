<template>
  <div class="max-w-3xl mx-auto space-y-4 rounded-lg">
    <div v-if="error" class="flex justify-center items-center min-h-[400px]">
      <LoadingPageload />
    </div>

    <div v-else class="space-y-2 mx-2">
      <div
        class="flex flex-col justify-center items-center mt-1 w-full p-2 rounded-md shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
      >
        <ArrowUpFromLine class="w-12 h-12 text-red-500"/>
        <h3 class="font-medium">บันทึกรายการค่าใช้จ่าย</h3>
      </div>
      <DataExpeneComponent />
      <hr class="border-2 border-gray-200 mx-2" />
      <div v-if="transition.length > 0">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">
          รายการธุรกรรม (เลื่อนดูรายการได้)
        </h3>
        <div class="h-[165px] overflow-y-auto p-3">
          <div
            v-for="(transitionData, index) in transition"
            :key="index"
            class="transition-all duration-200 hover:scale-[1.01] space-y-2"
          >
            <div
              v-if="transitionData.account_category_id === 4"
              class="p-2 rounded-xl border border-green-200 bg-green-50 shadow-sm hover:shadow-md transition-shadow mb-1"
            >
              <div class="flex justify-between items-center">
                <div class="flex items-center space-x-3">
                  <span class="font-medium text-green-700">
                    {{ transitionData.account_type_name }}
                  </span>
                </div>
                <div
                  class="font-bold text-green-700 flex justify-center items-center gap-3"
                >
                  ฿{{ transitionData.account_transition_value || 0 }}
                  <button
                    class="bg-white w-8 h-8 rounded-full"
                    @click="
                      deleteTransection(transitionData.account_transition_id,transitionData.account_transition_value)
                    "
                  >
                    ❌
                  </button>
                </div>
              </div>
            </div>
            <div
              v-if="transitionData.account_category_id === 5"
              class="p-2 rounded-xl border border-red-200 bg-red-50 shadow-sm hover:shadow-md transition-shadow mb-1"
            >
              <div class="flex justify-between items-center">
                <div class="flex items-center space-x-3">
                  <span class="font-medium text-red-700">
                    {{ transitionData.account_type_name }}
                  </span>
                </div>
                <div
                  class="font-bold text-red-700 flex justify-center items-center gap-3"
                >
                  ฿{{ transitionData.account_transition_value || 0 }}
                  <button
                    class="bg-white w-8 h-8 rounded-full"
                    @click="
                      deleteTransection(
                        transitionData.account_transition_id,
                        transitionData.account_transition_value
                      )
                    "
                  >
                    ❌
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class=" flex justify-center ">
        <h3 class="text-lg font-semibold text-gray-700 mb-4 mt-4">
          ไม่มีรายการธุรกรรม
        </h3>
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

// ฟังก์ชันดึงข้อมูลธุรกรรม
const fetchTransitions = async () => {
  try {
    const response = await $axios.get(
      "/get_expense_transition"
    );
    // console.log("Fetched data:", response); // ดูข้อมูลที่ถูกส่งกลับ
    transition.value = response.data || [];
  } catch (err) {
    console.error("Error fetching transitions:", err);
    error.value = err; // เก็บข้อผิดพลาดหากมี
  }
};

// ฟังก์ชันลบธุรกรรม
const deleteTransection = async (id, value) => {
  try {
    await $axios.put(`/delete_transition_expense/${id}`, {
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
