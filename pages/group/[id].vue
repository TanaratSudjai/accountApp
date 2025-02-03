<template>
  <div>
    <BackComponentsForCategoryForm></BackComponentsForCategoryForm>
  </div>
  <div class="flex items-center justify-center mb-10 w-full flex-col">
    <div class="w-full border bg-white/85 rounded-xl p-4 shadow-xl mt-2">
      <div class="flex justify-center items-center mb-4 text-bold">
        <GetgroupName></GetgroupName>
      </div>
      <form @submit.prevent="submitForm" class="space-y-4">
        <label htmlFor="phone" class="text-bold block"> ชื่อกลุ่ม </label>
        <div
          class="mb-4 flex flex-col items-center justify-center w-full md:flex-row lg:flex-row gap-2"
        >
          <input
            type="text"
            placeholder="account_group_name"
            class="w-full md:w-[70%] text-gray-800 text-sm border-2 border-cyan-500 px-4 py-3 rounded-md outline-blue-600"
            v-model="formData.account_group_name"
          />
          <button 
            type="submit"
            class="w-full md:w-[30%] bg-cyan-600 text-white hover:bg-cyan-700 font-bold py-3 rounded-md transition duration-300 ease-in-out"
            
          >
            เพิ่มกลุ่ม
          </button>
        </div>
      </form>
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
    console.log("Form Data Updated:", newVal);
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
    console.log("Account group created successfully:", response.data);
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
