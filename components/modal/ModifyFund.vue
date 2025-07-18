<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" v-if="show">
    <div class="min-h-screen px-4 text-center">
      <!-- Overlay -->
      <div
        class="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity"
        aria-hidden="true"
      />

      <!-- Modal -->
      <div
        class="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
        @click.stop
      >
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <button
            class="p-1 rounded-full hover:bg-red-100 transition-colors duration-200"
          >
            <Icon name="lucide:x" class="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <!-- Transaction Details -->
        <div
          class="space-y-2 mb-6"
          v-for="(fund, index) in fundData.data"
          :key="fund.account_type_id"
        >
          <label class="block text-sm font-medium text-gray-700">
            ประเภทบัญชี {{ fund.account_type_name }}
          </label>

          <input
            type="number"
            class="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            v-model="fund.account_type_sum"
          />
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-end space-x-3 mb-5">
          <div class="flex space-x-3">
            <button
              @click="closeModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            >
              ยกเลิก
            </button>
            <button @click="submitAllUpdates">ยืนยัน</button>
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
const fundData = ref([]);
defineProps({
  show: Boolean,
});

const closeModal = () => {
  emits("close");
};

const fetchFundData = async () => {
  try {
    const response = await $axios.get("/getLastedFund");
    fundData.value = response.data;
    console.log("Fund data fetched:", fundData.value);
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
  }
};

const submitAllUpdates = async () => {
  try {
    for (const fund of fundData.value.data) {
      const original = parseFloat(fund.account_type_total); // or use another source of "original" if needed
      const updated = parseFloat(fund.account_type_sum);

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
  } catch (err) {
    console.error("Failed to update all funds:", err);
  }
};

</script>
