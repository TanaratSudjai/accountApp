<template>
  <div v-if="GroupData.length > 0">
    <h1>{{ GroupData[0].account_group_name }}</h1>
  </div>
  <div v-else></div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const groupID = route.params.id;

const { $axios } = useNuxtApp;

const GroupData = ref([]);

const fetchGroup = async () => {
  try {
    const response = await $axios.get(
      `/account_group_get/${groupID}`
    );
    const data = await response.data;
    GroupData.value = data.account_group_by_id;
    console.log(GroupData.value);
  } catch (error) {
    console.log("Error fetching group data:", error);
  }
};

onMounted(async () => {
  fetchGroup();
});
</script>
