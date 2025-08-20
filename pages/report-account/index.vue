<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mb-10">
    <div v-for="item in reports" :key="item.account_type_id"
      class="bg-white flex justify-between items-center border-l-2 border-blue-400 p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
      :class="{
        'border-yellow-500': item.account_category_id === 1,
        'border-purple-500': item.account_category_id === 2,
        'border-orange-500': item.account_category_id === 3,
        'border-green-500' : item.account_category_id === 4,
        'border-red-500' : item.account_category_id === 5 
      }">
      <h2 class="text-xl font-bold text-gray-800 mb-2">
        {{ item.account_type_name }}
      </h2>
      <p class="text-gray-600">
        <span class="font-semibold text-gray-900">{{ item.total_value }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const reports = ref([]);

const fetchReports = async () => {
  try {
    const response = await fetch("/report");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    reports.value = data;
  } catch (error) {
    const { logger } = await import('~/utils/logger');
    logger.error("Failed to fetch reports", error);
  }
};

onMounted(async () => {
  fetchReports();
});
</script>
