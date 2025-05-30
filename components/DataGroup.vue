<template>
  <div class="pt-2 h-auto overflow-y-auto bg-[#111827] text-gray-200 p-4 rounded-lg ">
    <div
      v-if="!groupData || groupData.length === 0"
      class="text-center p-8 text-gray-400 font-medium"
    ><div class="mb-5">
      ไม่มีกลุ่ม
    </div>
      
      <div 
          @click="openAddModal" 
          class="border-2 border-dashed border-[#46cb79]/40 hover:border-[#46cb79] bg-[#1f2937] hover:bg-[#1f2937]/80 rounded-xl p-5 shadow-lg flex flex-col justify-center items-center cursor-pointer transition-all duration-300 h-full min-h-[200px]"
        >
          <div class="rounded-full w-16 h-16 bg-[#111827] flex justify-center items-center mb-2 shadow-lg">
            <Plus class="w-8 h-8 text-[#46cb79]"/>
          </div>
          <span class="text-[#46cb79] mt-2 font-medium">เพิ่มกลุ่มใหม่</span>
        </div>
    </div>

    <div v-else>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="group in groupData"
          :key="group.account_group_id"
          class="border border-gray-700 rounded-xl bg-[#1f2937] p-5 shadow-lg transition-all duration-300 hover:shadow-[#46cb79]/10 hover:border-[#46cb79]/40"
        >
          <div @click="goToPath(group.account_group_id, categoryID)" class="cursor-pointer">
            <!-- <div class="mb-3">
              <span class="text-[#46cb79] text-sm font-medium">รหัส</span>
              <div class="font-normal text-gray-300">{{ group.account_group_id }}</div>
            </div> -->
            
            <div class="mb-3">
              <span class="text-[#46cb79] text-sm font-medium">ชื่อ</span>
              <div class="font-normal text-gray-300 transition-colors">
                {{ group.account_group_name }}
              </div>
            </div>
            
            <div class="mb-4">
              <span class="text-[#46cb79] text-sm font-medium">จำนวน</span>
              <div class="font-semibold text-white">{{ group.type_count }}</div>
            </div>
          </div>
          
          <div class="flex justify-between mt-4 pt-4 border-t border-gray-700">
            <div class="flex space-x-2">
              <button
                class="bg-red-600/90 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                @click="deleteFormData(group.account_group_id)"
              >
                ลบ
              </button>
              <button
                class="bg-cyan-700/90 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                @click="openUpdateModal(group)"
              >
                แก้ไข
              </button>
            </div>
          </div>
        </div>
        
        <div 
          @click="openAddModal" 
          class="border-2 border-dashed border-[#46cb79]/40 hover:border-[#46cb79] bg-[#1f2937] hover:bg-[#1f2937]/80 rounded-xl p-5 shadow-lg flex flex-col justify-center items-center cursor-pointer transition-all duration-300 h-full min-h-[200px]"
        >
          <div class="rounded-full w-16 h-16 bg-[#111827] flex justify-center items-center mb-2 shadow-lg">
            <Plus class="w-8 h-8 text-[#46cb79]"/>
          </div>
          <span class="text-[#46cb79] mt-2 font-medium">เพิ่มกลุ่มใหม่</span>
        </div>
      </div>

      
    </div>
  </div>
  
  <UpdateGroupModal
    :show="showUpdateModal"
    :accountGroup="selectedAccountGroup"
    @update="handleUpdate"
    @close="showUpdateModal = false"
  />

  <AddGroupModal
    :show="showAddModal"
    :categoryID="categoryID"
    @submitted="fetchGroup"
    @close="showAddModal = false"
  />
</template>

<script setup>
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import AddGroupModal from '/components/modal/AddGroupModal.vue';
import {
  Plus,
  ArrowLeft,
  Key,
  Store,
  Book,
  Users,
  User,
  Clock,
  Building,
  FolderOpen,
  FilePlus,
  FileMinus,
  BarChart2,
  Landmark,
  HandCoins,
  ChartNoAxesCombined,
  Grid2x2Plus,
  ArrowUpFromLine,
} from "lucide-vue-next";

import { onMounted, onBeforeUnmount } from "vue";
const { $axios } = useNuxtApp();
const route = useRoute();
const categoryID = route.params.id;

const router = useRouter();
const groupData = ref([]);
const showAddModal = ref(false);
const openAddModal = () => {
  showAddModal.value = true;
};

const fetchGroup = async () => {
  try {
    const response = await $axios.get(`/account_group_counttype/${categoryID}`);
    groupData.value = response.data.count_type_at_group;
  } catch (error) {
    console.error("Error fetching group data:", error);
  }
};

const updateImportant = async (account_group_id) => {
  const account = groupData.value.find(
    (group) => group.account_group_id === account_group_id
  );
  if (account.account_type_important === 0) {
    try {
      const response = await $axios.put(
        `/account_type_important_one_update/${account_group_id}`
      );
      if(response.status === 200 || response.status === 201){
        fetchGroup();
      }
    } catch (error) {
      console.log("error updating account important", error);
    }
  } else {
    try {
      const response = await $axios.put(
        `/account_type_important_zero_update/${account_group_id}`
      );
      if(response.status === 200 || response.status === 201){
        fetchGroup();
      }
    } catch (error) {
      console.log("error updating account important", error);
    }
  }
};

defineExpose({ fetchGroup });

onMounted(() => {
  // setInterval(() => {
  //   fetchGroup();
  // }, 1000);
  // Set interval to fetch every 2 seconds
  // setInterval(fetchGroup, 1000);
  fetchGroup();
  // Clear the interval when the component is unmounted
  // onBeforeUnmount(() => {
  //   clearInterval(intervalId);
  // });
});

const deleteFormData = async (account_group_id) => {
  try {
    const response = await $axios.delete(
      `/account_group_del/${account_group_id}`
    );
    if (response.status === 200 || response.status === 201) {
      groupData.value = groupData.value.filter(
        (group) => group.account_group_id !== account_group_id
      );
      fetchGroup();
    } else {
      console.log("Failed to delete group");
    }
  } catch (error) {
    console.log("Error deleting group:", error);
  }
};

const showUpdateModal = ref(false);
const selectedAccountGroup = ref({});

const openUpdateModal = (group) => {
  selectedAccountGroup.value = { ...group };
  showUpdateModal.value = true;
};

const handleUpdate = (updatedData) => {
  groupData.value = groupData.value.map((group) =>
    group.account_group_id === updatedData.account_group_id
      ? updatedData
      : group
  );
  console.log("Account type updated successfully:", updatedData);
  fetchGroup();
};

const goToPath = (account_group_id, categoryID) => {
  router.push(`/type/${account_group_id}?groupID=${categoryID}`).then(() => {
    window.location.reload();
  });
};
</script>
