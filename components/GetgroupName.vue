<template>
    <div v-if="GroupData.length > 0">
      <h1>{{ GroupData[0].account_category_name}}</h1>
    </div>
    <div v-else></div>
  </template>
  
  <script setup>
  import { useRoute } from "vue-router";
  
  const route = useRoute();
  const groupID = route.params.id;
  
  const GroupData = ref([]);
  
  const fetchGroup = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/category/${groupID}`
      );
      const data = await response.json();
      GroupData.value = data;
      console.log(GroupData.value);
    } catch (error) {
      console.error("Error fetching group data:", error);
    }
  };
  
  onMounted(async () => {
    fetchGroup();
  });
  </script>
  