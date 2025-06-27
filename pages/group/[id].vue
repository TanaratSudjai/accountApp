<template>
  <div>
      <BackComponentsForTypeForm1></BackComponentsForTypeForm1>
    </div>
  <div class="flex justify-center items-center">
  
    <div class="flex items-center justify-center mb-10 w-full flex-col max-w-6xl">
      <div class="w-full border border-gray-700 bg-gray-400 rounded-xl p-4 shadow-xl mt-2 mb-5 ">
        <div class="flex justify-center items-center mb-4 text-bold text-white">
          <GetgroupName></GetgroupName>
        </div>
        
      </div>
      <div class="rounded-2xl w-full">
        <DataGroup ref="dataGroupRef"></DataGroup>
      </div>
    </div>
  
    <div>
      <!-- <table
          class="min-w-full table-auto border-collapse border border-gray-200"
        >
          <thead>
            <tr>
              <th class="border border-gray-300 p-2">Account Group Name</th>
              <th class="border border-gray-300 p-2">Type Count</th>
              <th class="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="group in groupData"
              :key="group.account_group_id"
              class="border-2"
            >
              <td class="border border-gray-300 p-2">
                ชื่อ {{ group.account_group_name }}
              </td>
              <td class="border border-gray-300 p-2">
                จำนวน {{ group.type_count }}
              </td>
              <td class="border border-gray-300 p-2 flex gap-2">
                <button @click="deleteFormData(group.account_group_id)">
                  ลบ
                </button>
  
                <button>แก้ไข</button>
              </td>
            </tr>
          </tbody>
        </table> -->
    </div>
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

watch(
  formData,
  (newVal) => {

  },
  { deep: true }
);

const submitForm = async () => {
  try {
    const response = await $axios.post(
      "/account_group_create",
      // ข้อมูลที่จะส่ง (request body)
      {
        account_group_name: formData.account_group_name,
        account_category_id: formData.account_category_id,
      },
    );
    // อัพเดท formData
    formData.account_group_name = "";
    dataGroupRef.value.fetchGroup();
  } catch (error) {
    console.log(error, "Error creating account group:",);
  }
};

// const fetchData = async () => {
//   if (route.params.id) {
//     await groupStore.fetchGroup(route.params.id);
//   }
// };

</script>
