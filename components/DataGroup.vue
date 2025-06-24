<template>
  <div class="pt-6 h-auto overflow-y-auto bg-gray-50 text-gray-800 p-6 rounded-xl shadow-sm">
    <div
      v-if="!groupData || groupData.length === 0"
      class="text-center p-12 text-gray-500 font-medium"
    >
      <div class="mb-8">
        <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">ไม่มีกลุ่ม</h3>
        <p class="text-gray-500 text-sm">เริ่มต้นด้วยการสร้างกลุ่มแรกของคุณ</p>
      </div>
      
      <div 
        @click="openAddModal" 
        class="border-2 border-dashed border-emerald-200 hover:border-emerald-400 bg-white hover:bg-emerald-50 rounded-2xl p-8 shadow-sm hover:shadow-md flex flex-col justify-center items-center cursor-pointer transition-all duration-300 h-full min-h-[240px] group"
      >
        <div class="rounded-full w-16 h-16 bg-emerald-100 group-hover:bg-emerald-200 flex justify-center items-center mb-4 shadow-sm transition-colors duration-300">
          <Plus class="w-8 h-8 text-emerald-600"/>
        </div>
        <span class="text-emerald-600 font-semibold text-lg">เพิ่มกลุ่มใหม่</span>
        <span class="text-gray-500 text-sm mt-1">คลิกเพื่อเริ่มต้น</span>
      </div>
    </div>

    <div v-else>
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">รายการกลุ่ม</h2>
        <p class="text-gray-600">จัดการและดูข้อมูลกลุ่มของคุณ</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="group in groupData"
          :key="group.account_group_id"
          class="border border-gray-200 rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-emerald-200 group"
        >
          <div @click="goToPath(group.account_group_id, categoryID)" class="cursor-pointer">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center mb-2">
                  <div class="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                  <span class="text-emerald-600 text-sm font-medium uppercase tracking-wide">กลุ่ม</span>
                </div>
                
                <h3 class="font-bold text-gray-800 text-lg mb-1 group-hover:text-emerald-700 transition-colors">
                  {{ group.account_group_name }}
                </h3>
                
                <div class="flex items-center text-gray-500 text-sm">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                  ID: {{ group.account_group_id }}
                </div>
              </div>
            </div>
            
            <div class="bg-gray-50 rounded-xl p-4 mb-4">
              <div class="flex items-center justify-between">
                <span class="text-gray-600 text-sm font-medium">จำนวนรวม</span>
                <div class="flex items-center">
                  <span class="text-2xl font-bold text-emerald-600">{{ group.type_count }}</span>
                  <span class="text-gray-500 text-sm ml-1">รายการ</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex justify-between items-center pt-4 border-t border-gray-100">
            <div class="flex space-x-2">
              <button
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md transform hover:scale-105"
                @click="deleteFormData(group.account_group_id)"
              >
                <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                ลบ
              </button>
              <button
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md transform hover:scale-105"
                @click="openUpdateModal(group)"
              >
                <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                แก้ไข
              </button>
            </div>
            <div class="text-xs text-gray-400">
              <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div 
          @click="openAddModal" 
          class="border-2 border-dashed border-emerald-200 hover:border-emerald-400 bg-white hover:bg-emerald-50 rounded-2xl p-6 shadow-sm hover:shadow-md flex flex-col justify-center items-center cursor-pointer transition-all duration-300 h-full min-h-[280px] group"
        >
          <div class="rounded-full w-16 h-16 bg-emerald-100 group-hover:bg-emerald-200 flex justify-center items-center mb-4 shadow-sm transition-colors duration-300">
            <Plus class="w-8 h-8 text-emerald-600"/>
          </div>
          <span class="text-emerald-600 font-semibold text-lg mb-1">เพิ่มกลุ่มใหม่</span>
          <span class="text-gray-500 text-sm text-center">คลิกเพื่อสร้างกลุ่มใหม่</span>
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
