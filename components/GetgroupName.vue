<template>
  <div v-if="GroupData.length > 0">
    <h1 class="text-sky-600">{{ GroupData[0].account_category_name }}</h1>
  </div>
  <div v-else></div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const groupID = route.params.id;
const { $api } = useNuxtApp();

const GroupData = ref([]);

const fetchGroup = async () => {
  try {
    const response = await $api.get(`/category/${groupID}`);
    GroupData.value = response.data;
  } catch (error) {
    console.error("Error fetching group data:", error);
  }
};

onMounted(async () => {
  fetchGroup();
});
</script>
