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

const { $api } = useApi();

const GroupData = ref([]);

const fetchGroup = async () => {
  try {
    const data = await $api(`/account_group_get/${groupID}`);
    GroupData.value = data.account_group_by_id;
  } catch (error) {
    console.log("Error fetching group data:", error);
  }
};

onMounted(async () => {
  fetchGroup();
});
</script>
