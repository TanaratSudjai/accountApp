<template>
  <client-only>
    <BackComponentsForCategoryForm></BackComponentsForCategoryForm>
  </client-only>
  <div class="flex items-center justify-center mb-10 w-full flex-col">
    <div
      class="w-full max-w-sm border border-gray-200 rounded-lg p-4 shadow-xl mt-5"
    >
      <div class="flex justify-center items-center mb-4">
        <GetgroupName></GetgroupName>
      </div>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="mb-4">
          <label htmlFor="phone" class="text-gray-800 text-sm block">
            ชื่อกลุ่ม
          </label>
          <div class="relative flex items-center">
            <input
              type="text"
              placeholder="account_group_name"
              class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              v-model="formData.account_group_name"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-300 hover:bg-blue-300 font-bold text-black py-3 mt-4 rounded-md transition duration-300 ease-in-out mb-2"
          >
            เพิ่มกลุ่ม
          </button>
        </div>
      </form>
    </div>

    <div class="p-6 sm:p-8 rounded-2xl w-full max-w-md">
      <DataGroup></DataGroup>
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

import { ref, onMounted } from "vue";
import GetgroupName from "~/components/GetgroupName.vue";
import axios from "axios";

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
    const token = localStorage.getItem("token");
    console.log(token);
    
    const response = await axios.post(
      "http://localhost:5000/api/account_group_create",
      // ข้อมูลที่จะส่ง (request body)
      {
        account_group_name: formData.account_group_name,
        account_category_id: formData.account_category_id,
      },
      // config object
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log("Account group created successfully:", response.data);

    // อัพเดท formData
    formData.value = {
      account_group_name: formData.account_group_name,
      account_category_id: formData.account_category_id,
    };

    fetchGroup();
  } catch (error) {
    console.error(
      "Error creating account group:",
      error.response?.data || error.message
    );
  }
};

watch(
  formData,
  (newVal) => {
    console.log("Form Data Updated:", newVal);
  },
  { deep: true }
);
</script>
