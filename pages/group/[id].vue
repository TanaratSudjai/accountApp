<template>
  <BackComponents />
  <div class="flex justify-center items-center">
    <div
      class="flex items-center justify-center mb-10 w-full flex-col max-w-3xl"
    >
      <div class="rounded-2xl w-full">
        <DataGroup ref="dataGroupRef"></DataGroup>
      </div>
    </div>

    <div></div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const categoryID = route.params.id;
const emit = defineEmits(["submit_fetch"]);
const dataGroupRef = ref(null);

// import { useGroupStore } from "../../stores/group";
// const groupStore = useGroupStore();

import GetgroupName from "~/components/GetgroupName.vue";
const { $axios } = useNuxtApp();

const formData = reactive({
  account_group_name: "",
  account_category_id: categoryID,
});

watch(formData, (newVal) => {}, { deep: true });

const submitForm = async () => {
  try {
    const response = await $axios.post(
      "/account_group_create",
      // ข้อมูลที่จะส่ง (request body)
      {
        account_group_name: formData.account_group_name,
        account_category_id: formData.account_category_id,
      }
    );
    // อัพเดท formData
    formData.account_group_name = "";
    dataGroupRef.value.fetchGroup();
  } catch (error) {
    console.log(error, "Error creating account group:");
  }
};

// const fetchData = async () => {
//   if (route.params.id) {
//     await groupStore.fetchGroup(route.params.id);
//   }
// };
</script>
