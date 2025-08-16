<template>
  <h1>{{ GroupData }}</h1>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const type_id = route.params.id;
const { $axios } = useNuxtApp();
const GroupData = ref([]);


const fetchGroup = async () => {
  try {
    const response = await $axios.get(`/account_group_get/${type_id}`);
    GroupData.value = response.data.account_group_by_id;
  } catch (error) {
    console.log("Error fetching group data:", error);
  }
};

onMounted(async () => {
  fetchGroup();
});
</script>
